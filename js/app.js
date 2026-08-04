/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

/*---------------------------- Variables (state) ----------------------------*/
let message = null
let player = '🎃'
let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/
const squareEl = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetEl = document.querySelector('#resetBtn')


console.log(squareEl)
console.log(messageEl)
console.log(resetEl)
/*-------------------------------- Functions --------------------------------*/

function handlePlay(event) {
    if (event.target.textContent !== '' || winner === true || tie === true) {
        return;
    }

    event.target.textContent = player;

    checkWinner();

    if (winner === true) {
        messageEl.textContent = `Player ${player} Wins`;
        return;

    }

    checkTie();

    if (tie === true) {
        messageEl.textContent = 'Players Tie';
        return;
    }

    if (player === '🎃') {
        player = '👻';
    } else {
        player = '🎃';
    }

    messageEl.textContent = `Player ${player} Turn`;
}


function checkWinner() {

    for (let i = 0; i < winningCombos.length; i++) {

        let a = winningCombos[i][0];
        let b = winningCombos[i][1];
        let c = winningCombos[i][2];

        if (squareEl[a].textContent === player && squareEl[b].textContent === player && squareEl[c].textContent === player) {
            winner = true;
            return;
        }
    }
}


function checkTie() {

    tie = true;

    for (let i = 0; i < squareEl.length; i++) {

        if (squareEl[i].textContent === '') {
            tie = false;
            return;
        }
    }
}

function reset() {
    player = '🎃';
    winner = false;
    tie = false;

    for (let i = 0; i < squareEl.length; i++) {
        squareEl[i].textContent = '';
    }

    messageEl.textContent = `Player ${player} Turn`;
}
/*----------------------------- Event Listeners -----------------------------*/
for (let oneSquare of squareEl) {
    oneSquare.addEventListener('click', handlePlay)
}


resetEl.addEventListener('click', reset)