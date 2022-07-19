const popUpStart = document.querySelector(".popUpStart");
const clickMe = document.querySelector(".clickMe");
const flipped = document.querySelector(".flipped");
const leftPart = document.querySelector(".leftPart");
const startGameBtn = document.querySelector(".startGameBtn");
const popUpInsertName = document.querySelector(".popUpInsertName");
const enterNameBtn = document.querySelector(".enterNameBtn");
const containerBody = document.querySelector(".containerBody");
const inputName = document.querySelector(".inputName");
const playerName = document.querySelector(".playerName");
const cardStacks = document.querySelectorAll(".cardStack");
const gameWon = document.querySelector(".gameWon");
const scoreCount = document.querySelector(".scoreCount");
const trailCount = document.querySelector(".trailCount");
const gWHeader = document.querySelector(".gWHeader");
const popUpDifficulty = document.querySelector(".popUpDifficulty");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const diffGrid = document.querySelector(".diffGrid");
const restartBtn = document.querySelectorAll(".restartBtn");
const card = document.querySelectorAll("[data-cell]");
const formInput = document.querySelector("form");


//Flip On Start
popUpStart.addEventListener("click", flipOnStart);

function flipOnStart() {
  clickMe.classList.toggle("flipMe");
  flipped.classList.toggle("showFlipped");
  startGameBtn.classList.toggle("hideBtn");
}


// //Start Game
startGameBtn.addEventListener("click", enterName);

function enterName() {
  popUpStart.classList.add("hidePopUp");
  popUpDifficulty.classList.add("showPopUpDiff");
  diffGrid.classList.remove("uSNone");
}


// Choose Difficulty
easy.addEventListener("click", makeEasy);
function makeEasy() {
  popUpDifficulty.classList.remove("showPopUpDiff");
  popUpInsertName.classList.add("showPopUpInsertName");
  inputName.focus();
  trailCount.innerText = "20";
}

medium.addEventListener("click", makeMedium);
function makeMedium() {
  popUpDifficulty.classList.remove("showPopUpDiff");
  popUpInsertName.classList.add("showPopUpInsertName");
  inputName.focus();
  trailCount.innerText = "16";
}

hard.addEventListener("click", makeHard);
function makeHard() {
  popUpDifficulty.classList.remove("showPopUpDiff");
  popUpInsertName.classList.add("showPopUpInsertName");
  inputName.focus();
  trailCount.innerText = "12";
}

// Start Game and Make cards random
inputName.addEventListener("keyup", () => {
  const trimInput = inputName.value.trim();
  if (trimInput.length > 1) {
    enterNameBtn.classList.remove("uSNone");
    formInput.addEventListener("submit", (e) => {
      e.preventDefault();
      appearRandom();
      showGamePage();
    });
  } else {
    enterNameBtn.classList.add("uSNone");
  }
});

function showGamePage() {
  containerBody.classList.add("showGame");
  popUpInsertName.classList.remove("showPopUpInsertName");
}

function appearRandom() {
  let cardClass = [
    "cross",
    "circle",
    "square",
    "check",
    "cross",
    "circle",
    "square",
    "check",
    "cross",
    "circle",
    "square",
    "check",
    "cross",
    "circle",
    "square",
    "check",
  ];
  sortedCard = cardClass.sort(() => (Math.random() > 0.5 ? 1 : -1));
  card.forEach((cards, index) => {
    cards.className = sortedCard[index];
  });
  playerName.innerText = inputName.value;
}


//Click to Flip Card
cardStacks.forEach((cardStack) => {
  cardStack.addEventListener("click", flipCards);

  function flipCards(e) {
    e.target.classList.add("flipMe");
    e.target.previousElementSibling.classList.add("showFlipped");
    e.target.previousElementSibling.classList.add("cardClicked");
    let cardClicked = document.querySelectorAll(".cardClicked");

    //Eliminate Matching Cards
    if (cardClicked.length == 2) {
      scoreCount.innerText = parseFloat(scoreCount.innerText) - 2;
      trailCount.innerText = parseFloat(trailCount.innerText) - 1;

      if (cardClicked[0].className == cardClicked[1].className) {
        cardClicked.forEach((cardsClicks) => {
          cardsClicks.parentElement.classList.add("disappear");
          cardsClicks.classList.remove("cardClicked");
        });
      } else if (cardClicked[0].className !== cardClicked[1].className) {
        cardClicked.forEach((cardsClicks) => {
          cardsClicks.classList.remove("cardClicked");
          setTimeout(() => {
            cardsClicks.nextElementSibling.classList.remove("flipMe");
            cardsClicks.classList.remove("showFlipped");
          }, 800);
        });
      }
    }

    //Check for win
    let disappear = document.querySelectorAll(".disappear");
    if (disappear.length === 16) {
      gameWon.classList.remove("hideGW");
      gWHeader.innerText = "YOU WIN!!!";
      gameWon.style.backgroundColor = "var(--clr-primary--600)";
      restartBtn[0].classList.add("hideGW");
    } else if (trailCount.innerText == 0 && disappear.length < 16) {
      gameWon.classList.remove("hideGW");
      gWHeader.innerText = "Game Over!!!";
      gameWon.style.backgroundColor = "var(--clr-primary--600)";
      restartBtn[0].classList.add("hideGW");
    }
  }
});


// Restart
restartBtn[0].addEventListener("click", startOver);

restartBtn[1].addEventListener("click", () => {
  startOver();
  gameWon.classList.add("hideGW");
  restartBtn[0].classList.remove("hideGW");
});

function startOver() {
  popUpDifficulty.classList.add("showPopUpDiff");
  containerBody.classList.remove("showGame");
  scoreCount.innerText = "50";
  setTimeout(appearRandom, 1000);
  card.forEach((cards) => {
    cards.nextElementSibling.classList.remove("flipMe");
    cards.classList.remove("showFlipped");
    cards.parentElement.classList.remove("disappear");
  });
}
