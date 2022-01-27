let char_mat_amount = [
    [[1, 3], [1, 15], [2, 12], [2, 18], [3, 12], [3, 24]],    // Enemy Drops [tier, amount]
    [3,      10,      20,      30,      45,      60],         // Local Items
    [[1, 1], [2, 3],  [2, 6],  [3, 3],  [3, 6],  [4, 6]],     // Gems [tier, amount]
    [0,      2,       4,       8,       12,      20]          // Boss Drops
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
        [[1, 2], [1, 8],  [2, 6], [2, 9],  [3, 6], [3, 12]],
        [[1, 3], [1, 12], [2, 6], [2, 12], [3, 9], [3, 18]],
        [[1, 3], [2, 3],  [2, 6], [3, 3],  [3, 6], [4, 4]]
    ],
    [ // 5 Stars
        [[1, 3], [1, 12], [2, 9], [2, 14], [3, 9],  [3, 18]],
        [[1, 5], [1, 18], [2, 9], [2, 18], [3, 14], [3, 27]],
        [[1, 5], [2, 5],  [2, 9], [3, 5],  [3, 9],  [4, 6]]
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
spectral = ["Spectral Husk", "Spectral Heart", "Spectral Nucleus"];

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

let character = class {
    constructor(enemy, local, gems, boss, element, alias){
        this.enemy = enemy;
        this.local = local;
        this.gems = gems;
        this.boss = boss;
        this.element = element;
        this.alias = alias;
    }

    getDrop = function(stage){
        let e_d = char_mat_amount[0][stage];
        let e_d_t = [this.enemy[e_d[0] - 1], e_d[1]];
        let l_d = [this.local, char_mat_amount[1][stage]];
        let g = char_mat_amount[2][stage];
        let g_t = [this.gems + " " + prefixes[g[0] - 1], g[1]];
        if(this.boss != null){
            let b_d = [this.boss, char_mat_amount[3][stage]];
            return [e_d_t, l_d, g_t, b_d];
        }

        return [e_d_t, l_d, g_t];
    }
}

let weapon = class {
    constructor(one, two, domain, stars){
        this.one = one;
        this.two = two;
        this.domain = domain;
        this.stars = stars;
    }

    static getDrop = function(stage){
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

// Element colors
let anemo = ["68F0BC", "09D2B8"],
electro = ["BC5EFF", "8B0168"],
geo = ["FBE284", "FEA336"],
pyro = ["FD8248", "FD0138"],
hydro = ["7BD3E2", "0399D4"],
cryo = ["95B9F3", "608CF1"];
//let dendro = ["89FBB8", "79E2BB"]; // no need yet

// MiHoYo developers are drunk, and some character picture names are not the character names, like Amber - Ambor, so yeah.
let characters = {
    "Albedo": new character(scroll, "Cecilia", prithiva, "Basalt Pillar", geo),
    "Aloy": new character(spectral, "Crystal Marrow", shivada, "Crystalline Bloom", cryo),
    "Amber": new character(arrowhead, "Small Lamp Grass", agnidus, "Everflame Seed", pyro, "Ambor"),
    "Arataki Itto": new character(slime, "Onikabuto", prithiva, "Riftborn Regalia", geo, "Itto"),
    "Barbara": new character(scroll, "Philanemo Mushroom", varunada, "Cleansing Heart", hydro),
    "Beidou": new character(insignia_hoarder, "Noctilucous Jade", vajrada, "Lightning Prism", electro),
    "Bennett": new character(insignia_hoarder, "Windwheel Aster", agnidus, "Everflame Seed", pyro),
    "Chongyun": new character(mask_boko, "Cor Lapis", shivada, "Hoarfrost Core", cryo),
    "Diluc": new character(insignia_fatui, "Small Lamp Grass", agnidus, "Everflame Seed", pyro),
    "Diona": new character(arrowhead, "Calla Lily", shivada, "Hoarfrost Core", cryo),
    "Eula": new character(mask_boko, "Dandelion Seed", shivada, "Crystalline Bloom", cryo),
    "Fischl": new character(arrowhead, "Small Lamp Grass", vajrada, "Lightning Prism", electro),
    "Ganyu": new character(nectar, "Qingxin", shivada, "Hoarfrost Core", cryo),
    "Gorou": new character(spectral, "Sango Pearl", prithiva, "Perpetual Heart", geo),
    "Hu Tao": new character(nectar, "Silk Flower", agnidus, "Juvenile Jade", pyro, "Hutao"),
    "Jean": new character(mask_boko, "Dandelion Seed", vayuda, "Hurricane Seed", anemo, "Qin"),
    "Kaedehara Kazuha": new character(insignia_hoarder, "Sea Ganoderma", vayuda, "Marionette Core", anemo, "Kazuha"),
    "Kaeya": new character(insignia_hoarder, "Calla Lily", shivada, "Hoarfrost Core", cryo),
    "Kamisato Ayaka": new character(handguard, "Sakura Bloom", shivada, "Perpetual Heart", cryo, "Ayaka"),
    "Keqing": new character(nectar, "Cor Lapis", vajrada, "Lightning Prism", electro),
    "Klee": new character(scroll, "Philanemo Mushroom", agnidus, "Everflame Seed", pyro),
    "Kujou Sara": new character(mask_boko, "Dendrobium", vajrada, "Storm Beads", electro, "Sara"),
    "Lisa": new character(slime, "Valberry", vajrada, "Lightning Prism", electro),
    "Mona": new character(nectar, "Philanemo Mushroom", varunada, "Cleansing Heart", hydro),
    "Ningguang": new character(insignia_fatui, "Glaze Lily", prithiva, "Basalt Pillar", geo),
    "Noelle": new character(mask_boko, "Valberry", prithiva, "Basalt Pillar", geo, "Noel"),
    "Qiqi": new character(scroll, "Violetgrass", shivada, "Hoarfrost", cryo),
    "Raiden Shogun": new character(handguard, "Amakumo Fruit", vajrada, "Storm Beads", electro, "Shougun"),
    "Razor": new character(mask_boko, "Wolfhook", vajrada, "Lightning Prism", electro),
    "Rosaria": new character(insignia_fatui, "Valberry", shivada, "Hoarfrost Core", cryo),
    "Sangonomiya Kokomi": new character(spectral, "Sango Pearl", varunada, "Dew of Repudiation", hydro, "Kokomi"),
    "Sayu": new character(nectar, "Crystal Marrow", vayuda, "Marionette Core", anemo),
    "Shenhe": new character(nectar, "Qingxin", shivada, "Dragonheir's False Fin", cryo),
    "Sucrose": new character(nectar, "Windwheel Aster", vayuda, "Hurricane Seed", anemo),
    "Tartaglia": new character(insignia_fatui, "Starconch", varunada, "Cleansing Heart", hydro),
    "Thoma": new character(insignia_hoarder, "Fluorescent Fungus", agnidus, "Smoldering Pearl", pyro, "Tohma"),
    "Traveler": new character(mask_boko, "Windwheel Aster", brilliant, null, null, "PlayerBoy"),
    "Venti": new character(slime, "Cecilia", vayuda, "Hurricane Seed", anemo),
    "Xiangling": new character(slime, "Jueyun Chili", agnidus, "Everflame Seed", pyro),
    "Xiao": new character(slime, "Qingxin", vayuda, "Juvenile Jade", anemo),
    "Xingqiu": new character(mask_boko, "Silk Flower", varunada, "Cleansing Heart", hydro),
    "Xinyan": new character(insignia_hoarder, "Violetgrass", agnidus, "Everflame Seed", pyro),
    "Yanfei": new character(insignia_hoarder, "Noctilucous Jade", agnidus, "Juvenile Jade", pyro, "Feiyan"),
    "Yoimiya": new character(scroll, "Naku Weed", agnidus, "Smoldering Pearl", pyro),
    "Yun Jin": new character(mask_boko, "Glaze Lily", prithiva, "Riftborn Regalia", geo, "Yunjin"),
    "Zhongli": new character(slime, "Cor Lapis", prithiva, "Basalt Pillar", geo)
}

let team = 1;

window.onload = function(){
    let scroll_pane = document.getElementById("scroll");

    for(const [el, val] of Object.entries(characters)){
        let elem = document.createElement("div"); // Character namecard container
        elem.className = "namecard";
        elem.tabIndex = 1;
        elem.onclick = function() {
            if(team != 0){
                let doc = document.getElementById("team" + team).children[0];
                let self = event.currentTarget.children[0];
                doc.src = self.src;
                doc.style.backgroundImage = self.style.backgroundImage;
                if(team < 5){
                    team += 1;
                } else {
                    team = 0;
                }
            }
        }

        let img = document.createElement("img"); // Face image
        img.className = "image";
        if(val.alias == null){
            img.src = "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_" + el + ".png";
        } else {
            img.src = "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_" + val.alias + ".png";
        }

        let elem2 = document.createElement("p"); // Name
        elem2.className = "name";
        elem2.innerHTML = el;

        if(val.element != null){
            img.style.backgroundImage = "linear-gradient(0deg, #" + val.element[0] +", #" + val.element[1] + ")";
        }

        elem.appendChild(img);
        elem.appendChild(elem2);

        scroll_pane.appendChild(elem);
    }

    for(let i = 1; i < 5; i++){
        document.getElementById("team" + i).onclick = event => {
            team = i;
            event.currentTarget.children[0].style.backgroundImage = null;
        };
    }
}