import {
    createGrid,
    getDirectionFromKeycode,
    getOppositeDirection,
    getTileAtDirection,
    randomTile,
    setSnakeTile,
    setWaterTile
} from './util.js';

const gridSize = 15;
const snakeInitSize = 3;
const directions = [0, 90, 180, 270];

const grid = createGrid(gridSize);
const snake = [];
let newDirection = _.sample(directions);
let direction = newDirection;

function initSnake() {
    createRandomSnake();
    redraw();

    setInterval(() => {
        move();
        redraw();
    }, 800);

}

function createRandomSnake() {
    snake.push(randomTile(gridSize));
    let oppositeDirection = getOppositeDirection(direction);
    for (let i = 1; i < snakeInitSize; i++) {
        addToTailAtDirection(oppositeDirection);
    }
}

function addToTailAtDirection(direction) {
    let tail = _.last(snake);
    snake.push(getTileAtDirection(tail, direction, gridSize));
}

function redraw() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            setWaterTile({row, col});
        }
    }
    snake.forEach(tile => {
        setSnakeTile(tile);
    });
}

function move() {
    if (newDirection !== getOppositeDirection(direction)) {
        direction = newDirection;
    }
    snake.unshift(getTileAtDirection(_.head(snake), direction, gridSize));
    snake.pop();
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