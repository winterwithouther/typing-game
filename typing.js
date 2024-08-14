const words = "and ok where but so how when state people interest program develop ground mine done soon help forward into the end".split(" ");
const wordsCount = words.length;
const gameTime = 30 * 1000
window.timer = null
window.gameStart = null

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
    for (let i = 0; i < 200; i++) {
        const randomWordRetrieved = randomWord();
        const formattedRandomWord = formatWord(randomWordRetrieved);
        wordDiv.innerHTML += formattedRandomWord;
    }
    addClass(document.querySelector(".word"), "current")
    addClass(document.querySelector(".letter"), "current")
    window.timer = null
}

function getWpm() {
    const words = [...document.querySelectorAll(".word")]
    const lastTypedWord = document.querySelector(".word.current")
    const lastTypedWordIndex = words.indexOf(lastTypedWord)
    const typedWords = words.slice(0, lastTypedWordIndex)
    const correctWords = typedWords.filter(word => {
        const letters = [...word.children]
        const incorrectLetters = letters.filter(letter => letter.className.includes("incorrect"))
        const correctLetters = letters.filter(letter => letter.className.includes("correct"))
        return incorrectLetters.length === 0 && correctLetters.length == letters.length
    })
    return correctWords.length / gameTime * 60000;
}

function gameOver() {
    clearInterval(window.timer)
    addClass(document.getElementById("game"), "over")
    document.getElementById("info").innerHTML = `WPM: ${getWpm()}`
}

document.getElementById("game").addEventListener("keyup", e => {
    const key = e.key
    const currentWord = document.querySelector(".word.current")
    const currentLetter = document.querySelector('.letter.current')
    const expected = currentLetter?.innerHTML || " "

    const isLetter = key.length === 1 && key !== " ";
    const isSpace = key === " "
    const isBackspace = key === "Backspace"
    const isFirstLetter = currentLetter === currentWord.firstChild

    if (document.querySelector("#game.over")) {
        return
    }

    if(!window.timer && isLetter) {
        window.timer = setInterval(() => {
            if (!window.gameStart) {
                window.gameStart = (new Date()).getTime()
            }

            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart
            const sPassed = Math.round(msPassed / 1000)
            const sLeft = (gameTime / 1000) - sPassed
            if (sLeft <= 0) {
                gameOver()
                return
            } 
            document.getElementById("info").innerHTML = sLeft + ""
        }, 1000)
    }

    if (isLetter) {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? "correct" : "incorrect")
            removeClass(currentLetter, "current")
            if (currentLetter.nextSibling) {
                addClass(currentLetter.nextSibling, "current")
            }
        } else {
            const incorrectLetter = document.createElement("span")
            incorrectLetter.innerHTML = key
            incorrectLetter.className = 'letter incorrect extra'
            currentWord.appendChild(incorrectLetter)
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

    if (isBackspace) {
        if (currentLetter && isFirstLetter) {
            // make prev word current, last letter current
            removeClass(currentWord, "current")
            addClass(currentWord.previousSibling, "current")
            removeClass(currentLetter, "current")
            addClass(currentWord.previousSibling.lastChild, "current")
            removeClass(currentWord.previousSibling.lastChild, "incorrect")
            removeClass(currentWord.previousSibling.lastChild, "correct")
        }

        if (currentLetter && !isFirstLetter) {
            // move back one letter, invalidate letter
            removeClass(currentLetter, "current")
            removeClass(currentLetter.previousSibling, "incorrect")
            removeClass(currentLetter.previousSibling, "correct")
            addClass(currentLetter.previousSibling, "current")
        }

        if (!currentLetter) {
            addClass(currentLetter.lastChild, "current")
            removeClass(currentWord.lastChild, "incorrect")
            removeClass(currentWord.lastChild, "correct")
        }
    }
    
    // move lines / words
    if (currentWord.getBoundingClientRect().top > 250) {
        const words = document.getElementById("words")
        const margin = parseInt(words.style.marginTop || "0px")
        words.style.marginTop = (margin - 35) + 'px'

    }

    // Moving cursor
    const nextLetter = document.querySelector(".letter.current")
    const cursor = document.getElementById("cursor")
    const nextWord = document.querySelector(".word.current")
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px'
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : "right"] + 2 + 'px'
    
})

document.getElementById("new-game-button").addEventListener("click", () => {
    newGame()
})


newGame();
