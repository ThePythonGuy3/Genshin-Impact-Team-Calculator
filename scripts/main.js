let character = class {
    constructor(weapon, enemy, local, gems, boss, element, stars, alias) {
        this.weapon = weapon;
        this.enemy = enemy;
        this.local = local;
        this.gems = gems;
        this.boss = boss;
        this.element = element;
        this.stars = stars;
        this.alias = alias;
    }

    getDrop = function (stage) {
        let e_d = char_mat_amount[0][stage];
        let e_d_t = [this.enemy[e_d[0] - 1], e_d[1]];
        let l_d = [this.local, char_mat_amount[1][stage]];
        let g = char_mat_amount[2][stage];
        let g_t = [this.gems + " " + prefixes[g[0] - 1], g[1]];
        if (this.boss != null) {
            let b_d = [this.boss, char_mat_amount[3][stage]];
            return [e_d_t, l_d, g_t, b_d];
        }

        return [e_d_t, l_d, g_t];
    }
}

let weapon = class {
    constructor(typ, one, two, domain, stars) {
        this.typ = typ
        this.one = one;
        this.two = two;
        this.domain = domain;
        this.stars = stars;
    }

    getDrop = function (stage) {
        let table = weap_mat_amount[this.stars - 1];
        let o = table[0][stage];
        let o_t = [this.one[o[0] - 1], o[1]];
        let t = table[1][stage];
        let t_t = [this.two[t[0] - 1], t[1]];
        let d = table[2][stage]
        let d_t = [this.domain[d[0] - 1], d[1]];

        return [o_t, t_t, d_t];
    }
}

let sort_list = ["Enemy Drops", "Local Items", "Gems", "Boss Drops"];
let weap_sort_list = ["Domain Materials", "Elite Enemy Drops", "Enemy Drops"];
let char_mat_amount = [
    [[1, 3], [1, 15], [2, 12], [2, 18], [3, 12], [3, 24]],    // Enemy Drops [tier, amount]
    [3, 10, 20, 30, 45, 60],                                  // Local Items
    [[1, 1], [2, 3], [2, 6], [3, 3], [3, 6], [4, 6]],         // Gems [tier, amount]
    [0, 2, 4, 8, 12, 20]                                      // Boss Drops
]; // char_mat_amount[mat_type][ascension_level]

let weap_mat_amount = [
    [ // 1 Star
        [[1, 1], [2, 1], [2, 2], [3, 1], [1, 0], [1, 0]],                      // Domain Material [tier, amount]
        [[1, 1], [1, 4], [2, 2], [2, 4], [1, 0], [1, 0]],                      // Material 2 [tier, amount]
        [[1, 1], [1, 2], [2, 2], [2, 3], [1, 0], [1, 0]]                       // Material 1 [tier, amount]
    ],
    [ // 2 Stars
        [[1, 1], [2, 1], [2, 3], [3, 1], [1, 0], [1, 0]],
        [[1, 1], [1, 5], [2, 3], [2, 5], [1, 0], [1, 0]],
        [[1, 1], [1, 4], [2, 3], [2, 4], [1, 0], [1, 0]]
    ],
    [ // 3 Stars
        [[1, 2], [2, 2], [2, 4], [3, 2], [3, 4], [4, 3]],
        [[1, 2], [1, 8], [2, 4], [2, 8], [3, 6], [3, 12]],
        [[1, 1], [1, 5], [2, 4], [2, 6], [3, 4], [3, 8]]
    ],
    [ // 4 Stars
        [[1, 3], [2, 3], [2, 6], [3, 3], [3, 6], [4, 4]],
        [[1, 3], [1, 12], [2, 6], [2, 12], [3, 9], [3, 18]],
        [[1, 2], [1, 8], [2, 6], [2, 9], [3, 6], [3, 12]]
    ],
    [ // 5 Stars
        [[1, 5], [2, 5], [2, 9], [3, 5], [3, 9], [4, 6]],
        [[1, 5], [1, 18], [2, 9], [2, 18], [3, 14], [3, 27]],
        [[1, 3], [1, 12], [2, 9], [2, 14], [3, 9], [3, 18]]
    ]
]; // weap_mat_amount[weap_stars][mat_type][ascension_level]

// Exp amount per book/crystal
let books_exp = [1000, 5000, 20000];

// Enemy Drops:
let knife = ["Hunter's Sacrificial Knife", "Agent's Sacrificial Knife", "Inspector's Sacrificial Knife"],
    horn = ["Heavy Horn", "Black Bronze Horn", "Black Crystal Horn"],
    chaos_axis = ["Chaos Gear", "Chaos Axis", "Chaos Oculus"],
    chaos_circuit = ["Chaos Device", "Chaos Circuit", "Chaos Core"],
    concealed = ["Concealed Claw", "Concealed Unguis", "Concealed Talon"],
    prism = ["Dismal Prism", "Crystal Prism", "Polarizing Prism"],
    mask_boko = ["Damaged Mask", "Stained Mask", "Ominous Mask"],
    ley_line = ["Dead Ley Line Branch", "Dead Ley Line Leaves", "Ley Line Sprout"],
    bone = ["Fragile Bone Shard", "Sturdy Bone Shard", "Fossilized Bone Shard"],
    handguard = ["Old Handguard", "Kageuchi Handguard", "Famed Handguard"],
    mist = ["Mist Grass Pollen", "Mist Grass", "Mist Grass Wick"],
    insignia_fatui = ["Recruit's Insignia", "Sergeant's Insignia", "Lieutenant's Insignia"],
    scroll = ["Divining Scroll", "Sealed Scroll", "Forbidden Curse Scroll"],
    nectar = ["Whopperflower Nectar", "Shimmering Nectar", "Energy Nectar"],
    arrowhead = ["Firm Arrowhead", "Sharp Arrowhead", "Weathered Arrowhead"],
    insignia_hoarder = ["Treasure Hoarder Insignia", "Silver Raven Insignia", "Golden Raven Insignia"],
    slime = ["Slime Condensate", "Slime Secretions", "Slime Concentrate"],
    spectral = ["Spectral Husk", "Spectral Heart", "Spectral Nucleus"],
    statuette = ["Gloomy Statuette", "Dark Statuette", "Deathly Statuette"],
    spores = ["Fungal Spores", "Luminescent Pollen", "Crystalline Cyst Dust"],
    headband = ["Faded Red Satin", "Trimmed Red Silk", "Rich Red Brocade"],
    fungal_nucleus = ["Inactivated Fungal Nucleus", "Dormant Fungal Nucleus", "Robust Fungal Nucleus"],
    chaos_storage = ["Chaos Storage", "Chaos Module", "Chaos Bolt"],
    prism_robot = ["Damaged Prism", "Turbid Prism", "Radiant Prism"];

// Domain Materials:
let aerosiderite = ["Grain of Aerosiderite", "Piece of Aerosiderite", "Bit of Aerosiderite", "Chunk of Aerosiderite"],
    wolf = ["Boreal Wolf's Milk Tooth", "Boreal Wolf's Cracked Tooth", "Boreal Wolf's Broken Fang", "Boreal Wolf's Nostalgia"],
    dandelion = ["Fetters of the Dandelion Gladiator", "Chains of the Dandelion Gladiator", "Shackles of the Dandelion Gladiator", "Dream of the Dandelion Gladiator"],
    coral = ["Coral Branch of a Distant Sea", "Jeweled Branch of a Distant Sea", "Jade Branch of a Distant Sea", "Golden Branch of a Distant Sea"],
    decarabian = ["Tile of Decarabian's Tower", "Debris of Decarabian's City", "Fragment of Decarabian's Epic", "Scattered Piece of Decarabian's Dream"],
    guyun = ["Luminous Sands from Guyun", "Lustrous Stone from Guyun", "Relic from Guyun", "Divine Body from Guyun"],
    mask = ["Mask of the Wicked Lieutenant", "Mask of the Tiger's Bite", "Mask of the One-Horned", "Mask of the Kijin"],
    mist_veiled = ["Mist Veiled Lead Elixir", "Mist Veiled Mercury Elixir", "Mist Veiled Gold Elixir", "Mist Veiled Primo Elixir"],
    narukami = ["Narukami's Wisdom", "Narukami's Joy", "Narukami's Affection", "Narukami's Valor"],
    talisman = ["Copper Talisman of the Forest Dew", "Iron Talisman of the Forest Dew", "Silver Talisman of the Forest Dew", "Golden Talisman of the Forest Dew"],
    oasis = ["Oasis Garden's Reminiscence", "Oasis Garden's Kindness", "Oasis Garden's Mourning", "Oasis Garden's Truth"],
    scorching = ["Echo of Scorching Might", "Remnant Glow of Scorching Might", "Dream of Scorching Might", "Olden Days of Scorching Might"];

// Gems:
let prefixes = ["Sliver", "Fragment", "Chunk", "Gemstone"];
let agnidus = "Agnidus Agate",
    brilliant = "Brilliant Diamond",
    prithiva = "Prithiva Topaz",
    shivada = "Shivada Jade",
    vajrada = "Vajrada Amethyst",
    varunada = "Varunada Lazurite",
    vayuda = "Vayuda Turquoise",
    nagadus = "Nagadus Emerald";

// Element colors
let anemo = ["68F0BC", "09D2B8"],
    electro = ["BC5EFF", "8B0168"],
    geo = ["FBE284", "FEA336"],
    pyro = ["FD8248", "FD0138"],
    hydro = ["7BD3E2", "0399D4"],
    cryo = ["95B9F3", "608CF1"],
    dendro = ["bbd95f", "a5c83b"];

let st = [
    ["888f98", "717b85"],
    ["758f84", "578067"],
    ["7797ac", "4f869e"],
    ["a18cb8", "9774b2"],
    ["ba9b75", "b98c50"]
];

let level_exp = [1000, 1325, 1700, 2150, 2625, 3150, 3725, 4350, 5000, 5700, 6450, 7225, 8050, 8925, 9825, 10750, 11725, 12725, 13775, 14875, 16800, 18000, 19250, 20550, 21875, 23250, 24650, 26100, 27575, 29100, 30650, 32250, 33875, 35550, 37250, 38975, 40750, 42575, 44425, 46300, 50625, 52700, 54775, 56900, 59075, 61275, 63525, 65800, 68125, 70475, 76500, 79050, 81650, 84275, 86950, 89650, 92400, 95175, 98000, 100875, 108950, 112050, 115175, 118325, 121525, 124775, 128075, 131400, 134775, 138175, 148700, 152375, 156075, 159825, 163600, 167425, 171300, 175225, 179175, 183175, 216225, 243025, 273100, 306800, 344600, 386950, 434425, 487625, 547200]

let characters = {
    "Albedo": new character("sword", scroll, "Cecilia", prithiva, "Basalt Pillar", geo, 5),
    "Aloy": new character("bow", spectral, "Crystal Marrow", shivada, "Crystalline Bloom", cryo, 5),
    "Amber": new character("bow", arrowhead, "Small Lamp Grass", agnidus, "Everflame Seed", pyro, 4, "Ambor"),
    "Arataki Itto": new character("claymore", slime, "Onikabuto", prithiva, "Riftborn Regalia", geo, 5, "Itto"),
    "Barbara": new character("catalyst", scroll, "Philanemo Mushroom", varunada, "Cleansing Heart", hydro, 4),
    "Beidou": new character("claymore", insignia_hoarder, "Noctilucous Jade", vajrada, "Lightning Prism", electro, 4),
    "Bennett": new character("sword", insignia_hoarder, "Windwheel Aster", agnidus, "Everflame Seed", pyro, 4),
    "Candace": new character("polearm", headband, "Redcrest", varunada, "Light Guiding Tetrahedron", hydro, 4),
    "Chongyun": new character("claymore", mask_boko, "Cor Lapis", shivada, "Hoarfrost Core", cryo, 4),
    "Collei": new character("bow", arrowhead, "Rukkhashava Mushrooms", nagadus, "Majestic Hooked Beak", dendro, 4),
    "Cyno": new character("polearm", scroll, "Scarab", vajrada, "Thunderclap Fruitcore", electro, 5),
    "Diluc": new character("claymore", insignia_fatui, "Small Lamp Grass", agnidus, "Everflame Seed", pyro, 5),
    "Diona": new character("catalyst", arrowhead, "Calla Lily", shivada, "Hoarfrost Core", cryo, 4),
    "Dori": new character("claymore", headband, "Kalpalata Lotus", vajrada, "Thunderclap Fruitcore", electro, 5),
    "Eula": new character("claymore", mask_boko, "Dandelion Seed", shivada, "Crystalline Bloom", cryo, 5),
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

let defWeapons = {};

for(const [el, val] of Object.entries(defNames)) {
    defWeapons[el] = weapons[val];
}

let team = 0,
    currentTeam = [null, null, null, null],
    currentLevel = [1, 1, 1, 1],
    ascensions = [false, false, false, false],
    ascensionTeam = false,
    targetLevel = 20,

    weaponChoice = 0,
    currentWeapons = [weapons["Dull Blade"], weapons["Dull Blade"], weapons["Dull Blade"], weapons["Dull Blade"]],
    currentWeaponLevel = [1, 1, 1, 1],
    currentWeaponTargetLevel = [1, 1, 1, 1],
    currentWeaponAscensions = [false, false, false, false],
    currentWeaponTargetAscensions = [false, false, false, false],

    text = "";

function swapMode(root, nightCheck) {
    root.style.setProperty("--lighterGray", !nightCheck.checked ? "#F0F0F0" : "#0F0F0F");
    root.style.setProperty("--lightGray", !nightCheck.checked ? "#E0E0E0" : "#1F1F1F");
    root.style.setProperty("--gray", !nightCheck.checked ? "#E0E0E0" : "#2F2F2F");
    root.style.setProperty("--darkGray", !nightCheck.checked ? "#C0C0C0" : "#3F3F3F");
    root.style.setProperty("--darkerGray", !nightCheck.checked ? "#B0B0B0" : "#4F4F4F");

    root.style.setProperty("--cinnamon", !nightCheck.checked ? "#F2EEE6" : "#0F0F0F");
    root.style.setProperty("--darkCinnamon", !nightCheck.checked ? "#CCBAAD" : "#2F2F2F");
    root.style.setProperty("--darkerCinnamon", !nightCheck.checked ? "#9C8270" : "#4F4F4F");

    root.style.setProperty("--lvInput", !nightCheck.checked ? "#FEFEFE" : "#1F1F1F");
    root.style.setProperty("--weapLvInput", !nightCheck.checked ? "#FEFEFE" : "#3F3F3F");
    root.style.setProperty("--wpInput", !nightCheck.checked ? "#FEFEFE" : "#0F0F0F");

    root.style.setProperty("--ae", !nightCheck.checked ? "#AEAEAE" : "#515151");
    root.style.setProperty("--be", !nightCheck.checked ? "#BEBEBE" : "#414141");
    root.style.setProperty("--ce", !nightCheck.checked ? "#CECECE" : "#313131");
    root.style.setProperty("--de", !nightCheck.checked ? "#DEDEDE" : "#212121");
    root.style.setProperty("--ee", !nightCheck.checked ? "#EEEEEE" : "#111111");
    root.style.setProperty("--fe", !nightCheck.checked ? "#FEFEFE" : "#010101");

    root.style.setProperty("--bg", !nightCheck.checked ? "#FBFAFF" : "#040500");

    root.style.setProperty("--dark", !nightCheck.checked ? "#505050" : "#AFAFAF");
    root.style.setProperty("--black", !nightCheck.checked ? "#303030" : "#CFCFCF");
    root.style.setProperty("--blackest", !nightCheck.checked ? "#020202" : "#FDFDFD");

    root.style.setProperty("--sliderBG", !nightCheck.checked ? "#F5F5F5" : "#0A0A0A");
    root.style.setProperty("--sliderHandle", !nightCheck.checked ? "#9F9F9F" : "#606060");

    root.style.setProperty("--teamCardHover", !nightCheck.checked ? "#C8C8C8" : "#373737");
    root.style.setProperty("--teamCardActive", !nightCheck.checked ? "#B8B8B8" : "#474747");

    root.style.setProperty("--removeHover", !nightCheck.checked ? "#E22525" : "#1DDADA");
    root.style.setProperty("--removeActive", !nightCheck.checked ? "#D62525" : "#29DADA");

    root.style.setProperty("--materialColor", !nightCheck.checked ? "#917764" : "#BABABA");
    root.style.setProperty("--materialTitleColor", !nightCheck.checked ? "#7D624D" : "#CFCFCF");
}

function getTier(target) {
    if (target <= 40) {
        return Math.floor(target / 20);
    } else if (target < 90) {
        return Math.floor((target - 40) / 10) + 2;
    } else {
        return 6;
    }
}

function addMaterialElement(parent, data) {
    let pp = document.createElement("p");
    pp.className = "material";
    pp.innerHTML = data;

    parent.appendChild(pp);
}

function addMaterialTag(parent, material, pp, amount) {
    let contDiv = document.createElement("div");
    contDiv.className = "materialGlobCont";

    let imm = document.createElement("div");
    imm.className = "materialImageCont";

    let imm2 = document.createElement("img");
    imm2.className = "materialImage";
    imm2.src = "resources/materials/" + material.replaceAll(" ", "_") + ".png";

    let pp2 = document.createElement("p");
    pp2.className = "material floatRight";
    pp2.innerHTML = "x" + amount;

    imm.appendChild(imm2);
    contDiv.appendChild(imm);
    contDiv.appendChild(pp);
    contDiv.appendChild(pp2);

    let contContDiv = document.createElement("div");
    contContDiv.className = "materialGlobContCont";

    contContDiv.appendChild(contDiv);

    parent.appendChild(contContDiv);
}

function rgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function hex(r, g, b) {
    if(r > 255) r = 255;
    if(g > 255) g = 255;
    if(b > 255) b = 255;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function textWidth(text, fontProp) {
    var tag = document.createElement('div')
    tag.style.position = 'absolute'
    tag.style.left = '-99in'
    tag.style.whiteSpace = 'nowrap'
    tag.style.font = fontProp
    tag.innerHTML = text

    document.body.appendChild(tag)
    var result = tag.clientWidth
    document.body.removeChild(tag)
    return result;
}


function isAscension(level) {
    return level == 20 || level == 40 || level == 50 || level == 60 || level == 70 || level == 80;
}

window.onload = function () {
    document.getElementById("error").style.display = "none";

    let root = document.querySelector(":root");
    let nightCheck = document.getElementById("nightCheck");

    let asc = document.getElementById("teamAscension");
    let scrollpane = document.getElementById("scroll");
    let weapScrollpane = document.getElementById("weapScroll");
    let charFind = document.getElementById("charFind");
    let weapFind = document.getElementById("weapFind");
    let trg = document.getElementById("targetinput");
    let popup = document.getElementById("popup-cover");
    let calcBut = document.getElementById("calc");
    let downBut = document.getElementById("down");
    let downBut2 = document.getElementById("downBut");
    let downInp = document.getElementById("downinput");
    let cancBut = document.getElementById("cancBut");
    let matCont = document.getElementById("charmat");
    let weapMatCont = document.getElementById("weapmat");
    let teamcontcont = document.getElementById("teamcontcont");
    let weapAccept = document.getElementById("weapAccept");
    let weapCont = document.getElementById("weapcont");
    let weapPopup = document.getElementById("weap-popup-cover");
    let weapSelect = document.getElementById("weapSelect");
    let weapName = document.getElementById("weapName");
    let weapInput = document.getElementById("weapInput");
    let weapAscension = document.getElementById("weapAscension");
    let weapTarInput = document.getElementById("weapTarInput");
    let weapTarAscension = document.getElementById("weapTarAscension");

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        nightCheck.checked = true;
        swapMode(root, nightCheck);
    }

    nightCheck.onchange = () => {
        swapMode(root, nightCheck);
    }

    asc.addEventListener('change', (event) => {
        ascensionTeam = event.currentTarget.checked;
    });

    trg.addEventListener("input", () => {
        asc.disabled = true;
        asc.checked = false;
        if (trg.value.length > 2) {
            trg.value = trg.value.slice(0, 2);
        }

        if(isAscension(trg.value)) asc.disabled = false;

        targetLevel = trg.value;
    });

    trg.addEventListener("focusout", () => {
        if (trg.value == "" || trg.value == 0) trg.value = 1;
        if (trg.value > 90) trg.value = 90;
        targetLevel = trg.value;
    });

    for (const [el, val] of Object.entries(characters)) {
        let elem = document.createElement("div"); // Character namecard container
        let c = rgb(st[val.stars-1][0]);
        let c2 = rgb(st[val.stars-1][1]);
        cc = hex(c[0] + 50, c[1] + 50, c[2] + 50) + ", " + hex(c2[0] + 50, c2[1] + 50, c2[2] + 50);

        elem.style.backgroundImage = "linear-gradient(90deg, rgba(0,0,0,0) 80%, " + cc + ")";
        elem.className = "namecard";
        elem.tabIndex = 1;
        elem.onclick = function () {
            if (team != 0) {
                if (!currentTeam.includes(val)) {
                    let doc = document.getElementById("team" + team);
                    let self = event.currentTarget.children[0];

                    let selB = document.getElementById("sel" + team);
                    selB.disabled = true;
                    selB.checked = false;

                    doc.children[0].src = self.src;
                    doc.children[1].children[0].value = 1;
                    doc.children[3].src = "resources/" + val.weapon + ".png";

                    currentTeam[team - 1] = val;
                    currentLevel[team - 1] = 1;

                    if(currentWeapons[team - 1].typ != val.weapon){
                        currentWeapons[team - 1] = defWeapons[val.weapon];
                        document.getElementById("weapImg" + team).src = weapSelect.src = "./resources/weapons/" + defNames[val.weapon].replaceAll(" ", "_").replaceAll("\"", "") + ".png";
                        weapName.innerHTML = defNames[val.weapon];

                        currentWeaponLevel[team - 1] = 1;
                        currentWeaponTargetLevel[team - 1] = 1;
                        currentWeaponAscensions[team - 1] = false;
                        currentWeaponTargetAscensions[team - 1] = false;
                    }

                    if (team < 4 && currentTeam[team] == null) {
                        team++;
                        document.getElementById("team" + team).focus();
                    } else team = 0;
                } else document.getElementById("team" + team).focus();
            }
        }

        let img = document.createElement("img"); // Face image
        img.className = "image";

        if (val.alias == null) img.src = "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_" + el + ".png";
        else img.src = "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_" + val.alias + ".png";

        if (el=="Traveler") img.src = "./resources/traveler.png";

        let elem2 = document.createElement("p"); // Name
        elem2.className = "name";
        elem2.style.width = "100px";

        if(textWidth(el, "16px Genshin") > 100){
            elem2.style.marginTop = "8px";
        }

        elem2.innerHTML = el;

        if (val.element != null) {
            img.style.backgroundImage = "linear-gradient(0deg, #" + val.element[0] + ", #" + val.element[1] + ")";
        }

        elem.appendChild(img);
        elem.appendChild(elem2);

        let contDiv = document.createElement("div");
        contDiv.style.float = "right";
        contDiv.style.marginRight = "10px";

        for(let s = 0; s < val.stars; s++){
            let elem2 = document.createElement("img");
            elem2.className = "star";
            elem2.src = "./resources/star.png"
            contDiv.appendChild(elem2);
        }

        elem.appendChild(contDiv);

        scrollpane.appendChild(elem);
    }

    charFind.addEventListener("input", () => {
        let i = 0;
        for (const [el, val] of Object.entries(characters)) {
            if(el.toLowerCase().includes(charFind.value.toLowerCase())){
                scrollpane.children[i].style.display = "block";
            } else {
                scrollpane.children[i].style.display = "none";
            }
            i++;
        }
    });

    weapFind.addEventListener("input", () => {
        let i = 0;
        for (const [el, val] of Object.entries(weapons)) {
            let pla = currentTeam[weaponChoice - 1];
            if(!(pla != null && val.typ != pla.weapon) && el.toLowerCase().includes(weapFind.value.toLowerCase())){
                weapScrollpane.children[i].style.display = "block";
            } else {
                weapScrollpane.children[i].style.display = "none";
            }
            i++;
        }
    });

    for (const [el, val] of Object.entries(weapons)) {
        let elem = document.createElement("div"); // Character namecard container
        let c = rgb(st[val.stars-1][0]);
        let c2 = rgb(st[val.stars-1][1]);
        cc = hex(c[0] + 50, c[1] + 50, c[2] + 50) + ", " + hex(c2[0] + 50, c2[1] + 50, c2[2] + 50);

        elem.style.backgroundImage = "linear-gradient(90deg, rgba(0,0,0,0) 80%, " + cc + ")";
        elem.className = "namecard";
        elem.style.width = "330px";
        elem.tabIndex = 1;
        elem.onclick = function () {
            if (weaponChoice != 0) {
                currentWeapons[weaponChoice - 1] = val;

                document.getElementById("weapImg" + weaponChoice).src = weapSelect.src = "./resources/weapons/" + el.replaceAll(" ", "_").replaceAll("\"", "") + ".png";
                weapName.innerHTML = el;
            }
        }

        let img = document.createElement("img"); // Weapon image
        img.className = "image";

        img.src = "./resources/weapons/" + el.replaceAll(" ", "_").replaceAll("\"", "") + ".png";

        let elem2 = document.createElement("p"); // Name
        elem2.className = "weapname";
        elem2.style.width = "160px";
        elem2.style.marginTop = "14spx";
        if(textWidth(el, "16px Genshin") > 160){
            elem2.style.marginTop = "7px";
        }
        elem2.innerHTML = el;

        elem.appendChild(img);
        elem.appendChild(elem2);

        let contDiv = document.createElement("div");
        contDiv.style.float = "right";
        contDiv.style.marginRight = "10px";

        for(let s = 0; s < val.stars; s++){
            let elem2 = document.createElement("img");
            elem2.className = "star";
            elem2.src = "./resources/star.png"
            contDiv.appendChild(elem2);
        }

        elem.appendChild(contDiv);

        weapScrollpane.appendChild(elem);
    }

    for (let i = 1; i < 5; i++) {
        let teamcont = document.createElement("div");
        teamcont.id = "teamcont" + i;
        teamcont.className = "teamcont";

        let teamcard = document.createElement("div");
        teamcard.tabIndex = "1";
        teamcard.id = "team" + i;
        teamcard.className = "teamcard";

        teamcard.onclick = event => {
            team = i;
        }

        let im = document.createElement("img");
        im.src = "resources/plus.png";
        im.className = "teamimage";

        let pt = document.createElement("p");
        pt.className = "teamname";
        pt.innerHTML = "Lv.";

        let sel = document.createElement("input");
        sel.disabled = true;

        sel.addEventListener('change', (event) => {
            ascensions[i - 1] = event.currentTarget.checked;
        });

        let pti = document.createElement("input");
        pti.className = "levelinput";
        pti.id = "input" + i;
        pti.type = "number";
        pti.addEventListener("input", () => {
            sel.checked = false;
            sel.disabled = true;
            ascensions[i - 1] = false;

            if (pti.value.length > 2) {
                pti.value = pti.value.slice(0, 2);
            }

            if(isAscension(pti.value)) sel.disabled = false;

            currentLevel[i - 1] = pti.value;
        });

        pti.addEventListener("focus", () => {
            team = 0;
        });

        pti.addEventListener("focusout", () => {
            if (pti.value == "" || pti.value == 0) pti.value = 1;
            if (pti.value > 90) pti.value = 90;
            currentLevel[i - 1] = pti.value;
            team = 0;
        });

        pti.value = "0";

        sel.id = "sel" + i;
        sel.type = "checkbox";
        sel.className = "check";

        let im2 = document.createElement("img");
        im2.className = "weapon";

        let teamremove = document.createElement("p");
        teamremove.tabIndex = "1";
        teamremove.className = "remove";
        teamremove.innerHTML = "-";

        teamremove.onclick = event => {
            currentTeam[i - 1] = null;
            currentWeapons[i - 1] = defWeapons["sword"];

            document.getElementById("weapImg" + i).src = weapSelect.src = "./resources/weapons/" + defNames["sword"].replaceAll(" ", "_").replaceAll("\"", "") + ".png";
            weapName.innerHTML = defNames["sword"];

            currentWeaponLevel[i - 1] = 1;
            currentWeaponTargetLevel[i - 1] = 1;
            currentWeaponAscensions[i - 1] = false;
            currentWeaponTargetAscensions[i - 1] = false;

            im.src = "resources/plus.png";
            pt.children[0].value = 0;
            im2.src = "";
        }

        pt.appendChild(pti);
        teamcard.appendChild(im);
        teamcard.appendChild(pt);
        teamcard.appendChild(sel);
        teamcard.appendChild(im2);
        teamcont.appendChild(teamremove);
        teamcont.appendChild(teamcard);
        teamcontcont.appendChild(teamcont);

        let imW = document.createElement("img");
        imW.title = "Select Weapon";
        imW.src = "./resources/weapons/Dull_Blade.png";
        imW.className = "weapImg";
        imW.id = "weapImg" + i;

        imW.onclick = event => {
            weaponChoice = i;

            weapAscension.checked = !currentWeaponAscensions[i - 1];
            weapTarAscension.checked = !currentWeaponTargetAscensions[i - 1];
            weapAscension.disabled = !isAscension(currentWeaponLevel[i - 1]);
            weapTarAscension.disabled = !isAscension(currentWeaponTargetLevel[i - 1]);
            weapSelect.src = imW.src;
            weapName.innerHTML = imW.src.split("/").slice(-1).toString().replaceAll("_", " ").replaceAll(".png", "");
            weapInput.value = currentWeaponLevel[i - 1];
            weapTarInput.value = currentWeaponTargetLevel[i - 1];
            weapAscension.checked = currentWeaponAscensions[i - 1];
            weapTarAscension.checked = currentWeaponTargetAscensions[i - 1];
            if(weapName.innerHTML == "The Catch") weapName.innerHTML = '"The Catch"';

            let i2 = 0;
            for (const [el, val] of Object.entries(weapons)) {
                let pla = currentTeam[i - 1];
                if(pla != null && val.typ != pla.weapon){
                    weapScrollpane.children[i2].style.display = "none";
                } else {
                    weapScrollpane.children[i2].style.display = "block";
                }
                i2++;
            }

            weapPopup.style.display = "flex";
            weapScrollpane.scrollTo(0, 0);
        }

        weapCont.appendChild(imW);
    }

    weapInput.addEventListener('input', (event) => {
        weapAscension.checked = false;
        weapAscension.disabled = true;
        currentWeaponAscensions[weaponChoice - 1] = false;

        if (weapInput.value.length > 2) {
            weapInput.value = weapInput.value.slice(0, 2);
        }

        if(isAscension(weapInput.value)) weapAscension.disabled = false;

        currentWeaponLevel[weaponChoice - 1] = weapInput.value;
    });

    weapTarInput.addEventListener('input', (event) => {
        weapTarAscension.checked = false;
        weapTarAscension.disabled = true;
        currentWeaponTargetAscensions[weaponChoice - 1] = false;

        if (weapTarInput.value.length > 2) {
            weapTarInput.value = weapTarInput.value.slice(0, 2);
        }

        if(isAscension(weapTarInput.value)) weapTarAscension.disabled = false;

        currentWeaponTargetLevel[weaponChoice - 1] = weapTarInput.value;
    });

    weapAscension.addEventListener('change', (event) => {
        currentWeaponAscensions[weaponChoice - 1] = weapAscension.checked;
    });

    weapTarAscension.addEventListener('change', (event) => {
        currentWeaponTargetAscensions[weaponChoice - 1] = weapTarAscension.checked;
    });

    calcBut.onclick = event => {
        // Characters

        let done = false;
        let matDict = {};
        text = "# Character level-up Materials\n\n";

        while (matCont.firstChild) {
            matCont.removeChild(matCont.lastChild);
        }

        let exp_need = [];
        for (let i = 1; i < 5; i++) {
            if (currentTeam[i - 1] == null) continue;

            let maxTier = getTier(targetLevel)-((1-ascensionTeam)*isAscension(targetLevel));
            let minTier = getTier(currentLevel[i - 1])-((1-ascensions[i - 1])*isAscension(currentLevel[i - 1]));

            if (maxTier == NaN || minTier == NaN) continue;

            let tier = 0, pre_tier = 0;
            let exp_requirement = 0;
            for (let e = currentLevel[i - 1]; e < targetLevel; e++) {
                tier = getTier(e - 1)

                if(tier != pre_tier){
                    exp_need.push(exp_requirement);
                    exp_requirement = 0;
                }

                exp_requirement += level_exp[e - 1];
                pre_tier = tier;
            }

            exp_need.push(exp_requirement);

            if (maxTier == 0) continue;

            for (let p = minTier + 1; p <= maxTier; p++) {
                if (p == 0) continue;

                let mat = currentTeam[i - 1].getDrop(p - 1);

                for (let j = 0; j < mat.length; j++) {
                    if (parseInt(mat[j][1]) == 0) continue;
                    let vv = sort_list[j] + "^" + mat[j][0];
                    if (vv in matDict) {
                        matDict[vv] += parseInt(mat[j][1])
                    } else {
                        matDict[vv] = parseInt(mat[j][1])
                    }

                    done = true;
                }
            }
        }

        if (exp_need.length != 0) {
            let big = 0, medium = 0, small = 0;
            for(let ei = 0; ei < exp_need.length; ei++){
                let tbig = Math.floor(exp_need[ei] / books_exp[2]);
                let tmedium = Math.floor((exp_need[ei] - (tbig * books_exp[2])) / books_exp[1]);
                let tsmall = Math.ceil((exp_need[ei] - (tbig * books_exp[2]) - (tmedium * books_exp[1])) / books_exp[0]);

                big += tbig;
                medium += tmedium;
                small += tsmall;
            }

            text += "## EXP Books (Most optimal EXP distribution)\n";
            addMaterialElement(matCont, "——EXP Books (Most optimal EXP distribution)——\n");

            if (big != 0) {
                let bpp = document.createElement("p");
                bpp.className = "material floatLeft";
                bpp.innerHTML = "Hero's Wit";

                text += "- Hero's Wit x" + big.toString() + "\n";

                addMaterialTag(matCont, "Hero's Wit", bpp, big);
            }

            if (medium != 0) {
                let mpp = document.createElement("p");
                mpp.className = "material floatLeft";
                mpp.innerHTML = "Adventurer's Experience";

                text += "- Adventurer's Experience x" + medium.toString() + "\n";

                addMaterialTag(matCont, "Adventurer's Experience", mpp, medium);
            }

            if (small != 0) {
                let spp = document.createElement("p");
                spp.className = "material floatLeft";
                spp.innerHTML = "Adventurer's Experience";

                text += "- Wanderer's Advice x" + small.toString() + "\n";

                addMaterialTag(matCont, "Wanderer's Advice", spp, small);
            }

            text += "\n";
            addMaterialElement(matCont, "­");
        }

        if (exp_need == 0 && !done) {
            let pp = document.createElement("p");
            pp.className = "material";
            pp.innerHTML = "-";

            matCont.appendChild(pp);
        } else {
            let newMatDict = {};

            let items = Object.keys(matDict).map(function (key) {
                return [key, matDict[key]];
            });
            items.sort(function (first, second) {
                let ind1 = first[0].split("^")[0];
                let ind2 = second[0].split("^")[0];
                return sort_list.indexOf(ind1) - sort_list.indexOf(ind2);
            });

            for (let elem_l of items) {
                newMatDict[elem_l[0]] = elem_l[1];
            }

            let preV = null;
            for (const [key, value] of Object.entries(newMatDict)) {
                let pp = document.createElement("p");
                let vv = key.split("^");
                pp.className = "material floatLeft";
                pp.innerHTML = vv[1];

                if (preV != vv[0]) {
                    let pp2 = document.createElement("p");
                    pp2.className = "material";

                    let iD = "## ";
                    if (preV != null) iD = "­<br>## ";

                    let txt = iD + vv[0]
                    pp2.innerHTML = txt.replace("## ", "——") + "——";

                    text += txt.replace("<br>", "\n").replace("­", "") + "\n";
                    matCont.appendChild(pp2);
                }

                text += "- " + vv[1] + " x" + value + "\n";

                addMaterialTag(matCont, vv[1], pp, value);

                preV = vv[0];
            }
        }

        // Weapons
        done = false;
        matDict = {};

        text += "\n\n# Weapon level-up Materials\n\n";

        while (weapMatCont.firstChild) {
            weapMatCont.removeChild(weapMatCont.lastChild);
        }

        for (let i = 1; i < 5; i++) {
            if (currentWeapons[i - 1] == null) continue;

            let maxTier = getTier(currentWeaponTargetLevel[i - 1])-((1-currentWeaponTargetAscensions[i - 1])*isAscension(currentWeaponTargetLevel[i - 1]));
            let minTier = getTier(currentWeaponLevel[i - 1])-((1- currentWeaponAscensions[i - 1])*isAscension(currentWeaponLevel[i - 1]));

            if (maxTier == NaN) continue;
            if (minTier == NaN) continue;

            if (maxTier == 0) continue;

            for (let p = minTier + 1; p <= maxTier; p++) {
                if (p == 0) continue;

                let mat = currentWeapons[i - 1].getDrop(p - 1);

                for (let j = 0; j < mat.length; j++) {
                    if (parseInt(mat[j][1]) == 0) continue;
                    let vv = weap_sort_list[j] + "^" + mat[j][0];
                    if (vv in matDict) {
                        matDict[vv] += parseInt(mat[j][1])
                    } else {
                        matDict[vv] = parseInt(mat[j][1])
                    }

                    done = true;
                }
            }
        }

        if (!done) {
            let pp = document.createElement("p");
            pp.className = "material";
            pp.innerHTML = "-";

            weapMatCont.appendChild(pp);
        } else {
            let newMatDict = {};

            let items = Object.keys(matDict).map(function (key) {
                return [key, matDict[key]];
            });
            items.sort(function (first, second) {
                let ind1 = first[0].split("^")[0];
                let ind2 = second[0].split("^")[0];
                return weap_sort_list.indexOf(ind1) - weap_sort_list.indexOf(ind2);
            });

            for (let elem_l of items) {
                newMatDict[elem_l[0]] = elem_l[1];
            }

            let preV = null;
            for (const [key, value] of Object.entries(newMatDict)) {
                let pp = document.createElement("p");
                let vv = key.split("^");
                pp.className = "material floatLeft";
                pp.innerHTML = vv[1];

                if (preV != vv[0]) {
                    let pp2 = document.createElement("p");
                    pp2.className = "material";

                    let iD = "## ";
                    if (preV != null) iD = "­<br>## ";

                    let txt = iD + vv[0];
                    console.log(vv[0]);
                    pp2.innerHTML = txt.replace("## ", "——") + "——";

                    text += txt.replace("<br>", "\n").replace("­", "") + "\n";
                    weapMatCont.appendChild(pp2);
                }

                text += "- " + vv[1] + " x" + value + "\n";

                addMaterialTag(weapMatCont, vv[1], pp, value);

                preV = vv[0];
            }
        }

        text += "\n#### NOTE: This file can be stylized with a MARKDOWN viewer."
    }

    downBut.onclick = event => {
        if (text != "") {
            popup.style.display = "flex";
        }
    }

    cancBut.onclick = event => {
        popup.style.display = "none";
    }

    weapAccept.onclick = event => {
        weaponChoice = 0;
        weapPopup.style.display = "none";

        weapFind.value = "";
    }

    downBut2.onclick = event => {
        let blob = new Blob([text], { type: "text/plain;charset=utf-8" });

        let name = "MyTeam.txt";
        if (downInp.value != "") name = downInp.value + ".txt";

        saveAs(blob, name, { type: "text/plain;charset=utf-8" });
    }

    document.getElementById("loader").style.display = "none";
}

document.addEventListener('focusout', event => {
    if (event.relatedTarget == null || (event.relatedTarget.className != "namecard" && event.relatedTarget.className != "teamcard")) team = 0;
}, true);