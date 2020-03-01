const container = document.querySelector('.container');
let player;
const player1 = 'cross';
const player2 = 'circle';

const init = () => {
    const gamePieces = document.querySelectorAll('.game-piece');
    gamePieces.forEach(gamePiece => gamePiece.classList.add('hidden'));
    player = player1;
};

const handleClickEvent = e => {
    const rowItem = e.target.closest('.row-item');
    if (!rowItem) return;
    const hasBeenChoosen = rowItem.querySelectorAll('.hidden').length < 2;
    if (hasBeenChoosen) return;
    const gamePiece = rowItem.querySelector(`.game-piece.${player}`);
    gamePiece.classList.remove('hidden');
    if (player === player1) {
        player = player2;
    } else {
        player = player1;
    }
};

container.addEventListener('click', handleClickEvent);

init();
