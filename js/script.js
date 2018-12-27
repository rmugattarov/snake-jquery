import {getDirectionFromKeyCode, getOppositeDirection} from './direction.js';

const snake = [];

const gridSize = 15;
const snakeInitSize = 3;
const directions = [0, 90, 180, 270];

const grid = createGrid();
let newDirection = _.sample(directions);
let direction = newDirection;

function initSnake() {
    createRandomSnake();

    setInterval(() => {
        move();
    }, 600);
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
    tile.removeClass()
        .addClass('snake')
        .css('background-color', 'aqua');
    return tile;
}
function drawEmptyTile(tile) {
    tile.removeClass()
        .addClass('empty')
        .css('background-color', 'white');
    return tile;
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

function move() {
    if (newDirection !== getOppositeDirection(direction)) {
        direction = newDirection;
    }
    let head = getTile({row: snake[0].row, col: snake[0].col});
    let newHead = getNeighborTileAtDirection(head, direction);
    snake.unshift(getCoords(newHead));
    drawSnakeTile(newHead);
    let tail = getTile(snake.pop());
    drawEmptyTile(tail);
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