const PLAYER1 = "✖";
const PLAYER2 = "◯";
let PLAYER1SCORE = 0;
let PLAYER2SCORE = 0;
let round = 1;
const winningConditions = [
  [0, 1, 2],
  [2, 1, 0],
  [3, 4, 5],
  [5, 4, 3],
  [6, 7, 8],
  [8, 7, 6],
  [0, 4, 8],
  [8, 4, 0],
  [6, 4, 2],
  [2, 4, 6],
  [0, 3, 6],
  [6, 3, 0],
  [1, 4, 7],
  [7, 4, 1],
  [2, 5, 8],
  [8, 5, 2],
];

const PL1 = [];
const PL2 = [];
const board__fields = document.querySelectorAll(".board__field");
const resetButton = document.querySelector(".reset");
const winnerPopup = document.querySelector(".winnerPopup");
const wrapper = document.querySelector(".wrapper");
const resetPopupButton = document.querySelector(".resetPopup");
const announceWinnerSpan = document.querySelector(".announceWinner");
const playerOneTurn = document.querySelector(".player1Turn");
const playerTwoTurn = document.querySelector(".player2Turn");
window.onload = setGame();

function setGame() {
  const playerOneValue = document.querySelector(".playerOneValue");
  const playerTwoValue = document.querySelector(".playerTwoValue");
  playerOneValue.innerHTML = PLAYER1SCORE;
  playerTwoValue.innerHTML = PLAYER2SCORE;
  board__fields.forEach((div, index) => {
    div.addEventListener("click", (event) => {
      const item = event.target;

      if (item.innerHTML === "") {
        if (PL1.length === 3 && PL2.length === 3) {
          return;
        }

        if (round % 2 === 0) {
          playerOneTurn.classList.remove("active");
          playerTwoTurn.classList.add("active");
          item.innerHTML = PLAYER1;
          PL1.push(index);
        } else if (round % 2 !== 0) {
          playerTwoTurn.classList.remove("active");
          playerOneTurn.classList.add("active");
          item.innerHTML = PLAYER2;
          PL2.push(index);
        }
      } else {
        return;
      }

      round++;
      isWinning();
      displayWinner();
    });
  });
}

function isWinning() {
  let winner;

  const p1Choices = winningConditions.some((combination) => {
    return combination.every((cell) => PL1.includes(cell));
  });
  const p2Choices = winningConditions.some((combination) => {
    return combination.every((cell) => PL2.includes(cell));
  });
  if (p1Choices === true) {
    winner = "Player 1 has won";
    PLAYER1SCORE++;
  } else if (p2Choices === true) {
    winner = "Player 2 has won";
    PLAYER2SCORE++;
  } else if (PL1.length === 3 && PL2.length === 3 && winner === undefined) {
    winner = "DRAW";
  }

  if (winner === "Player 1 has won") {
  } else if (winner === "Player 2 has won") {
  }
  return winner;
}

function displayWinner() {
  if (isWinning() !== undefined) {
    announceWinnerSpan.innerHTML = isWinning();
    winnerPopup.classList.add("active");
    wrapper.classList.add("active");
  } else {
    return;
  }
}

const resetGame = () => {
  PL1.splice(0, PL1.length);
  PL2.splice(0, PL2.length);
  playerOneTurn.classList.remove("active");
  playerTwoTurn.classList.remove("active");
  board__fields.forEach((div) => {
    div.innerHTML = "";
  });
};

resetButton.addEventListener("click", resetGame);
resetPopupButton.addEventListener("click", resetGameFull);

function resetGameFull() {
  winnerPopup.classList.remove("active");
  wrapper.classList.remove("active");
  resetGame();
}
