//█▀ █░█ █▄▄ ░░█ █▀█ █▀▀ ▀█▀
//▄█ █▄█ █▄█ █▄█ ██▄ █▄▄ ░█░
//==========================================================================================================
// Sudoku is a number-placement puzzle. The objective is to fill a 9 × 9 grid with numbers in such a way that each column,
// each row, and each of the nine 3 × 3 sub-grids that compose the grid all contain all of the numbers from 1 to 9 one time.
// Implement an algorithm that will check whether the given grid of numbers represents a valid Sudoku puzzle according to the layout rules described above.
// Note that the puzzle represented by grid does not have to be solvable.

// the output should be true
const grid1 = [
    [".", ".", ".", "1", "4", ".", ".", "2", "."],
    [".", ".", "6", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "1", ".", ".", ".", ".", ".", "."],
    [".", "6", "7", ".", ".", ".", ".", ".", "9"],
    [".", ".", ".", ".", ".", ".", "8", "1", "."],
    [".", "3", ".", ".", ".", ".", ".", ".", "6"],
    [".", ".", ".", ".", ".", "7", ".", ".", "."],
    [".", ".", ".", "5", ".", ".", ".", "7", "."],
  ];
  
  // the output should be false
  const grid2 = [
    [".", ".", ".", ".", "2", ".", ".", "9", "."],
    [".", ".", ".", ".", "6", ".", ".", ".", "."],
    ["7", "1", ".", ".", "7", "5", ".", ".", "."],
    [".", "7", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "8", "3", ".", ".", "."],
    [".", ".", "8", ".", ".", "7", ".", "6", "."],
    [".", ".", ".", ".", ".", "2", ".", ".", "."],
    [".", "1", ".", "2", ".", ".", ".", ".", "."],
    [".", "2", ".", ".", "3", ".", ".", ".", "."],
  ];

		// function solution(matrix) {
		//     // Implementation
		// }

		// console.log(solution(grid1)); // true
		// console.log(solution(grid2)); // false

// █▀ █▀█ █░░ █░█ ▀█▀ █ █▀█ █▄░█
// ▄█ █▄█ █▄▄ █▄█ ░█░ █ █▄█ █░▀█
//==========================================================================================================


function errorHandeling(matrix){
	/*
	This function for chacking validation of matrix (Matrix need to have 9rows and 9 columns, 
	and only "." , "<1-9>" elements).
	*/
    if (matrix.length !== 9)
    // code 1: 
    //        matrix have note 9 rows
        throw new RangeError("Matrix didn't have 9 rows [Need matrix 9x9]!!");
    for (let row of matrix){
        if (row.length !== 9)
        // code 2:
        //        matrix have note 9 columns
            throw new RangeError("Matrix didn't have 9 columns [Need matrix 9x9]!!");
        for (let el of row){
            if ((el.length !== 1 || el.charCodeAt(0) < 48 || el.charCodeAt(0) > 57) && el != '.')
            // code 3:
            //        each elems of matrix need to be number from 1 to 9
                throw new TypeError("Need matrix 9x9, with char of numbers!!");
        }
    }
}

function IsMiniSolved(matrix){
	/*
	In this function, matrix will be divided to mini sudokus(3 * 3) witch
	we will need to check have any repetition of numbers or not .
	It will return false if mini sudokus are not solvable and will call 
	isSolvable function if mini sudocus are solvable.
	*/
    let sudokus = [];
    let one = [];
    let i = 0,j = 0;
    let sudoku = "";
    while(i < 9 && j < 9){
        if (matrix[i][j] !== '.')
            sudoku += matrix[i][j];
        if(i % 3 == 2 && j % 3 == 2){
            sudokus.push(sudoku);
            sudoku="";
        }
        if((j % 9 == 8 || j % 3 == 2) && i % 3 != 2){
            j -= 3;
            i += 1;
        }
        else if(j % 9 == 8 && i % 3 == 2){
            j -= 9;
            i += 1;
        }
        else if(i % 3 == 2 && j % 3 == 2){
            i -= 2;
        }
        j++;
    }
    for (let i = 0; i < 9;i++){
        sudoku = new Set(sudokus[i]);
        if (sudoku.size !== sudokus[i].length)
            return false;
    }
    return isSolvable(matrix);
}

function isSolvable(matrix) {
    /*
    This function will check the matrix and will return true or false.
    */
    let column;
    let tmp;
    let row;
    let columns = [...matrix]
    columns = columns[0].map((val, index) => columns.map(row => row[index]).reverse())
    for (let i = 0; i < 9;i++){
        column = columns[i].reduce((acc, cur) => {
            if(cur !== '.') 
                acc = acc + cur;
                return acc;
        },"");
        tmp = new Set(column);
        if (tmp.size !== column.length)
            return false
        row = matrix[i].reduce((acc, cur) => {
            if(cur !== '.') 
                acc = acc + cur;
                return acc;
        },"");
        tmp = new Set(row);
        if (tmp.size !== row.length)
            return false;
    }
    return true;
}   

function solution(matrix) {
    // Implementation
    errorHandeling(matrix);
    return IsMiniSolved(matrix);
}

console.log(solution(grid1)); // true
console.log(solution(grid2)); // false