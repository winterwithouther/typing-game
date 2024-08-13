const words = "but or and where how some cool people however something then when done they him her state".split(" ");
const wordsCount = words.length;

function randomWord() {
    const randomIndex = Math.floor(Math.random() * wordsCount);
    return words[randomIndex];
}

function formatWord(word) {
    return `<div class="word">${word}</div>`;
}

function newGame() {
    const wordDiv = document.getElementById("words");
    wordDiv.innerHTML = "";
    for (let i = 0; i < 200; i++) {
        const randomWordRetrieved = randomWord();
        const formattedRandomWord = formatWord(randomWordRetrieved);
        wordDiv.innerHTML += formattedRandomWord;
    }
}

newGame();
