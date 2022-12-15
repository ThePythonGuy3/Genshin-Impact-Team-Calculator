import { enemyDrop, domainMaterial } from './materials.mjs';
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
    "\"The Catch\"": new weapon("polearm", mask, chaos_axis, spectral, 4),
    "A Thousand Floating Dreams": new weapon("catalyst", oasis, prism_robot, spores, 5),
    "Akuoumaru": new weapon("claymore", coral, concealed, handguard, 4),
    "Alley Hunter": new weapon("bow", dandelion, chaos_circuit, slime, 4),
    "Amenoma Kageuchi": new weapon("sword", coral, chaos_axis, handguard, 4),
    "Amos' Bow": new weapon("bow", dandelion, chaos_circuit, slime, 5),
    "Apprentice's Notes": new weapon("catalyst", decarabian, horn, mask_boko, 1),
    "Aqua Simulacra": new weapon("bow", guyun, statuette, spectral, 5),
    "Aquila Favonia": new weapon("sword", decarabian, horn, arrowhead, 5),
    "Beginner's Protector": new weapon("polearm", dandelion, chaos_circuit, scroll, 1),
    "Black Tassel": new weapon("polearm", aerosiderite, bone, arrowhead, 3),
    "Blackcliff Agate": new weapon("catalyst", guyun, knife, scroll, 4),
    "Blackcliff Longsword": new weapon("sword", guyun, knife, arrowhead, 4),
    "Blackcliff Pole": new weapon("polearm", mist_veiled, mist, insignia_fatui, 4),
    "Blackcliff Slasher": new weapon("claymore", mist_veiled, mist, insignia_fatui, 4),
    "Blackcliff Warbow": new weapon("bow", guyun, knife, nectar, 4),
    "Bloodtainted Greatsword": new weapon("claymore", wolf, ley_line, arrowhead, 3),
    "Calamity Queller": new weapon("polearm", mist_veiled, mist, nectar, 5),
    "Cinnabar Spindle": new weapon("sword", decarabian, chaos_circuit, mask_boko, 4),
    "Compound Bow": new weapon("bow", aerosiderite, bone, insignia_fatui, 4),
    "Cool Steel": new weapon("sword", decarabian, horn, arrowhead, 3),
    "Crescent Pike": new weapon("polearm", guyun, knife, insignia_hoarder, 4),
    "Dark Iron Sword": new weapon("sword", guyun, knife, mask_boko, 3),
    "Deathmatch": new weapon("polearm", wolf, ley_line, nectar, 4),
    "Debate Club": new weapon("claymore", mist_veiled, mist, mask_boko, 3),
    "Dodoco Tales": new weapon("catalyst", wolf, ley_line, mask_boko, 4),
    "Dragon's Bane": new weapon("polearm", mist_veiled, mist, scroll, 4),
    "Dragonspine Spear": new weapon("polearm", wolf, mist, insignia_fatui, 4),
    "Dull Blade": new weapon("sword", decarabian, horn, arrowhead, 1),
    "Elegy for the End": new weapon("bow", wolf, horn, insignia_fatui, 5),
    "Emerald Orb": new weapon("catalyst", guyun, knife, insignia_hoarder, 3),
    "End of the Line": new weapon("bow", scorching, fungal_nucleus, spores, 4),
    "Engulfing Lightning": new weapon("polearm", mask, chaos_axis, handguard, 5),
    "Everlasting Moonglow": new weapon("catalyst", coral, prism, spectral, 5),
    "Eye of Perception": new weapon("catalyst", mist_veiled, mist, mask_boko, 4),
    "Fading Twilight": new weapon("bow", aerosiderite, knife, scroll, 4),
    "Favonius Codex": new weapon("catalyst", decarabian, horn, scroll, 4),
    "Favonius Greatsword": new weapon("claymore", dandelion, chaos_circuit, insignia_fatui, 4),
    "Favonius Lance": new weapon("polearm", dandelion, chaos_circuit, slime, 4),
    "Favonius Sword": new weapon("sword", decarabian, horn, arrowhead, 4),
    "Favonius Warbow": new weapon("bow", dandelion, chaos_circuit, nectar, 4),
    "Ferrous Shadow": new weapon("claymore", decarabian, horn, nectar, 3),
    "Festering Desire": new weapon("sword", dandelion, horn, insignia_fatui, 4),
    "Fillet Blade": new weapon("sword", mist_veiled, mist, insignia_hoarder, 3),
    "Forest Regalia": new weapon("claymore", talisman, chaos_storage, headband, 4),
    "Freedom-Sworn": new weapon("sword", dandelion, chaos_circuit, scroll, 5),
    "Frostbearer": new weapon("catalyst", dandelion, chaos_circuit, nectar, 4),
    "Fruit of Fulfillment": new weapon("catalyst", oasis, statuette, spores, 4),
    "Hakushin Ring": new weapon("catalyst", coral, prism, scroll, 4),
    "Halberd": new weapon("polearm", mist_veiled, mist, nectar, 3),
    "Hamayumi": new weapon("bow", narukami, prism, arrowhead, 4),
    "Haran Geppaku Futsu": new weapon("sword", narukami, statuette, handguard, 5),
    "Harbinger of Dawn": new weapon("sword", wolf, ley_line, slime, 3),
    "Hunter's Bow": new weapon("bow", wolf, ley_line, insignia_hoarder, 1),
    "Hunter's Path": new weapon("bow", scorching, fungal_nucleus, headband, 5),
    "Iron Point": new weapon("polearm", dandelion, chaos_circuit, scroll, 2),
    "Iron Sting": new weapon("sword", aerosiderite, bone, nectar, 4),
    "Kagotsurube Isshin": new weapon("sword", mask, statuette, spectral, 4),
    "Kagura's Verity": new weapon("catalyst", mask, concealed, spectral, 5),
    "Katsuragikiri Nagamasa": new weapon("claymore", narukami, chaos_axis, handguard, 4),
    "Key of Khaj-Nisut": new weapon("sword", talisman, prism_robot, headband, 5),
    "King's Squire": new weapon("bow", scorching, fungal_nucleus, arrowhead, 4),
    "Kitain Cross Spear": new weapon("polearm", mask, chaos_axis, insignia_hoarder, 4),
    "Lion's Roar": new weapon("sword", guyun, knife, insignia_hoarder, 4),
    "Lithic Blade": new weapon("claymore", guyun, knife, arrowhead, 4),
    "Lithic Spear": new weapon("polearm", aerosiderite, bone, arrowhead, 4),
    "Lost Prayer to the Sacred Winds": new weapon("catalyst", dandelion, chaos_circuit, slime, 5),
    "Luxurious Sea-Lord": new weapon("claymore", aerosiderite, bone, slime, 4),
    "Magic Guide": new weapon("catalyst", decarabian, horn, slime, 3),
    "Makhaira Aquamarine": new weapon("claymore", scorching, chaos_storage, insignia_hoarder, 4),
    "Mappa Mare": new weapon("catalyst", aerosiderite, bone, slime, 4),
    "Memory of Dust": new weapon("catalyst", aerosiderite, bone, mask_boko, 5),
    "Messenger": new weapon("bow", mist_veiled, mist, insignia_hoarder, 3),
    "Missive Windspear": new weapon("polearm", wolf, statuette, slime, 4),
    "Mistsplitter Reforged": new weapon("sword", coral, chaos_axis, handguard, 5),
    "Mitternachts Waltz": new weapon("bow", decarabian, horn, insignia_hoarder, 4),
    "Moonpiercer": new weapon("polearm", oasis, chaos_storage, insignia_fatui, 4),
    "Mouun's Moon": new weapon("bow", narukami, prism, spectral, 4),
    "Oathsworn Eye": new weapon("catalyst", coral, concealed, spectral, 4),
    "Old Merc's Pal": new weapon("claymore", wolf, ley_line, slime, 2),
    "Otherworldly Story": new weapon("catalyst", dandelion, chaos_circuit, mask_boko, 3),
    "Pocket Grimoire": new weapon("catalyst", decarabian, horn, mask_boko, 2),
    "Polar Star": new weapon("bow", mask, concealed, spectral, 5),
    "Predator": new weapon("bow", narukami, prism, arrowhead, 4),
    "Primordial Jade Cutter": new weapon("sword", mist_veiled, mist, insignia_hoarder, 5),
    "Primordial Jade Winged-Spear": new weapon("polearm", guyun, knife, insignia_fatui, 5),
    "Prototype Amber": new weapon("catalyst", mist_veiled, mist, arrowhead, 4),
    "Prototype Archaic": new weapon("claymore", aerosiderite, bone, mask_boko, 4),
    "Prototype Crescent": new weapon("bow", mist_veiled, mist, insignia_hoarder, 4),
    "Prototype Rancour": new weapon("sword", mist_veiled, mist, insignia_fatui, 4),
    "Prototype Starglitter": new weapon("polearm", aerosiderite, bone, mask_boko, 4),
    "Rainslasher": new weapon("claymore", mist_veiled, mist, scroll, 4),
    "Raven Bow": new weapon("bow", decarabian, horn, arrowhead, 3),
    "Recurve Bow": new weapon("bow", dandelion, chaos_circuit, scroll, 3),
    "Redhorn Stonethresher": new weapon("claymore", narukami, concealed, handguard, 5),
    "Royal Bow": new weapon("bow", dandelion, chaos_circuit, scroll, 4),
    "Royal Greatsword": new weapon("claymore", dandelion, chaos_circuit, slime, 4),
    "Royal Grimoire": new weapon("catalyst", decarabian, horn, insignia_fatui, 4),
    "Royal Longsword": new weapon("sword", decarabian, horn, arrowhead, 4),
    "Royal Spear": new weapon("polearm", mist_veiled, mist, insignia_fatui, 4),
    "Rust": new weapon("bow", guyun, knife, mask_boko, 4),
    "Sacrificial Bow": new weapon("bow", wolf, ley_line, slime, 4),
    "Sacrificial Fragments": new weapon("catalyst", dandelion, chaos_circuit, insignia_hoarder, 4),
    "Sacrificial Greatsword": new weapon("claymore", wolf, ley_line, arrowhead, 4),
    "Sacrificial Sword": new weapon("sword", dandelion, chaos_circuit, scroll, 4),
    "Sapwood Blade": new weapon("sword", talisman, chaos_storage, headband, 4),
    "Seasoned Hunter's Bow": new weapon("bow", wolf, ley_line, insignia_hoarder, 2),
    "Serpent Spine": new weapon("claymore", aerosiderite, bone, nectar, 4),
    "Sharpshooter's Oath": new weapon("bow", wolf, ley_line, slime, 3),
    "Silver Sword": new weapon("sword", decarabian, horn, arrowhead, 2),
    "Skyrider Greatsword": new weapon("claymore", aerosiderite, bone, insignia_hoarder, 3),
    "Skyrider Sword": new weapon("sword", aerosiderite, bone, insignia_fatui, 3),
    "Skyward Atlas": new weapon("catalyst", wolf, ley_line, arrowhead, 5),
    "Skyward Blade": new weapon("sword", wolf, ley_line, slime, 5),
    "Skyward Harp": new weapon("bow", wolf, ley_line, arrowhead, 5),
    "Skyward Pride": new weapon("claymore", wolf, ley_line, slime, 5),
    "Skyward Spine": new weapon("polearm", dandelion, chaos_circuit, scroll, 5),
    "Slingshot": new weapon("bow", guyun, knife, mask_boko, 3),
    "Snow-Tombed Starsilver": new weapon("claymore", decarabian, horn, slime, 4),
    "Solar Pearl": new weapon("catalyst", guyun, knife, nectar, 4),
    "Song of Broken Pines": new weapon("claymore", decarabian, horn, mask_boko, 5),
    "Staff of Homa": new weapon("polearm", aerosiderite, ley_line, slime, 5),
    "Staff of the Scarlet Sands": new weapon("polearm", oasis, chaos_storage, spores, 5),
    "Summit Shaper": new weapon("sword", guyun, knife, mask_boko, 5),
    "Sword of Descension": new weapon("sword", wolf, ley_line, insignia_hoarder, 4),
    "The Alley Flash": new weapon("sword", decarabian, horn, scroll, 4),
    "The Bell": new weapon("claymore", decarabian, horn, nectar, 4),
    "The Black Sword": new weapon("sword", wolf, ley_line, slime, 4),
    "The Flute": new weapon("sword", wolf, ley_line, slime, 4),
    "The Stringless": new weapon("bow", decarabian, horn, arrowhead, 4),
    "The Unforged": new weapon("claymore", mist_veiled, mist, insignia_hoarder, 5),
    "The Viridescent Hunt": new weapon("bow", decarabian, horn, arrowhead, 4),
    "The Widsith": new weapon("catalyst", wolf, ley_line, mask_boko, 4),
    "Thrilling Tales of Dragon Slayers": new weapon("catalyst", wolf, ley_line, scroll, 3),
    "Thundering Pulse": new weapon("bow", narukami, prism, arrowhead, 5),
    "Traveler's Handy Sword": new weapon("sword", dandelion, chaos_circuit, scroll, 3),
    "Tulaytullah's Remembrance": new weapon("catalyst", scorching, fungal_nucleus, spores, 5),
    "Twin Nephrite": new weapon("catalyst", mist_veiled, mist, insignia_fatui, 3),
    "Vortex Vanquisher": new weapon("polearm", aerosiderite, bone, insignia_hoarder, 5),
    "Wandering Evenstar": new weapon("catalyst", oasis, fungal_nucleus, spores, 4),
    "Waster Greatsword": new weapon("claymore", wolf, ley_line, slime, 1),
    "Wavebreaker's Fin": new weapon("polearm", mask, concealed, handguard, 4),
    "White Iron Greatsword": new weapon("claymore", dandelion, chaos_circuit, slime, 3),
    "White Tassel": new weapon("polearm", guyun, knife, insignia_fatui, 3),
    "Whiteblind": new weapon("claymore", guyun, knife, insignia_hoarder, 4),
    "Windblume Ode": new weapon("bow", dandelion, ley_line, nectar, 4),
    "Wine and Song": new weapon("catalyst", wolf, ley_line, insignia_hoarder, 4),
    "Wolf's Gravestone": new weapon("claymore", dandelion, chaos_circuit, scroll, 5),
    "Xiphos' Moonlight": new weapon("sword", talisman, prism_robot, headband, 4)
}

let defNames = {
    "sword": "Dull Blade",
    "claymore": "Waster Greatsword",
    "bow": "Hunter's Bow",
    "catalyst": "Apprentice's Notes",
    "polearm": "Beginner's Protector"
}

export { weapons, defNames };