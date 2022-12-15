import { enemyDrop, domainMaterial } from "./materials.mjs";
import { weaponAscensionMaterialsAmount } from "./misc.mjs";

let weapon = class {
    constructor(type, firstMaterial, secondMaterial, domainMaterial, stars) {
        this.type = type;
        this.firstMaterial = firstMaterial;
        this.secondMaterial = secondMaterial;
        this.domainMaterial = domainMaterial;
        this.stars = stars;
    }

    getDrop = function (stage) {
        let table = weaponAscensionMaterialsAmount[this.stars - 1];

        let firstMaterialRow = table[0][stage];
        let firstMaterial = [this.firstMaterial[firstMaterialRow[0] - 1], firstMaterialRow[1]];

        let secondMaterialRow = table[1][stage];
        let secondMaterial = [this.secondMaterial[secondMaterialRow[0] - 1], secondMaterialRow[1]];

        let domainMaterialRow = table[2][stage];
        let domainMaterial = [this.domainMaterial[domainMaterialRow[0] - 1], domainMaterialRow[1]];

        return [firstMaterial, secondMaterial, domainMaterial];
    }
}

// TODO make loader update this
let weapons = {
    "\"The Catch\"": new weapon("polearm", domainMaterial("mask"), enemyDrop("chaos_axis"), enemyDrop("spectral"), 4),
    "A Thousand Floating Dreams": new weapon("catalyst", domainMaterial("oasis"), enemyDrop("prism_robot"), enemyDrop("spores"), 5),
    "Akuoumaru": new weapon("claymore", domainMaterial("coral"), enemyDrop("concealed"), enemyDrop("handguard"), 4),
    "Alley Hunter": new weapon("bow", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("slime"), 4),
    "Amenoma Kageuchi": new weapon("sword", domainMaterial("coral"), enemyDrop("chaos_axis"), enemyDrop("handguard"), 4),
    "Amos' Bow": new weapon("bow", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("slime"), 5),
    "Apprentice's Notes": new weapon("catalyst", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("mask_boko"), 1),
    "Aqua Simulacra": new weapon("bow", domainMaterial("guyun"), enemyDrop("statuette"), enemyDrop("spectral"), 5),
    "Aquila Favonia": new weapon("sword", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 5),
    "Beginner's Protector": new weapon("polearm", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 1),
    "Black Tassel": new weapon("polearm", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("arrowhead"), 3),
    "Blackcliff Agate": new weapon("catalyst", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("scroll"), 4),
    "Blackcliff Longsword": new weapon("sword", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("arrowhead"), 4),
    "Blackcliff Pole": new weapon("polearm", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_fatui"), 4),
    "Blackcliff Slasher": new weapon("claymore", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_fatui"), 4),
    "Blackcliff Warbow": new weapon("bow", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("nectar"), 4),
    "Bloodtainted Greatsword": new weapon("claymore", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("arrowhead"), 3),
    "Calamity Queller": new weapon("polearm", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("nectar"), 5),
    "Cinnabar Spindle": new weapon("sword", domainMaterial("decarabian"), enemyDrop("chaos_circuit"), enemyDrop("mask_boko"), 4),
    "Compound Bow": new weapon("bow", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("insignia_fatui"), 4),
    "Cool Steel": new weapon("sword", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 3),
    "Crescent Pike": new weapon("polearm", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("insignia_hoarder"), 4),
    "Dark Iron Sword": new weapon("sword", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("mask_boko"), 3),
    "Deathmatch": new weapon("polearm", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("nectar"), 4),
    "Debate Club": new weapon("claymore", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("mask_boko"), 3),
    "Dodoco Tales": new weapon("catalyst", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("mask_boko"), 4),
    "Dragon's Bane": new weapon("polearm", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("scroll"), 4),
    "Dragonspine Spear": new weapon("polearm", domainMaterial("wolf"), enemyDrop("mist"), enemyDrop("insignia_fatui"), 4),
    "Dull Blade": new weapon("sword", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 1),
    "Elegy for the End": new weapon("bow", domainMaterial("wolf"), enemyDrop("horn"), enemyDrop("insignia_fatui"), 5),
    "Emerald Orb": new weapon("catalyst", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("insignia_hoarder"), 3),
    "End of the Line": new weapon("bow", domainMaterial("scorching"), enemyDrop("fungal_nucleus"), enemyDrop("spores"), 4),
    "Engulfing Lightning": new weapon("polearm", domainMaterial("mask"), enemyDrop("chaos_axis"), enemyDrop("handguard"), 5),
    "Everlasting Moonglow": new weapon("catalyst", domainMaterial("coral"), enemyDrop("prism"), enemyDrop("spectral"), 5),
    "Eye of Perception": new weapon("catalyst", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("mask_boko"), 4),
    "Fading Twilight": new weapon("bow", domainMaterial("aerosiderite"), enemyDrop("knife"), enemyDrop("scroll"), 4),
    "Favonius Codex": new weapon("catalyst", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("scroll"), 4),
    "Favonius Greatsword": new weapon("claymore", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("insignia_fatui"), 4),
    "Favonius Lance": new weapon("polearm", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("slime"), 4),
    "Favonius Sword": new weapon("sword", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 4),
    "Favonius Warbow": new weapon("bow", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("nectar"), 4),
    "Ferrous Shadow": new weapon("claymore", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("nectar"), 3),
    "Festering Desire": new weapon("sword", domainMaterial("dandelion"), enemyDrop("horn"), enemyDrop("insignia_fatui"), 4),
    "Fillet Blade": new weapon("sword", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_hoarder"), 3),
    "Forest Regalia": new weapon("claymore", domainMaterial("talisman"), enemyDrop("chaos_storage"), enemyDrop("headband"), 4),
    "Freedom-Sworn": new weapon("sword", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 5),
    "Frostbearer": new weapon("catalyst", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("nectar"), 4),
    "Fruit of Fulfillment": new weapon("catalyst", domainMaterial("oasis"), enemyDrop("statuette"), enemyDrop("spores"), 4),
    "Hakushin Ring": new weapon("catalyst", domainMaterial("coral"), enemyDrop("prism"), enemyDrop("scroll"), 4),
    "Halberd": new weapon("polearm", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("nectar"), 3),
    "Hamayumi": new weapon("bow", domainMaterial("narukami"), enemyDrop("prism"), enemyDrop("arrowhead"), 4),
    "Haran Geppaku Futsu": new weapon("sword", domainMaterial("narukami"), enemyDrop("statuette"), enemyDrop("handguard"), 5),
    "Harbinger of Dawn": new weapon("sword", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 3),
    "Hunter's Bow": new weapon("bow", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("insignia_hoarder"), 1),
    "Hunter's Path": new weapon("bow", domainMaterial("scorching"), enemyDrop("fungal_nucleus"), enemyDrop("headband"), 5),
    "Iron Point": new weapon("polearm", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 2),
    "Iron Sting": new weapon("sword", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("nectar"), 4),
    "Kagotsurube Isshin": new weapon("sword", domainMaterial("mask"), enemyDrop("statuette"), enemyDrop("spectral"), 4),
    "Kagura's Verity": new weapon("catalyst", domainMaterial("mask"), enemyDrop("concealed"), enemyDrop("spectral"), 5),
    "Katsuragikiri Nagamasa": new weapon("claymore", domainMaterial("narukami"), enemyDrop("chaos_axis"), enemyDrop("handguard"), 4),
    "Key of Khaj-Nisut": new weapon("sword", domainMaterial("talisman"), enemyDrop("prism_robot"), enemyDrop("headband"), 5),
    "King's Squire": new weapon("bow", domainMaterial("scorching"), enemyDrop("fungal_nucleus"), enemyDrop("arrowhead"), 4),
    "Kitain Cross Spear": new weapon("polearm", domainMaterial("mask"), enemyDrop("chaos_axis"), enemyDrop("insignia_hoarder"), 4),
    "Lion's Roar": new weapon("sword", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("insignia_hoarder"), 4),
    "Lithic Blade": new weapon("claymore", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("arrowhead"), 4),
    "Lithic Spear": new weapon("polearm", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("arrowhead"), 4),
    "Lost Prayer to the Sacred Winds": new weapon("catalyst", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("slime"), 5),
    "Luxurious Sea-Lord": new weapon("claymore", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("slime"), 4),
    "Magic Guide": new weapon("catalyst", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("slime"), 3),
    "Makhaira Aquamarine": new weapon("claymore", domainMaterial("scorching"), enemyDrop("chaos_storage"), enemyDrop("insignia_hoarder"), 4),
    "Mappa Mare": new weapon("catalyst", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("slime"), 4),
    "Memory of Dust": new weapon("catalyst", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("mask_boko"), 5),
    "Messenger": new weapon("bow", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_hoarder"), 3),
    "Missive Windspear": new weapon("polearm", domainMaterial("wolf"), enemyDrop("statuette"), enemyDrop("slime"), 4),
    "Mistsplitter Reforged": new weapon("sword", domainMaterial("coral"), enemyDrop("chaos_axis"), enemyDrop("handguard"), 5),
    "Mitternachts Waltz": new weapon("bow", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("insignia_hoarder"), 4),
    "Moonpiercer": new weapon("polearm", domainMaterial("oasis"), enemyDrop("chaos_storage"), enemyDrop("insignia_fatui"), 4),
    "Mouun's Moon": new weapon("bow", domainMaterial("narukami"), enemyDrop("prism"), enemyDrop("spectral"), 4),
    "Oathsworn Eye": new weapon("catalyst", domainMaterial("coral"), enemyDrop("concealed"), enemyDrop("spectral"), 4),
    "Old Merc's Pal": new weapon("claymore", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 2),
    "Otherworldly Story": new weapon("catalyst", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("mask_boko"), 3),
    "Pocket Grimoire": new weapon("catalyst", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("mask_boko"), 2),
    "Polar Star": new weapon("bow", domainMaterial("mask"), enemyDrop("concealed"), enemyDrop("spectral"), 5),
    "Predator": new weapon("bow", domainMaterial("narukami"), enemyDrop("prism"), enemyDrop("arrowhead"), 4),
    "Primordial Jade Cutter": new weapon("sword", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_hoarder"), 5),
    "Primordial Jade Winged-Spear": new weapon("polearm", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("insignia_fatui"), 5),
    "Prototype Amber": new weapon("catalyst", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("arrowhead"), 4),
    "Prototype Archaic": new weapon("claymore", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("mask_boko"), 4),
    "Prototype Crescent": new weapon("bow", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_hoarder"), 4),
    "Prototype Rancour": new weapon("sword", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_fatui"), 4),
    "Prototype Starglitter": new weapon("polearm", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("mask_boko"), 4),
    "Rainslasher": new weapon("claymore", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("scroll"), 4),
    "Raven Bow": new weapon("bow", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 3),
    "Recurve Bow": new weapon("bow", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 3),
    "Redhorn Stonethresher": new weapon("claymore", domainMaterial("narukami"), enemyDrop("concealed"), enemyDrop("handguard"), 5),
    "Royal Bow": new weapon("bow", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 4),
    "Royal Greatsword": new weapon("claymore", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("slime"), 4),
    "Royal Grimoire": new weapon("catalyst", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("insignia_fatui"), 4),
    "Royal Longsword": new weapon("sword", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 4),
    "Royal Spear": new weapon("polearm", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_fatui"), 4),
    "Rust": new weapon("bow", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("mask_boko"), 4),
    "Sacrificial Bow": new weapon("bow", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 4),
    "Sacrificial Fragments": new weapon("catalyst", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("insignia_hoarder"), 4),
    "Sacrificial Greatsword": new weapon("claymore", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("arrowhead"), 4),
    "Sacrificial Sword": new weapon("sword", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 4),
    "Sapwood Blade": new weapon("sword", domainMaterial("talisman"), enemyDrop("chaos_storage"), enemyDrop("headband"), 4),
    "Seasoned Hunter's Bow": new weapon("bow", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("insignia_hoarder"), 2),
    "Serpent Spine": new weapon("claymore", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("nectar"), 4),
    "Sharpshooter's Oath": new weapon("bow", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 3),
    "Silver Sword": new weapon("sword", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 2),
    "Skyrider Greatsword": new weapon("claymore", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("insignia_hoarder"), 3),
    "Skyrider Sword": new weapon("sword", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("insignia_fatui"), 3),
    "Skyward Atlas": new weapon("catalyst", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("arrowhead"), 5),
    "Skyward Blade": new weapon("sword", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 5),
    "Skyward Harp": new weapon("bow", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("arrowhead"), 5),
    "Skyward Pride": new weapon("claymore", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 5),
    "Skyward Spine": new weapon("polearm", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 5),
    "Slingshot": new weapon("bow", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("mask_boko"), 3),
    "Snow-Tombed Starsilver": new weapon("claymore", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("slime"), 4),
    "Solar Pearl": new weapon("catalyst", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("nectar"), 4),
    "Song of Broken Pines": new weapon("claymore", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("mask_boko"), 5),
    "Staff of Homa": new weapon("polearm", domainMaterial("aerosiderite"), enemyDrop("ley_line"), enemyDrop("slime"), 5),
    "Staff of the Scarlet Sands": new weapon("polearm", domainMaterial("oasis"), enemyDrop("chaos_storage"), enemyDrop("spores"), 5),
    "Summit Shaper": new weapon("sword", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("mask_boko"), 5),
    "Sword of Descension": new weapon("sword", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("insignia_hoarder"), 4),
    "The Alley Flash": new weapon("sword", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("scroll"), 4),
    "The Bell": new weapon("claymore", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("nectar"), 4),
    "The Black Sword": new weapon("sword", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 4),
    "The Flute": new weapon("sword", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 4),
    "The Stringless": new weapon("bow", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 4),
    "The Unforged": new weapon("claymore", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_hoarder"), 5),
    "The Viridescent Hunt": new weapon("bow", domainMaterial("decarabian"), enemyDrop("horn"), enemyDrop("arrowhead"), 4),
    "The Widsith": new weapon("catalyst", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("mask_boko"), 4),
    "Thrilling Tales of Dragon Slayers": new weapon("catalyst", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("scroll"), 3),
    "Thundering Pulse": new weapon("bow", domainMaterial("narukami"), enemyDrop("prism"), enemyDrop("arrowhead"), 5),
    "Traveler's Handy Sword": new weapon("sword", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 3),
    "Tulaytullah's Remembrance": new weapon("catalyst", domainMaterial("scorching"), enemyDrop("fungal_nucleus"), enemyDrop("spores"), 5),
    "Twin Nephrite": new weapon("catalyst", domainMaterial("mist_veiled"), enemyDrop("mist"), enemyDrop("insignia_fatui"), 3),
    "Vortex Vanquisher": new weapon("polearm", domainMaterial("aerosiderite"), enemyDrop("bone"), enemyDrop("insignia_hoarder"), 5),
    "Wandering Evenstar": new weapon("catalyst", domainMaterial("oasis"), enemyDrop("fungal_nucleus"), enemyDrop("spores"), 4),
    "Waster Greatsword": new weapon("claymore", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("slime"), 1),
    "Wavebreaker's Fin": new weapon("polearm", domainMaterial("mask"), enemyDrop("concealed"), enemyDrop("handguard"), 4),
    "White Iron Greatsword": new weapon("claymore", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("slime"), 3),
    "White Tassel": new weapon("polearm", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("insignia_fatui"), 3),
    "Whiteblind": new weapon("claymore", domainMaterial("guyun"), enemyDrop("knife"), enemyDrop("insignia_hoarder"), 4),
    "Windblume Ode": new weapon("bow", domainMaterial("dandelion"), enemyDrop("ley_line"), enemyDrop("nectar"), 4),
    "Wine and Song": new weapon("catalyst", domainMaterial("wolf"), enemyDrop("ley_line"), enemyDrop("insignia_hoarder"), 4),
    "Wolf's Gravestone": new weapon("claymore", domainMaterial("dandelion"), enemyDrop("chaos_circuit"), enemyDrop("scroll"), 5),
    "Xiphos' Moonlight": new weapon("sword", domainMaterial("talisman"), enemyDrop("prism_robot"), enemyDrop("headband"), 4)
}

let defNames = {
    "sword": "Dull Blade",
    "claymore": "Waster Greatsword",
    "bow": "Hunter's Bow",
    "catalyst": "Apprentice's Notes",
    "polearm": "Beginner's Protector"
}

export { weapons, defNames };