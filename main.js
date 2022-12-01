class Player {
    constructor(sign) {
        this.sign = sign
        this.score = 0
    }
}

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

class GameState {
    constructor() {
        this.playerO = new Player("◯", 0)
        this.playerX = new Player("✖", 0)
        this.resetGame()
    }

    resetGame() {
        this.board = Array.from(' '.repeat(9))
        this.playerXPositions = []
        this.playerOPositions = []
        this.currentPlayer = this.getRandomPlayer()
        this.winner = null
    }

    getRandomPlayer() {
        if (Math.round(Math.random()) % 2 === 0) {
            return this.playerO
        } else {
            return this.playerX
        }
    }

    isDraw() {
        return !this.board.includes(' ')
    }

    isGameOver() {
        return this.isDraw() || this.winner != null
    }

    checkWinner() {
        function isWinner(playerPositions) {
            return winningConditions.some((combination) => {
                return combination.every((cell) => playerPositions.includes(cell));
            });
        }

        if (isWinner(this.playerXPositions)) {
            this.winner = this.playerX
            this.playerX.score++
        } else if (isWinner(this.playerOPositions)) {
            this.winner = this.playerO
            this.playerO.score++
        }
    }

    canMakeMove(index) {
        return !this.isGameOver() && this.board[index] === ' '
    }

    makeNextTurn(index) {
        if (this.currentPlayer.sign === '◯') {
            this.playerOPositions.push(index)
            this.currentPlayer = this.playerX
        } else {
            this.playerXPositions.push(index)
            this.currentPlayer = this.playerO
        }
    }

    makeMove(index) {
        if (this.canMakeMove(index)) {
            this.board[index] = this.currentPlayer.sign
            this.makeNextTurn(index)
        }
        this.checkWinner()
    }
}

game = new GameState()

function onPlayerClick(index) {
    game.makeMove(index)
    display()
}

function onResetGame() {
    game.resetGame()
    display()
}

function onResetPoints() {
    game = new GameState()
    display()
}

function display() {
    board__fields.forEach((div, index) => {
        div.innerHTML = game.board[index]
    });
    playerOneValue.innerHTML = game.playerX.score;
    playerTwoValue.innerHTML = game.playerO.score;
    if (game.currentPlayer === game.playerX) {
        playerXTurn.classList.remove("active");
        playerOTurn.classList.add("active");
    } else {
        playerXTurn.classList.add("active");
        playerOTurn.classList.remove("active");
    }
    if (game.isGameOver()) {
        announceWinnerSpan.innerHTML = game.winner !== null ? game.winner.sign : 'Draw'
        winnerPopup.classList.add("active");
        wrapper.classList.add("active");
    } else {
        announceWinnerSpan.innerHTML = ''
        winnerPopup.classList.remove("active");
        wrapper.classList.remove("active");
    }
}

const board__fields = document.querySelectorAll(".board__field");
const resetButton = document.querySelector(".reset");
const winnerPopup = document.querySelector(".winnerPopup");
const wrapper = document.querySelector(".wrapper");
const resetPopupButton = document.querySelector(".resetPopup");
const announceWinnerSpan = document.querySelector(".announceWinner");
const playerOTurn = document.querySelector(".player1Turn");
const playerXTurn = document.querySelector(".player2Turn");
const playerOneValue = document.querySelector(".playerOneValue");
const playerTwoValue = document.querySelector(".playerTwoValue");


resetPopupButton.addEventListener("click", onResetGame);
resetButton.addEventListener("click", onResetPoints);

board__fields.forEach((div, index) => {
    div.addEventListener("click", (_) => {
        onPlayerClick(index)
    });
});

display()
