/** Family, birth and honor (OA p.31-36). */

// OA Table 37: Birth Requirements by Class [birth table required, modifier, family required]
export const BIRTH_REQ = {
  samurai: [true, 10, true], shukenja: [false, 0, false], sohei: [false, 0, false], kensai: [true, 0, true], barbarianOA: [true, 0, true],
  bushi: [true, 0, true], wuJen: [false, 0, false], ninja: [false, 0, true], yakuza: [false, -10, true]
};
export const BIRTH_NOTES = [
  "Monks have no family, birth rank, ancestry, birthrights or honor (OA p.19); Table 37 has no monk row.",
  "Barbarians never roll on Table 38 according to the barbarian text (OA p.15), but Table 37 says the birth table is required, as printed.",
  "The yakuza text gives a −5 birth modifier (OA p.26); Table 37 gives −10, as printed.",
  "Korobokuru samurai do not roll: they have the lowest rank allowed for samurai (OA p.31). A ninja belongs to the Ninja clan (OA p.31)."
];

// OA Table 38: Character Birth [low, high, rank, NPC reaction %, ancestry die/rolls, birthright die/rolls, family honor]
export const BIRTH = [
  [2, 2, "Outcast", 5, "d6/1", "d4/1", 0], [3, 3, "Lower Class", 10, "d6/1", "d4/2", 1], [4, 5, "Lower Middle Class", 15, "d6/2", "d6/1", 5],
  [6, 8, "Middle Class", 20, "d10/1", "d8/2", 8], [9, 10, "Upper Middle Class", 25, "d20/2", "d20/2", 10], [11, 12, "Lower Upper Class", 30, "d100/2", "d20/4", 15],
  [13, 14, "Upper Class", 35, "d100/4", "d100/3", 17], [15, 16, "10th Rank", 40, "d100/5", "d100/4", 20], [17, 18, "9th Rank", 45, "d100/6", "d100/5", 22],
  [19, 20, "8th Rank", 50, "d100/7", "d100/6", 24], [21, 22, "7th Rank", 55, "d100/7", "d100/7", 25], [23, 24, "6th Rank", 60, "d100/7", "d100/8", 26],
  [25, 26, "5th Rank", 65, "d100/8", "d100/9", 27], [27, 27, "4th Rank", 70, "d100/8", "d100/10", 28], [28, 28, "3rd Rank", 75, "d100/9", "d100/10", 29],
  [29, 29, "2nd Rank", 80, "d100/9", "d100/10", 30], [30, 30, "1st Rank", 90, "d100/10", "d100/10", 35]
];
export const birthRow = roll => BIRTH.find(r => roll >= r[0] && roll <= r[1]) ?? (roll < 2 ? BIRTH[0] : BIRTH[BIRTH.length - 1]);

// OA Table 39: Ancestry [low, high, honor, result]
export const ANCESTRY = [
  [1, 3, 0, "Nothing"], [4, 4, -15, "Criminal"], [5, 5, 0, "Land, small mountain"], [6, 6, 0, "Roll again, using next higher die or +10"], [7, 8, 2, "Land, small farm"],
  [9, 9, 2, "Traditional business"], [10, 10, 0, "Roll again, using next higher die or +10"], [11, 11, -10, "Common bloodline"], [12, 15, 3, "Land, modest farm"],
  [16, 19, 6, "Land, small town"], [20, 20, 0, "Roll again, using next higher die or +10"], [21, 24, 0, "Nothing"], [25, 26, 6, "Advantageous marriage"],
  [27, 31, 3, "Ancestral alliance"], [32, 35, 2, "Ancestral feud"], [36, 38, 0, "Nothing"], [39, 39, 6, "Brilliant artisan"], [40, 42, 8, "Castle, small"],
  [43, 44, 10, "Castle, large"], [45, 45, 7, "Classic artist"], [46, 46, -10, "Curse"], [47, 49, 0, "Nothing"], [50, 50, -10, "Defeated family"],
  [51, 54, 6, "Estate, small"], [55, 56, 7, "Estate, large"], [57, 57, 9, "Famous general"], [58, 58, 1, "Famous holy man"], [59, 59, 8, "Famous minister"],
  [60, 63, 0, "Nothing"], [64, 69, 0, "Nothing"], [70, 70, 10, "Folk hero"], [71, 71, -20, "Great betrayal"], [72, 72, 15, "Great hero"], [73, 77, 0, "Nothing"],
  [78, 78, 12, "Imperial bloodline"], [79, 79, -5, "Infamous general"], [80, 80, -7, "Infamous minister"], [81, 85, 0, "Nothing"], [86, 87, 4, "Land, large town"],
  [88, 91, 2, "Merchant fleet"], [92, 93, -5, "Notorious moneylender"], [94, 96, 7, "Hereditary title"], [97, 97, 0, "Roll again, +10 on die roll"],
  [98, 98, 0, "Secret society"], [99, 99, 3, "Tragic event"], [100, 100, 0, "Nothing"]
];

// OA Table 40: Birthrights [low, high, personal honor, result]
export const BIRTHRIGHTS = [
  [1, 3, 0, "Nothing"], [4, 4, 0, "Roll again, using next higher die or +10"], [5, 5, 0, "Nothing"], [6, 6, 1, "Property share"],
  [7, 7, 0, "Roll again, using next higher die or +10 (the sign is unclear in the scan; the roll-again rule on p.34 adds 10)"],
  [8, 8, 1, "Property share"], [9, 16, 0, "Nothing"], [17, 18, 1, "Property share"], [19, 19, 0, "Horse"], [20, 20, 0, "1-6 cash strings"], [21, 30, 0, "Nothing"],
  [31, 33, 2, "Armor of quality"], [34, 40, 0, "Nothing"], [41, 45, 1, "Property share"], [46, 50, 0, "Nothing"], [51, 55, 0, "1-8 cash strings"], [56, 60, 1, "Property share"],
  [61, 63, 2, "Weapon of quality"], [64, 70, 0, "Nothing"], [71, 75, 2, "Armor of quality"], [76, 80, 1, "1-4 horses"], [81, 90, 0, "Nothing"], [91, 95, 0, "2-12 cash strings"],
  [96, 98, 2, "Weapon of quality"], [99, 99, 4, "Magical weapon"], [100, 100, 0, "Roll again with +10 on die roll"]
];

// OA Table 41: Initial Honor (characters without a family): base + lowest ability score
export const INITIAL_HONOR = { shukenja: 20, sohei: 15, kensai: 25, bushi: 10, hengeyokai: 10, wuJen: 15, yakuza: "1d20+20" };

// OA Table 42: Honor Awards. * doubled for samurai; ** only for points earned for defeating a single creature.
export const HONOR_AWARDS = {
  "All characters": [["Accused of crime (innocent or not)", "-4"], ["Acquiring property", "+1"], ["Avenging murder of family member", "+5"], ["Banished", "-5"],
    ["Being taken prisoner", "-10*"], ["Breaking an oath", "-4*"], ["Completing a great deed", "+5"], ["Convicted of crime", "-10"],
    ["Defeating an ancestral enemy (ancestral feud family)", "+2*"], ["Defeating a superior opponent of same character class", "+1"],
    ["Defeating monsters", "+1 per 2000 x.p.**"], ["Fulfills an oath", "+2"], ["Fulfills family debt", "+7"], ["Giving a gift of value to NPC", "+1"],
    ["Granting a favor to NPC", "+1"], ["Heroic death", "+10"], ["Losing a birthright", "-5*"], ["Losing a contest", "-1"],
    ["Losing to inferior opponent of same character class", "-2"], ["Making item of quality", "+1"], ["Marrying into higher birth rank family", "+1"],
    ["Murder of a family member", "-3"], ["Rash or improper social behavior", "-2"], ["Reaching name level", "+2"], ["Refusing a contest", "-2"],
    ["Requesting a favor", "-2"], ["Saving the life of another at great risk to own life", "+5"], ["Serving a powerful lord", "+2*"], ["Treason", "-30"], ["Winning a contest", "+1"]],
  Shukenja: [["Healing, curing, or restoring NPCs", "+1"], ["Removing a curse", "+1"], ["Taking life", "-3"]],
  Hengeyokai: [["Being recognized as hengeyokai when in human form", "-1"], ["Perpetrate humiliating prank on enemy", "+1"]],
  Kensai: [["Losing a duel vs. NPC", "-3"], ["Overindulgence in food or drink", "-2"], ["Proficiency in a ninja-preferred weapon (unless specialized weapon)", "-5"],
    ["Refusing a duel vs. NPC", "-5"], ["Using a ninja-preferred weapon (unless specialized weapon)", "-1"], ["Victorious against overwhelming odds", "+3"], ["Winning a duel vs. NPC", "+1"]],
  Ninja: [["Completing a ninja mission", "+3"], ["Failing a ninja mission", "-10"], ["True identity discovered", "-30"], ["Unnecessary deaths in course of mission", "-5"]],
  Samurai: [["Entering into debt", "-3"], ["Fleeing a fight", "-10"], ["Forming an alliance with an NPC family", "+1"], ["Gaining a court proficiency", "+1"],
    ["Leading a losing force in battle", "-4"], ["Leading a victorious force in battle", "+3"], ["Losing item of quality", "-5"], ["Losing magical item", "-10"],
    ["Proficiency in a ninja-preferred weapon", "-10"], ["Refusing one's lord", "-3"], ["Taking a bribe", "-1"], ["Taking prisoners", "+1"], ["Using a ninja-preferred weapon", "-3"]],
  Sohei: [["Defeating sohei of other monastery", "+1"], ["Forming alliance with NPC samurai family", "+1"], ["Losing monastery's minyan", "-10"]],
  "Spirit folk": [["Allowing damage to occur to lifeforce (bamboo and river spirit folk only)", "-5"]],
  "Wu jen": [["Making a magic item", "+2"]],
  Yakuza: [["Being discovered by police", "-2"], ["Claiming territory from an opposing yakuza organization", "+5"], ["Being defeated by a commoner", "-3"], ["Selling stolen goods", "+1 per 100 ch'ien"]]
};

/** Reaction modifiers and milestones from a character's honor (OA p.35-36). */
export function honorEffects(honor, base) {
  const out = [];
  if (honor === null || honor === undefined || Number.isNaN(honor)) return out;
  if (honor < 0) out.push("Honor below zero: the character is out of the game (OA p.35).");
  if (base !== null && base !== undefined && !Number.isNaN(base)) {
    if (honor < base) out.push("Below the family's (or class's) base honor: −20% on NPC reactions with members of the family (OA p.35).");
    else if (honor - base >= 10) out.push(`+${Math.floor((honor - base) / 10) * 5}% on NPC reactions with members of the same family or organization (+5% per 10 points above the base, OA p.35).`);
  }
  if (honor >= 75) out.push("75: a gift from a powerful lord (OA p.36).");
  if (honor >= 80) out.push("80: named in songs and stories; 10% a week a notorious foe boasts he can defeat the character (refusing to seek him out: −10 honor) (OA p.36).");
  if (honor >= 90) out.push("90: invited to serve one of the most powerful lords (refusing: −10% on reactions with that lord and his followers) (OA p.36).");
  if (honor >= 95) out.push("95: a great hero: +10% reactions with those of lesser rank, −10% with creatures of opposite alignment or belief (OA p.36).");
  out.push("No character can have more than 100 honor (OA p.35).");
  return out;
}
