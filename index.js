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
const GRID_LENGTH = 3;
let turn = 'X';
const winArray = [];

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

function initializeWinArray() {
    for (let i = 0;i < 2*GRID_LENGTH+2; i++) {
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

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    playNum += 1;
    grid[colIdx][rowIdx] = newValue;
    incrementWinArray(colIdx, rowIdx, 1);
    naturalComputerPlays();
    const won = checkWinner();
    if (won === 'player') {
        startConfetti();
        window.setTimeout(() => {
            stopConfetti();
            window.location.reload(true);
        }, 1000);
        showWinnerAlert('You WIN! :)');
    } else if (won === 'comp') {
        showWinnerAlert('Computer WINS! :(');
        window.setTimeout(() => {
            window.location.reload(true);
        }, 1500);
    } else if  (won === 'draw') {
        showWinnerAlert('It\'s a DRAW! :|');
        window.setTimeout(() => {
            window.location.reload(true);
        }, 1500);
    }
    renderMainGrid();
    addClickHandlers();
}

function checkWinner() {
    if (playNum === (GRID_LENGTH*GRID_LENGTH)) {
        return 'draw';
    }
    for (let i = 0; i < winArray.length; i++) {
        if (winArray[i] === 3 || winArray[i] === -3) {
            if (winArray[i] === 3) {
                return 'player'
            } else if (winArray[i] === -3) {
                return 'comp';
            }
        }
    }
    return false;
}

function showWinnerAlert(msg) {
    if (typeof swal !== "undefined") { 
        swal({
            type: 'success',
            title: msg,
            timer: 1500
        });
    } else {
        alert(msg);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Throws out of stack.. will think and fix! :(
// function randomComputerPlays() {
//     const randomColIdx = getRandomInt(1, 100) % GRID_LENGTH;
//     const randomRowIdx = getRandomInt(1, 100) % GRID_LENGTH;
//     while(grid[randomColIdx][randomRowIdx] !== 0) {
//         randomComputerPlays();
//     }
//     grid[randomColIdx][randomRowIdx] = 2;
//     incrementWinArray(randomColIdx, randomRowIdx, -1);
//     return;
// }

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
    winArray[rowIdx] += incrBy;
    winArray[GRID_LENGTH + colIdx] += incrBy;
    if (rowIdx == colIdx) {
        winArray[2*GRID_LENGTH] += incrBy;
    }
    if (GRID_LENGTH - 1 - colIdx == rowIdx) {
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
