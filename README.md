# OA for 1e FRPG, v0.2.6

An optional add-on for the 1e FRPG system for Foundry VTT (system 0.48.0 or later, Foundry V14). It adds the OA rules: the OA races and classes on the character sheet, honor and birth, martial arts, OA proficiencies, shukenja and wu jen spells, OA weapons, armor and equipment, magic items, monsters and roll tables. Turn the module on or off in Manage Modules. Don't run it together with OA Lite (frpg1e-oa-lite): both add the same races and classes.

Based on OA by Gary Gygax, with David "Zeb" Cook and Francois Marcela-Froideval (TSR, 1985). The rules are restated in plain words and arranged by topic; the numbers (tables, dice, costs, spells, monsters and items) follow the book. You need the book for its original text.

## Install

In Foundry's Setup screen, go to Add-on Modules, Install Module, and paste this manifest URL:

`https://github.com/gmjeremynow/frpg1e-oa/releases/latest/download/module.json`

Then switch it on in the world and accept the offer to build the OA compendia. They can be rebuilt at any time from Configure Settings, 1e FRPG: OA, Rebuild OA compendia (this replaces the copies in the world).

## What it adds

- Races: human, korobokuru, hengeyokai (with the animal forms) and the bamboo, river and sea spirit folk, with the OA class limits and ability ranges.
- Classes: barbarian, bushi, kensai, monk, ninja (as a split class), samurai, shukenja, sohei, wu jen and yakuza, with their experience tables, hit dice, attacks, saving throws and spell tables. Kensai and monk armor class, bushi armor class improvement, monk movement, barbarian constitution hit points, the wu jen hit point bonus, ninja hit points and the ninja backstab multiplier are applied automatically.
- World setting "OA races and classes only" (on by default) takes the PHB and UA races and classes out of the lists. Characters already using them keep working.
- An OA tab: honor, family honor and birth rank (with a Roll birth button for Table 38), class abilities for the current level, the proficiency pool, martial arts style and maneuvers, hengeyokai animal form, wu jen spells known and taboos, and yakuza contacts.
- Compendia:
  - OA Journals: the rules in plain words, by topic, in ten folders: Characters, Classes, Family, Honor and Society, Money and Equipment, Proficiencies, Magic, Combat and Martial Arts, Running the Game, The Eastern Lands, and Using This Module.
  - OA Spells: 311 spells in folders by class (Shukenja, Wu Jen) and level.
  - OA Weapons, Armor and Equipment: 265 items with the Table 47 to 54 numbers; ammunition is matched to its weapons; baskets, chests, saddle bags and the quiver are containers.
  - OA Martial Arts: the 4 Table 68 styles and the 37 Table 70 special maneuvers.
  - OA Proficiencies: 55 peaceful proficiencies with slots and base numbers.
  - OA Magic Items: the 34 Table 86 items, with charges rolled when found.
  - OA Monsters: 47 creatures in Spirits and Monsters.
  - OA Tables: 32 roll tables (birth, divination and fate, events, ruins, magic items and encounters by terrain).

## Choices made here

- Plain-words rewrite (0.2.0): every journal page and every compendium description is a paraphrase of the book, not its text. Each page names the book pages it draws on.
- Names: the book's title is written "OA", its setting "The Eastern Lands", and the game "1eFRPG". The adjective for the setting is "Eastern", or is dropped where the meaning survives. Setting names (Shou Lung, T'u Lung, Wa, Kozakura) and class and race names are kept.
- The foreword, introductions and bibliography are dropped.
- The book's tables are written out on the journal pages, built from the module's checked data or read from the page images.
- Where the text and a table disagree, the table is used and both are noted: XP bonus abilities (Table 12), kensai armor class steps (Table 19), the yakuza birth modifier (Table 37, -10 against -5 in the text), exceptional strength for sohei (Table 10), and the calligraphy base number (Table 61, 18 against 17 in an example).
- Weights: published for weapons (Table 49; a printed range uses its midpoint and counts as derived), armor (Table 54) and barding (p.50). Animals, vehicles and services don't count toward load. Everything else is marked unspecified.
- Armor pieces (Table 53): the sheet counts only the best single armor item, so the combined armor class of the pieces is entered by hand.
- Sohei can use some shukenja spells; each such spell says so at the top of its description. Each wu jen spell names its element there.
- Added items so ammunition and missile weapons line up: shakujo yari, shikomi-zue, quarrels (two dozen) and sling stones. The blowpipe is listed as "Blowpipe (blowgun)" so it uses blowgun darts.
- Magic items: the book's changes to standard magic items and its magic armor and weapon properties are on the Treasure and Magic Items journal pages, not in the compendium. Tables 74 to 85 are written out there; only Table 86 is a roll table.
- Encounter tables print results 2 to 20 without naming the dice; they roll 2d10, which can be changed. Ancestry (Table 39) and birthrights (Table 40) roll the die given by Table 38, which changes with birth rank, so their formula is 1d100 to reach every row.
- Added roll tables for Table 63 (divination results, 1d10) and Table 65 (fate, 1d20).
- The chiang lung and tun mi lung roll hit points by size and age, like the system's other eastern dragons.

## Kept as printed

- Ninja pick pockets at dexterity 9, 10 and 11 is printed 15%, 10% and 05% with no minus signs (the PHB thief table has -15, -10 and -5).
- Tael export: the text gives 2d6+2, Table 46 gives 2-12.
- "Kawanga" (Table 49) and "o-yori" (Tables 52 and 54).
- Two-handed weapons are marked in bold on Table 49, but bold row bands are used on other lists too, so which weapons are two-handed is Unknown and none are marked.
- Know motivation and resurrection are reversible in their headers but not marked on Table 62; both are kept reversible.
- Sohei marks on 5th to 7th level spells can't come into play (sohei cast up to 4th level).
- Table II.A prints "500-200 ch'ien".
- Fear armor prints both 2d4 and 2d10 charges.
- The silence property is described but is not on Table 79.
- The flooding entry refers to "Table 70: Yearly Events" (the yearly events table is Table 71).
- Bargain punishment: "+2 on saves".
- Withering palm: "decreases by 3".
- Permanency lists invisibility twice, and "respect".
- Cave kalau pain: "+1 saves".
- "shikko-" against "shikki-gaki".
- Me-zu: "Celestial Empire".
- Table 56 has no slash totals.

## Changes

- 0.2.6: the OA weapons (46 of them, from the boku-toh to the wakizashi) are added to the weapon proficiency drop-down on the Proficiencies tab. Needs 1e FRPG 0.48.2 or later; on an older system the list stays as it was. OA entries that are a PHB weapon under another name (thrown club and dagger, composite short bow, staff sling, light lance, blowpipe) are left out, since the PHB name is already on the list.
- 0.2.5: on the Proficiencies tab, a martial arts style in the weapon proficiency list no longer shows "(not in the weapon list)" after its name.
- 0.2.4: martial arts styles no longer appear in the Combat tab's Weapons list; they are used from the OA tab. Their to-hit numbers (score needed against armor class 10 to 0) now show in the OA tab's Martial Arts box. Styles stay on the weapon proficiency list, where they use a slot.
- 0.2.3: the OA tab is laid out like the Combat tab. At the top, a Martial Arts box shows the style you fight with (attacks per round, damage, armor class in the style, principal attack, maneuvers taught) with an Attack button, beside a Ki Uses Today box with - and + buttons and a New day button. Below them, a Maneuvers table lists each maneuver with its method, difficulty and use, a line on what it does, and Attack and Show buttons; maneuvers the chosen style doesn't teach are flagged (mental and physical training can be learned in any style). Then Proficiency Slots (total, used, free) and Learning Martial Arts (the OA p.105-106 rules, with a notes box), then the class boxes. Attack buttons now always show for attack maneuvers; without a style on the sheet they are greyed out with a note to add one. The Style text box is gone: the style comes from the sheet.
- 0.2.2: martial arts styles now use a proficiency slot. Dragging a style onto a character adds it to the weapon proficiency list (OA p.106: learning a style costs one slot) and fills in the Style box on the OA tab if it is empty. The OA tab now shows slots used against the class total, counting weapon proficiencies, peaceful skills, styles and maneuvers, and lists the styles and maneuvers on the sheet. Styles dropped before this version are counted too. This version also adds a "Ki uses today" box to the OA tab: each ki power with a daily limit (OA p.16-27) gets a count of uses against its limit, with a New day button to clear them, and a warning when a power that needs all of the day's ki (kensai whirlwind, ninja pass through walls, samurai great kiai) is marked alongside other ki use. The OA tab's martial arts box now has an Attack with picker (styles first, then other weapons) and an Attack button, plus a list of the maneuvers on the sheet. Maneuvers that make an attack (circle kick, flying kick, throws, touches, locks and so on, OA p.103-105) get an Attack button that rolls to hit with the chosen style and puts the maneuver's damage and effect on the chat card: double or triple damage multiplies the weapon's dice (OA doesn't say whether bonuses are multiplied), iron fist and eagle claw set the dice, crushing blow adds the character's level, and no-damage maneuvers drop the damage buttons. Every maneuver has a Show button. Add-ons can add maneuvers with registerManeuver and ki powers with registerKi.
- 0.2.1: fixed the mirror of fear's panic roll, which used a saving throw value the system doesn't accept (Foundry showed a validation error when the compendia were built). It is now marked "negates", with a note that the save is versus spell.
