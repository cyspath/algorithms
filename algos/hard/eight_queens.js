
function eightQueens(row, grid) {
  var result = [];
  if (row === 7) {
    for (var j = 0; j < grid[row].length; j++) {
      var newGrid = copyGrid(grid);
      if (validPos(row, j, newGrid)) {
        newGrid[row][j] = 'Q';
        result.push(newGrid)
      }
    }
    return result
  }


  for (var j = 0; j < grid[row].length; j++) {
    var newGrid = copyGrid(grid);
    if (validPos(row, j, newGrid)) {
      newGrid[row][j] = 'Q';
      var gridList = eightQueens(row + 1, newGrid);
      result = result.concat(gridList);
    }
  }
  return result
}

var ans = eightQueens(0, genGrid());
// ans.forEach(function (grid) {
//   print(grid)
// })
console.log(ans.length + ' ways for 8 queens');

function validPos(row, col, grid) {
  if (grid[row][col] === 'Q') {
    return false;
  }
  if (validverticalHorizontal(row,col,grid) && validDiagonal(row,col,grid)) {
    return true;
  } else {
    return false;
  }
}

function validverticalHorizontal(row,col,grid) {
  var i = row, j = col
  while (i < 8 && i >= 0 && j >= 0 && j < 8) {
    if (!!grid[i][j]) {
      return false;
    }
    j ++;
  }
  var i = row, j = col
  while (i < 8 && i >= 0 && j >= 0 && j < 8) {
    if (!!grid[i][j]) {
      return false;
    }
    j --;
  }
  var i = row, j = col
  while (i < 8 && i >= 0 && j >= 0 && j < 8) {
    if (!!grid[i][j]) {
      return false;
    }
    i ++;
  }
  var i = row, j = col
  while (i < 8 && i >= 0 && j >= 0 && j < 8) {
    if (!!grid[i][j]) {
      return false;
    }
    i --;
  }
  return true;
}

function validDiagonal(row,col,grid) {
  var i = row, j = col
  while (i < 8 && i >= 0 && j >= 0 && j < 8) {
    if (!!grid[i][j]) {
      return false;
    }
    i --;
    j --;
  }
  var i = row, j = col
  while (i < 8 && i >= 0 && j >= 0 && j < 8) {
    if (!!grid[i][j]) {
      return false;
    }
    i ++;
    j --;
  }
  var i = row, j = col
  while (i < 8 && i >= 0 && j >= 0 && j < 8) {
    if (!!grid[i][j]) {
      return false;
    }
    i --;
    j ++;
  }
  var i = row, j = col
  while (i < 8 && i >= 0 && j >= 0 && j < 8) {
    if (!!grid[i][j]) {
      return false;
    }
    i ++;
    j ++;
  }
  return true;
}

function copyGrid(grid) {
  var newGrid = genGrid();
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      newGrid[i][j] = grid[i][j];
    }
  }
  return newGrid;
}

function genGrid() {
  var grid = Array(8);
  for (var i = 0; i < grid.length; i++) {
    grid[i] = Array(8);
  }
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

function print(g) {
  var grid = copyGrid(g);
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 0) {
        grid[i][j] = "_"
      }
    }
  }
  for (var i = 0; i < grid.length; i++) {
    console.log('|' + grid[i].join("|") + '|')
  }
  console.log('');
}
