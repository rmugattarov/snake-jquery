import {getDirectionFromKeyCode, getOppositeDirection} from './direction.js';

const snake = [];

const gridSize = 15;
const snakeInitSize = 3;
const totalTilesCount = gridSize * gridSize;
let foodCount = 0;
const directions = [0, 90, 180, 270];

const grid = createGrid();
let newDirection = _.sample(directions);
let direction = newDirection;
let timerId;
let gamePace = 500;
let moveCount = 0;

function initSnake() {
    createRandomSnake();
    timerId = setInterval(() => move(), gamePace);
}


function move() {
    moveCount++;
    moveSnake();
    placeFood();
    speedUpGame();
}

function speedUpGame() {
    if (gamePace > 150 && moveCount % 10 === 0) {
        clearInterval(timerId);
        gamePace -= 50;
        timerId = setInterval(() => move(), gamePace);
    }
}

function createRandomSnake() {
    let oppositeDirection = getOppositeDirection(direction);

    let head = getRandomTile();
    snake.push(getCoords(head));
    drawSnakeTile(head);

    for (let i = 1; i < snakeInitSize; i++) {
        let tail = getNeighborTileAtDirection(head, oppositeDirection);
        snake.push(getCoords(tail));
        drawSnakeTile(tail);
        head = tail;
    }
}

function placeFood() {
    if (foodCount !== 0) return;
    let emptyTilesCount = totalTilesCount - snake.length;
    let targetTile = $('td.empty').eq(_.random(0, emptyTilesCount));
    drawFoodTile(targetTile);
    foodCount = 1;
}

function getCoords(tile) {
    return {
        row: parseInt(tile.attr('row')),
        col: parseInt(tile.attr('col'))
    };
}

function createRow(rowNum) {
    let row = $('<tr></tr>');
    for (let i = 0; i < gridSize; i++) {
        row.append($(`<td row='${rowNum}' col = '${i}' class='empty'></td>`));
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

function drawSnakeTile(tile) {
    return tile.removeClass().addClass('snake');
}

function drawDigestingTile(tile) {
    return tile.removeClass().addClass('digesting');
}

function drawEmptyTile(tile) {
    return tile.removeClass().addClass('empty');
}

function drawFoodTile(tile) {
    return tile.removeClass().addClass('food');
}

function getTile(coords) {
    return $(`td[row='${coords.row}'][col='${coords.col}']`);
}

function getRandomTile() {
    let row = _.random(0, gridSize - 1);
    let col = _.random(0, gridSize - 1);
    return getTile({row, col});
}

function getNeighborTileAtDirection(tile, direction) {
    let row = parseInt(tile.attr('row'));
    let col = parseInt(tile.attr('col'));
    if (direction === 0) {
        col = (col + 1) % gridSize;
    } else if (direction === 90) {
        row = (row - 1 + gridSize) % gridSize;
    } else if (direction === 180) {
        col = (col - 1 + gridSize) % gridSize;
    } else if (direction === 270) {
        row = (row + 1) % gridSize;
    }
    return getTile({row, col});
}

function moveSnake() {
    if (newDirection !== getOppositeDirection(direction)) {
        direction = newDirection;
    }
    let head = getTile({row: snake[0].row, col: snake[0].col});
    let newHead = getNeighborTileAtDirection(head, direction);

    if (newHead.hasClass('snake') || newHead.hasClass('digesting')) {
        clearInterval(timerId);
        alert(`Game Over!\nYour score is ${snake.length}00!`);
        return;
    }

    snake.unshift(getCoords(newHead));

    if (newHead.hasClass('food')) {
        foodCount--;
        drawDigestingTile(newHead);
    } else {
        drawSnakeTile(newHead);
    }

    let tail = getTile(_.last(snake));
    if (tail.hasClass('digesting')) {
        drawSnakeTile(tail);
    } else {
        snake.pop();
        drawEmptyTile(tail);
    }
}

document.addEventListener('keydown', (e) => {
    let arrowDirection = getDirectionFromKeyCode(e.keyCode);
    if (newDirection !== getOppositeDirection(newDirection)) {
        newDirection = arrowDirection;
    }
});

$(function () {
    $('#root').append(grid);
    initSnake();
});