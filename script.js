const winningMessageContainer = document.querySelector('[data-win-msg]');
const winningMessageElement = document.querySelector('[data-win-msg-text]');
const restartButton = document.querySelector('[data-restart-btn]');
const cellElements = document.querySelectorAll('[data-cell]');
const mainBoard = document.querySelector('[data-board]');

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const startGame = () => {
    for (let cell of cellElements) {
        cell.classList.remove('o');
        cell.classList.remove('x');
        cell.addEventListener('click', handleClick, {once: true});
    };
    isCircleTurn = false;
    mainBoard.classList.remove('x');
    mainBoard.classList.remove('o');
    mainBoard.classList.add('x');
    winningMessageContainer.classList.remove('show-win-msg');
};

const endGame = (isDraw) => {
    if (isDraw)winningMessageElement.innerText = 'Empate!';
    else winningMessageElement.innerText = isCircleTurn ? `"O" Venceu!`: `"X" Venceu!`;
    winningMessageContainer.classList.add('show-win-msg');
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    mainBoard.classList.remove('o');
    mainBoard.classList.remove('x');
    if (isCircleTurn) mainBoard.classList.add('o');
    else mainBoard.classList.add('x');
};

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'o' : 'x';
    cell.classList.add(classToAdd);
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();
    if (isWin) endGame(false);
    else if (isDraw) endGame(true);
    else swapTurns();
};

startGame();

restartButton.addEventListener('click', startGame);