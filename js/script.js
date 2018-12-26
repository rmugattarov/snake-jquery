import {createGrid, getOppositeDirection, setSnakeTile, setWaterTile, getDirectionFromKeycode, randomTile, getTileAtDirection} from './util.js';

const gridSize = 15;
const snakeInitSize = 3;
const directions = [0, 90, 180, 270];

const grid = createGrid(gridSize);
const snake = [];
let newDirection = _.sample(directions);
let direction = newDirection;

function initSnake() {
    snake.push(randomTile(gridSize));
    let oppositeDirection = getOppositeDirection(direction);
    for (let i = 1; i < snakeInitSize; i++) {
        addToTailAtDirection(oppositeDirection);
    }
    drawSnake();

    setInterval(() => {
        move();
    }, 800);

}

function addToTailAtDirection(direction) {
    let tail = _.last(snake);
    snake.push(getTileAtDirection(tail, direction, gridSize));
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
    snake.unshift(getTileAtDirection(_.head(snake), direction, gridSize));
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