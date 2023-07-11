// Enemy Drops:
let enemyDrops = {
    "knife": ["Hunter's Sacrificial Knife", "Agent's Sacrificial Knife", "Inspector's Sacrificial Knife"],
    "horn": ["Heavy Horn", "Black Bronze Horn", "Black Crystal Horn"],
    "chaos_axis": ["Chaos Gear", "Chaos Axis", "Chaos Oculus"],
    "chaos_circuit": ["Chaos Device", "Chaos Circuit", "Chaos Core"],
    "concealed": ["Concealed Claw", "Concealed Unguis", "Concealed Talon"],
    "prism": ["Dismal Prism", "Crystal Prism", "Polarizing Prism"],
    "mask_boko": ["Damaged Mask", "Stained Mask", "Ominous Mask"],
    "ley_line": ["Dead Ley Line Branch", "Dead Ley Line Leaves", "Ley Line Sprout"],
    "bone": ["Fragile Bone Shard", "Sturdy Bone Shard", "Fossilized Bone Shard"],
    "handguard": ["Old Handguard", "Kageuchi Handguard", "Famed Handguard"],
    "mist": ["Mist Grass Pollen", "Mist Grass", "Mist Grass Wick"],
    "insignia_fatui": ["Recruit's Insignia", "Sergeant's Insignia", "Lieutenant's Insignia"],
    "scroll": ["Divining Scroll", "Sealed Scroll", "Forbidden Curse Scroll"],
    "nectar": ["Whopperflower Nectar", "Shimmering Nectar", "Energy Nectar"],
    "arrowhead": ["Firm Arrowhead", "Sharp Arrowhead", "Weathered Arrowhead"],
    "insignia_hoarder": ["Treasure Hoarder Insignia", "Silver Raven Insignia", "Golden Raven Insignia"],
    "slime": ["Slime Condensate", "Slime Secretions", "Slime Concentrate"],
    "spectral": ["Spectral Husk", "Spectral Heart", "Spectral Nucleus"],
    "statuette": ["Gloomy Statuette", "Dark Statuette", "Deathly Statuette"],
    "spores": ["Fungal Spores", "Luminescent Pollen", "Crystalline Cyst Dust"],
    "headband": ["Faded Red Satin", "Trimmed Red Silk", "Rich Red Brocade"],
    "fungal_nucleus": ["Inactivated Fungal Nucleus", "Dormant Fungal Nucleus", "Robust Fungal Nucleus"],
    "chaos_storage": ["Chaos Storage", "Chaos Module", "Chaos Bolt"],
    "prism_robot": ["Damaged Prism", "Turbid Prism", "Radiant Prism"],
    "shell": ["Desiccated Shell", "Sturdy Shell", "Marked Shell"],
    "flower": ["A Flower Yet to Bloom", "Treasured Flower", "Wanderer's Blooming Flower"]
}

// Domain Materials:
let domainMaterials = {
    "aerosiderite": ["Grain of Aerosiderite", "Piece of Aerosiderite", "Bit of Aerosiderite", "Chunk of Aerosiderite"],
    "wolf": ["Boreal Wolf's Milk Tooth", "Boreal Wolf's Cracked Tooth", "Boreal Wolf's Broken Fang", "Boreal Wolf's Nostalgia"],
    "dandelion": ["Fetters of the Dandelion Gladiator", "Chains of the Dandelion Gladiator", "Shackles of the Dandelion Gladiator", "Dream of the Dandelion Gladiator"],
    "coral": ["Coral Branch of a Distant Sea", "Jeweled Branch of a Distant Sea", "Jade Branch of a Distant Sea", "Golden Branch of a Distant Sea"],
    "decarabian": ["Tile of Decarabian's Tower", "Debris of Decarabian's City", "Fragment of Decarabian's Epic", "Scattered Piece of Decarabian's Dream"],
    "guyun": ["Luminous Sands from Guyun", "Lustrous Stone from Guyun", "Relic from Guyun", "Divine Body from Guyun"],
    "mask": ["Mask of the Wicked Lieutenant", "Mask of the Tiger's Bite", "Mask of the One-Horned", "Mask of the Kijin"],
    "mist_veiled": ["Mist Veiled Lead Elixir", "Mist Veiled Mercury Elixir", "Mist Veiled Gold Elixir", "Mist Veiled Primo Elixir"],
    "narukami": ["Narukami's Wisdom", "Narukami's Joy", "Narukami's Affection", "Narukami's Valor"],
    "talisman": ["Copper Talisman of the Forest Dew", "Iron Talisman of the Forest Dew", "Silver Talisman of the Forest Dew", "Golden Talisman of the Forest Dew"],
    "oasis": ["Oasis Garden's Reminiscence", "Oasis Garden's Kindness", "Oasis Garden's Mourning", "Oasis Garden's Truth"],
    "scorching": ["Echo of Scorching Might", "Remnant Glow of Scorching Might", "Dream of Scorching Might", "Olden Days of Scorching Might"]
}

// Gems:
let gemPrefixes = ["Sliver", "Fragment", "Chunk", "Gemstone"];
let gems = {
    "agnidus": "Agnidus Agate",
    "brilliant": "Brilliant Diamond",
    "prithiva": "Prithiva Topaz",
    "shivada": "Shivada Jade",
    "vajrada": "Vajrada Amethyst",
    "varunada": "Varunada Lazurite",
    "vayuda": "Vayuda Turquoise",
    "nagadus": "Nagadus Emerald"
}

function enemyDrop(name) {
    return enemyDrops[name];
}

function domainMaterial(name) {
    return domainMaterials[name];
}

function gem(name) {
    return gems[name];
}

function returnAllImages() {
    let images = [];

    for (const [el, val] of Object.entries(enemyDrops)) {
        for (let i of val) {
            images.push("/materials/" + i.replaceAll(" ", "_") + ".png");
        }
    }

    for (const [el, val] of Object.entries(domainMaterials)) {
        for (let i of val) {
            images.push("/materials/" + i.replaceAll(" ", "_") + ".png");
        }
    }

    for (const [el, val] of Object.entries(gems)) {
        for (let i of gemPrefixes) {
            images.push("/materials/" + val.replaceAll(" ", "_") + "_" + i + ".png");
        }
    }

    return images;
}

export { enemyDrop, domainMaterial, gem, returnAllImages, gemPrefixes };