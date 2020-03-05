const playerScore = document.querySelectorAll('.player-score');
const container = document.querySelector('.container');
const winnerText = document.querySelector('.winner-text');
let player;
let player1Score;
let player2Score;
let lastStartingPlayer;
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

