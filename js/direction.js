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

function getDirectionFromKeyCode(code) {
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

export {getOppositeDirection, getDirectionFromKeyCode};