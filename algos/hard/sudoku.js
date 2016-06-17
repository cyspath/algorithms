var grid =    [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

var numbers = [1,2,3,4,5,6,7,8,9]

function sudoku(grid) {
  var position = findEmptyBlock(grid);
  if (position === false) {
    return grid;
  }

  for (var i = 0; i < numbers.length; i++) {

  }

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
    vertical.push(array[row][j]);
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
