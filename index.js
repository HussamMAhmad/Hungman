// letters
let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersContainer = document.querySelector(".letters");
let ArrayLetters = Array.from(letters);

ArrayLetters.forEach((letter) => {
    let span = document.createElement("span");
    let spanText = document.createTextNode(letter);
    span.appendChild(spanText);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
});
fetch("./text.json")
    .then((result) => result.json())
    .then((value) => {
        let allKeys = Object.keys(value);
        let randomPropIndex = Math.floor(Math.random() * allKeys.length);
        let randomPropValue = allKeys[randomPropIndex];
        let randomArray = Math.floor(Math.random() * value[randomPropValue].length);
        let randomValueValue = value[randomPropValue][randomArray];
        let category = document.querySelector(".category span");
        category.innerHTML = randomPropValue;
        let gussContainer = document.querySelector(".letter-guss");
        let letterArray = Array.from(randomValueValue);
        let numberSuccess = 0;
        letterArray.forEach((letter) => {
            let emptySpan = document.createElement("span");
            if (letter === " ") {
                emptySpan.className = "with-space";
                numberSuccess++; 
            }
            gussContainer.appendChild(emptySpan);
        });
        let guss = document.querySelectorAll(".letter-guss span");
        let draw = document.querySelector(".hangman-draw");
        let numberWrongs = 0;
        document.addEventListener("click", (e) => {
            let thestatus = false;
            if (e.target.className === "letter-box") {
                e.target.classList.add("clicked");
                let chosenWord = Array.from(randomValueValue.toLowerCase());
                let letterClicked = e.target.innerHTML.toLowerCase();
                chosenWord.forEach((letterWord, indexWord) => {
                    if (letterWord === letterClicked) {
                        thestatus = true;
                        numberSuccess++;
                        guss.forEach((letterC, index) => {
                            if (indexWord === index) {
                                letterC.innerHTML = letterWord;
                            }
                        });
                    }
                });
                if (thestatus !== true) {
                    numberWrongs++;
                    draw.classList.add(`wrong-${numberWrongs}`);
                    document.getElementById("fail").play();
                    if (numberWrongs === 8) {
                        gameover();
                        lettersContainer.classList.add("finshed");
                    }
                } else {
                    document.getElementById("success").play();
                    if (numberSuccess === letterArray.length) {
                        endgame(numberWrongs);
                        lettersContainer.classList.add('finshed');
                    }
                }
            }
        });
        // gameover
        function gameover() {
            let div = document.createElement("div");
            let text = document.createTextNode(
                `You lose stupid the world is ${randomValueValue}`
            );
            div.appendChild(text);
            div.className = "end";
            document.body.appendChild(div);
        }
        // endgame with success 
        function endgame(num) {
            let div = document.createElement('div');
            if (num < 4) {
                let text = document.createTextNode(`you success after ${num} 
                    times your level is perfect`);
                div.appendChild(text);
                div.className = "end";
                document.body.appendChild(div);
            } else if (num < 6 & num >= 4) {
                let text = document.createTextNode(`you success after ${num}
                    times good but not too much`);
                div.appendChild(text);
                div.className = "end";
                document.body.appendChild(div);
            } else if (num === 7) {
                let text = document.createTextNode(`you success after ${num}
                    انت عالبركة رجاع عيد حياتك`);
                div.appendChild(text);
                div.className = "end";
                document.body.appendChild(div);
            }
        }
    });
