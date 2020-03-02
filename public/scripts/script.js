const container = document.querySelector('.container');
const winnerText = document.querySelector('.winner-text');
let player;
let player1Score;
let player2Score;
const player1 = 'X';
const player2 = 'O';
let pieceCounter;
let endGameText;
let endGame;
const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

const init = () => {
    const gamePieces = document.querySelectorAll('.game-piece');
    gamePieces.forEach(gamePiece => gamePiece.classList.add('hidden'));
    player = player1;
    pieceCounter = 0;
    endGameText = '';
    winnerText.style.opacity = 0;
    endGame = false;
    player1Score = [];
    player2Score = [];
};

const handleClickEvent = e => {
    const rowItem = e.target.closest('.row-item');
    if (!rowItem) return;
    const hasBeenChoosen = rowItem.querySelectorAll('.hidden').length < 2;
    if (hasBeenChoosen) return;
    const gamePiece = rowItem.querySelector(`.game-piece.${player}`);
    gamePiece.classList.remove('hidden');
    checkEndGame(player, parseInt(e.target.dataset.key));
    player === player1 ? (player = player2) : (player = player1);
};

const checkEndGame = (player, key) => {
    if (player === 'X') {
        player1Score.push(key);
    } else {
        player2Score.push(key);
    }

    checkWinner(player1Score);
    checkWinner(player2Score);
    checkDraw();

    if (endGame) {
        winnerText.textContent = endGameText;
        winnerText.style.opacity = 1;
        setTimeout(() => {
            init();
        }, 3000);
    }
};

const checkWinner = playerScore => {
    winningCombos.forEach(combo => {
        const isMatch = combo.every(item => playerScore.includes(item));
        if (isMatch) {
            endGameText = `${player} won!`;
            endGame = true;
        }
    });
};

const checkDraw = () => {
    pieceCounter++;
    if (pieceCounter === 9) {
        endGameText = "It's a draw!";
        endGame = true;
    }
};

container.addEventListener('click', handleClickEvent);

init();
