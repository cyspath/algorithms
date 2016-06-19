var grid = [
  [0, 0, 0,  0, 0, 3,  0, 2, 0],
  [0, 0, 0,  6, 2, 0,  1, 0, 0],
  [0, 0, 2,  1, 0, 0,  0, 8, 0],
  [0, 0, 5,  0, 1, 0,  0, 0, 8],
  [0, 0, 0,  0, 8, 0,  0, 4, 5],
  [0, 3, 0,  0, 5, 0,  0, 0, 2],
  [3, 0, 4,  2, 0, 7,  0, 5, 0],
  [0, 0, 0,  0, 0, 1,  4, 0, 7],
  [0, 1, 0,  4, 0, 0,  0, 3, 9]
]

// var Answer = [
//   [7, 5, 1,  8, 4, 3,  9, 2, 6],
//   [8, 9, 3,  6, 2, 5,  1, 7, 4],
//   [6, 4, 2,  1, 7, 9,  5, 8, 3],
//   [4, 2, 5,  3, 1, 6,  7, 9, 8],
//   [1, 7, 6,  9, 8, 2,  3, 4, 5],
//   [9, 3, 8,  7, 5, 4,  6, 1, 2],
//   [3, 6, 4,  2, 9, 7,  8, 5, 1],
//   [2, 8, 9,  5, 3, 1,  4, 6, 7],
//   [5, 1, 7,  4, 6, 8,  2, 3, 9]
// ]

var numbers = [1,2,3,4,5,6,7,8,9]
var tries = 0

function sudoku(grid) {
  var position = findEmptyBlock(grid);
  if (position === false) {
    return grid;
  }

  for (var i = 0; i < numbers.length; i++) {
    grid[position[0]][position[1]] = numbers[i];
    tries += 1;
    if (validNumber(position[0], position[1], grid)) {
      var result = sudoku(grid);
      if (result !== false) {
        return grid;
      }
    }
  }
  grid[position[0]][position[1]] = 0;
  return false;
}

function findEmptyBlock(grid) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        return [i,j]
      }
    }
  }
  return false;
}

function validNumber(i,j,grid) {    // checks horizontal, vertical, then local squares to see if valid
  if (validNine(grid[i]) === false) {
    return false;
  }

  var vertical = [];
  for (var row = 0; row < grid.length; row++) {
    vertical.push(grid[row][j]);
  }
  if (validNine(vertical) === false) {
    return false;
  }

  if (validNine(findQuadron(i,j,grid)) === false) {
    return false;
  }
  return true;
}

function findQuadron(i,j,grid) {  // finds the local surrounding numbers
  if (i < 3) {
    if (j < 3) {
      var topLeft = [0,0]
    } else if (j < 6) {
      var topLeft = [0,3]
    } else {
      var topLeft = [0,6]
    }
  } else if (i < 6) {
    if (j < 3) {
      var topLeft = [3,0]
    } else if (j < 6) {
      var topLeft = [3,3]
    } else {
      var topLeft = [3,6]
    }
  } else {
    if (j < 3) {
      var topLeft = [6,0]
    } else if (j < 6) {
      var topLeft = [6,3]
    } else {
      var topLeft = [6,6]
    }
  }
  var i = topLeft[0];
  var j = topLeft[1];
  return [
    grid[i][j], grid[i][j+1], grid[i][j+2],
    grid[i+1][j], grid[i+1][j+1], grid[i+1][j+2],
    grid[i+2][j], grid[i+2][j+1], grid[i+2][j+2],
  ]
}

function validNine(arr) { // check if 9 numbers are unique 1-9, allowing multiple 0
  var hash = {};
  for (var i = 0; i < arr.length; i++) {
    if (hash[arr[i]] && arr[i] !== 0) {
      return false;
    } else {
      hash[arr[i]] = true;
    }
  }
  return true;
}

console.log(sudoku(grid));
console.log(tries.toString() + " numbers of tries");
