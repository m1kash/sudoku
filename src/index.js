module.exports = function solveSudoku(matrix) {
    let matrixSolved = matrix;
    solve(matrix);
    function solve (matrix) {
        let row, col;
        let objTemp = {
            'row': 0,
            'col': 0
        };


        if (findUnassignedLocation(matrix, objTemp)) {
            return true;
        }
        row = objTemp['row'];
        col = objTemp['col'];
        for (let num = 1; num <= 9; num++) {
            if (noConflicts(matrix, row, col, num)) {
                matrixSolved[row][col] = num;
                if (solve(matrix)) {
                    return true;
                }
                matrixSolved[row][col] = 0;
            }
        }
        return false;
    }

    function findUnassignedLocation(matrix, objTemp) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (!matrix[row][col]) {
                    objTemp['row'] = row;
                    objTemp['col'] = col;
                    return;
                }
            }
        }

        return true;
    }

    function noConflicts(matrix, row, col, num) {

        return isRowOk(matrix, row, num) &&
            isColOk(matrix, col, num) &&
            isBoxOk(matrix, row, col, num);
    }

    function isRowOk(matrix, row, num) {
        for (let col = 0; col < 9; col++) {
            if (matrix[row][col] === num) {
                return;
            }
        }


        return true;
    }

    function isColOk(matrix, col, num) {
        for (let row = 0; row < 9; row++) {
            if (matrix[row][col] === num) {
                return;
            }
        }

        return true;
    }

    function isBoxOk(matrix, row, col, num) {
        row = Math.floor(row / 3) * 3;
        col = Math.floor(col / 3) * 3;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (matrix[row + r][col + c] == num) {
                    return;
                }
            }
        }
        return true;
    }
    return matrixSolved;
};