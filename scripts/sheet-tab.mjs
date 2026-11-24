/** OA tab on the character and NPC sheets. */
import { CLASSES } from "./classes.mjs";
import { classFeatures } from "./features.mjs";
import { HENGEYOKAI } from "./races.mjs";
import { BIRTH, BIRTH_REQ, BIRTH_NOTES, INITIAL_HONOR, birthRow, honorEffects } from "./honor.mjs";
import { WUJEN_INT } from "./tables.mjs";

const MID = "frpg1e-oa";
const esc = s => foundry.utils.escapeHTML ? foundry.utils.escapeHTML(String(s ?? "")) : String(s ?? "");
const box = (title, body) => `<div class="box"><h3 class="box-title">${title}</h3>${body}</div>`;

/** Proficiencies from OA Table 56: [initial, levels per added slot]; 1/1 adds one each time the character advances. */
export function profPool(def, level) {
  const p = def?.oa?.prof;
  if (!p || !p[0]) return null;
  const [initial, per] = p;
  if (!per) return { initial, extra: 0, total: initial, per: null };
  const extra = per === 1 ? Math.max(0, level - 1) : Math.floor(level / per);
  return { initial, extra, total: initial + extra, per };
}

/** Martial arts styles are weapon items named "Martial arts: <style>" (OA, OA Lite and the Dragon add-on). */
export const STYLE_PREFIX = "Martial arts:";
export const isStyle = i => i?.type === "weapon" && String(i.name ?? "").startsWith(STYLE_PREFIX);

/**
 * Proficiency slots in use (OA p.51 and p.106: weapons, peaceful skills, martial arts styles and maneuvers share one pool):
 * weapon proficiencies on the Proficiencies list, plus nonweapon proficiencies and maneuvers, plus any style on the
 * sheet that is not yet on the weapon proficiency list.
 */
export function slotsUsed(actor) {
  const s = actor.system;
  const profNames = new Set((s.profs?.weapons ?? []).map(w => String(w.name ?? "").toLowerCase()));
  const weapon = (s.profs?.weapons ?? []).filter(w => w.name).reduce((t, w) => t + (!w.spec ? 1 : 2 + (w.bow ? 1 : 0) + (w.spec === "double" ? 1 : 0)), 0);
  const items = actor.items.filter(i => i.type === "proficiency").reduce((t, i) => t + (i.system.slots ?? 0) + (i.system.improvements ?? 0), 0);
  const styles = actor.items.filter(i => isStyle(i) && !profNames.has(i.name.toLowerCase())).length;
  return weapon + items + styles;
}

function styleList(actor) {
  const styles = actor.items.filter(isStyle).map(i => i.name.slice(STYLE_PREFIX.length).trim());
  const man = actor.items.filter(i => i.type === "proficiency" && i.system.group === "oaManeuver").map(i => i.name);
  return `Styles on the sheet: ${styles.length ? esc(styles.join(", ")) : "none"}. Maneuvers on the sheet: ${man.length ? esc(man.join(", ")) : "none"}.`;
}

export function renderOATab(app, element) {
  const root = element instanceof HTMLElement ? element : element?.[0] ?? app.element;
  const actor = app.actor ?? app.document;
  if (!root || !actor || !["character", "npc"].includes(actor.type)) return;
  const tabs = root.querySelector(".sheet-tabs");
  const scroll = root.querySelector(".tab-scroll");
  if (!tabs || !scroll) return;
  root.querySelector(".tab-body[data-tab='oa']")?.remove();
  tabs.querySelector("[data-tab='oa']")?.remove();
  const btn = document.createElement("button");
  btn.type = "button"; btn.dataset.action = "sheetTab"; btn.dataset.tab = "oa"; btn.textContent = "OA";
  tabs.append(btn);
  const sec = document.createElement("section");
  sec.className = "tab-body oa-tab"; sec.dataset.tab = "oa";
  sec.innerHTML = tabHTML(actor);
  scroll.append(sec);
  if (app._tab === "oa") { btn.classList.add("active"); sec.classList.add("active"); }
  wire(sec, actor);
}

export function tabHTML(actor) {
  const s = actor.system, flags = actor.flags?.[MID] ?? {};
  const oaClasses = (s.classInfo ?? []).filter(c => CLASSES[c.key]);
  const out = [];
  const num = v => (v === "" || v === null || v === undefined || Number.isNaN(Number(v)) ? null : Number(v));
  const honor = num(flags.honor), family = num(flags.familyHonor);
  const lowest = Math.min(...["str", "int", "wis", "dex", "con", "cha"].map(k => s.abilities?.[k]?.value ?? 18));
  const isMonkOnly = oaClasses.length && oaClasses.every(c => c.key === "monkOA");

  /* ---- honor and birth ---- */
  if (!isMonkOnly) {
    const rank = flags.birthRank ?? "";
    const row = BIRTH.find(r => r[2] === rank);
    const noFamily = INITIAL_HONOR[oaClasses.find(c => INITIAL_HONOR[c.key] !== undefined)?.key] ?? (s.details?.race === "hengeyokai" ? INITIAL_HONOR.hengeyokai : null);
    const base = family ?? (typeof noFamily === "number" ? noFamily : null);
    out.push(box("Honor and birth (OA p.31-36)", `
      <div class="oa-grid">
        <label><span>Character honor</span><input type="number" data-oa-flag="honor" value="${honor ?? ""}" max="100"></label>
        <label><span>Family honor</span><input type="number" data-oa-flag="familyHonor" value="${family ?? ""}"></label>
        <label><span>Birth rank</span><select data-oa-flag="birthRank"><option value=""></option>${BIRTH.map(r => `<option value="${esc(r[2])}" ${r[2] === rank ? "selected" : ""}>${esc(r[2])}</option>`).join("")}</select></label>
        <button type="button" class="oa-roll-birth"><i class="fa-solid fa-dice"></i> Roll birth (Table 38)</button>
      </div>
      ${row ? `<p>NPC reaction base ${row[3]}%; ancestry ${row[4]}; birthrights ${row[5]}; family honor from rank ${row[6]} (OA Table 38).</p>` : ""}
      <p class="hint">Starting honor: with a family, family honor (birth rank + ancestry, at least 0) + birthright honor + lowest ability score (${lowest}).
        Without a family: OA Table 41 base${noFamily !== null ? ` (${esc(noFamily)})` : ""} + lowest ability score.</p>
      ${honorEffects(honor, base).map(t => `<p>${esc(t)}</p>`).join("")}
      <details><summary>Birth requirements by class (OA Table 37)</summary>
        <table class="oa-table"><tr><th class="left">Class</th><th>Birth table</th><th>Modifier</th><th>Family</th></tr>
        ${Object.entries(BIRTH_REQ).map(([k, r]) => `<tr><td class="left">${esc(CLASSES[k].label)}</td><td>${r[0] ? "Yes" : "No"}</td><td>${r[1] > 0 ? `+${r[1]}` : r[1]}</td><td>${r[2] ? "Yes" : "No"}</td></tr>`).join("")}</table>
        ${BIRTH_NOTES.map(t => `<p class="hint">${esc(t)}</p>`).join("")}</details>`));
  }

  /* ---- class abilities ---- */
  for (const c of oaClasses) {
    const lines = classFeatures(c.key, c.level, s);
    const pool = profPool(CLASSES[c.key], c.level);
    const used = slotsUsed(actor);
    const ma = CLASSES[c.key].oa ?? {};
    const req = Object.entries(ma.min ?? {}).map(([k, v]) => `${k.toUpperCase()} ${v}`).join(", ");
    out.push(box(`${esc(c.label)} ${c.level}`, `
      ${lines.map(l => `<p>${esc(l.text)} <span class="hint">(OA p.${l.page})</span></p>`).join("")}
      <p class="hint">Minimums: ${esc(req)}${ma.max ? `; ${Object.entries(ma.max).map(([k, v]) => `${k.toUpperCase()} at most ${v}`).join(", ")}` : ""}. Alignment: ${esc(ma.align)}.
        ${ma.bonus ? `+10% experience with ${ma.bonus.map(([k, v]) => `${k.toUpperCase()} ${v}`).join(" and ")}.` : "No experience bonus."}</p>
      ${pool ? `<p><strong>Proficiencies (OA Table 56):</strong> ${pool.total} (${pool.initial} at 1st${pool.per ? `, one more every ${pool.per === 1 ? "level" : `${pool.per} levels`}` : ""}). Weapons, peaceful skills, martial arts styles and maneuvers share these slots.</p>
        <p>${used > pool.total ? `<strong>Slots used: ${used} of ${pool.total} (over by ${used - pool.total}).</strong>` : `Slots used: ${used} of ${pool.total}.`}</p>`
        : `<p class="hint">${c.key === "monkOA" ? "Monk proficiencies: one unarmed style with two of its maneuvers, plus five slots (religion and calligraphy required); OA Table 56 has no monk row, so no rate of gain is given." : c.key === "yakuza" ? "Yakuza: three proficiency slots plus gaming; OA Table 56 has no yakuza row, so no rate of gain is given." : ""} Slots used: ${slotsUsed(actor)}.</p>`}
      ${ma.nonProfNote ? `<p class="hint">${esc(ma.nonProfNote)}</p>` : ""}`));
  }

  /* ---- martial arts ---- */
  out.push(box("Martial arts (OA p.101-106)", `
    <div class="oa-grid">
      <label><span>Style</span><input type="text" data-oa-flag="style" value="${esc(flags.style ?? "")}" placeholder="e.g. Karate"></label>
    </div>
    <label class="oa-wide"><span>Special maneuvers known</span><textarea data-oa-flag="maneuvers" rows="3">${esc(flags.maneuvers ?? "")}</textarea></label>
    <p>${styleList(actor)}</p>
    <p class="hint">Drag a style from the OA Martial Arts compendium onto the sheet: it goes to the Weapons list so you can attack with it, is added to the weapon proficiency list (learning a style costs one proficiency slot, OA p.106) and fills in the Style box if it is empty. Each maneuver costs one more slot. Rules the sheet does not check: a master must teach the style; maneuvers are learned in order of difficulty (all difficulty 1 before any difficulty 2); no more than two slots go to one style per level (OA p.106). Maneuvers are described in the OA Martial Arts compendium and the Martial Arts journal.</p>`));

  /* ---- race extras ---- */
  if (s.details?.race === "hengeyokai") {
    const a = HENGEYOKAI[flags.animal] ?? null;
    out.push(box("Hengeyokai (OA Table 11)", `
      <label><span>Animal</span><select data-oa-flag="animal"><option value=""></option>${Object.entries(HENGEYOKAI).map(([k, v]) => `<option value="${k}" ${k === flags.animal ? "selected" : ""}>${esc(v.label)}</option>`).join("")}</select></label>
      ${a ? `<p>Alignment ${esc(a.align)}; animal form damage ${esc(a.dmg)}, AC ${a.ac}, move ${esc(a.move)}, fly ${esc(a.fly)}, swim ${esc(a.swim)}; ability changes ${esc(a.mods)}.</p>
        <p class="hint">Animal form: half hit points (now ${Math.ceil((s.attributes?.hp?.max ?? 0) / 2)} of ${s.attributes?.hp?.max ?? 0}), no weapons, armor or spells. Changes of form per day: ${Math.max(1, ...((s.classInfo ?? []).map(c => c.level)))}.</p>` : ""}`));
  }
  if (oaClasses.some(c => c.key === "wuJen")) {
    const int = s.abilities?.int?.value ?? 10;
    const w = WUJEN_INT(int);
    out.push(box("Wu jen spells and taboos (OA p.25-26)", `
      ${w ? `<p>Intelligence ${int}: ${w[0]}% to know each listed spell; ${w[1]} to ${w[2]} spells per level (OA Table 32).</p>` : `<p class="hint">OA Table 32 starts at intelligence 9.</p>`}
      <label class="oa-wide"><span>Taboos</span><textarea data-oa-flag="taboos" rows="3">${esc(flags.taboos ?? "")}</textarea></label>`));
  }
  if (oaClasses.some(c => c.key === "yakuza")) {
    out.push(box("Yakuza contacts (OA p.27)", `<label class="oa-wide"><span>Contacts (name, position)</span><textarea data-oa-flag="contacts" rows="3">${esc(flags.contacts ?? "")}</textarea></label>`));
  }
  return out.join("");
}

function wire(sec, actor) {
  sec.querySelectorAll("[data-oa-flag]").forEach(el => el.addEventListener("change", ev => {
    ev.stopPropagation();
    const v = el.type === "number" ? (el.value === "" ? null : Number(el.value)) : el.value;
    actor.setFlag(MID, el.dataset.oaFlag, v);
  }));
  sec.querySelector(".oa-roll-birth")?.addEventListener("click", () => rollBirth(actor));
}

export async function rollBirth(actor) {
  const keys = (actor.system.classInfo ?? []).map(c => c.key);
  const mod = keys.reduce((m, k) => (BIRTH_REQ[k] && Math.abs(BIRTH_REQ[k][1]) > Math.abs(m) ? BIRTH_REQ[k][1] : m), 0);
  const roll = await new Roll(`2d10${mod ? (mod > 0 ? `+${mod}` : mod) : ""}`).evaluate();
  const row = birthRow(roll.total);
  await actor.setFlag(MID, "birthRank", row[2]);
  const content = `<div class="frpg1e-card"><header class="card-head"><div><div class="card-title">${esc(actor.name)}: birth rank</div><div class="card-sub">OA Table 38${mod ? `, class modifier ${mod > 0 ? "+" : ""}${mod}` : ""}</div></div></header>
    <div class="roll-line"><span class="adnd-big">${roll.total}</span></div>
    <p><strong>${esc(row[2])}</strong>: NPC reaction base ${row[3]}%, ancestry ${row[4]}, birthrights ${row[5]}, family honor ${row[6]}.</p>
    <p class="hint">The OA Tables compendium has Table 39 (Ancestry) and Table 40 (Birthrights). Birthright rolls are reduced by the character's birth order (OA p.34).</p></div>`;
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content, rolls: [roll] });
}
