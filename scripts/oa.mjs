/**
 * OA for 1e FRPG (Table Edition). An optional add-on: enable or disable it in Manage Modules.
 * It registers the OA races, classes, spell lists and spell tables with the system, adds an OA tab to
 * character and NPC sheets, and builds world compendia from the book.
 */
import { CLASSES, SPELLS, OA_CLASS_KEYS } from "./classes.mjs";
import { RACES, OA_RACE_KEYS, korobokuruSave } from "./races.mjs";
import { registerManeuver } from "./maneuvers.mjs";
import { OA_WEAPON_NAMES } from "./weapon-names.mjs";
import { isStyle, STYLE_PREFIX, registerKi, renderOATab, rollBirth } from "./sheet-tab.mjs";
import { offerImport, importCompendia } from "./compendia.mjs";

export const MID = "frpg1e-oa";
let API = null;

Hooks.once("frpg1e.init", api => {
  API = api;
  if (!api.registerSpellList || !api.hideClasses) {
    console.error(`${MID} | needs 1e FRPG 0.32.0 or later`);
    return;
  }
  api.registerSpellList("shukenja", "Shukenja (OA)");
  api.registerSpellList("wujen", "Wu Jen (OA)");
  for (const [k, l] of [["oaCommon", "Common (OA)"], ["oaArtisan", "Artisan (OA)"], ["oaCourt", "Court (OA)"], ["oaBarbarian", "Barbarian (OA)"], ["oaManeuver", "Martial arts maneuver (OA)"]]) api.registerProficiencyGroup(k, l);
  api.registerWeaponNames?.(OA_WEAPON_NAMES); // the OA weapons in the weapon proficiency list (1e FRPG 0.48.2 or later)
  for (const [k, t] of Object.entries(SPELLS)) api.registerSpellProgression(k, t);
  for (const [k, d] of Object.entries(CLASSES)) api.registerClass(k, d);
  for (const [k, d] of Object.entries(RACES)) api.registerRace(k, d);
});

Hooks.once("init", () => {
  game.settings.register(MID, "oaOnly", { name: "OA races and classes only", scope: "world", config: true, type: Boolean, default: true,
    hint: "Takes the PHB and UA races and classes out of the lists, leaving the OA ones. Turn off to allow PHB and UA characters (gajin) too. Characters already using them keep working.",
    onChange: v => applyLists(v), requiresReload: false });
  game.settings.register(MID, "compendiaVersion", { scope: "world", config: false, type: String, default: "" });
  game.settings.registerMenu(MID, "rebuild", { name: "OA compendia", label: "Rebuild OA compendia", icon: "fa-solid fa-book",
    type: class extends foundry.applications.api.ApplicationV2 { render() { importCompendia({ confirm: true }); return this; } }, restricted: true });
  game.oa = { importCompendia, rollBirth, registerKi, registerManeuver };
});

Hooks.once("setup", () => applyLists(game.settings.get(MID, "oaOnly")));
Hooks.once("ready", () => {
  if (!API?.registerSpellList) ui.notifications.error("OA needs 1e FRPG (Table Edition) 0.32.0 or later.", { permanent: true });
  else if (game.user.isGM) offerImport();
});

function applyLists(oaOnly) {
  const api = game.frpg1e?.api;
  if (!api?.hideClasses) return;
  const coreRaces = Object.keys(api.RACE_DEFS).filter(k => !OA_RACE_KEYS.includes(k) && !api.RACE_DEFS[k].ext);
  const coreClasses = Object.keys(api.CLASSES).filter(k => !api.CLASSES[k].setting && k !== "custom");
  if (oaOnly) { api.hideRaces(coreRaces); api.hideClasses(coreClasses); }
  else { api.showRaces(coreRaces); api.showClasses(coreClasses); }
  for (const a of game.actors ?? []) if (["character", "npc"].includes(a.type)) a.sheet?.rendered && a.sheet.render();
}

/* ---------- character preparation: notes ---------- */
Hooks.on("frpg1e.prepareCharacter", (sys) => {
  const notes = sys.settingNotes;
  const ab = k => sys.abilities?.[k]?.value ?? 0;
  if (sys.details?.race === "korobokuru") {
    const b = korobokuruSave(ab("con"));
    if (b) notes.push(`Korobokuru: +${b} on saves vs. rods, staves, wands, spells and poison (OA p.12).`);
  }
  for (const c of sys.classInfo ?? []) {
    const def = c.def;
    if (def?.source !== "OA") continue;
    const t = def.titles?.[Math.min(c.level, def.titles.length) - 1];
    if (t) notes.push(`${def.label} ${c.level}: ${t}`);
    const m = def.oa ?? {};
    const low = Object.entries(m.min ?? {}).filter(([a, v]) => ab(a) < v).map(([a, v]) => `${a} ${v}`);
    if (low.length) notes.push(`${def.label}: below the minimum scores (${low.join(", ")}) (OA Table 12).`);
    for (const [a, v] of Object.entries(m.max ?? {})) if (ab(a) > v) notes.push(`${def.label}: ${a} may not be higher than ${v} (OA Table 12).`);
    if (m.bonus && m.bonus.every(([a, v]) => ab(a) >= v)) notes.push(`${def.label}: +10% experience (OA Table 12).`);
  }
});

/* ---------- sheet tab ---------- */
Hooks.on("renderCharacterSheet", (app, element) => renderOATab(app, element));

/* ---------- martial arts styles: dropping one adds it to the weapon proficiency list (OA p.106: a style costs one slot) ---------- */
Hooks.on("createItem", async (item, options, userId) => {
  if (userId !== game.user.id || !isStyle(item)) return;
  const actor = item.parent;
  if (!actor || !["character", "npc"].includes(actor.type)) return;
  const list = foundry.utils.deepClone(actor._source.system.profs?.weapons ?? []);
  const update = {};
  if (!list.some(w => String(w.name ?? "").toLowerCase() === item.name.toLowerCase())) {
    list.push({ name: item.name, spec: "", bow: false });
    update["system.profs.weapons"] = list;
  }
  if (!actor.getFlag(MID, "style")) update[`flags.${MID}.style`] = item.name.slice(STYLE_PREFIX.length).trim();
  if (Object.keys(update).length) await actor.update(update);
});
