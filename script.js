const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const userVsUserButton = document.getElementById('user-vs-user');
const userVsAiButton = document.getElementById('user-vs-ai');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameMode = 'user-vs-user';

const checkWin = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
};

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (boardState[index] || checkWin() || currentPlayer === 'O') return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        setTimeout(() => alert(`${winner} wins!`), 10);
        return;
    }

    if (!boardState.includes(null)) {
        setTimeout(() => alert('Draw!'), 10);
        return;
    }

    if (gameMode === 'user-vs-ai') {
        currentPlayer = 'O';
        disableBoard(true);
        setTimeout(aiMove, 1000);
    } else {
        currentPlayer = 'X';
    }
};

const aiMove = () => {
    const emptyCells = boardState.map((val, index) => val === null ? index : null).filter(val => val !== null);
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomMove] = 'O';
    cells[randomMove].textContent = 'O';

    const winner = checkWin();
    if (winner) {
        setTimeout(() => alert(`${winner} wins!`), 10);
        return;
    }

    if (!boardState.includes(null)) {
        setTimeout(() => alert('Draw!'), 10);
    }

    currentPlayer = 'X';
    disableBoard(false);
};

const disableBoard = (disable) => {
    cells.forEach(cell => {
        cell.style.pointerEvents = disable ? 'none' : 'auto';
        cell.style.opacity = disable ? '0.5' : '1';
    });
};

const resetGame = () => {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    disableBoard(false);
};

const selectMode = (mode) => {
    gameMode = mode;
    resetGame();
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
userVsUserButton.addEventListener('click', () => selectMode('user-vs-user'));
userVsAiButton.addEventListener('click', () => selectMode('user-vs-ai'));
