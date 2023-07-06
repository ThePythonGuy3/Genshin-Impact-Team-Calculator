import { enemyDrop, gem, gemPrefixes } from './materials.mjs';
import { characterAscensionMaterialsAmount, elementColor } from "./misc.mjs";

let character = class {
    constructor(weaponType, enemyDropV, localMaterial, gemType, bossDrop, element, stars) {
        this.weaponType = weaponType;
        this.enemyDrop = enemyDropV;
        this.localMaterial = localMaterial;
        this.gemType = gemType;
        this.bossDrop = bossDrop;
        this.element = element;
        this.stars = stars;
    }

    getDrop = function (stage) {
        let enemyDropRow = characterAscensionMaterialsAmount[0][stage];
        let enemyDrop_ = [this.enemyDrop[enemyDropRow[0] - 1], enemyDropRow[1]];

        let localMaterial = [this.localMaterial, characterAscensionMaterialsAmount[1][stage]];

        let gemTypeRow = characterAscensionMaterialsAmount[2][stage];
        let gemType = [this.gemType + " " + gemPrefixes[gemTypeRow[0] - 1], gemTypeRow[1]];

        if (this.bossDrop != null) {
            let bossDrop = [this.bossDrop, characterAscensionMaterialsAmount[3][stage]];
            return [enemyDrop_, localMaterial, gemType, bossDrop];
        }

        return [enemyDrop_, localMaterial, gemType];
    }
}

let characters = {
    "Albedo": new character("sword", enemyDrop("scroll"), "Cecilia", gem("prithiva"), "Basalt Pillar", elementColor("geo"), 5),
    "Alhaitham": new character("sword", enemyDrop("headband"), "Sand Grease Pupa", gem("nagadus"), "Pseudo-Stamens", elementColor("dendro"), 5),
    "Aloy": new character("bow", enemyDrop("spectral"), "Crystal Marrow", gem("shivada"), "Crystalline Bloom", elementColor("cryo"), 5),
    "Amber": new character("bow", enemyDrop("arrowhead"), "Small Lamp Grass", gem("agnidus"), "Everflame Seed", elementColor("pyro"), 4),
    "Arataki Itto": new character("claymore", enemyDrop("slime"), "Onikabuto", gem("prithiva"), "Riftborn Regalia", elementColor("geo"), 5),
    "Baizhu": new character("catalyst", enemyDrop("spores"), "Violetgrass", gem("nagadus"), "Evergloom Ring", elementColor("dendro"), 5),
    "Barbara": new character("catalyst", enemyDrop("scroll"), "Philanemo Mushroom", gem("varunada"), "Cleansing Heart", elementColor("hydro"), 4),
    "Beidou": new character("claymore", enemyDrop("insignia_hoarder"), "Noctilucous Jade", gem("vajrada"), "Lightning Prism", elementColor("electro"), 4),
    "Bennett": new character("sword", enemyDrop("insignia_hoarder"), "Windwheel Aster", gem("agnidus"), "Everflame Seed", elementColor("pyro"), 4),
    "Candace": new character("polearm", enemyDrop("headband"), "Henna Berry", gem("varunada"), "Light Guiding Tetrahedron", elementColor("hydro"), 4),
    "Chongyun": new character("claymore", enemyDrop("mask_boko"), "Cor Lapis", gem("shivada"), "Hoarfrost Core", elementColor("cryo"), 4),
    "Collei": new character("bow", enemyDrop("arrowhead"), "Rukkhashava Mushrooms", gem("nagadus"), "Majestic Hooked Beak", elementColor("dendro"), 4),
    "Cyno": new character("polearm", enemyDrop("scroll"), "Scarab", gem("vajrada"), "Thunderclap Fruitcore", elementColor("electro"), 5),
    "Dehya": new character("claymore", enemyDrop("headband"), "Sand Grease Pupa", gem("agnidus"), "Light Guiding Tetrahedron", elementColor("pyro"), 5),
    "Diluc": new character("claymore", enemyDrop("insignia_fatui"), "Small Lamp Grass", gem("agnidus"), "Everflame Seed", elementColor("pyro"), 5),
    "Diona": new character("catalyst", enemyDrop("arrowhead"), "Calla Lily", gem("shivada"), "Hoarfrost Core", elementColor("cryo"), 4),
    "Dori": new character("claymore", enemyDrop("headband"), "Kalpalata Lotus", gem("vajrada"), "Thunderclap Fruitcore", elementColor("electro"), 5),
    "Eula": new character("claymore", enemyDrop("mask_boko"), "Dandelion Seed", gem("shivada"), "Crystalline Bloom", elementColor("cryo"), 5),
    "Faruzan": new character("bow", enemyDrop("headband"), "Henna Berry", gem("vayuda"), "Light Guiding Tetrahedron", elementColor("anemo"), 4),
    "Fischl": new character("bow", enemyDrop("arrowhead"), "Small Lamp Grass", gem("vajrada"), "Lightning Prism", elementColor("electro"), 4),
    "Ganyu": new character("bow", enemyDrop("nectar"), "Qingxin", gem("shivada"), "Hoarfrost Core", elementColor("cryo"), 5),
    "Gorou": new character("bow", enemyDrop("spectral"), "Sango Pearl", gem("prithiva"), "Perpetual Heart", elementColor("geo"), 4),
    "Hu Tao": new character("polearm", enemyDrop("nectar"), "Silk Flower", gem("agnidus"), "Juvenile Jade", elementColor("pyro"), 5),
    "Jean": new character("sword", enemyDrop("mask_boko"), "Dandelion Seed", gem("vayuda"), "Hurricane Seed", elementColor("anemo"), 5),
    "Kaedehara Kazuha": new character("sword", enemyDrop("insignia_hoarder"), "Sea Ganoderma", gem("vayuda"), "Marionette Core", elementColor("anemo"), 5),
    "Kaeya": new character("sword", enemyDrop("insignia_hoarder"), "Calla Lily", gem("shivada"), "Hoarfrost Core", elementColor("cryo"), 4),
    "Kaveh": new character("claymore", enemyDrop("spores"), "Mourning Flower", gem("nagadus"), "Quelled Creeper", elementColor("dendro"), 5),
    "Kamisato Ayaka": new character("sword", enemyDrop("handguard"), "Sakura Bloom", gem("shivada"), "Perpetual Heart", elementColor("cryo"), 5),
    "Kamisato Ayato": new character("sword", enemyDrop("handguard"), "Sakura Bloom", gem("varunada"), "Dew of Repudiation", elementColor("hydro"), 5),
    "Keqing": new character("sword", enemyDrop("nectar"), "Cor Lapis", gem("vajrada"), "Lightning Prism", elementColor("electro"), 5),
    "Kirara": new character("sword", enemyDrop("spectral"), "Amakumo Fruit", gem("nagadus"), "Evergloom Ring", elementColor("dendro"), 4),
    "Klee": new character("catalyst", enemyDrop("scroll"), "Philanemo Mushroom", gem("agnidus"), "Everflame Seed", elementColor("pyro"), 5),
    "Kuki Shinobu": new character("sword", enemyDrop("spectral"), "Naku Weed", gem("vajrada"), "Runic Fang", elementColor("electro"), 4),
    "Kujou Sara": new character("bow", enemyDrop("mask_boko"), "Dendrobium", gem("vajrada"), "Storm Beads", elementColor("electro"), 4),
    "Layla": new character("sword", enemyDrop("scroll"), "Nilotpala Lotus", gem("shivada"), "Perpetual Caliber", elementColor("cryo"), 4),
    "Lisa": new character("catalyst", enemyDrop("slime"), "Valberry", gem("vajrada"), "Lightning Prism", elementColor("electro"), 4),
    "Mona": new character("catalyst", enemyDrop("nectar"), "Philanemo Mushroom", gem("varunada"), "Cleansing Heart", elementColor("hydro"), 5),
    "Mika": new character("polearm", enemyDrop("insignia_fatui"), "Wolfhook", gem("shivada"), "Pseudo-Stamens", elementColor("anemo"), 4),
    "Nahida": new character("catalyst", enemyDrop("spores"), "Kalpalata Lotus", gem("nagadus"), "Quelled Creeper", elementColor("dendro"), 5),
    "Nilou": new character("sword", enemyDrop("spores"), "Padisarah", gem("varunada"), "Perpetual Caliber", elementColor("hydro"), 5),
    "Ningguang": new character("catalyst", enemyDrop("insignia_fatui"), "Glaze Lily", gem("prithiva"), "Basalt Pillar", elementColor("geo"), 4),
    "Noelle": new character("claymore", enemyDrop("mask_boko"), "Valberry", gem("prithiva"), "Basalt Pillar", elementColor("geo"), 4),
    "Qiqi": new character("sword", enemyDrop("scroll"), "Violetgrass", gem("shivada"), "Hoarfrost", elementColor("cryo"), 5),
    "Raiden Shogun": new character("polearm", enemyDrop("handguard"), "Amakumo Fruit", gem("vajrada"), "Storm Beads", elementColor("electro"), 5),
    "Razor": new character("claymore", enemyDrop("mask_boko"), "Wolfhook", gem("vajrada"), "Lightning Prism", elementColor("electro"), 4),
    "Rosaria": new character("polearm", enemyDrop("insignia_fatui"), "Valberry", gem("shivada"), "Hoarfrost Core", elementColor("cryo"), 4),
    "Sangonomiya Kokomi": new character("catalyst", enemyDrop("spectral"), "Sango Pearl", gem("varunada"), "Dew of Repudiation", elementColor("hydro"), 5),
    "Sayu": new character("claymore", enemyDrop("nectar"), "Crystal Marrow", gem("vayuda"), "Marionette Core", elementColor("anemo"), 4),
    "Shenhe": new character("polearm", enemyDrop("nectar"), "Qingxin", gem("shivada"), "Dragonheir's False Fin", elementColor("cryo"), 5),
    "Shikanoin Heizou": new character("catalyst", enemyDrop("insignia_hoarder"), "Onikabuto", gem("vayuda"), "Runic Fang", elementColor("anemo"), 4),
    "Sucrose": new character("catalyst", enemyDrop("nectar"), "Windwheel Aster", gem("vayuda"), "Hurricane Seed", elementColor("anemo"), 4),
    "Tartaglia": new character("bow", enemyDrop("insignia_fatui"), "Starconch", gem("varunada"), "Cleansing Heart", elementColor("hydro"), 5),
    "Thoma": new character("polearm", enemyDrop("insignia_hoarder"), "Fluorescent Fungus", gem("agnidus"), "Smoldering Pearl", elementColor("pyro"), 4),
    "Tighnari": new character("bow", enemyDrop("spores"), "Nilotpala Lotus", gem("nagadus"), "Majestic Hooked Beak", elementColor("dendro"), 5),
    "Traveler": new character("sword", enemyDrop("mask_boko"), "Windwheel Aster", gem("brilliant"), null, null, 5),
    "Venti": new character("bow", enemyDrop("slime"), "Cecilia", gem("vayuda"), "Hurricane Seed", elementColor("anemo"), 5),
    "Wanderer": new character("catalyst", enemyDrop("handguard"), "Rukkhashava Mushrooms", gem("vayuda"), "Perpetual Caliber", elementColor("anemo"), 5),
    "Xiangling": new character("polearm", enemyDrop("slime"), "Jueyun Chili", gem("agnidus"), "Everflame Seed", elementColor("pyro"), 4),
    "Xiao": new character("polearm", enemyDrop("slime"), "Qingxin", gem("vayuda"), "Juvenile Jade", elementColor("anemo"), 5),
    "Xingqiu": new character("sword", enemyDrop("mask_boko"), "Silk Flower", gem("varunada"), "Cleansing Heart", elementColor("hydro"), 4),
    "Xinyan": new character("claymore", enemyDrop("insignia_hoarder"), "Violetgrass", gem("agnidus"), "Everflame Seed", elementColor("pyro"), 4),
    "Yae Miko": new character("catalyst", enemyDrop("handguard"), "Sea Ganoderma", gem("vajrada"), "Dragonheir's False Fin", elementColor("electro"), 5),
    "Yanfei": new character("catalyst", enemyDrop("insignia_hoarder"), "Noctilucous Jade", gem("agnidus"), "Juvenile Jade", elementColor("pyro"), 4),
    "Yaoyao": new character("polearm", enemyDrop("slime"), "Jueyun Chili", gem("nagadus"), "Quelled Creeper", elementColor("dendro"), 4),
    "Yelan": new character("bow", enemyDrop("insignia_fatui"), "Starconch", gem("varunada"), "Runic Fang", elementColor("hydro"), 5),
    "Yoimiya": new character("bow", enemyDrop("scroll"), "Naku Weed", gem("agnidus"), "Smoldering Pearl", elementColor("pyro"), 5),
    "Yun Jin": new character("polearm", enemyDrop("mask_boko"), "Glaze Lily", gem("prithiva"), "Riftborn Regalia", elementColor("geo"), 4),
    "Zhongli": new character("polearm", enemyDrop("slime"), "Cor Lapis", gem("prithiva"), "Basalt Pillar", elementColor("geo"), 5)
}

export { characters };