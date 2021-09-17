const gameBoard = (() => {
    
    // array for storing open board locations
    const _board = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3']

    // method for returning board cell to player
    const getCell = (cell) => {
        return _board.splice(_board.indexOf(cell), 1)
    }

    const activeGameCheck = (_board.length != 0) ? true : false;

    return {getCell, activeGameCheck}

})();

const displayController = (() => {

    // modify DOM
    function populate() {
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => cell.addEventListener('click', markCell))
        cells.forEach(cell => cell.textContent = '')
    }

    function markCell(e) {
        e.target.textContent = gameController.playing
    }

    return {populate, markCell}

})();

const gameController = (() => {
    
    const playing = 'X'

    // method for player moves
    const playerMove = (cell) => {
        gameBoard.getCell(cell);
    }

    return {playing}

})();


const Player = (name) => {

    this.name = name
    const _cells = []
    
    const playerAction = (cell) => {
         
        gameBoard.playerMove()
    }

    return {playerName, playerAction}
};