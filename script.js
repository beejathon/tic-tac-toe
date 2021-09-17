const gameBoard = (() => {
    
    const board = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3']

    const getCell = (cell) => {
        return board.splice(board.indexOf(cell), 1)
    }

    const activeGameCheck = () => (board.length == 0) ? false : true;

    return {getCell, activeGameCheck}

})();

const displayController = (() => {

    function render() {
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => cell.addEventListener('click', gameController.move, { once : true }))
        cells.forEach(cell => cell.textContent = '')
    }

    function markCell(cell, playing) {
        cell.textContent = playing
    }

    return {render, markCell}

})();

const gameController = (() => {
    
    let _playing = 'X'

    const xCells = []
    const oCells = []

    function move(e) {
        const cell = e.target
        if (_playing == 'X') xCells.push(gameBoard.getCell(e.target.id))
        if (_playing == 'O') oCells.push(gameBoard.getCell(e.target.id))
        displayController.markCell(cell, _playing)
        nextTurn()
    }

    function nextTurn() {
        _playing = (_playing == 'X') ? 'O' : 'X'
    }

    return {nextTurn, move, xCells}

})();


const Player = (name) => {
    this.name = name
};