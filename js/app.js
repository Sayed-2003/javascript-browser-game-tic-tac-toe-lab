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
let board = ['', '', '', '', '', '', '', '', '']
let turn = 'X'
let winner = false
let tie = false




/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')

const messageEl = document.querySelector('#message')

const resetBtnEl = document.querySelector('#resetBtnEl')

/*-------------------------------- Functions --------------------------------*/
function init() {

    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    winner = false
    tie = false

    render()
}


function render() {

    updateBoard()
    updateMessage()

}




function updateBoard() {

    for (let i = 0; i < board.length; i++) {

        squareEls[i].textContent = board[i]
    }

}


function updateMessage() {

    if (!winner && !tie) {

        messageEl.textContent = `${turn}'s turn`

    } else if (!winner && tie) {

        messageEl.textContent = `It's a tie!`

    } else {

        messageEl.textContent = `${turn} wins!`

    }

}

function handleClick(event) {

    const squareIndex = event.target.id

    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) {
        return
    }

    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()

}

function placePiece(index) {

    board[index] = turn

}


function checkForWinner() {

    for (let i = 0; i < winningCombos.length; i++) {

        const [a, b, c] = winningCombos[i]

        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {

            winner = true

        }

    }

}

function checkForTie() {

    if (winner) {
        return
    }

    let boardFull = true

    for (let i = 0; i < board.length; i++) {

        if (board[i] === '') {
            boardFull = false
        }

    }

    if (boardFull) {
        tie = true
    }

}

function switchPlayerTurn() {

    if (winner) {
        return
    }

    if (turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    }

}


/*----------------------------- Event Listeners -----------------------------*/

for (let oneSquare of squareEls) {
    oneSquare.addEventListener('click', handleClick)
}

resetBtnEl.addEventListener('click', init)

init()