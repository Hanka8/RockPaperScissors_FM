AOS.init();

const displayedScore = document.getElementById("score");
const playButtons = document.querySelectorAll(".startBtn");
const starterPanel = document.getElementById("starterPanel");
const gameOverPanel = document.getElementById("gameOverPanel");
const youPicked = document.getElementById("youPicked");
const theHousePicked = document.getElementById("theHousePicked");
const gameOverBtnBox = document.getElementById("gameOverBtnBox");
const winner = document.getElementById("winner");
const score = document.getElementById("score");
const playAgainBtn = document.getElementById("playAgainBtn");
const rulesBtn = document.getElementById("rulesBtn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");

const clickSound = new Audio("sounds/click.wav");
const winningSound = new Audio("sounds/win.wav");
const losingSound = new Audio("sounds/lose.wav"); 
const drawSound = new Audio("sounds/draw.wav");
const closeSound = new Audio("sounds/close.wav");

if (localStorage.getItem("score") == undefined) {
    localStorage.setItem("score", 0);
}

let scoredPoints = localStorage.getItem("score");
score.textContent = localStorage.getItem("score")

playButtons.forEach((playBtn) => {
    playBtn.addEventListener("click", (event) => {
        starterPanel.classList.add("hide-starterPanel");
        gameOverPanel.classList.add("show-gameOverPanel");
        showWhatYouPicked(event);
        setTimeout(showWhatTheHousePicked, 1000);
        setTimeout(showWhoWon, 2000);
        clickSound.play();
    });
});

function showWhatYouPicked(e) {
    [type, general, dontWantThis] = e.target.classList;
    youPicked.classList.add(type, general);
    youPicked.dataset.hand = type;
    if (window.screen.width > 800) {
        gameOverPanel.style.width = "50%";
    }
};

function showWhatTheHousePicked() {
    const options = ["scissors", "paper", "rock"];
    const houseChoice = options[Math.floor(Math.random() * options.length)];
    theHousePicked.classList.add(houseChoice, "btn");
    theHousePicked.dataset.hand = houseChoice;
};

function showWhoWon() {
    if (window.screen.width > 800) {
       gameOverPanel.style.width = "75%"; 
    }
    
    let house = theHousePicked.dataset.hand[0];
    let you = youPicked.dataset.hand[0];

    setTimeout(() => {
        gameOverBtnBox.classList.add("show-gameOverBtnBox");
        gameOverBtnBox.classList.remove("hide-gameOverBtnBox");

    if ((you == "s" && house == "r") || (you == "r" && house == "p") || (you == "p" && house == "s")) {
        winner.textContent = "You lose!";
        if (scoredPoints > 0) {
            scoredPoints--;
        }
        theHousePicked.classList.add("winning-choice");
        losingSound.play();
        
    } else if (you == house) {
        winner.textContent = "Draw!";
        drawSound.play();

    } else {
        winner.textContent = "You win!";
        scoredPoints++;
        youPicked.classList.add("winning-choice");
        winningSound.play();
        
    }
    localStorage.setItem("score", scoredPoints);
    score.textContent = localStorage.getItem("score");
    }, 700);
    
};

playAgainBtn.addEventListener("click", playAgain);

function playAgain() {
    window.location.reload();
}

rulesBtn.addEventListener("click", () => {
    modal.classList.remove("hide-modal");
});

closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hide-modal");
    closeSound.play();
});

modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("show-modal")) {
        modal.classList.add("hide-modal");
        closeSound.play();
    };
});
