function pathfind(grid) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === null) {
        continue;
      }
      if (i === 0 && j === 0) {
        grid[i][j] = 1;
      } else if (i === 0) {
        grid[i][j] = min(null, grid[i][j - 1]);
      } else if (j === 0) {
        grid[i][j] = min(grid[i - 1][j], null);
      } else {
        grid[i][j] = min(grid[i - 1][j], grid[i][j - 1]);
      }
    }
  }
  return backtrace(grid)
}

function min(a,b) {
  if (!a && !b) {
    return null;
  } else if (!a) {
    return b + 1;
  } else if (!b) {
    return a + 1;
  } else {
    return a > b ? b + 1 : a + 1;
  }
}

function backtrace(grid) {
  if (!grid[grid.length - 1][grid[0].length - 1]) {
    return false;
  }
  var current;
  for (var i = grid.length - 1; i >= 0; i = i - 1) {
    for (var j = grid[i].length - 1; j >= 0; j = j - 1) {
      if (current === undefined) {
        current = grid[i][j];
        grid[i][j] = "*"
      } else if (grid[i][j] && grid[i][j] < current) {
        current = grid[i][j];
        grid[i][j] = "*"
      } else if (grid[i][j] === null) {
        grid[i][j] = ' '
      }
    }
  }
  grid.forEach(function(row) {
    console.log(row);
  })
}
var x = null;
grid = [
  [0,0,0,x,0,0],
  [0,0,x,0,0,0],
  [x,0,0,x,0,x],
  [0,x,0,0,0,0],
  [0,0,x,x,x,0]
]

pathfind(grid)
