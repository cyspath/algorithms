// 240. Search a 2D Matrix II
// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.
// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// Given target = 5, return true.
// Given target = 20, return false.

// O(m+n) where m is height and n is width of matrix
// the TRICK is to start from top right, since it is sorted both direction
const searchMatrix = (matrix, target) => {
    if (!matrix.length) return false;
    let i = 0; j = matrix[0].length - 1;
    while (i < matrix.length && j >= 0) {
        console.log(i,j)
        if (matrix[i][j] === target) {
            return true;
        } else if (matrix[i][j] < target) {
            i++;
        } else if (matrix[i][j] > target) {
            j--;
        }
    }
    return false;
};

//=============================================================================================
