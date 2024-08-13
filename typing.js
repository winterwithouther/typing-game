const words = "but or and where how some cool people however something then when done they him her state".split(" ")
const wordsCount = words.length

function randomWord() {
    const randomIndex = Math.ceil(Math.random() * wordsCount)
    return words[randomIndex]
}

function newGame() {
    wordDiv = document.getElementById("words")
    wordDiv.innerHTML = ""
    for (let i = 0; i < 200; i++) {
        randomWordRetrieved = randomWord()
        wordDiv.innerHTML += randomWordRetrieved
    }
}
newGame()