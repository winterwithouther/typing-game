const words = "but or and where how some cool people however something then when done they him her state".split(" ");
const wordsCount = words.length;

function addClass(el, name) {
    el.className += ' '+name
}

function removeClass(el, name) {
    el.className = el.className.replace(name, "")
}

function randomWord() {
    const randomIndex = Math.floor(Math.random() * wordsCount);
    return words[randomIndex];
}

function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}



function newGame() {
    const wordDiv = document.getElementById("words");
    wordDiv.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        const randomWordRetrieved = randomWord();
        const formattedRandomWord = formatWord(randomWordRetrieved);
        wordDiv.innerHTML += formattedRandomWord;
    }
    addClass(document.querySelector(".word"), "current")
    addClass(document.querySelector(".letter"), "current")
}

document.getElementById("game").addEventListener("keyup", e => {
    const key = e.key
    const currentLetter = document.querySelector('.letter.current')
    const expected = currentLetter.innerHTML
    console.log({key, expected})
})

newGame();
