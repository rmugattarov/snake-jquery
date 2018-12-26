function createRow(gridSize, rowNum) {
    let row = $('<tr></tr>');
    for (let i = 0; i < gridSize; i++) {
        row.append($(`<td id='${rowNum}_${i}'></td>`));
    }
    return row;
}
function createGrid(gridSize) {
    let table = $('<table id="grid"></table>');
    for (let i = 0; i < gridSize; i++) {
        table.append(createRow(gridSize, i));
    }
    return table;
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
function setSnakeTile(tile) {
    $(`#${tile.row}_${tile.col}`).css('background-color', 'white');
}

function setWaterTile(tile) {
    $(`#${tile.row}_${tile.col}`).css('background-color', 'aqua');
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
export {createGrid, getOppositeDirection, setSnakeTile, setWaterTile, getDirectionFromKeycode};