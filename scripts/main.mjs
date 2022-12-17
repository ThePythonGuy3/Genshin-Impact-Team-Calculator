import { characters } from "./data/characters.mjs";
import { weapons, defaultWeaponNames } from "./data/weapons.mjs";
import { starColors, characterLevelExp, expBooksValue } from "./data/misc.mjs";

// Sorting by material type
let materialOrderList = ["Enemy Drops", "Local Items", "Gems", "Boss Drops"];
let weaponMaterialOrderList = ["Domain Materials", "Elite Enemy Drops", "Enemy Drops"];

let defaultWeapons = {};

let selectedCharacter = 0,
    currentTeam = [null, null, null, null],
    currentCharacterLevel = [1, 1, 1, 1],
    currentCharacterAscended = [false, false, false, false],
    ascensionTeam = false,
    teamTargetLevel = 20,

    selectedWeapons = 0,
    currentWeapons = [weapons["Dull Blade"], weapons["Dull Blade"], weapons["Dull Blade"], weapons["Dull Blade"]],
    currentWeaponLevel = [1, 1, 1, 1],
    currentWeaponTargetLevel = [1, 1, 1, 1],
    currentWeaponAscensions = [false, false, false, false],
    currentWeaponTargetAscensions = [false, false, false, false],

    text = "";

// Get the weapon objects from the default names
for (const [type, name] of Object.entries(defaultWeaponNames)) {
    defaultWeapons[type] = weapons[name];
}

// --- Functionality begin ---

// Sets the root's css variables
function setElementStyleProperty(root, name, value) {
    root.style.setProperty("--" + name, value);
}

// Swaps dark mode on or off
function swapMode(root, nightCheck) {
    setElementStyleProperty(root, "lighterGray", !nightCheck.checked ? "#F0F0F0" : "#0F0F0F");
    setElementStyleProperty(root, "lightGray", !nightCheck.checked ? "#E0E0E0" : "#1F1F1F");
    setElementStyleProperty(root, "gray", !nightCheck.checked ? "#E0E0E0" : "#2F2F2F");
    setElementStyleProperty(root, "darkGray", !nightCheck.checked ? "#C0C0C0" : "#3F3F3F");
    setElementStyleProperty(root, "darkerGray", !nightCheck.checked ? "#B0B0B0" : "#4F4F4F");

    setElementStyleProperty(root, "cinnamon", !nightCheck.checked ? "#F2EEE6" : "#0F0F0F");
    setElementStyleProperty(root, "darkCinnamon", !nightCheck.checked ? "#CCBAAD" : "#2F2F2F");
    setElementStyleProperty(root, "darkerCinnamon", !nightCheck.checked ? "#9C8270" : "#4F4F4F");

    setElementStyleProperty(root, "lvInput", !nightCheck.checked ? "#FEFEFE" : "#1F1F1F");
    setElementStyleProperty(root, "weapLvInput", !nightCheck.checked ? "#FEFEFE" : "#3F3F3F");
    setElementStyleProperty(root, "wpInput", !nightCheck.checked ? "#FEFEFE" : "#0F0F0F");

    setElementStyleProperty(root, "ae", !nightCheck.checked ? "#AEAEAE" : "#515151");
    setElementStyleProperty(root, "be", !nightCheck.checked ? "#BEBEBE" : "#414141");
    setElementStyleProperty(root, "ce", !nightCheck.checked ? "#CECECE" : "#313131");
    setElementStyleProperty(root, "de", !nightCheck.checked ? "#DEDEDE" : "#212121");
    setElementStyleProperty(root, "ee", !nightCheck.checked ? "#EEEEEE" : "#111111");
    setElementStyleProperty(root, "fe", !nightCheck.checked ? "#FEFEFE" : "#010101");

    setElementStyleProperty(root, "bg", !nightCheck.checked ? "#FBFAFF" : "#040500");

    setElementStyleProperty(root, "dark", !nightCheck.checked ? "#505050" : "#AFAFAF");
    setElementStyleProperty(root, "black", !nightCheck.checked ? "#303030" : "#CFCFCF");
    setElementStyleProperty(root, "blackest", !nightCheck.checked ? "#020202" : "#FDFDFD");

    setElementStyleProperty(root, "sliderBG", !nightCheck.checked ? "#F5F5F5" : "#0A0A0A");
    setElementStyleProperty(root, "sliderHandle", !nightCheck.checked ? "#9F9F9F" : "#606060");

    setElementStyleProperty(root, "teamCardHover", !nightCheck.checked ? "#C8C8C8" : "#373737");
    setElementStyleProperty(root, "teamCardActive", !nightCheck.checked ? "#B8B8B8" : "#474747");

    setElementStyleProperty(root, "removeHover", !nightCheck.checked ? "#E22525" : "#1DDADA");
    setElementStyleProperty(root, "removeActive", !nightCheck.checked ? "#D62525" : "#29DADA");

    setElementStyleProperty(root, "materialColor", !nightCheck.checked ? "#917764" : "#BABABA");
    setElementStyleProperty(root, "materialTitleColor", !nightCheck.checked ? "#7D624D" : "#CFCFCF");
}

// Returns the ascension level from the raw level
function getAscensionfromLevel(level) {
    if (level <= 40) {
        return Math.floor(level / 20);
    } else if (level < 90) {
        return Math.floor((level - 40) / 10) + 2;
    } else {
        return 6;
    }
}

// Adds a material title to the material pool
function addMaterialTitle(parent, data) {
    let materialTitle = document.createElement("p");
    materialTitle.className = "material";
    materialTitle.innerHTML = data;

    parent.appendChild(materialTitle);
}

// Adds a material tag to the material pool
function addMaterialTag(parent, material, materialTextElement, amount) {
    let materialTagContainerElement = document.createElement("div");
    materialTagContainerElement.className = "materialTagContainerElement";

    let materialImageContainer = document.createElement("div");
    materialImageContainer.className = "materialImageContainer";

    let materialImage = document.createElement("img");
    materialImage.className = "materialImage";
    materialImage.src = "resources/materials/" + material.replaceAll(" ", "_") + ".png";

    let materialAmountText = document.createElement("p");
    materialAmountText.className = "material floatRight";
    materialAmountText.innerHTML = "x" + amount;

    materialImageContainer.appendChild(materialImage);
    materialTagContainerElement.appendChild(materialImageContainer);
    materialTagContainerElement.appendChild(materialTextElement);
    materialTagContainerElement.appendChild(materialAmountText);

    let materialTagFullContainerElement = document.createElement("div");
    materialTagFullContainerElement.className = "materialTagFullContainerElement";

    materialTagFullContainerElement.appendChild(materialTagContainerElement);

    parent.appendChild(materialTagFullContainerElement);
}

// Get an rgb color array from a hex string
function rgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? [
        parseInt(result[1], 16), // r
        parseInt(result[2], 16), // g
        parseInt(result[3], 16)  // b
    ] : null;
}

// Returns a number from 0-255 as a hex part (for colors)
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// Gets three values (r, g, b) and returns the hex counterpart
function hex(r, g, b) {
    if (r > 255) r = 255;
    if (g > 255) g = 255;
    if (b > 255) b = 255;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Get the width of a given text
function textWidth(text, font) {
    var tag = document.createElement("div");
    tag.style.position = "absolute";
    tag.style.left = "-99in";
    tag.style.whiteSpace = "nowrap";
    tag.style.font = font;
    tag.innerHTML = text;

    document.body.appendChild(tag);
    let result = tag.clientWidth;
    document.body.removeChild(tag);

    return result;
}

// Check if a given level would apply for ascension
function isAscension(level) {
    return level == 20 || level == 40 || level == 50 || level == 60 || level == 70 || level == 80;
}

window.onload = function () {
    document.getElementById("javascriptDisabledError").style.display = "none";

    let root = document.querySelector(":root");
    let darkModeSwitch = document.getElementById("darkModeCheckbox");

    let teamTargetLevelField = document.getElementById("teamTargetLevelField");
    let teamAscensionCheckbox = document.getElementById("teamAscensionCheckbox");

    let characterFindField = document.getElementById("characterFindField");
    let characterScrollPane = document.getElementById("characterScrollPane");

    let weaponFindField = document.getElementById("weaponFindField");
    let weaponScrollpane = document.getElementById("weaponScrollPane");
    
    let downloadPopupWindow = document.getElementById("downloadPopupWindow");
    let weaponPopupWindow = document.getElementById("weaponPopupWindow");

    let calculateButton = document.getElementById("calculateButton");
    let downloadButton = document.getElementById("downloadButton");
    
    let fileNamefield = document.getElementById("fileNameField");

    let popupDownloadButton = document.getElementById("popupDownloadButton");
    let popupCancelButton = document.getElementById("popupCancelButton");

    let weaponPopupAcceptButton = document.getElementById("weaponPopupAcceptButton");

    let characterMaterialPane = document.getElementById("characterMaterialPane");
    let weaponMaterialPane = document.getElementById("weaponMaterialPane");

    let teamContainer = document.getElementById("teamContainer");
    let weaponContainer = document.getElementById("weaponContainer");
    
    let selectedWeaponImage = document.getElementById("selectedWeaponImage");
    let selectedWeaponName = document.getElementById("selectedWeaponName");

    let selectedWeaponCurrentLevelField = document.getElementById("selectedWeaponCurrentLevelField");
    let selectedWeaponTargetLevelField = document.getElementById("selectedWeaponTargetLevelField");

    let selectedWeaponCurrentAscendedCheckbox = document.getElementById("selectedWeaponCurrentAscendedCheckbox");
    let selectedWeaponTargetAscendedCheckbox = document.getElementById("selectedWeaponTargetAscendedCheckbox");

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkModeSwitch.checked = true;
        swapMode(root, darkModeSwitch);
    }

    darkModeSwitch.onchange = () => {
        swapMode(root, darkModeSwitch);
    }

    teamAscensionCheckbox.addEventListener('change', (event) => {
        ascensionTeam = event.currentTarget.checked;
    });

    teamTargetLevelField.addEventListener("input", () => {
        teamAscensionCheckbox.disabled = true;
        teamAscensionCheckbox.checked = false;
        if (teamTargetLevelField.value.length > 2) {
            teamTargetLevelField.value = teamTargetLevelField.value.slice(0, 2);
        }

        if (isAscension(teamTargetLevelField.value)) teamAscensionCheckbox.disabled = false;

        teamTargetLevel = teamTargetLevelField.value;
    });

    teamTargetLevelField.addEventListener("focusout", () => {
        if (teamTargetLevelField.value == "" || teamTargetLevelField.value == 0) teamTargetLevelField.value = 1;
        if (teamTargetLevelField.value > 90) teamTargetLevelField.value = 90;
        teamTargetLevel = teamTargetLevelField.value;
    });

    for (const [el, val] of Object.entries(characters)) {
        let elem = document.createElement("div"); // Character namecard container
        let c = rgb(starColors[val.stars - 1][0]);
        let c2 = rgb(starColors[val.stars - 1][1]);
        let cc = hex(c[0] + 50, c[1] + 50, c[2] + 50) + ", " + hex(c2[0] + 50, c2[1] + 50, c2[2] + 50);

        elem.style.backgroundImage = "linear-gradient(90deg, rgba(0,0,0,0) 80%, " + cc + ")";
        elem.className = "namecard";
        elem.tabIndex = 1;
        elem.onclick = function () {
            if (selectedCharacter != 0) {
                if (!currentTeam.includes(val)) {
                    let doc = document.getElementById("team" + selectedCharacter);
                    let self = event.currentTarget.children[0];

                    let selB = document.getElementById("sel" + selectedCharacter);
                    selB.disabled = true;
                    selB.checked = false;

                    doc.children[0].src = self.src;
                    doc.children[1].children[0].value = 1;
                    doc.children[3].src = "resources/" + val.weaponType + ".png";

                    currentTeam[selectedCharacter - 1] = val;
                    currentCharacterLevel[selectedCharacter - 1] = 1;

                    if (currentWeapons[selectedCharacter - 1].typ != val.weaponType) {
                        currentWeapons[selectedCharacter - 1] = defaultWeapons[val.weaponType];
                        document.getElementById("weapImg" + selectedCharacter).src = selectedWeaponImage.src = "./resources/weapons/" + defaultWeaponNames[val.weaponType].replaceAll(" ", "_").replaceAll("\"", "") + ".png";
                        selectedWeaponName.innerHTML = defaultWeaponNames[val.weaponType];

                        currentWeaponLevel[selectedCharacter - 1] = 1;
                        currentWeaponTargetLevel[selectedCharacter - 1] = 1;
                        currentWeaponAscensions[selectedCharacter - 1] = false;
                        currentWeaponTargetAscensions[selectedCharacter - 1] = false;
                    }

                    if (selectedCharacter < 4 && currentTeam[selectedCharacter] == null) {
                        selectedCharacter++;
                        document.getElementById("team" + selectedCharacter).focus();
                    } else selectedCharacter = 0;
                } else document.getElementById("team" + selectedCharacter).focus();
            }
        }

        let img = document.createElement("img"); // Face image
        img.className = "image";

        if (val.alias == null) img.src = "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_" + el + ".png";
        else img.src = "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_" + val.alias + ".png";

        if (el == "Traveler") img.src = "./resources/traveler.png";

        let elem2 = document.createElement("p"); // Name
        elem2.className = "name";
        elem2.style.width = "100px";

        if (textWidth(el, "16px Genshin") > 100) {
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

        for (let s = 0; s < val.stars; s++) {
            let elem2 = document.createElement("img");
            elem2.className = "star";
            elem2.src = "./resources/star.png"
            contDiv.appendChild(elem2);
        }

        elem.appendChild(contDiv);

        characterScrollPane.appendChild(elem);
    }

    characterFindField.addEventListener("input", () => {
        let i = 0;
        for (const [el, val] of Object.entries(characters)) {
            if (el.toLowerCase().includes(characterFindField.value.toLowerCase())) {
                characterScrollPane.children[i].style.display = "block";
            } else {
                characterScrollPane.children[i].style.display = "none";
            }
            i++;
        }
    });

    weaponFindField.addEventListener("input", () => {
        let i = 0;
        for (const [el, val] of Object.entries(weapons)) {
            let pla = currentTeam[selectedWeapons - 1];
            if (!(pla != null && val.type != pla.weaponType) && el.toLowerCase().includes(weaponFindField.value.toLowerCase())) {
                weaponScrollpane.children[i].style.display = "block";
            } else {
                weaponScrollpane.children[i].style.display = "none";
            }
            i++;
        }
    });

    for (const [el, val] of Object.entries(weapons)) {
        let elem = document.createElement("div"); // Character namecard container
        let c = rgb(starColors[val.stars - 1][0]);
        let c2 = rgb(starColors[val.stars - 1][1]);
        let cc = hex(c[0] + 50, c[1] + 50, c[2] + 50) + ", " + hex(c2[0] + 50, c2[1] + 50, c2[2] + 50);

        elem.style.backgroundImage = "linear-gradient(90deg, rgba(0,0,0,0) 80%, " + cc + ")";
        elem.className = "namecard";
        elem.style.width = "330px";
        elem.tabIndex = 1;
        elem.onclick = function () {
            if (selectedWeapons != 0) {
                currentWeapons[selectedWeapons - 1] = val;

                document.getElementById("weapImg" + selectedWeapons).src = selectedWeaponImage.src = "./resources/weapons/" + el.replaceAll(" ", "_").replaceAll("\"", "") + ".png";
                selectedWeaponName.innerHTML = el;
            }
        }

        let img = document.createElement("img"); // Weapon image
        img.className = "image";

        img.src = "./resources/weapons/" + el.replaceAll(" ", "_").replaceAll("\"", "") + ".png";

        let elem2 = document.createElement("p"); // Name
        elem2.className = "weapname";
        elem2.style.width = "160px";
        elem2.style.marginTop = "14spx";
        if (textWidth(el, "16px Genshin") > 160) {
            elem2.style.marginTop = "7px";
        }
        elem2.innerHTML = el;

        elem.appendChild(img);
        elem.appendChild(elem2);

        let contDiv = document.createElement("div");
        contDiv.style.float = "right";
        contDiv.style.marginRight = "10px";

        for (let s = 0; s < val.stars; s++) {
            let elem2 = document.createElement("img");
            elem2.className = "star";
            elem2.src = "./resources/star.png"
            contDiv.appendChild(elem2);
        }

        elem.appendChild(contDiv);

        weaponScrollpane.appendChild(elem);
    }

    for (let i = 1; i < 5; i++) {
        let characterCard = document.createElement("div");
        characterCard.id = "teamcont" + i;
        characterCard.className = "teamCard";

        let characterLevelCard = document.createElement("div");
        characterLevelCard.tabIndex = "1";
        characterLevelCard.id = "team" + i;
        characterLevelCard.className = "characterLevelCard";

        characterLevelCard.onclick = () => {
            selectedCharacter = i;
        }

        let characterImage = document.createElement("img");
        characterImage.src = "resources/plus.png";
        characterImage.className = "characterImage";

        let characterLevelTag = document.createElement("p");
        characterLevelTag.innerHTML = "Lv.";
        characterLevelTag.className = "teamLevelTag";

        let characterAscensionCheckbox = document.createElement("input");
        characterAscensionCheckbox.disabled = true;

        characterAscensionCheckbox.addEventListener('change', (event) => {
            currentCharacterAscended[i - 1] = event.currentTarget.checked;
        });

        let characterLevelField = document.createElement("input");
        characterLevelField.className = "levelinput";
        characterLevelField.id = "input" + i;
        characterLevelField.type = "number";
        characterLevelField.addEventListener("input", () => {
            characterAscensionCheckbox.checked = false;
            characterAscensionCheckbox.disabled = true;
            currentCharacterAscended[i - 1] = false;

            if (characterLevelField.value.length > 2) {
                characterLevelField.value = characterLevelField.value.slice(0, 2);
            }

            if (isAscension(characterLevelField.value)) characterAscensionCheckbox.disabled = false;

            currentCharacterLevel[i - 1] = characterLevelField.value;
        });

        characterLevelField.addEventListener("focus", () => {
            selectedCharacter = 0;
        });

        characterLevelField.addEventListener("focusout", () => {
            if (characterLevelField.value == "" || characterLevelField.value == 0) characterLevelField.value = 1;
            if (characterLevelField.value > 90) characterLevelField.value = 90;
            currentCharacterLevel[i - 1] = characterLevelField.value;
            selectedCharacter = 0;
        });

        characterLevelField.value = "0";

        characterAscensionCheckbox.id = "sel" + i;
        characterAscensionCheckbox.type = "checkbox";
        characterAscensionCheckbox.className = "check";

        let im2 = document.createElement("img");
        im2.className = "weapon";

        let teamremove = document.createElement("p");
        teamremove.tabIndex = "1";
        teamremove.className = "remove";
        teamremove.innerHTML = "-";

        teamremove.onclick = event => {
            currentTeam[i - 1] = null;
            currentWeapons[i - 1] = defaultWeapons["sword"];

            document.getElementById("weapImg" + i).src = selectedWeaponImage.src = "./resources/weapons/" + defaultWeaponNames["sword"].replaceAll(" ", "_").replaceAll("\"", "") + ".png";
            selectedWeaponName.innerHTML = defaultWeaponNames["sword"];

            currentWeaponLevel[i - 1] = 1;
            currentWeaponTargetLevel[i - 1] = 1;
            currentWeaponAscensions[i - 1] = false;
            currentWeaponTargetAscensions[i - 1] = false;

            characterImage.src = "resources/plus.png";
            characterLevelTag.children[0].value = 0;
            im2.src = "";
        }

        characterLevelTag.appendChild(characterLevelField);
        characterLevelCard.appendChild(characterImage);
        characterLevelCard.appendChild(characterLevelTag);
        characterLevelCard.appendChild(characterAscensionCheckbox);
        characterLevelCard.appendChild(im2);
        characterCard.appendChild(teamremove);
        characterCard.appendChild(characterLevelCard);
        teamContainer.appendChild(characterCard);

        let imW = document.createElement("img");
        imW.title = "Select Weapon";
        imW.src = "./resources/weapons/Dull_Blade.png";
        imW.className = "weapImg";
        imW.id = "weapImg" + i;

        imW.onclick = event => {
            selectedWeapons = i;

            selectedWeaponCurrentAscendedCheckbox.checked = !currentWeaponAscensions[i - 1];
            selectedWeaponTargetAscendedCheckbox.checked = !currentWeaponTargetAscensions[i - 1];
            selectedWeaponCurrentAscendedCheckbox.disabled = !isAscension(currentWeaponLevel[i - 1]);
            selectedWeaponTargetAscendedCheckbox.disabled = !isAscension(currentWeaponTargetLevel[i - 1]);
            selectedWeaponImage.src = imW.src;
            selectedWeaponName.innerHTML = imW.src.split("/").slice(-1).toString().replaceAll("_", " ").replaceAll(".png", "");
            selectedWeaponCurrentLevelField.value = currentWeaponLevel[i - 1];
            selectedWeaponTargetLevelField.value = currentWeaponTargetLevel[i - 1];
            selectedWeaponCurrentAscendedCheckbox.checked = currentWeaponAscensions[i - 1];
            selectedWeaponTargetAscendedCheckbox.checked = currentWeaponTargetAscensions[i - 1];
            if (selectedWeaponName.innerHTML == "The Catch") selectedWeaponName.innerHTML = '"The Catch"';

            let i2 = 0;
            for (const [el, val] of Object.entries(weapons)) {
                let pla = currentTeam[i - 1];
                if (pla != null && val.type != pla.weaponType) {
                    weaponScrollpane.children[i2].style.display = "none";
                } else {
                    weaponScrollpane.children[i2].style.display = "block";
                }
                i2++;
            }

            weaponPopupWindow.style.display = "flex";
            weaponScrollpane.scrollTo(0, 0);
        }

        weaponContainer.appendChild(imW);
    }

    selectedWeaponCurrentLevelField.addEventListener('input', (event) => {
        selectedWeaponCurrentAscendedCheckbox.checked = false;
        selectedWeaponCurrentAscendedCheckbox.disabled = true;
        currentWeaponAscensions[selectedWeapons - 1] = false;

        if (selectedWeaponCurrentLevelField.value.length > 2) {
            selectedWeaponCurrentLevelField.value = selectedWeaponCurrentLevelField.value.slice(0, 2);
        }

        if (isAscension(selectedWeaponCurrentLevelField.value)) selectedWeaponCurrentAscendedCheckbox.disabled = false;

        currentWeaponLevel[selectedWeapons - 1] = selectedWeaponCurrentLevelField.value;
    });

    selectedWeaponTargetLevelField.addEventListener('input', (event) => {
        selectedWeaponTargetAscendedCheckbox.checked = false;
        selectedWeaponTargetAscendedCheckbox.disabled = true;
        currentWeaponTargetAscensions[selectedWeapons - 1] = false;

        if (selectedWeaponTargetLevelField.value.length > 2) {
            selectedWeaponTargetLevelField.value = selectedWeaponTargetLevelField.value.slice(0, 2);
        }

        if (isAscension(selectedWeaponTargetLevelField.value)) selectedWeaponTargetAscendedCheckbox.disabled = false;

        currentWeaponTargetLevel[selectedWeapons - 1] = selectedWeaponTargetLevelField.value;
    });

    selectedWeaponCurrentAscendedCheckbox.addEventListener('change', (event) => {
        currentWeaponAscensions[selectedWeapons - 1] = selectedWeaponCurrentAscendedCheckbox.checked;
    });

    selectedWeaponTargetAscendedCheckbox.addEventListener('change', (event) => {
        currentWeaponTargetAscensions[selectedWeapons - 1] = selectedWeaponTargetAscendedCheckbox.checked;
    });

    calculateButton.onclick = event => {
        // Characters

        let done = false;
        let matDict = {};
        text = "# Character level-up Materials\n\n";

        while (characterMaterialPane.firstChild) {
            characterMaterialPane.removeChild(characterMaterialPane.lastChild);
        }

        let exp_need = [];
        for (let i = 1; i < 5; i++) {
            if (currentTeam[i - 1] == null) continue;

            let maxTier = getAscensionfromLevel(teamTargetLevel) - ((1 - ascensionTeam) * isAscension(teamTargetLevel));
            let minTier = getAscensionfromLevel(currentCharacterLevel[i - 1]) - ((1 - currentCharacterAscended[i - 1]) * isAscension(currentCharacterLevel[i - 1]));

            if (maxTier == NaN || minTier == NaN) continue;

            let tier = 0, pre_tier = 0;
            let exp_requirement = 0;
            for (let e = currentCharacterLevel[i - 1]; e < teamTargetLevel; e++) {
                tier = getAscensionfromLevel(e - 1)

                if (tier != pre_tier) {
                    exp_need.push(exp_requirement);
                    exp_requirement = 0;
                }

                exp_requirement += characterLevelExp[e - 1];
                pre_tier = tier;
            }

            exp_need.push(exp_requirement);

            if (maxTier == 0) continue;

            for (let p = minTier + 1; p <= maxTier; p++) {
                if (p == 0) continue;

                let mat = currentTeam[i - 1].getDrop(p - 1);

                for (let j = 0; j < mat.length; j++) {
                    if (parseInt(mat[j][1]) == 0) continue;
                    let vv = materialOrderList[j] + "^" + mat[j][0];
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
            for (let ei = 0; ei < exp_need.length; ei++) {
                let tbig = Math.floor(exp_need[ei] / expBooksValue[2]);
                let tmedium = Math.floor((exp_need[ei] - (tbig * expBooksValue[2])) / expBooksValue[1]);
                let tsmall = Math.ceil((exp_need[ei] - (tbig * expBooksValue[2]) - (tmedium * expBooksValue[1])) / expBooksValue[0]);

                big += tbig;
                medium += tmedium;
                small += tsmall;
            }

            text += "## EXP Books (Most optimal EXP distribution)\n";
            addMaterialTitle(characterMaterialPane, "——EXP Books (Most optimal EXP distribution)——\n");

            if (big != 0) {
                let bpp = document.createElement("p");
                bpp.className = "material floatLeft";
                bpp.innerHTML = "Hero's Wit";

                text += "- Hero's Wit x" + big.toString() + "\n";

                addMaterialTag(characterMaterialPane, "Hero's Wit", bpp, big);
            }

            if (medium != 0) {
                let mpp = document.createElement("p");
                mpp.className = "material floatLeft";
                mpp.innerHTML = "Adventurer's Experience";

                text += "- Adventurer's Experience x" + medium.toString() + "\n";

                addMaterialTag(characterMaterialPane, "Adventurer's Experience", mpp, medium);
            }

            if (small != 0) {
                let spp = document.createElement("p");
                spp.className = "material floatLeft";
                spp.innerHTML = "Adventurer's Experience";

                text += "- Wanderer's Advice x" + small.toString() + "\n";

                addMaterialTag(characterMaterialPane, "Wanderer's Advice", spp, small);
            }

            text += "\n";
            addMaterialTitle(characterMaterialPane, "­");
        }

        if (exp_need == 0 && !done) {
            let pp = document.createElement("p");
            pp.className = "material";
            pp.innerHTML = "-";

            characterMaterialPane.appendChild(pp);
        } else {
            let newMatDict = {};

            let items = Object.keys(matDict).map(function (key) {
                return [key, matDict[key]];
            });
            items.sort(function (first, second) {
                let ind1 = first[0].split("^")[0];
                let ind2 = second[0].split("^")[0];
                return materialOrderList.indexOf(ind1) - materialOrderList.indexOf(ind2);
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
                    characterMaterialPane.appendChild(pp2);
                }

                text += "- " + vv[1] + " x" + value + "\n";

                addMaterialTag(characterMaterialPane, vv[1], pp, value);

                preV = vv[0];
            }
        }

        // Weapons
        done = false;
        matDict = {};

        text += "\n\n# Weapon level-up Materials\n\n";

        while (weaponMaterialPane.firstChild) {
            weaponMaterialPane.removeChild(weaponMaterialPane.lastChild);
        }

        for (let i = 1; i < 5; i++) {
            if (currentWeapons[i - 1] == null) continue;

            let maxTier = getAscensionfromLevel(currentWeaponTargetLevel[i - 1]) - ((1 - currentWeaponTargetAscensions[i - 1]) * isAscension(currentWeaponTargetLevel[i - 1]));
            let minTier = getAscensionfromLevel(currentWeaponLevel[i - 1]) - ((1 - currentWeaponAscensions[i - 1]) * isAscension(currentWeaponLevel[i - 1]));

            if (maxTier == NaN) continue;
            if (minTier == NaN) continue;

            if (maxTier == 0) continue;

            for (let p = minTier + 1; p <= maxTier; p++) {
                if (p == 0) continue;

                let mat = currentWeapons[i - 1].getDrop(p - 1);

                for (let j = 0; j < mat.length; j++) {
                    if (parseInt(mat[j][1]) == 0) continue;
                    let vv = weaponMaterialOrderList[j] + "^" + mat[j][0];
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

            weaponMaterialPane.appendChild(pp);
        } else {
            let newMatDict = {};

            let items = Object.keys(matDict).map(function (key) {
                return [key, matDict[key]];
            });
            items.sort(function (first, second) {
                let ind1 = first[0].split("^")[0];
                let ind2 = second[0].split("^")[0];
                return weaponMaterialOrderList.indexOf(ind1) - weaponMaterialOrderList.indexOf(ind2);
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
                    pp2.innerHTML = txt.replace("## ", "——") + "——";

                    text += txt.replace("<br>", "\n").replace("­", "") + "\n";
                    weaponMaterialPane.appendChild(pp2);
                }

                text += "- " + vv[1] + " x" + value + "\n";

                addMaterialTag(weaponMaterialPane, vv[1], pp, value);

                preV = vv[0];
            }
        }

        text += "\n#### NOTE: This file can be stylized with a MARKDOWN viewer."
    }

    downloadButton.onclick = event => {
        if (text != "") {
            downloadPopupWindow.style.display = "flex";
        }
    }

    popupCancelButton.onclick = event => {
        downloadPopupWindow.style.display = "none";
    }

    weaponPopupAcceptButton.onclick = event => {
        selectedWeapons = 0;
        weaponPopupWindow.style.display = "none";

        weaponFindField.value = "";
    }

    popupDownloadButton.onclick = event => {
        let blob = new Blob([text], { type: "text/plain;charset=utf-8" });

        let name = "MyTeam.txt";
        if (fileNamefield.value != "") name = fileNamefield.value + ".txt";

        saveAs(blob, name, { type: "text/plain;charset=utf-8" });
    }

    document.getElementById("loader").style.display = "none";
}

document.addEventListener('focusout', event => {
    if (event.relatedTarget == null || (event.relatedTarget.className != "namecard" && event.relatedTarget.className != "teamcard")) selectedCharacter = 0;
}, true);