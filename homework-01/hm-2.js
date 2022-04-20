const matrix1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ];
  
  const matrix2 = [
    [1, 2, 3],
    [4, 5, []],
    [7, 8, 9],
    [null, 11, 12],
    [13, 14, NaN],
  ];

// =============================================================================================
//   // You can use more than one functions
// =============================================================================================
// 1. Rotate any matrix
// =============================================================================================
//░░███╗░░░░░  ██████╗░░█████╗░████████╗░█████╗░████████╗███████╗  ██████╗░███████╗░██████╗░░░░
//░████║░░░░░  ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝  ██╔══██╗██╔════╝██╔════╝░░░░
//██╔██║░░░░░  ██████╔╝██║░░██║░░░██║░░░███████║░░░██║░░░█████╗░░  ██║░░██║█████╗░░██║░░██╗░░░░
//╚═╝██║░░░░░  ██╔══██╗██║░░██║░░░██║░░░██╔══██║░░░██║░░░██╔══╝░░  ██║░░██║██╔══╝░░██║░░╚██╗░░░
//███████╗██╗  ██║░░██║╚█████╔╝░░░██║░░░██║░░██║░░░██║░░░███████╗  ██████╔╝███████╗╚██████╔╝██╗
//╚══════╝╚═╝  ╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░╚══════╝  ╚═════╝░╚══════╝░╚═════╝░╚═╝
// =============================================================================================
const how_much_call = (deg) => {
    if (deg % 90 !== 0) {
        throw new RangeError('The angle of rotation must be a multiple of 90 !')
    }
    return ((deg % 360) + 360) % 360 / 90
}

const rotate90Degree = (matrix) => {
    let i, j, row;
    let row_number = 0;
    let matix90 = [];

    j = 0;
    while(j < matrix[row_number].length){
        row = [];
        i = matrix.length - 1;
        while (i >= 0){
            row.push(matrix[i][j])
            i--;
        }
        if(row_number + 1 < matrix.length)
            row_number++;
        matix90.push(row);
        j++;
    }
    return matix90;
}

const rotate = (matrix, deg) => {
    // code here
    let matrix_rotated = [...matrix];
    let countRotationNumber = how_much_call(deg);
    while (countRotationNumber--){
        matrix_rotated = rotate90Degree(matrix_rotated);
    }
    return matrix_rotated;
};


// ==========================================================================================
// 2. Rotate all matrix elements except the diagonals
// ==========================================================================================
//██████╗░░░░███████╗██╗░░██╗██████╗░███████╗░█████╗░████████╗  ██████╗░███████╗░██████╗░░░░
//╚════██╗░░░██╔════╝╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝  ██╔══██╗██╔════╝██╔════╝░░░░
//░░███╔═╝░░░█████╗░░░╚███╔╝░██████╔╝█████╗░░██║░░╚═╝░░░██║░░░  ██║░░██║█████╗░░██║░░██╗░░░░
//██╔══╝░░░░░██╔══╝░░░██╔██╗░██╔═══╝░██╔══╝░░██║░░██╗░░░██║░░░  ██║░░██║██╔══╝░░██║░░╚██╗░░░
//███████╗██╗███████╗██╔╝╚██╗██║░░░░░███████╗╚█████╔╝░░░██║░░░  ██████╔╝███████╗╚██████╔╝██╗
//╚══════╝╚═╝╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░  ╚═════╝░╚══════╝░╚═════╝░╚═╝
// ==========================================================================================

const how_much_times = (deg) => {
    if (deg % 90 !== 0) {
        throw new RangeError('The angle of rotation must be a multiple of 90 !')
    }
    return ((deg % 360) + 360) % 360 / 90
}


const rotate90WithoutDiag = (matrix) => {
    let i, j, row;
    let matix90 = [];

    j = 0;
    while(j < matrix[0].length){
        row = [];
        i = matrix.length - 1;
        while (i >= 0){
            row.push(matrix[i][j])
            i--;
        }
        matix90.push(row);
        j++;
    }
    return matix90;
}

const rotateWithoutDiagonal = (matrix, deg) => {
    // code here
    let countRotationNumber = how_much_times(deg);
    
    for (row of matrix)
        if (row.length !== matrix.length)
             throw new RangeError('The matrix has not diagonals!')
    let matrix_rotated = [...matrix];
    while (countRotationNumber--){
        matrix_rotated = rotate90WithoutDiag(matrix_rotated);
    }
    for (let i = 0; i < matrix.length; i++)
        for (let j = 0; j < matrix[0].length; j++)
            if (j == matrix[0].length - 1 - i || i === j)
                matrix_rotated[i][j] = matrix[i][j];
       
    return matrix_rotated;    
};