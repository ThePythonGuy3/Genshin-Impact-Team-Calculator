import { enemyDrop, gem, gemPrefixes } from './materials.mjs';
import { characterAscensionMaterialsAmount } from "./misc.mjs";

let character = class {
    constructor(weaponType, enemyDropV, localMateiral, gemType, bossDrop, element, stars, alias) {
        this.weaponType = weaponType;
        this.enemyDrop = enemyDropV;
        this.localMaterial = localMaterial;
        this.gemType = gemType;
        this.bossDrop = bossDrop;
        this.element = element;
        this.stars = stars;
        this.alias = alias;
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
    "Albedo": new character("sword", scroll, "Cecilia", prithiva, "Basalt Pillar", geo, 5),
    "Aloy": new character("bow", spectral, "Crystal Marrow", shivada, "Crystalline Bloom", cryo, 5),
    "Amber": new character("bow", arrowhead, "Small Lamp Grass", agnidus, "Everflame Seed", pyro, 4, "Ambor"),
    "Arataki Itto": new character("claymore", slime, "Onikabuto", prithiva, "Riftborn Regalia", geo, 5, "Itto"),
    "Barbara": new character("catalyst", scroll, "Philanemo Mushroom", varunada, "Cleansing Heart", hydro, 4),
    "Beidou": new character("claymore", insignia_hoarder, "Noctilucous Jade", vajrada, "Lightning Prism", electro, 4),
    "Bennett": new character("sword", insignia_hoarder, "Windwheel Aster", agnidus, "Everflame Seed", pyro, 4),
    "Candace": new character("polearm", headband, "Henna Berry", varunada, "Light Guiding Tetrahedron", hydro, 4),
    "Chongyun": new character("claymore", mask_boko, "Cor Lapis", shivada, "Hoarfrost Core", cryo, 4),
    "Collei": new character("bow", arrowhead, "Rukkhashava Mushrooms", nagadus, "Majestic Hooked Beak", dendro, 4),
    "Cyno": new character("polearm", scroll, "Scarab", vajrada, "Thunderclap Fruitcore", electro, 5),
    "Diluc": new character("claymore", insignia_fatui, "Small Lamp Grass", agnidus, "Everflame Seed", pyro, 5),
    "Diona": new character("catalyst", arrowhead, "Calla Lily", shivada, "Hoarfrost Core", cryo, 4),
    "Dori": new character("claymore", headband, "Kalpalata Lotus", vajrada, "Thunderclap Fruitcore", electro, 5),
    "Eula": new character("claymore", mask_boko, "Dandelion Seed", shivada, "Crystalline Bloom", cryo, 5),
    "Faruzan": new character("bow", headband, "Henna Berry", vayuda, "Light Guiding Tetrahedron", anemo, 4),
    "Fischl": new character("bow", arrowhead, "Small Lamp Grass", vajrada, "Lightning Prism", electro, 4),
    "Ganyu": new character("bow", nectar, "Qingxin", shivada, "Hoarfrost Core", cryo, 5),
    "Gorou": new character("bow", spectral, "Sango Pearl", prithiva, "Perpetual Heart", geo, 4),
    "Hu Tao": new character("polearm", nectar, "Silk Flower", agnidus, "Juvenile Jade", pyro, 5, "Hutao"),
    "Jean": new character("sword", mask_boko, "Dandelion Seed", vayuda, "Hurricane Seed", anemo, 5, "Qin"),
    "Kaedehara Kazuha": new character("sword", insignia_hoarder, "Sea Ganoderma", vayuda, "Marionette Core", anemo, 5, "Kazuha"),
    "Kaeya": new character("sword", insignia_hoarder, "Calla Lily", shivada, "Hoarfrost Core", cryo, 4),
    "Kamisato Ayaka": new character("sword", handguard, "Sakura Bloom", shivada, "Perpetual Heart", cryo, 5, "Ayaka"),
    "Kamisato Ayato": new character("sword", handguard, "Sakura Bloom", varunada, "Dew of Repudiation", hydro, 5, "Ayato"),
    "Keqing": new character("sword", nectar, "Cor Lapis", vajrada, "Lightning Prism", electro, 5),
    "Klee": new character("catalyst", scroll, "Philanemo Mushroom", agnidus, "Everflame Seed", pyro, 5),
    "Kuki Shinobu": new character("sword", spectral, "Naku Weed", vajrada, "Runic Fang", electro, 4, "Shinobu"),
    "Kujou Sara": new character("bow", mask_boko, "Dendrobium", vajrada, "Storm Beads", electro, 4, "Sara"),
    "Layla": new character("sword", scroll, "Nilotpala Lotus", shivada, "Perpetual Caliber", cryo, 4),
    "Lisa": new character("catalyst", slime, "Valberry", vajrada, "Lightning Prism", electro, 4),
    "Mona": new character("catalyst", nectar, "Philanemo Mushroom", varunada, "Cleansing Heart", hydro, 5),
    "Nahida": new character("catalyst", spores, "Kalpalata Lotus", nagadus, "Quelled Creeper", dendro, 5),
    "Nilou": new character("sword", spores, "Padisarah", varunada, "Perpetual Caliber", hydro, 5),
    "Ningguang": new character("catalyst", insignia_fatui, "Glaze Lily", prithiva, "Basalt Pillar", geo, 4),
    "Noelle": new character("claymore", mask_boko, "Valberry", prithiva, "Basalt Pillar", geo, 4, "Noel"),
    "Qiqi": new character("sword", scroll, "Violetgrass", shivada, "Hoarfrost", cryo, 5),
    "Raiden Shogun": new character("polearm", handguard, "Amakumo Fruit", vajrada, "Storm Beads", electro, 5, "Shougun"),
    "Razor": new character("claymore", mask_boko, "Wolfhook", vajrada, "Lightning Prism", electro, 4),
    "Rosaria": new character("polearm", insignia_fatui, "Valberry", shivada, "Hoarfrost Core", cryo, 4),
    "Sangonomiya Kokomi": new character("catalyst", spectral, "Sango Pearl", varunada, "Dew of Repudiation", hydro, 5, "Kokomi"),
    "Sayu": new character("claymore", nectar, "Crystal Marrow", vayuda, "Marionette Core", anemo, 4),
    "Shenhe": new character("polearm", nectar, "Qingxin", shivada, "Dragonheir's False Fin", cryo, 5),
    "Shikanoin Heizou": new character("catalyst", insignia_hoarder, "Onikabuto", vayuda, "Runic Fang", anemo, 4, "Heizo"),
    "Sucrose": new character("catalyst", nectar, "Windwheel Aster", vayuda, "Hurricane Seed", anemo, 4),
    "Tartaglia": new character("bow", insignia_fatui, "Starconch", varunada, "Cleansing Heart", hydro, 5),
    "Thoma": new character("polearm", insignia_hoarder, "Fluorescent Fungus", agnidus, "Smoldering Pearl", pyro, 4, "Tohma"),
    "Tighnari": new character("bow", spores, "Nilotpala Lotus", nagadus, "Majestic Hooked Beak", dendro, 5),
    "Traveler": new character("sword", mask_boko, "Windwheel Aster", brilliant, null, null, 5),
    "Venti": new character("bow", slime, "Cecilia", vayuda, "Hurricane Seed", anemo, 5),
    "Wanderer": new character("catalyst", handguard, "Rukkhashava Mushrooms", vayuda, "Perpetual Caliber", anemo, 5),
    "Xiangling": new character("polearm", slime, "Jueyun Chili", agnidus, "Everflame Seed", pyro, 4),
    "Xiao": new character("polearm", slime, "Qingxin", vayuda, "Juvenile Jade", anemo, 5),
    "Xingqiu": new character("sword", mask_boko, "Silk Flower", varunada, "Cleansing Heart", hydro, 4),
    "Xinyan": new character("claymore", insignia_hoarder, "Violetgrass", agnidus, "Everflame Seed", pyro, 4),
    "Yae Miko": new character("catalyst", handguard, "Sea Ganoderma", vajrada, "Dragonheir's False Fin", electro, 5, "Yae"),
    "Yanfei": new character("catalyst", insignia_hoarder, "Noctilucous Jade", agnidus, "Juvenile Jade", pyro, 4, "Feiyan"),
    "Yelan": new character("bow", insignia_fatui, "Starconch", varunada, "Runic Fang", hydro, 5),
    "Yoimiya": new character("bow", scroll, "Naku Weed", agnidus, "Smoldering Pearl", pyro, 5),
    "Yun Jin": new character("polearm", mask_boko, "Glaze Lily", prithiva, "Riftborn Regalia", geo, 4, "Yunjin"),
    "Zhongli": new character("polearm", slime, "Cor Lapis", prithiva, "Basalt Pillar", geo, 5)
}

export { characters };