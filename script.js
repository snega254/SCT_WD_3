const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'Tie';
}

function updateBoard() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.textContent = gameBoard[index];
    });
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] || checkWinner()) return;

    gameBoard[index] = currentPlayer;
    const winner = checkWinner();
    if (winner) {
        status.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }

    updateBoard();
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    status.textContent = `${currentPlayer}'s turn`;
    updateBoard();
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

resetGame();
