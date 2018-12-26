import {createGrid, getOppositeDirection, setSnakeTile, setWaterTile, getDirectionFromKeycode} from './util.js';

const gridSize = 15;
const snakeInitSize = 3;
const directions = [0, 90, 180, 270];

const grid = createGrid(gridSize);
const snake = [];
let newDirection = _.sample(directions);
let direction = newDirection;

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

function move() {
    if (newDirection !== getOppositeDirection(direction)) {
        direction = newDirection;
    }
    snake.unshift(getTileAtDirection(_.head(snake), direction));
    setWaterTile(snake.pop());
    drawSnake();
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