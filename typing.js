const words = "but or and where how some cool people however something then when done they him her state".split(" ");
const wordsCount = words.length;

function addClass(el, name) {
    el.className += ' '+name
}

function removeClass(el, name) {
    el.className = el.className.replace(name, "")
}

function randomWord() {
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex - 1];
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
    const currentWord = document.querySelector(".word.current")
    const currentLetter = document.querySelector('.letter.current')
    const expected = currentLetter.innerHTML

    const isLetter = key.length === 1 && key !== " ";
    const isSpace = key === " "

    if (isLetter) {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? "correct" : "incorrect")
            removeClass(currentLetter, "current")
            addClass(currentLetter.nextSibling, "current")
        }
    }
    
    if (isSpace) {
        if (expected !== ' ') {
            const lettersToInvalidate = [...document.querySelectorAll(".word.current .letter:not(.correct)")]
            lettersToInvalidate.forEach(letter => {
                addClass(letter, "incorrect")
            })
        }
        removeClass(currentWord, "current");
        addClass(currentWord.nextSibling, "current");
        if (currentLetter) {
            removeClass(currentLetter, "current")
        }

        addClass(currentWord.nextSibling.firstChild, "current") 
    }

    
})


newGame();
