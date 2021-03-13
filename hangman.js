// let one = document.getElementById("one")
// let two = document.getElementById("two")
// let three = document.getElementById("three")
// let four = document.getElementById("four")
// let five = document.getElementById("five")
// let six = document.getElementById("six")
// let seven = document.getElementById("seven")
// let eight = document.getElementById("eight")
let def = document.getElementById("definition")
let gallows = document.getElementsByClassName("gallows")
let displayMsg = document.getElementById("displayMsg")
let wordDisplay = document.getElementById("word")
let letterInput = document.getElementById("letterInput")
let letterDisplay =document.getElementsByClassName("letter")
let button = document.getElementById("button")



async function startGame () {
    button.removeEventListener('click', startGame, true)
    displayMsg.innerText = ""
    button.value = "GUESS"
    let letterCount = 0
    let wordAssembler = ""
    let mistakeCounter = 0
    for (let el of gallows) {el.style.display = "none"}
    let data = await getWord()
    let word = data.word.toUpperCase()
    def.innerText = data.definition
    // console.log(word)


    button.addEventListener("click", passLetter, true)

    function passLetter () {
        let letter = letterInput.value.toUpperCase()
        if (letter !== "" && mistakeCounter <= 8 && !(wordAssembler.indexOf(letter) > -1)) {
            let match = false
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    letterDisplay[i].innerText = letter
                    wordAssembler += letter
                    match = true
                    letterCount++
                }
            }
            console.log("lt " + letterCount + ", word.l " + word.length)
            if (match === false) {
                mistakeCounter++
                gallowDisplay()
                console.log("mistake")
            }
        } else if (letter !== "" && wordAssembler.indexOf(letter) > -1) {
            displayMsg.innerText = "Letter already guessed"
            setTimeout(function () {displayMsg.innerText = ""}, 2000)
        } else {
            displayMsg.innerText = "Pick a letter!"
            setTimeout(function () {displayMsg.innerText = ""}, 2000)
        }
        console.log(word.toUpperCase())
        console.log(wordAssembler)
        if (word.length === wordAssembler.length) {
            displayMsg.innerText = "YOU WIN!"
            button.value = "PLAY AGAIN"
            button.removeEventListener("click", passLetter, true)
            button.addEventListener('click', startGame, true)
        }
        console.log("mis6: " + mistakeCounter)
        if (mistakeCounter > 8) {
            def.innerText = word
            displayMsg.innerText = "GAME OVER!"
            button.value = "RESTART"
            button.removeEventListener("click", passLetter, true)
            button.addEventListener('click', startGame, true)
        }
        letterInput.value = ""
        console.log("--------------------")
    }

    function gallowDisplay () {
        for (let i = 0; i < mistakeCounter; i++) {
            gallows[i].style.display = "block"
        }
    }
}


function getWord () {
    return fetch("https://random-words-api.vercel.app/word")
        .then (res => res.json())
        .then(data => {
            console.log(data)
            let word = data[0].word.toUpperCase()
            wordDisplay.innerHTML = ``
            for (let letter of word) {
                wordDisplay.innerHTML += `
                    <div class="letter">&nbsp;&nbsp;&nbsp;</div>
                  `
                // console.log(letter)
            }
            return data[0]
            // return definition
        })
}




startGame()