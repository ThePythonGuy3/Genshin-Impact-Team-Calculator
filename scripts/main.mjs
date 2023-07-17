import { characters } from "./data/characters.mjs";
import { weapons, defaultWeaponNames } from "./data/weapons.mjs";
import { starColors, characterLevelExp, expBooksValue } from "./data/misc.mjs";
import { returnAllImages } from "./data/materials.mjs";

// Sorting by material type
let materialOrderList = ["Enemy Drops", "Local Items", "Gems", "Boss Drops"];
let weaponMaterialOrderList = ["Domain Materials", "Elite Enemy Drops", "Enemy Drops"];

let defaultWeapons = {};

let selectedCharacter = 0,
    currentTeam = [null, null, null, null],
    currentCharacterLevel = [1, 1, 1, 1],
    currentCharacterAscended = [false, false, false, false],
    currentCharacterTargetLevel = [1, 1, 1, 1],
    currentCharacterTargetAscended = [false, false, false, false],

    selectedWeapon = 0,
    currentWeapons = [weapons["Dull Blade"], weapons["Dull Blade"], weapons["Dull Blade"], weapons["Dull Blade"]],
    currentWeaponLevel = [1, 1, 1, 1],
    currentWeaponTargetLevel = [1, 1, 1, 1],
    currentWeaponAscended = [false, false, false, false],
    currentWeaponTargetAscended = [false, false, false, false],

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
    let nameCards = document.getElementsByClassName("nameCard");

    for (let i = 0; i < nameCards.length; i++) {
        if (nightCheck.checked) {
            nameCards[i].classList.add("disableBackgroundImage");
        } else {
            nameCards[i].classList.remove("disableBackgroundImage");
        }
    }

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

    setElementStyleProperty(root, "swInput", !nightCheck.checked ? "#FFCF45" : "#AFAFAF");

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

function generateCard(i) {
    let characterCard = document.createElement("div");
    characterCard.id = "teamcont" + i;
    characterCard.className = "teamCard";

    let characterLevelCard = document.createElement("div");
    characterLevelCard.tabIndex = "1";
    characterLevelCard.id = "team" + i;
    characterLevelCard.className = "characterLevelCard";

    let characterImage = document.createElement("img");
    characterImage.src = "resources/plus.png";
    characterImage.className = "characterImage";

    characterImage.onclick = () => {
        if (selectedCharacter != 0) document.getElementById("team" + selectedCharacter).classList.remove("teamFocus");
        selectedCharacter = i;
        characterLevelCard.classList.add("teamFocus");
    }

    let characterLevelTag = document.createElement("div");
    characterLevelTag.className = "teamLevelTag";

    let characterAscensionCheckbox = document.createElement("input");
    characterAscensionCheckbox.disabled = true;

    let characterAscensionTargetCheckbox = document.createElement("input");
    characterAscensionTargetCheckbox.disabled = true;

    characterAscensionCheckbox.addEventListener('change', (event) => {
        currentCharacterAscended[i - 1] = event.currentTarget.checked;
    });

    characterAscensionTargetCheckbox.addEventListener('change', (event) => {
        currentCharacterTargetAscended[i - 1] = event.currentTarget.checked;
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
        if (selectedCharacter != 0) document.getElementById("team" + selectedCharacter).classList.remove("teamFocus");
        selectedCharacter = 0;
    });

    characterLevelField.addEventListener("focusout", () => {
        if (characterLevelField.value == "" || characterLevelField.value == 0) characterLevelField.value = 1;
        if (characterLevelField.value > 90) characterLevelField.value = 90;
        currentCharacterLevel[i - 1] = characterLevelField.value;
        if (selectedCharacter != 0) document.getElementById("team" + selectedCharacter).classList.remove("teamFocus");
        selectedCharacter = 0;
    });

    characterLevelField.value = "0";
    characterLevelField.disabled = true;

    let characterLevelTargetField = document.createElement("input");
    characterLevelTargetField.className = "levelinput2";
    characterLevelTargetField.id = "targetinput" + i;
    characterLevelTargetField.type = "number";
    characterLevelTargetField.addEventListener("input", () => {
        characterAscensionTargetCheckbox.checked = false;
        characterAscensionTargetCheckbox.disabled = true;
        currentCharacterTargetAscended[i - 1] = false;

        if (characterLevelTargetField.value.length > 2) {
            characterLevelTargetField.value = characterLevelTargetField.value.slice(0, 2);
        }

        if (isAscension(characterLevelTargetField.value)) characterAscensionTargetCheckbox.disabled = false;

        currentCharacterTargetLevel[i - 1] = characterLevelTargetField.value;
    });

    characterLevelTargetField.addEventListener("focus", () => {
        if (selectedCharacter != 0) document.getElementById("team" + selectedCharacter).classList.remove("teamFocus");
        selectedCharacter = 0;
    });

    characterLevelTargetField.addEventListener("focusout", () => {
        if (characterLevelTargetField.value == "" || characterLevelTargetField.value == 0) characterLevelTargetField.value = 1;
        if (characterLevelTargetField.value > 90) characterLevelTargetField.value = 90;
        currentCharacterTargetLevel[i - 1] = characterLevelTargetField.value;
        if (selectedCharacter != 0) document.getElementById("team" + selectedCharacter).classList.remove("teamFocus");
        selectedCharacter = 0;
    });

    characterLevelTargetField.value = "0";
    characterLevelTargetField.disabled = true;

    characterAscensionCheckbox.id = "sel" + i;
    characterAscensionCheckbox.type = "checkbox";
    characterAscensionCheckbox.className = "check";

    characterAscensionTargetCheckbox.id = "selTarget" + i;
    characterAscensionTargetCheckbox.type = "checkbox";
    characterAscensionTargetCheckbox.className = "check2";

    let im2 = document.createElement("img");
    im2.className = "weapon";

    let teamremove = document.createElement("div");
    teamremove.tabIndex = "1";
    teamremove.className = "remove";
    teamremove.innerHTML = "-";

    teamremove.onclick = event => {
        currentTeam[i - 1] = null;
        currentWeapons[i - 1] = defaultWeapons["sword"];

        document.getElementById("weapon" + i).children[0].src = "./resources/weapons/" + defaultWeaponNames["sword"].replaceAll(" ", "_").replaceAll("\"", "") + ".png";

        currentWeaponLevel[i - 1] = 1;
        currentWeaponTargetLevel[i - 1] = 1;
        currentWeaponAscended[i - 1] = false;
        currentWeaponTargetAscended[i - 1] = false;

        characterImage.src = "resources/plus.png";
        characterLevelTag.children[0].value = 0;
        characterLevelTag.children[1].value = 0;
        characterLevelTag.children[0].disabled = true;
        characterLevelTag.children[1].disabled = true;
        characterLevelTag.children[2].disabled = true;
        characterLevelTag.children[3].disabled = true;
        im2.src = "";
    }

    let characterLevelText = document.createElement("div");
    characterLevelText.id = "levelText";

    let characterLevelTargetText = document.createElement("div");
    characterLevelTargetText.id = "levelText2";

    characterLevelText.innerHTML = characterLevelTargetText.innerHTML = "Lv.";

    characterLevelTag.appendChild(characterLevelField);
    characterLevelTag.appendChild(characterLevelTargetField);
    characterLevelTag.appendChild(characterAscensionCheckbox);
    characterLevelTag.appendChild(characterAscensionTargetCheckbox);
    characterLevelTag.appendChild(characterLevelText);
    characterLevelTag.appendChild(characterLevelTargetText);
    characterLevelCard.appendChild(characterImage);
    characterLevelCard.appendChild(characterLevelTag);
    characterLevelCard.appendChild(im2);
    characterCard.appendChild(teamremove);
    characterCard.appendChild(characterLevelCard);

    return characterCard;
}

function generateWeaponCard(i, weaponPopup) {
    let weaponCard = document.createElement("div");
    weaponCard.id = "weaponCard" + i;
    weaponCard.className = "weaponCard";

    let weaponLevelCard = document.createElement("div");
    weaponLevelCard.tabIndex = "1";
    weaponLevelCard.id = "weapon" + i;
    weaponLevelCard.className = "weaponLevelCard";

    weaponLevelCard.onclick = () => {
        selectedWeapon = i;
        weaponPopup.style.display = "flex";
    }

    let weaponImage = document.createElement("img");
    weaponImage.src = "./resources/weapons/Dull_Blade.png";
    weaponImage.className = "characterImage";

    let weaponLevelTag = document.createElement("div");
    weaponLevelTag.className = "teamLevelTag";

    let weaponAscensionCheckbox = document.createElement("input");
    weaponAscensionCheckbox.disabled = true;

    let weaponAscensionTargetCheckbox = document.createElement("input");
    weaponAscensionTargetCheckbox.disabled = true;

    weaponAscensionCheckbox.addEventListener('change', (event) => {
        currentWeaponAscended[i - 1] = event.currentTarget.checked;
    });

    weaponAscensionTargetCheckbox.addEventListener('change', (event) => {
        currentWeaponTargetAscended[i - 1] = event.currentTarget.checked;
    });

    let weaponLevelField = document.createElement("input");
    weaponLevelField.className = "levelinput";
    weaponLevelField.id = "weaponInput" + i;
    weaponLevelField.type = "number";
    weaponLevelField.addEventListener("input", () => {
        weaponAscensionCheckbox.checked = false;
        weaponAscensionCheckbox.disabled = true;
        currentWeaponAscended[i - 1] = false;

        if (weaponLevelField.value.length > 2) {
            weaponLevelField.value = weaponLevelField.value.slice(0, 2);
        }

        if (isAscension(weaponLevelField.value)) weaponAscensionCheckbox.disabled = false;

        currentWeaponLevel[i - 1] = weaponLevelField.value;
    });

    weaponLevelField.value = "0";

    let weaponLevelTargetField = document.createElement("input");
    weaponLevelTargetField.className = "levelinput2";
    weaponLevelTargetField.id = "weaponTargetinput" + i;
    weaponLevelTargetField.type = "number";
    weaponLevelTargetField.addEventListener("input", () => {
        weaponAscensionTargetCheckbox.checked = false;
        weaponAscensionTargetCheckbox.disabled = true;
        currentWeaponTargetAscended[i - 1] = false;

        if (weaponLevelTargetField.value.length > 2) {
            weaponLevelTargetField.value = weaponLevelTargetField.value.slice(0, 2);
        }

        if (isAscension(weaponLevelTargetField.value)) weaponAscensionTargetCheckbox.disabled = false;

        currentWeaponTargetLevel[i - 1] = weaponLevelTargetField.value;
    });

    weaponLevelTargetField.value = "0";

    weaponAscensionCheckbox.id = "weapSel" + i;
    weaponAscensionCheckbox.type = "checkbox";
    weaponAscensionCheckbox.className = "check";

    weaponAscensionTargetCheckbox.id = "weapSelTarget" + i;
    weaponAscensionTargetCheckbox.type = "checkbox";
    weaponAscensionTargetCheckbox.className = "check2";

    let weaponLevelText = document.createElement("div");
    weaponLevelText.id = "levelText";

    let weaponLevelTargetText = document.createElement("div");
    weaponLevelTargetText.id = "levelText2";

    weaponLevelText.innerHTML = weaponLevelTargetText.innerHTML = "Lv.";

    weaponLevelTag.appendChild(weaponLevelField);
    weaponLevelTag.appendChild(weaponLevelTargetField);
    weaponLevelTag.appendChild(weaponAscensionCheckbox);
    weaponLevelTag.appendChild(weaponAscensionTargetCheckbox);
    weaponLevelTag.appendChild(weaponLevelText);
    weaponLevelTag.appendChild(weaponLevelTargetText);
    weaponLevelCard.appendChild(weaponImage);
    weaponLevelCard.appendChild(weaponLevelTag);
    weaponCard.appendChild(weaponLevelCard);

    return weaponCard;
}

let title;
window.onload = function () {
    let root = document.querySelector(":root");
    let darkModeSwitch = document.getElementById("darkModeCheckbox");

    title = document.getElementById("title");

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

    let weaponPopupCancelButton = document.getElementById("weaponPopupCancelButton");

    let characterMaterialPane = document.getElementById("characterMaterialPane");
    let weaponMaterialPane = document.getElementById("weaponMaterialPane");

    let teamContainer = document.getElementById("teamContainer");
    let weaponContainer = document.getElementById("weaponContainer");

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkModeSwitch.checked = true;
        swapMode(root, darkModeSwitch);
    }

    darkModeSwitch.onchange = function () {
        swapMode(root, darkModeSwitch);
    }

    // Loading resources
    let imageLoader = document.createElement("img");
    imageLoader.style.display = "none";
    document.getElementsByTagName("body")[0].appendChild(imageLoader);

    let allImages = returnAllImages();

    for (let character of Object.keys(characters)) {
        allImages.push("/characters/" + character.replaceAll(" ", "_") + ".png");
    }

    for (let weapon of Object.keys(weapons)) {
        allImages.push("/weapons/" + weapon.replaceAll(" ", "_").replaceAll("\"", "") + ".png");
    }

    let miscImages = ["materials/Wanderer's_Advice", "materials/Adventurer's_Experience", "materials/Hero's_Wit", "bow", "catalyst", "claymore", "polearm", "sword", "download", "plus", "share", "star"]
    for (let miscImage of miscImages) {
        allImages.push("/" + miscImage.replaceAll(" ", "_") + ".png");
    }

    let imageId = 1;
    let loadingBarStick = document.getElementById("loadingBarStick");
    imageLoader.src = "resources" + allImages[0];

    imageLoader.onload = () => {
        if (imageId >= allImages.length) {
            document.getElementById("loader").style.opacity = "0";
            document.dispatchEvent(new Event("loaded"));
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 300);
        } else {
            imageLoader.src = "resources" + allImages[imageId];
            imageId++;

            loadingBarStick.style.width = "calc(" + (imageId / allImages.length) * 100 + "% - 4px)";
            void loadingBarStick.offsetWidth;
        }
    }

    document.getElementById("skipButton").onclick = () => {
        document.getElementById("loader").style.opacity = "0";
        document.dispatchEvent(new Event("loaded"));
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 300);
    }

    //--

    let loaded = false;
    document.addEventListener("loaded", () => {
        if (loaded) return;
        loaded = true;

        for (const [el, val] of Object.entries(characters)) {
            let namecard = document.createElement("div"); // Character namecard container
            let color1 = rgb(starColors[val.stars - 1][0]);
            let color2 = rgb(starColors[val.stars - 1][1]);
            let hexColor = hex(color1[0] + 50, color1[1] + 50, color1[2] + 50) + ", " + hex(color2[0] + 50, color2[1] + 50, color2[2] + 50);

            namecard.style.backgroundImage = "linear-gradient(90deg, rgba(0,0,0,0) 80%, " + hexColor + ")";
            namecard.className = "nameCard";
            namecard.tabIndex = 1;
            namecard.onclick = function (event) {
                if (selectedCharacter != 0) {
                    if (!currentTeam.includes(val)) {
                        characterFindField.value = "";
                        characterFindField.dispatchEvent(new Event("input"));

                        let doc = document.getElementById("team" + selectedCharacter);
                        let self = event.currentTarget.children[0];

                        let selB = document.getElementById("sel" + selectedCharacter);
                        selB.disabled = true;
                        selB.checked = false;

                        doc.children[0].src = self.src;
                        doc.children[1].children[0].disabled = false;
                        doc.children[1].children[1].disabled = false;
                        doc.children[1].children[0].value = 1;
                        doc.children[1].children[1].value = 90;
                        currentCharacterLevel[selectedCharacter - 1] = 1;
                        currentCharacterTargetLevel[selectedCharacter - 1] = 90;
                        currentCharacterAscended[selectedCharacter - 1] = false;
                        currentCharacterTargetAscended[selectedCharacter - 1] = false;
                        doc.children[2].src = "resources/" + val.weaponType + ".png";

                        currentTeam[selectedCharacter - 1] = val;
                        currentCharacterLevel[selectedCharacter - 1] = 1;

                        if (currentWeapons[selectedCharacter - 1].type != val.weaponType) {
                            currentWeapons[selectedCharacter - 1] = defaultWeapons[val.weaponType];
                            document.getElementById("weapon" + selectedCharacter).children[0].src = "./resources/weapons/" + defaultWeaponNames[val.weaponType].replaceAll(" ", "_").replaceAll("\"", "") + ".png";

                            currentWeaponLevel[selectedCharacter - 1] = 1;
                            currentWeaponTargetLevel[selectedCharacter - 1] = 1;
                            currentWeaponAscended[selectedCharacter - 1] = false;
                            currentWeaponTargetAscended[selectedCharacter - 1] = false;
                        }

                        if (selectedCharacter < 4) {
                            document.getElementById("team" + selectedCharacter).classList.remove("teamFocus");
                            selectedCharacter++;
                            document.getElementById("team" + selectedCharacter).classList.add("teamFocus");
                        } else {
                            document.getElementById("team" + selectedCharacter).classList.remove("teamFocus");
                            selectedCharacter = 0;
                        }
                    } else document.getElementById("team" + selectedCharacter).classList.add("teamFocus");
                }
            }

            let img = document.createElement("img"); // Face image
            img.className = "image";

            img.src = "./resources/characters/" + el.replace(" ", "_") + ".png";

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

            namecard.appendChild(img);
            namecard.appendChild(elem2);

            let contDiv = document.createElement("div");
            contDiv.style.float = "right";
            contDiv.style.marginRight = "10px";

            for (let s = 0; s < val.stars; s++) {
                let elem2 = document.createElement("img");
                elem2.className = "star";
                elem2.src = "./resources/star.png"
                contDiv.appendChild(elem2);
            }

            namecard.appendChild(contDiv);

            characterScrollPane.appendChild(namecard);
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
                let pla = currentTeam[selectedWeapon - 1];
                if (!(pla != null && val.type != pla.weaponType) && el.toLowerCase().includes(weaponFindField.value.toLowerCase())) {
                    weaponScrollpane.children[i].style.display = "block";
                } else {
                    weaponScrollpane.children[i].style.display = "none";
                }
                i++;
            }
        });

        for (const [el, val] of Object.entries(weapons)) {
            let elem = document.createElement("div"); // Weapon namecard container
            let c = rgb(starColors[val.stars - 1][0]);
            let c2 = rgb(starColors[val.stars - 1][1]);
            let cc = hex(c[0] + 50, c[1] + 50, c[2] + 50) + ", " + hex(c2[0] + 50, c2[1] + 50, c2[2] + 50);

            elem.style.backgroundImage = "linear-gradient(90deg, rgba(0,0,0,0) 80%, " + cc + ")";
            elem.className = "nameCard";
            elem.style.width = "330px";
            elem.tabIndex = 1;
            elem.onclick = function () {
                if (selectedWeapon != 0) {
                    weaponFindField.value = "";
                    weaponFindField.dispatchEvent(new Event("input"));

                    currentWeapons[selectedWeapon - 1] = val;

                    document.getElementById("weapon" + selectedWeapon).children[0].src = "./resources/weapons/" + el.replaceAll(" ", "_").replaceAll("\"", "") + ".png";
                }
            }

            let img = document.createElement("img"); // Weapon image
            img.className = "image";

            img.src = "./resources/weapons/" + el.replaceAll(" ", "_").replaceAll("\"", "") + ".png";

            let elem2 = document.createElement("p"); // Name
            elem2.className = "name";
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
            let characterCard = generateCard(i);

            teamContainer.appendChild(characterCard);

            let weaponCard = generateWeaponCard(i, weaponPopupWindow);

            weaponContainer.appendChild(weaponCard);
        }

        calculateButton.onclick = event => {
            // Characters

            let done = false;
            let matDict = {};
            let added = false;
            text = "# Character level-up Materials\n\n";

            while (characterMaterialPane.firstChild) {
                characterMaterialPane.removeChild(characterMaterialPane.lastChild);
            }

            let exp_need = [];
            for (let i = 1; i < 5; i++) {
                if (currentTeam[i - 1] == null) continue;

                let maxTier = getAscensionfromLevel(currentCharacterTargetLevel[i - 1]) - ((1 - currentCharacterTargetAscended[i - 1]) * isAscension(currentCharacterTargetLevel[i - 1]));
                let minTier = getAscensionfromLevel(currentCharacterLevel[i - 1]) - ((1 - currentCharacterAscended[i - 1]) * isAscension(currentCharacterLevel[i - 1]));

                if (maxTier == NaN || minTier == NaN) continue;

                let tier = 0, pre_tier = 0;
                let exp_requirement = 0;
                for (let e = currentCharacterLevel[i - 1]; e < currentCharacterTargetLevel[i - 1]; e++) {
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
                    added = true;

                    addMaterialTag(characterMaterialPane, "Hero's Wit", bpp, big);
                }

                if (medium != 0) {
                    let mpp = document.createElement("p");
                    mpp.className = "material floatLeft";
                    mpp.innerHTML = "Adventurer's Experience";

                    text += "- Adventurer's Experience x" + medium.toString() + "\n";
                    added = true;

                    addMaterialTag(characterMaterialPane, "Adventurer's Experience", mpp, medium);
                }

                if (small != 0) {
                    let spp = document.createElement("p");
                    spp.className = "material floatLeft";
                    spp.innerHTML = "Wanderer's Advice";

                    text += "- Wanderer's Advice x" + small.toString() + "\n";
                    added = true;

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
                        added = true;
                        characterMaterialPane.appendChild(pp2);
                    }

                    text += "- " + vv[1] + " x" + value + "\n";
                    added = true;

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

                let maxTier = getAscensionfromLevel(currentWeaponTargetLevel[i - 1]) - ((1 - currentWeaponTargetAscended[i - 1]) * isAscension(currentWeaponTargetLevel[i - 1]));
                let minTier = getAscensionfromLevel(currentWeaponLevel[i - 1]) - ((1 - currentWeaponAscended[i - 1]) * isAscension(currentWeaponLevel[i - 1]));

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
                        added = true;
                        weaponMaterialPane.appendChild(pp2);
                    }

                    text += "- " + vv[1] + " x" + value + "\n";
                    added = true;

                    addMaterialTag(weaponMaterialPane, vv[1], pp, value);

                    preV = vv[0];
                }
            }

            text += "\n#### NOTE: This file can be stylized with a MARKDOWN viewer."

            if (added) {
                downloadButton.classList.remove("disabled");
                downloadButton.classList.add("click");
            } else {
                downloadButton.classList.remove("click");
                downloadButton.classList.add("disabled");
                text = "";
            }
        }

        downloadButton.onclick = event => {
            if (text != "") {
                downloadPopupWindow.classList.remove("fadeOut");
                downloadPopupWindow.classList.add("fadeIn");
                downloadPopupWindow.style.display = "flex";
            }
        }

        popupCancelButton.onclick = event => {
            downloadPopupWindow.classList.remove("fadeIn");
            downloadPopupWindow.classList.add("fadeOut");

            setTimeout(() => {
                weaponPopupWindow.style.opacity = "0";
                downloadPopupWindow.style.display = "none";

                setTimeout(() => {
                    weaponPopupWindow.style.opacity = "1";
                }, 50);
            }, 200);
        }

        weaponPopupCancelButton.onclick = event => {
            selectedWeapon = 0;
            weaponPopupWindow.classList.remove("fadeIn");
            weaponPopupWindow.classList.add("fadeOut");

            setTimeout(() => {
                weaponPopupWindow.style.opacity = "0";
                weaponPopupWindow.style.display = "none";

                setTimeout(() => {
                    weaponPopupWindow.classList.remove("fadeOut");
                    weaponPopupWindow.classList.add("fadeIn");
                    weaponPopupWindow.style.opacity = "1";
                }, 50); // Just in case
            }, 200);

            weaponFindField.value = "";
        }

        popupDownloadButton.onclick = event => {
            let blob = new Blob([text], { type: "text/plain;charset=utf-8" });

            let name = "MyTeam.txt";
            if (fileNamefield.value != "") name = fileNamefield.value + ".txt";

            saveAs(blob, name, { type: "text/plain;charset=utf-8" });
        }

    });

    window.onresize();
}

window.onresize = () => {
    if (title != null) {
        if (window.innerWidth <= 770) {
            title.innerHTML = "Genshin Impact Team Resource Calculator";
        } else {
            title.innerHTML = "Genshin Impact Team Resource Calculator by ThePythonGuy";
        }
    }
}

document.addEventListener('focusout', event => {
    if (event.relatedTarget == null || (!event.relatedTarget.classList.contains("nameCard") && event.relatedTarget.className != "teamCard" && event.relatedTarget.className != "characterLevelCard" && event.relatedTarget.id != "characterFindField")) {
        if (selectedCharacter != 0) document.getElementById("team" + selectedCharacter).classList.remove("teamFocus");
        selectedCharacter = 0;
    }
}, true);