const wordMinimumLettersToParse = 2;
let initialText = "";

let pauseLoop = false;

window.onload = function() {
    const label = document.getElementById("initial-text").value;
    initialText = label;
}

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

function updateInitialTextValue(value) {
    initialText = value;
}

function parseTextToArrayOfWords(text) {
    const words = text.replace(/\n/g, " ").split(" ");

    return words;
}

function parseFirstLettersOfWordToCamelCase(word) {
    if (word <= wordMinimumLettersToParse) return;
    const parsedWord = `<strong>${word[0].toUpperCase()}${word[1].toUpperCase()}</strong>${word.slice(2)}`;
    return parsedWord;
}

function generateTextWithUpperCaseOnFirstLetters() {
    pauseLoop = true;
    const words = parseTextToArrayOfWords(initialText);

    const parsedWords = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > wordMinimumLettersToParse) {
            const parsedWord = parseFirstLettersOfWordToCamelCase(words[i]);
            parsedWords.push(parsedWord);
        } else {
            parsedWords.push(words[i]);
        }
    }
    setTextToLabel(parsedWords, true);
}



async function speedText() {
    pauseLoop = false;
    const words = parseTextToArrayOfWords(initialText);

    let speed = 150;

    for (let i = 3; i > 0; i--) {
        if (pauseLoop) { return }
        setTextToLabel(`${i}...`);
        await sleep(750);
    }

    for (let i = 0; i < words.length; i++) {
        if (pauseLoop) { return }
        speed = 150;
        if (words[i].indexOf("?") != -1) speed = 300;
        if (words[i].indexOf(",") != -1) speed = 250;
        if (words[i].indexOf(".") != -1) speed = 250;
        if (words[i].indexOf("(") != -1) speed = 750;
        if (words[i].indexOf(")") != -1) speed = 750;
        if (words[i].indexOf(";") != -1) speed = 300;
        if (words[i].indexOf(":") != -1) speed = 300;
        if (words[i] == "") speed = 300;
        setTextToLabel(words[i]);

        await sleep(speed);
    }
}

async function setTextToLabel(text, joinText = false) {
    const label = document.getElementById("post-text");
    label.innerHTML = joinText ? text.join(" ") : text;
}