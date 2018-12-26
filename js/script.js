const gridSize = 15;
const snakeInitSize = 3;
const directions = [0, 90, 180, 270];

const grid = createGrid();
const snake = [];
let newDirection = _.sample(directions);
let direction = newDirection;

function createRow(rowNum) {
    let row = $('<tr></tr>');
    for (let i = 0; i < gridSize; i++) {
        row.append($(`<td id='${rowNum}_${i}'></td>`));
    }
    return row;
}

function createGrid() {
    let table = $('<table id="grid"></table>');
    for (let i = 0; i < gridSize; i++) {
        table.append(createRow(i));
    }
    return table;
}


function initSnake() {
    let row = _.random(0, gridSize - 1);
    let col = _.random(0, gridSize - 1);
    snake.push({row, col});
    console.log('direction', newDirection);
    let oppositeDirection = getOppositeDirection(newDirection);
    for (let i = 1; i < snakeInitSize; i++) {
        addToTailAtDirection(oppositeDirection);
    }
    console.log('init snake', snake);
    drawSnake();

    setInterval(() => {
        move();
    }, 800);

}

function getOppositeDirection(direction) {
    let result = 0;
    if (direction === 0) {
        result = 180;
    } else if (direction === 90) {
        result = 270;
    } else if (direction === 180) {
        result = 0;
    } else if (direction === 270) {
        result = 90;
    }
    return result;
}

function getTileAtDirection(tile, direction) {
    let {row, col} = tile;
    if (direction === 0) {
        col = (col + 1) % gridSize;
    } else if (direction === 90) {
        row = (row - 1 + gridSize) % gridSize;
    } else if (direction === 180) {
        col = (col - 1 + gridSize) % gridSize;
    } else if (direction === 270) {
        row = (row + 1) % gridSize;
    }
    return {row, col};
}

function addToTailAtDirection(direction) {
    let tail = _.last(snake);
    snake.push(getTileAtDirection(tail, direction));
}

function drawSnake() {
    snake.forEach(tile => {
        setSnakeTile(tile);
    });
}

function setSnakeTile(tile) {
    $(`#${tile.row}_${tile.col}`).css('background-color', 'white');
}

function setWaterTile(tile) {
    $(`#${tile.row}_${tile.col}`).css('background-color', 'aqua');
}

function move() {
    if (newDirection !== getOppositeDirection(direction)) {
        direction = newDirection;
    }
    snake.unshift(getTileAtDirection(_.head(snake), direction));
    setWaterTile(snake.pop());
    drawSnake();
}

function getDirectionFromKeycode(code) {
    let result = 0;
    if (code === 37) {
        result = 180;
    } else if (code === 38) {
        result = 90;
    } else if (code === 39) {
        result = 0;
    } else if (code === 40) {
        result = 270;
    }
    return result;
}

document.addEventListener('keydown', (e) => {
    let arrowDirection = getDirectionFromKeycode(e.keyCode);
    if (newDirection !== getOppositeDirection(newDirection)) {
        newDirection = arrowDirection;
    }
});

$(function () {
    $('#root').append(grid);
    initSnake();
});