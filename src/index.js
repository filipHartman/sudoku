module.exports = function solveSudoku(matrix) {
    // your solution
    sudokuSolver(matrix);
    return matrix;
};
function sudokuSolver(matrix) {
    let emptyMatrix = true;
    let rowIndex = -1;
    let columnIndex = -1;
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const cell = matrix[x][y];
            if (cell === 0) {
                rowIndex = x;
                columnIndex = y;
                emptyMatrix = false;
                break;
            }
        }
        if (!emptyMatrix) {
          break;
        }
    }
    if(emptyMatrix) {
      return true;
    }

    for (let digit = 1; digit <= 9; digit++) {
        if (
            !isInRow(digit, matrix, rowIndex) &&
            !isInColumn(digit, matrix, columnIndex) &&
            !isInBox(digit, matrix, rowIndex, columnIndex)
        ) {
            matrix[rowIndex][columnIndex] = digit;
            if (sudokuSolver(matrix)) {
                return true;
            } else {
                matrix[rowIndex][columnIndex] = 0;
            }
        }
    }
    return false;
}

function isInRow(digit, matrix, rowIndex) {
    return !!matrix[rowIndex].find((x) => x === digit);
}

function isInColumn(digit, matrix, columnIndex) {
    const column = matrix.map((row) => row[columnIndex]);
    return !!column.find((y) => y === digit);
}

function isInBox(digit, matrix, rowIndex, columnIndex) {
    const box = [];
    const boxRowStart = Math.floor(rowIndex / 3) * 3;
    const boxColStart = Math.floor(columnIndex / 3) * 3;

    for (
        let boxRowIndex = boxRowStart;
        boxRowIndex < boxRowStart + 3;
        boxRowIndex++
    ) {
        for (
            let boxColIndex = boxColStart;
            boxColIndex < boxColStart + 3;
            boxColIndex++
        ) {
            box.push(matrix[boxRowIndex][boxColIndex]);
        }
    }

    return !!box.find((z) => z === digit);
}
