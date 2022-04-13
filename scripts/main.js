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
    constructor(one, two, domain, stars) {
        this.one = one;
        this.two = two;
        this.domain = domain;
        this.stars = stars;
    }

    static getDrop = function (stage) {
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
let char_mat_amount = [
    [[1, 3], [1, 15], [2, 12], [2, 18], [3, 12], [3, 24]],    // Enemy Drops [tier, amount]
    [3, 10, 20, 30, 45, 60],         // Local Items
    [[1, 1], [2, 3], [2, 6], [3, 3], [3, 6], [4, 6]],     // Gems [tier, amount]
    [0, 2, 4, 8, 12, 20]          // Boss Drops
]; // char_mat_amount[mat_type][ascension_level]

let weap_mat_amount = [
    [ // 1 Star
        [[1, 1], [1, 2], [2, 2], [2, 3]],                     // Material 1 [tier, amount]
        [[1, 1], [1, 4], [2, 2], [2, 4]],                     // Material 2 [tier, amount]
        [[1, 1], [2, 1], [2, 2], [3, 1]]                      // Domain Material [tier, amount]
    ],
    [ // 2 Stars
        [[1, 1], [1, 4], [2, 3], [2, 4]],
        [[1, 1], [1, 5], [2, 3], [2, 5]],
        [[1, 1], [2, 1], [2, 3], [3, 1]]
    ],
    [ // 3 Stars
        [[1, 1], [1, 5], [2, 4], [2, 6], [3, 4], [3, 8]],
        [[1, 2], [1, 8], [2, 4], [2, 8], [3, 6], [3, 12]],
        [[1, 2], [2, 2], [2, 4], [3, 2], [3, 4], [4, 3]]
    ],
    [ // 4 Stars
        [[1, 2], [1, 8], [2, 6], [2, 9], [3, 6], [3, 12]],
        [[1, 3], [1, 12], [2, 6], [2, 12], [3, 9], [3, 18]],
        [[1, 3], [2, 3], [2, 6], [3, 3], [3, 6], [4, 4]]
    ],
    [ // 5 Stars
        [[1, 3], [1, 12], [2, 9], [2, 14], [3, 9], [3, 18]],
        [[1, 5], [1, 18], [2, 9], [2, 18], [3, 14], [3, 27]],
        [[1, 5], [2, 5], [2, 9], [3, 5], [3, 9], [4, 6]]
    ]
]; // weap_mat_amount[weap_stars][mat_type][ascension_level]

// Exp amount per book/crystal
let books_exp = [1000, 5000, 20000];
let crystals_exp = [400, 2000, 10000];

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
    statuette = ["Gloomy Statuette", "Dark Statuette", "Deathly Statuette"];

// Domain Materials:
let aerosiderite = ["Grain of Aerosiderite", "Piece of Aerosiderite", "Bit of Aerosiderite", "Chunk of Aerosiderite"],
    wolf = ["Boreal Wolf's Milk Tooth", "Boreal Wolf's Cracked Tooth", "Boreal Wolf's Broken Fang", "Boreal Wolf's Nostalgia"],
    dandelion = ["Fetters of the Dandelion Gladiator", "Chains of the Dandelion Gladiator", "Shackles of the Dandelion Gladiator", "Dream of the Dandelion Gladiator"],
    coral = ["Coral Branch of a Distant Sea", "Jeweled Branch of a Distant Sea", "Jade Branch of a Distant Sea", "Golden Branch of a Distant Sea"],
    decarabian = ["Tile of Decarabian's Tower", "Debris of Decarabian's City", "Fragment of Decarabian's Epic", "Scattered Piece of Decarabian's Dream"],
    guyun = ["Luminous Sands from Guyun", "Lustrous Stone from Guyun", "Relic from Guyun", "Divine Body from Guyun"],
    mask = ["Mask of the Wicked Lieutenant", "Mask of the Tiger's Bite", "Mask of the One-Horned", "Mask of the Kijin"],
    mist_veiled = ["Mist Veiled Lead Elixir", "Mist Veiled Mercury Elixir", "Mist Veiled Gold Elixir", "Mist Veiled Primo Elixir"],
    narukami = ["Narukami's Wisdom", "Narukami's Joy", "Narukami's Affection", "Narukami's Valor"];

// Gems:
let prefixes = ["Sliver", "Fragment", "Chunk", "Gemstone"];
let agnidus = "Agnidus Agate",
    brilliant = "Brilliant Diamond",
    prithiva = "Prithiva Topaz",
    shivada = "Shivada Jade",
    vajrada = "Vajrada Amethyst",
    varunada = "Varunada Lazurite",
    vayuda = "Vayuda Turquoise";

// Element colors
let anemo = ["68F0BC", "09D2B8"],
    electro = ["BC5EFF", "8B0168"],
    geo = ["FBE284", "FEA336"],
    pyro = ["FD8248", "FD0138"],
    hydro = ["7BD3E2", "0399D4"],
    cryo = ["95B9F3", "608CF1"];
//dendro = ["89FBB8", "79E2BB"]; // no need yet

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
    "Chongyun": new character("claymore", mask_boko, "Cor Lapis", shivada, "Hoarfrost Core", cryo, 4),
    "Diluc": new character("claymore", insignia_fatui, "Small Lamp Grass", agnidus, "Everflame Seed", pyro, 5),
    "Diona": new character("catalyst", arrowhead, "Calla Lily", shivada, "Hoarfrost Core", cryo, 4),
    "Eula": new character("claymore", mask_boko, "Dandelion Seed", shivada, "Crystalline Bloom", cryo, 5),
    "Fischl": new character("bow", arrowhead, "Small Lamp Grass", vajrada, "Lightning Prism", electro, 4),
    "Ganyu": new character("bow", nectar, "Qingxin", shivada, "Hoarfrost Core", cryo, 5),
    "Gorou": new character("bow", spectral, "Sango Pearl", prithiva, "Perpetual Heart", geo, 4),
    "Hu Tao": new character("polearm", nectar, "Silk Flower", agnidus, "Juvenile Jade", pyro, 5, "Hutao"),
    "Jean": new character("sword", mask_boko, "Dandelion Seed", vayuda, "Hurricane Seed", anemo, 5, "Qin"),
    "Kazuha": new character("sword", insignia_hoarder, "Sea Ganoderma", vayuda, "Marionette Core", anemo, 5, "Kazuha"),
    "Kaeya": new character("sword", insignia_hoarder, "Calla Lily", shivada, "Hoarfrost Core", cryo, 4),
    "Ayaka": new character("sword", handguard, "Sakura Bloom", shivada, "Perpetual Heart", cryo, 5, "Ayaka"),
    "Ayato": new character("sword", handguard, "Sakura Bloom", varunada, "Dew of Repudiation", hydro, 5, "Ayato"),
    "Keqing": new character("sword", nectar, "Cor Lapis", vajrada, "Lightning Prism", electro, 5),
    "Klee": new character("catalyst", scroll, "Philanemo Mushroom", agnidus, "Everflame Seed", pyro, 5),
    "Kujou Sara": new character("bow", mask_boko, "Dendrobium", vajrada, "Storm Beads", electro, 4, "Sara"),
    "Lisa": new character("catalyst", slime, "Valberry", vajrada, "Lightning Prism", electro, 4),
    "Mona": new character("catalyst", nectar, "Philanemo Mushroom", varunada, "Cleansing Heart", hydro, 5),
    "Ningguang": new character("catalyst", insignia_fatui, "Glaze Lily", prithiva, "Basalt Pillar", geo, 4),
    "Noelle": new character("claymore", mask_boko, "Valberry", prithiva, "Basalt Pillar", geo, 4, "Noel"),
    "Qiqi": new character("sword", scroll, "Violetgrass", shivada, "Hoarfrost", cryo, 5),
    "Raiden Shogun": new character("polearm", handguard, "Amakumo Fruit", vajrada, "Storm Beads", electro, 5, "Shougun"),
    "Razor": new character("claymore", mask_boko, "Wolfhook", vajrada, "Lightning Prism", electro, 4),
    "Rosaria": new character("polearm", insignia_fatui, "Valberry", shivada, "Hoarfrost Core", cryo, 4),
    "Kokomi": new character("catalyst", spectral, "Sango Pearl", varunada, "Dew of Repudiation", hydro, 5, "Kokomi"),
    "Sayu": new character("claymore", nectar, "Crystal Marrow", vayuda, "Marionette Core", anemo, 4),
    "Shenhe": new character("polearm", nectar, "Qingxin", shivada, "Dragonheir's False Fin", cryo, 5),
    "Sucrose": new character("catalyst", nectar, "Windwheel Aster", vayuda, "Hurricane Seed", anemo, 4),
    "Tartaglia": new character("bow", insignia_fatui, "Starconch", varunada, "Cleansing Heart", hydro, 5),
    "Thoma": new character("polearm", insignia_hoarder, "Fluorescent Fungus", agnidus, "Smoldering Pearl", pyro, 4, "Tohma"),
    "Traveler": new character("sword", mask_boko, "Windwheel Aster", brilliant, null, null, 5, "PlayerBoy"),
    "Venti": new character("bow", slime, "Cecilia", vayuda, "Hurricane Seed", anemo, 5),
    "Xiangling": new character("polearm", slime, "Jueyun Chili", agnidus, "Everflame Seed", pyro, 4),
    "Xiao": new character("polearm", slime, "Qingxin", vayuda, "Juvenile Jade", anemo, 5),
    "Xingqiu": new character("sword", mask_boko, "Silk Flower", varunada, "Cleansing Heart", hydro, 4),
    "Xinyan": new character("claymore", insignia_hoarder, "Violetgrass", agnidus, "Everflame Seed", pyro, 4),
    "Yae Miko": new character("catalyst", handguard, "Sea Ganoderma", vajrada, "Dragonheir's False Fin", electro, 5, "Yae"),
    "Yanfei": new character("catalyst", insignia_hoarder, "Noctilucous Jade", agnidus, "Juvenile Jade", pyro, 4, "Feiyan"),
    "Yoimiya": new character("bow", scroll, "Naku Weed", agnidus, "Smoldering Pearl", pyro, 5),
    "Yun Jin": new character("polearm", mask_boko, "Glaze Lily", prithiva, "Riftborn Regalia", geo, 4, "Yunjin"),
    "Zhongli": new character("polearm", slime, "Cor Lapis", prithiva, "Basalt Pillar", geo, 5)
}

let weapons = {
    "\"The Catch\"": new weapon(mask, chaos_axis, spectral, 4),
    "Akuoumaru": new weapon(coral, concealed, handguard, 4),
    "Alley Hunter": new weapon(dandelion, chaos_circuit, slime, 4),
    "Amenoma Kageuchi": new weapon(coral, chaos_axis, handguard, 4),
    "Amos' Bow": new weapon(dandelion, chaos_circuit, slime, 5),
    "Apprentice's Notes": new weapon(decarabian, horn, mask_boko, 1),
    "Aquila Favonia": new weapon(decarabian, horn, arrowhead, 5),
    "Beginner's Protector": new weapon(dandelion, chaos_circuit, scroll, 1),
    "Black Tassel": new weapon(aerosiderite, bone, arrowhead, 3),
    "Blackcliff Agate": new weapon(guyun, knife, scroll, 4),
    "Blackcliff Longsword": new weapon(guyun, knife, arrowhead, 4),
    "Blackcliff Pole": new weapon(mist_veiled, mist, insignia_fatui, 4),
    "Blackcliff Slasher": new weapon(mist_veiled, mist, insignia_fatui, 4),
    "Blackcliff Warbow": new weapon(guyun, knife, nectar, 4),
    "Bloodtainted Greatsword": new weapon(wolf, ley_line, arrowhead, 3),
    "Calamity Queller": new weapon(mist_veiled, mist, nectar, 5),
    "Cinnabar Spindle": new weapon(decarabian, chaos_circuit, mask_boko, 4),
    "Compound Bow": new weapon(aerosiderite, bone, insignia_fatui, 4),
    "Cool Steel": new weapon(decarabian, horn, arrowhead, 3),
    "Crescent Pike": new weapon(guyun, knife, insignia_hoarder, 4),
    "Dark Iron Sword": new weapon(guyun, knife, mask_boko, 3),
    "Deathmatch": new weapon(wolf, ley_line, nectar, 4),
    "Debate Club": new weapon(mist_veiled, mist, mask_boko, 3),
    "Dodoco Tales": new weapon(wolf, ley_line, mask_boko, 4),
    "Dragon's Bane": new weapon(mist_veiled, mist, scroll, 4),
    "Dragonspine Spear": new weapon(wolf, mist, insignia_fatui, 4),
    "Dull Blade": new weapon(decarabian, horn, arrowhead, 1),
    "Elegy for the End": new weapon(wolf, horn, insignia_fatui, 5),
    "Emerald Orb": new weapon(guyun, knife, insignia_hoarder, 3),
    "Engulfing Lightning": new weapon(mask, chaos_axis, handguard, 5),
    "Everlasting Moonglow": new weapon(coral, prism, spectral, 5),
    "Eye of Perception": new weapon(mist_veiled, mist, mask_boko, 4),
    "Favonius Codex": new weapon(decarabian, horn, scroll, 4),
    "Favonius Greatsword": new weapon(dandelion, chaos_circuit, insignia_fatui, 4),
    "Favonius Lance": new weapon(dandelion, chaos_circuit, slime, 4),
    "Favonius Sword": new weapon(decarabian, horn, arrowhead, 4),
    "Favonius Warbow": new weapon(dandelion, chaos_circuit, nectar, 4),
    "Ferrous Shadow": new weapon(decarabian, horn, nectar, 3),
    "Festering Desire": new weapon(dandelion, horn, insignia_fatui, 4),
    "Fillet Blade": new weapon(mist_veiled, mist, insignia_hoarder, 3),
    "Freedom-Sworn": new weapon(dandelion, chaos_circuit, scroll, 5),
    "Frostbearer": new weapon(dandelion, chaos_circuit, nectar, 4),
    "Hakushin Ring": new weapon(coral, prism, scroll, 4),
    "Halberd": new weapon(mist_veiled, mist, nectar, 3),
    "Hamayumi": new weapon(narukami, prism, arrowhead, 4),
    "Haran Geppaku Futsu": new weapon(narukami, statuette, handguard, 5),
    "Harbinger of Dawn": new weapon(wolf, ley_line, slime, 3),
    "Hunter's Bow": new weapon(wolf, ley_line, insignia_hoarder, 1),
    "Iron Point": new weapon(dandelion, chaos_circuit, scroll, 2),
    "Iron Sting": new weapon(aerosiderite, bone, nectar, 4),
    "Kagura's Verity": new weapon(mask, concealed, spectral, 5),
    "Katsuragikiri Nagamasa": new weapon(narukami, chaos_axis, handguard, 4),
    "Kitain Cross Spear": new weapon(mask, chaos_axis, insignia_hoarder, 4),
    "Lion's Roar": new weapon(guyun, knife, insignia_hoarder, 4),
    "Lithic Blade": new weapon(guyun, knife, arrowhead, 4),
    "Lithic Spear": new weapon(aerosiderite, bone, arrowhead, 4),
    "Lost Prayer to the Sacred Winds": new weapon(dandelion, chaos_circuit, slime, 5),
    "Luxurious Sea-Lord": new weapon(aerosiderite, bone, slime, 4),
    "Magic Guide": new weapon(decarabian, horn, slime, 3),
    "Mappa Mare": new weapon(aerosiderite, bone, slime, 4),
    "Memory of Dust": new weapon(aerosiderite, bone, mask_boko, 5),
    "Messenger": new weapon(mist_veiled, mist, insignia_hoarder, 3),
    "Mistsplitter Reforged": new weapon(coral, chaos_axis, handguard, 5),
    "Mitternachts Waltz": new weapon(decarabian, horn, insignia_hoarder, 4),
    "Mouun's Moon": new weapon(narukami, prism, spectral, 4),
    "Oathsworn Eye": new weapon(coral, concealed, spectral, 4),
    "Old Merc's Pal": new weapon(wolf, ley_line, slime, 2),
    "Otherworldly Story": new weapon(dandelion, chaos_circuit, mask_boko, 3),
    "Pocket Grimoire": new weapon(decarabian, horn, mask_boko, 2),
    "Polar Star": new weapon(mask, concealed, spectral, 5),
    "Predator": new weapon(narukami, prism, arrowhead, 4),
    "Primordial Jade Cutter": new weapon(mist_veiled, mist, insignia_hoarder, 5),
    "Primordial Jade Winged-Spear": new weapon(guyun, knife, insignia_fatui, 5),
    "Prototype Amber": new weapon(mist_veiled, mist, arrowhead, 4),
    "Prototype Archaic": new weapon(aerosiderite, bone, mask_boko, 4),
    "Prototype Crescent": new weapon(mist_veiled, mist, insignia_hoarder, 4),
    "Prototype Rancour": new weapon(mist_veiled, mist, insignia_fatui, 4),
    "Prototype Starglitter": new weapon(aerosiderite, bone, mask_boko, 4),
    "Rainslasher": new weapon(mist_veiled, mist, scroll, 4),
    "Raven Bow": new weapon(decarabian, horn, arrowhead, 3),
    "Recurve Bow": new weapon(dandelion, chaos_circuit, scroll, 3),
    "Redhorn Stonethresher": new weapon(narukami, concealed, handguard, 5),
    "Royal Bow": new weapon(dandelion, chaos_circuit, slime, 4),
    "Royal Greatsword": new weapon(dandelion, chaos_circuit, slime, 4),
    "Royal Grimoire": new weapon(decarabian, horn, insignia_fatui, 4),
    "Royal Longsword": new weapon(decarabian, horn, arrowhead, 4),
    "Royal Spear": new weapon(mist_veiled, mist, insignia_fatui, 4),
    "Rust": new weapon(guyun, knife, mask_boko, 4),
    "Sacrificial Bow": new weapon(wolf, ley_line, slime, 4),
    "Sacrificial Fragments": new weapon(dandelion, chaos_circuit, insignia_hoarder, 4),
    "Sacrificial Greatsword": new weapon(wolf, ley_line, arrowhead, 4),
    "Sacrificial Sword": new weapon(dandelion, chaos_circuit, scroll, 4),
    "Seasoned Hunter's Bow": new weapon(wolf, ley_line, insignia_hoarder, 2),
    "Serpent Spine": new weapon(aerosiderite, bone, nectar, 4),
    "Sharpshooter's Oath": new weapon(wolf, ley_line, slime, 3),
    "Silver Sword": new weapon(decarabian, horn, arrowhead, 2),
    "Skyrider Greatsword": new weapon(aerosiderite, bone, insignia_hoarder, 3),
    "Skyrider Sword": new weapon(aerosiderite, bone, insignia_fatui, 3),
    "Skyward Atlas": new weapon(wolf, ley_line, arrowhead, 5),
    "Skyward Blade": new weapon(wolf, ley_line, slime, 5),
    "Skyward Harp": new weapon(wolf, ley_line, arrowhead, 5),
    "Skyward Pride": new weapon(wolf, ley_line, slime, 5),
    "Skyward Spine": new weapon(dandelion, chaos_circuit, scroll, 5),
    "Slingshot": new weapon(guyun, knife, mask_boko, 3),
    "Snow-Tombed Starsilver": new weapon(decarabian, horn, slime, 4),
    "Solar Pearl": new weapon(guyun, knife, nectar, 4),
    "Song of Broken Pines": new weapon(decarabian, horn, mask_boko, 5),
    "Staff of Homa": new weapon(aerosiderite, ley_line, slime, 5),
    "Summit Shaper": new weapon(guyun, knife, mask_boko, 5),
    "Sword of Descension": new weapon(wolf, ley_line, insignia_hoarder, 4),
    "The Alley Flash": new weapon(decarabian, horn, scroll, 4),
    "The Bell": new weapon(decarabian, horn, nectar, 4),
    "The Black Sword": new weapon(wolf, ley_line, slime, 4),
    "The Flute": new weapon(wolf, ley_line, slime, 4),
    "The Stringless": new weapon(decarabian, horn, arrowhead, 4),
    "The Unforged": new weapon(mist_veiled, mist, insignia_hoarder, 5),
    "The Viridescent Hunt": new weapon(decarabian, horn, arrowhead, 4),
    "The Widsith": new weapon(wolf, ley_line, mask_boko, 4),
    "Thrilling Tales of Dragon Slayers": new weapon(wolf, ley_line, scroll, 3),
    "Thundering Pulse": new weapon(narukami, prism, arrowhead, 5),
    "Traveler's Handy Sword": new weapon(dandelion, chaos_circuit, scroll, 3),
    "Twin Nephrite": new weapon(mist_veiled, mist, insignia_fatui, 3),
    "Vortex Vanquisher": new weapon(aerosiderite, bone, insignia_hoarder, 5),
    "Waster Greatsword": new weapon(wolf, ley_line, slime, 1),
    "Wavebreaker's Fin": new weapon(mask, concealed, handguard, 4),
    "White Iron Greatsword": new weapon(dandelion, chaos_circuit, slime, 3),
    "White Tassel": new weapon(guyun, knife, insignia_fatui, 3),
    "Whiteblind": new weapon(guyun, knife, insignia_hoarder, 4),
    "Windblume Ode": new weapon(dandelion, ley_line, nectar, 4),
    "Wine and Song": new weapon(wolf, ley_line, scroll, 4),
    "Wolf's Gravestone": new weapon(dandelion, chaos_circuit, scroll, 5)
}

let team = 0,
    currentTeam = [null, null, null, null],
    currentLevel = [0, 0, 0, 0],
    targetLevel = 20,
    text = "";

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

window.onload = function () {
    document.getElementById("error").style.display = "none";

    let trg = document.getElementById("targetinput");
    trg.addEventListener("input", () => {
        if (trg.value.length > 2) {
            trg.value = trg.value.slice(0, 2);
        }
        targetLevel = trg.value;
    });

    trg.addEventListener("focusout", () => {
        if (trg.value == "" || trg.value == 0) trg.value = 1;
        if (trg.value > 90) trg.value = 90;
        targetLevel = trg.value;
    });

    let scrollpane = document.getElementById("scroll");

    for (const [el, val] of Object.entries(characters)) {
        let elem = document.createElement("div"); // Character namecard container
        let c = rgb(st[val.stars-1][0]);
        console.log(c, hex(c[0] + 50, c[1] + 50, c[2] + 50));
        let c2 = rgb(st[val.stars-1][1]);
        cc = hex(c[0] + 50, c[1] + 50, c[2] + 50) + ", " + hex(c2[0] + 50, c2[1] + 50, c2[2] + 50);

        elem.style.backgroundImage = "linear-gradient(90deg, #F0F0F0 80%, " + cc + ")";
        elem.className = "namecard";
        elem.tabIndex = 1;
        elem.onclick = function () {
            if (team != 0) {
                if (!currentTeam.includes(val)) {
                    let doc = document.getElementById("team" + team);
                    let self = event.currentTarget.children[0];

                    doc.children[0].src = self.src;
                    doc.children[1].children[0].value = 1;
                    doc.children[2].src = "resources/" + val.weapon + ".png";

                    currentTeam[team - 1] = val;
                    currentLevel[team - 1] = 1;

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

        // Weapon URL Base: https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/UI_EquipIcon_*.png

        let elem2 = document.createElement("p"); // Name
        elem2.className = "name";
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

    let teamcontcont = document.getElementById("teamcontcont");

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

        let pti = document.createElement("input");
        pti.className = "levelinput";
        pti.id = "input" + i;
        pti.type = "number";
        pti.addEventListener("input", () => {
            if (pti.value.length > 2) {
                pti.value = pti.value.slice(0, 2);
            }
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

        let im2 = document.createElement("img");
        im2.className = "weapon";

        let teamremove = document.createElement("p");
        teamremove.tabIndex = "1";
        teamremove.className = "remove";
        teamremove.innerHTML = "-";

        teamremove.onclick = event => {
            currentTeam[i - 1] = null;

            im.src = "resources/plus.png";
            pt.children[0].value = 0;
            im2.src = "";
        }

        pt.appendChild(pti);
        teamcard.appendChild(im);
        teamcard.appendChild(pt);
        teamcard.appendChild(im2);
        teamcont.appendChild(teamremove);
        teamcont.appendChild(teamcard);
        teamcontcont.appendChild(teamcont);
    }

    let popup = document.getElementById("popup-cover");
    let calcBut = document.getElementById("calc");
    let downBut = document.getElementById("down");
    let downBut2 = document.getElementById("downBut");
    let downInp = document.getElementById("downinput");
    let cancBut = document.getElementById("cancBut");
    let matCont = document.getElementById("charmat");

    calcBut.onclick = event => {
        /*let o_h = matCont.style.height;
        matCont.style.height = "0";
        matCont.style.transform = "translate(0, -50%) scale(1, 0)";*/

        let done = false;
        let matDict = {};

        while (matCont.firstChild) {
            matCont.removeChild(matCont.lastChild);
        }

        let exp_need = 0;
        for (let i = 1; i < 5; i++) {
            if (currentTeam[i - 1] == null) continue;
            let maxTier = getTier(targetLevel);
            let minTier = getTier(currentLevel[i - 1]);

            if (maxTier == NaN) continue;
            if (minTier == NaN) continue;

            for (let e = currentLevel[i - 1]; e < targetLevel; e++) {
                exp_need += level_exp[e - 1];
            }

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

        text = "";

        if (exp_need != 0) {
            let big = Math.floor(exp_need / books_exp[2]);
            let medium = Math.floor((exp_need - (big * books_exp[2])) / books_exp[1]);
            let small = Math.ceil((exp_need - (big * books_exp[2]) - (medium * books_exp[1])) / books_exp[0]);

            text = "---EXP Books---\n";
            addMaterialElement(matCont, "---EXP Books---");

            if (big != 0) {
                let v = "Hero's Wit x" + big.toString();
                text += v + "\n";

                addMaterialElement(matCont, v);
            }

            if (medium != 0) {
                let v = "Adventurer's Experience x" + medium.toString();
                text += v + "\n";

                addMaterialElement(matCont, v);
            }

            if (small != 0) {
                let v = "Wanderer's Advice x" + small.toString();
                text += v + "\n";

                addMaterialElement(matCont, v);
            }

            text += "\n";
            addMaterialElement(matCont, "­");
        }

        if (!done) {
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
                pp.className = "material";
                let txt = vv[1] + " x" + value;
                pp.innerHTML = txt;


                if (preV != vv[0]) {
                    let pp2 = document.createElement("p");
                    pp2.className = "material";

                    let iD = "---";
                    if (preV != null) iD = "­<br>---";

                    let txt = iD + vv[0] + "---"
                    pp2.innerHTML = txt;

                    text += txt.replace("<br>", "\n").replace("­", "") + "\n";
                    matCont.appendChild(pp2);
                }

                text += txt + "\n";
                matCont.appendChild(pp);
                preV = vv[0];
            }
        }

        /*setTimeout(() => {
            matCont.style.height = o_h;
            matCont.style.transform = "translate(0%, 0%) scale(1, 1)";
        }, 150);*/
    };

    downBut.onclick = event => {
        if (text != "") {
            console.log(popup);
            popup.style.display = "flex";
        }
    }

    cancBut.onclick = event => {
        console.log(popup);
        popup.style.display = "none";
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
