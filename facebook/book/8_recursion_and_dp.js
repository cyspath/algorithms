// triple step, a child is running up staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time. count how many possible ways the child can run the stairs.

function tripleStep(n) {
  var hash = {};

  function recurse(n) {
    if (n < 0) {
      return 0;
    } else if (n == 0) {
      return 1;
    }

    var result = 0;
    for (var step = 1; step <= 3; step++) {
      if (!hash[n - step]) {
        hash[n - step] = recurse(n - step);
      }
      result += hash[n - step];
    }
    return result;
  }
  return recurse(n);
}

// console.log(tripleStep(1));
// console.log(tripleStep(2));
// console.log(tripleStep(3));
// console.log(tripleStep(4));
// console.log(tripleStep(5));


// robot in grid, it can only move right and down, if some cells are unwalkable
// design an algorithm where robot walks from top left to bottom right

function robotPath(grid) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {

      if (i === 0 && j == 0) {
        grid[i][j] = 0;
        continue;
      }

      if (grid[i][j] === 'X') {
        grid[i][j] = undefined;
      } else {
        var top = grid[i - 1] && grid[i - 1][j];
        var left = grid[i][j - 1];
        if (top !== undefined && left !== undefined) {
          grid[i][j] = Math.min(top, left) + 1;
        } else if (top !== undefined) {
          grid[i][j] = top + 1;
        } else if (left !== undefined) {
          grid[i][j] = left + 1;
        } else {
          grid[i][j] = undefined;
        }
      }

    }
  }

  var i = grid.length - 1, j = grid[0].length - 1;
  if (typeof grid[i][j] != 'number') {
    return 'No path'
  } else {
    console.log('path found');
    while (i >= 1 && j >= 1) {
      if (grid[i - 1][j] === grid[i][j] - 1) {
        grid[i][j] = 1;
        i --;
      } else if (grid[i][j - 1] === grid[i][j] - 1) {
        grid[i][j] = 1;
        j --;
      }
    }
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        if (grid[i][j] != 1) {
          grid[i][j] = 0;
        }
      }
    }
    console.log(grid);
  }
}

// var grid = [
//   [' ', ' ', ' ', ' ', ' ', 'X', 'X'],
//   ['X', ' ', 'X', ' ', ' ', 'X', 'X'],
//   [' ', ' ', 'X', 'X', 'X', 'X', 'X'],
//   [' ', ' ', ' ', ' ', 'X', 'X', 'X'],
//   [' ', 'X', ' ', 'X', ' ', 'X', 'X'],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' '],
// ]
//
// console.log(robotPath(grid));
