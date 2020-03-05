const init = () => {
    const gamePieces = document.querySelectorAll('.game-piece');
    gamePieces.forEach(gamePiece => gamePiece.classList.add('hidden'));
    container.addEventListener('click', handleClickEvent);
    setStartingPlayer();
    pieceCounter = 0;
    endGameText = '';
    winnerText.style.opacity = 0;
    endGame = false;
    player1Score = [];
    player2Score = [];
    playerScore.forEach(player => player.classList.remove('active'));
    document.querySelector(`.player-${player}-score`).classList.add('active');
};

const setStartingPlayer = () => {
    if (!lastStartingPlayer) {
        player = player1;
    }
    if (lastStartingPlayer === player1) {
        player = player2;
    } else {
        player = player1;
    }
    lastStartingPlayer = player;
};

const handleClickEvent = e => {
    const rowItem = e.target.closest('.row-item');
    if (!isValidClick(rowItem)) return;
    placeGamePiece(rowItem);
    checkEndGame(player, parseInt(e.target.dataset.key));
    switchPlayer();
};

const addToScoreBoard = player => {
    const currentPlayer = document.querySelector(
        `.player-${player}-score span`
    );
    if (currentPlayer.textContent === '-') {
        currentPlayer.textContent = 0;
    }
    let currentPlayerScore = currentPlayer.textContent;
    currentPlayerScore++;
    currentPlayer.textContent = currentPlayerScore;
};

const placeGamePiece = rowItem => {
    const gamePiece = rowItem.querySelector(`.game-piece.${player}`);
    gamePiece.classList.remove('hidden');
};

const isValidClick = rowItem => {
    if (!rowItem) return false;
    const hasBeenChoosen = rowItem.querySelectorAll('.hidden').length < 2;
    if (hasBeenChoosen) return false;
    return true;
};

const switchPlayer = () => {
    player === player1 ? (player = player2) : (player = player1);
    playerScore.forEach(player => player.classList.remove('active'));
    document.querySelector(`.player-${player}-score`).classList.add('active');
};

const checkEndGame = (player, key) => {
    player === 'X' ? player1Score.push(key) : player2Score.push(key);

    checkWinner(player1Score);
    checkWinner(player2Score);
    checkDraw();

    if (endGame) {
        container.removeEventListener('click', handleClickEvent);
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
            endGameText = `${player} Won!`;
            addToScoreBoard(player);
            endGame = true;
        }
    });
};

const checkDraw = () => {
    pieceCounter++;
    if (pieceCounter === 9) {
        endGameText = 'Draw!';
        endGame = true;
    }
};

init();
