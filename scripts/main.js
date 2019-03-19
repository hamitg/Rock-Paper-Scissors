let promise = document.getElementById('music').play();

if (promise !== undefined) {
    promise.then(_ => {
        // Autoplay started!
    }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
    });
}

let playerScore = 0;
let computerScore = 0;
let round = 0;

const divComputerScore = document.querySelector("#computer-score");
const divPlayerScore = document.querySelector("#player-score");
const divRoundResult = document.querySelector("#round-result");
const divFinalResult = document.querySelector("#final-result");
const gameButtons = document.querySelectorAll(".game-button");
const gameOverSoundWon = document.querySelector("#audio-gameover-won");
const gameOverSoundLost = document.querySelector("#audio-gameover-lost");
const audioClick = document.querySelector("#audio-click");
const btnReset = document.querySelector("#reset");

gameButtons.forEach(function (element) {
    element.addEventListener("click", function () {
        if (playerScore < 3 && computerScore <3) {
            audioClick.play();
            playRound(element.getAttribute("data-value"));
        }
    });
});

function playRound (playerChoice) {
    let computerChoice = getComputerChoice();
    divRoundResult.textContent = roundResult(playerChoice, computerChoice);
    divComputerScore.textContent = computerScore;
    divPlayerScore.textContent = playerScore;

    if (playerScore === 3) {
        gameOverSoundWon.play();
        divFinalResult.textContent = getWinner();
        btnReset.style.display = "inline-block";
    }
    if (computerScore === 3) {
        gameOverSoundLost.play();
        divFinalResult.textContent = getWinner();
        btnReset.style.display = "inline-block";
    }

}

function getComputerChoice () {
    let choices = ["scissors", "rock", "paper"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function roundResult (playerChoice, computerChoice) {
    let win = capitalize(playerChoice) + " beats " + capitalize(computerChoice) + " You WIN!";
    let lose = capitalize(computerChoice) + " beats " + capitalize(playerChoice) + " You LOSE!";
    let tie = "You both chose " + capitalize(computerChoice) + " It's a DRAW!";
    round ++;
    if (playerChoice === computerChoice) {
        return tie;
    }

    if (playerChoice === "rock") {
        if (computerChoice !== "paper") {
            playerScore ++;
            return win;
        }
        else {
            computerScore++;
            return lose;
        }
    }
    if (playerChoice === "paper") {
        if (computerChoice !==  "scissors") {
            playerScore++;
            return win;
        } else {
            computerScore++;
            return lose;
        }
    }

    if (playerChoice === "scissors") {
        if (computerChoice !== "rock") {
            playerScore++;
            return win;
        } else {
            computerScore++;
            return lose;
        }
    }
}

function getWinner () {
    if (playerScore > computerScore)
        return "You are the WINNER!";
    else if (computerScore > playerScore)
        return "Unlucky! Computer is the WINNER!";
    else
        return "It's a DRAW!";
}

btnReset.addEventListener("click", function() {
    if (playerScore >= 3 || computerScore >= 3) {
        round = 0;
        playerScore = 0;
        computerScore = 0;
        divPlayerScore.textContent = "0";
        divComputerScore.textContent = "0";
        divRoundResult.textContent = "";
        divFinalResult.textContent = "";
        btnReset.style.display = "none";
    }
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}






