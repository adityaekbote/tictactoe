/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
let playNum = 0;
let GRID_LENGTH = 3;
let turn = 'X';
let winArray = [];

function initializeGrid() {
    playNum = 0;
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    initializeWinArray();
}

function changeGridLength() {
    const value = document.getElementById("gridLength").value ?
        parseInt(document.getElementById("gridLength").value) : 2;
    GRID_LENGTH = value;
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

function initializeWinArray() {
    winArray = [];
    for (let i = 0;i < (2*GRID_LENGTH)+2; i++) {
        winArray.push(0);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="circle">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function gridLengthInput() {
    return `<input type="number" id="gridLength" min="2" max="12" value=${GRID_LENGTH} oninput="changeGridLength()" />`;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div> GRID SIZE: ' + gridLengthInput() + '</div><br /><div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    if (!grid[colIdx][rowIdx]) {
        playNum += 1;
        grid[colIdx][rowIdx] = newValue;
        incrementWinArray(colIdx, rowIdx, 1);
        randomComputerPlays();
        const won = checkWinner();
        if (won === 'player') {
            flashWinner('You Win! :)', 3000, true);
        } else if (won === 'comp') {
            flashWinner('Computer WINS! :(');
        } else if  (won === 'draw') {
            flashWinner('It\'s a Draw!')
        }
        renderMainGrid();
        addClickHandlers();
    }
}

function flashWinner(msg, timer = 2000, confetti = false) {
    confetti ? startConfetti() : null;
    showWinnerAlert(msg);
    window.setTimeout(() => {
        confetti ? stopConfetti() : null;
        window.location.reload(true);
    }, timer);
}

function checkWinner() {
    if (winArray.includes(GRID_LENGTH)) {
        return 'player'
    } else if (winArray.includes(-GRID_LENGTH)) {
        return 'comp';
    } else if (playNum >= (GRID_LENGTH*GRID_LENGTH)) {
        return 'draw'
    }
    return false;
}

function showWinnerAlert(msg) {
    if (typeof swal !== "undefined") { 
        swal({
            type: 'success',
            title: msg,
            showConfirmButton: false,
        });
    } else {
        alert(msg);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomComputerPlays() {
    const randomColIdx = getRandomInt(1, 100) % GRID_LENGTH;
    const randomRowIdx = getRandomInt(1, 100) % GRID_LENGTH;
    playNum += 1;
    if(grid[randomColIdx][randomRowIdx] !== 0) {
        naturalComputerPlays();
    } else {
        grid[randomColIdx][randomRowIdx] = 2;
        incrementWinArray(randomColIdx, randomRowIdx, -1);
    }
    return;
}

function naturalComputerPlays() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowIdx = 0; rowIdx < GRID_LENGTH;rowIdx++) {
            if (grid[colIdx][rowIdx] === 0) {
                grid[colIdx][rowIdx] = 2;
                incrementWinArray(colIdx, rowIdx, -1);
                return;
            }
        }
    }
}

function incrementWinArray(colIdx, rowIdx, incrBy) {
    winArray[parseInt(rowIdx)] += incrBy;
    winArray[GRID_LENGTH + parseInt(colIdx)] += incrBy;
    if (parseInt(rowIdx) === parseInt(colIdx)) {
        winArray[2*GRID_LENGTH] += incrBy;
    }
    if (GRID_LENGTH - 1 - parseInt(colIdx) === parseInt(rowIdx)) {
        winArray[2*GRID_LENGTH + 1] += incrBy;
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
