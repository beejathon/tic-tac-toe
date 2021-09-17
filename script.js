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

    const reset = () => _board.map((cell) => cell = '')

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
        if (winCheck) alert(`${_playing} WINS`)
        if (!winCheck && !gameActive) alert('TIE GAME!')

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
    }

    function markCell(cell, playing) {
        cell.textContent = playing
    }

    return {render, markCell}

})();

const Player = (name) => {
    this.name = name
};

const playBtn = document.querySelector('.newgame');
playBtn.addEventListener('click', gameController.newGame);