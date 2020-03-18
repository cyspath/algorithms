//=============================================================================================

// Given a matrix of ‘O’ and ‘X’, replace ‘O’ with ‘X’ if surrounded by ‘X’

// Input: mat[M][N] =  {{'X', 'O', 'X', 'X', 'X', 'X'},
//                      {'X', 'O', 'X', 'X', 'O', 'X'},
//                      {'X', 'X', 'X', 'O', 'O', 'X'},
//                      {'O', 'X', 'X', 'X', 'X', 'X'},
//                      {'X', 'X', 'X', 'O', 'X', 'O'},
//                      {'O', 'O', 'X', 'O', 'O', 'O'},
// };
// Output: mat[M][N] =  {{'X', 'O', 'X', 'X', 'X', 'X'},
//                       {'X', 'O', 'X', 'X', 'X', 'X'},
//                       {'X', 'X', 'X', 'X', 'X', 'X'},
//                       {'O', 'X', 'X', 'X', 'X', 'X'},
//                       {'X', 'X', 'X', 'O', 'X', 'O'},
//                       {'O', 'O', 'X', 'O', 'O', 'O'},
// };

// USE OF FLOOD FILL ALGORTHM - 1. fill `O` with `-`, 2. go edge `O` traverse and fill `X`, 3. finally fill rest `-` with `O`

const matrixFillSurroundedIsland = function(g) {
    if (!g.length) return g;

    const recurseFillO = function(r, c) {
        console.log([r,c])
        if (!g[r] || !g[r][c] || g[r][c] !== '-') return;
        g[r][c] = 'O'; // fill
        [[r - 1, c], [r, c + 1], [r + 1, c], [r, c - 1]].forEach((c) => recurseFillO(c[0], c[1])); // fill surrounding
    }

    const replaceAll = function (a, b) {
        g.forEach((row, i) => {
            row.forEach((el, j) => {
                if (el === a) g[i][j] = b
            });
        })
    }

    replaceAll('O', '-'); // replace all O with -

    // find edge O's and fill them recursively;
    for (let i = 0; i < g.length; i++) { // left and right edge
        if (g[i][0] === '-') recurseFillO(i, 0);
        if (g[i][g[0].length - 1] === '-') recurseFillO(i, g[0].length - 1);
    }
    for (let j = 0; j < g[0].length; j++) { // top and bottom edge
        if (g[0][j] === '-') recurseFillO(0, j);
        if (g[g.length - 1][j] === '-') recurseFillO(g.length - 1, j);
    }

    replaceAll('-', 'X'); // now for the ones which are surrounded, which are the ones left that has '-', fill them

    return g;
}
// console.log(matrixFillSurroundedIsland([
//     ['X', 'O', 'X', 'X', 'X', 'X'],
//     ['X', 'O', 'X', 'X', 'O', 'X'],
//     ['X', 'X', 'X', 'O', 'O', 'X'],
//     ['O', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'O', 'X', 'O'],
//     ['O', 'O', 'X', 'O', 'O', 'O']
// ]))

//=============================================================================================

// https://leetcode.com/problems/rotate-image/submissions/
/*
 * clockwise rotate
 * first reverse up to down, then swap the symmetry 
 * 1 2 3     7 8 9     7 4 1
 * 4 5 6  => 4 5 6  => 8 5 2
 * 7 8 9     1 2 3     9 6 3
*/

/*
 * anticlockwise rotate
 * first reverse left to right, then swap the symmetry
 * 1 2 3     3 2 1     3 6 9
 * 4 5 6  => 6 5 4  => 2 5 8
 * 7 8 9     9 8 7     1 4 7
*/

//=============================================================================================

