function makeChange(n, coins) {
  coins.unshift(0);
  var grid = genGrid(n, coins), vals = genVals(n)
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (j === 0) {
        grid[i][j] = 1;
      } else if (i === 0) {
        grid[i][j] = 0;
      } else if (coins[i] > vals[j]) {
        grid[i][j] = grid[i - 1][j];
      } else {
        var newJ = vals[j] - coins[i];
        grid[i][j] = grid[i - 1][j] + grid[i][newJ];
      }
    }
  }
  console.log(grid);
  return grid[i - 1][j - 1];
}

function genGrid(n, coins) {
  var grid = Array(coins.length);
  for (var i = 0; i < grid.length; i++) {
    grid[i] = Array(n + 1);
  }
  return grid;
}

function genVals(n) {
  var vals = [];
  for (var i = 0; i <= n; i++) {
    vals.push(i);
  }
  return vals;
}

console.log(makeChange(10, [2,5,3,6]));
