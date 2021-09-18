const gameBoard = (() => {

    const _board = ['', '', '', '', '', '', '', '', '']
    const _winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    const markCell = (cell, playing) => {
        _board.splice(cell.id, 1, playing)
    }

    const checkWin = (playing) => {
        return _winConditions.some((array) => {
            return array.every((index) => {
                return (_board[index] == playing)
            })
        })
    }

    const checkActive = () => (_board.includes('')) ? true : false;

    const reset = () => _board.fill('')

    return {markCell, checkActive, checkWin, reset}

})();

const gameController = (() => {

    let _playing = 'X'

    function playTurn(e) {

        // Mark cell on gameboard/display
        const cell = e.target
        displayController.markCell(cell, _playing)
        gameBoard.markCell(cell, _playing)

        // Check for win/tie
        let winCheck = gameBoard.checkWin(_playing)
        let gameActive = gameBoard.checkActive()
        if (winCheck) displayController.winMessage(_playing)
        if (!winCheck && !gameActive) displayController.tieMessage()

        // Switch player
        nextTurn()
    }

    function nextTurn() {
        _playing = (_playing === 'X') ? 'O' : 'X'
    }

    function newGame() {
        gameBoard.reset()
        displayController.render()
    }

    return {nextTurn, playTurn, newGame}

})();

const displayController = (() => {

    function render() {
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => cell.addEventListener('click', gameController.playTurn, { once : true }))
        cells.forEach(cell => cell.textContent = '')
        const xForm = document.getElementById('xForm')
        const oForm = document.getElementById('oForm')
        xForm.addEventListener('submit', displayController.addPlayer)
        oForm.addEventListener('submit', displayController.addPlayer)
    }

    function markCell(cell, playing) {
        cell.textContent = playing
    }

    function addPlayer(e) {
        e.preventDefault()
        if (e.target.id == 'xForm') {
            const xInput = document.getElementById('xInput')
            const playername = document.getElementById('playerX')
            playername.textContent = xInput.value
            document.getElementById('xForm').reset()
        }
        if (e.target.id == 'oForm') {
            const oInput = document.getElementById('oInput')
            const playername = document.getElementById('playerO')
            playername.textContent = oInput.value
            document.getElementById('oForm').reset()
        }
    }

    function winMessage(playing) {
        if (playing == 'X') {
            const player = document.getElementById('playerX')
            alert(player.textContent + ' WINS')
        }
        if (playing == 'O') {
            const player = document.getElementById('playerO')
            alert(player.textContent + ' WINS')
        }
    }

    function tieMessage() {
        alert(`IT'S A TIE GAME`)
    }

    return {render, markCell, addPlayer, winMessage, tieMessage}

})();

const playBtn = document.getElementById('newgame');
playBtn.addEventListener('click', gameController.newGame);

gameController.newGame();