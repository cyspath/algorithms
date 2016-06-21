// longest common substring does NOT have to be conseq

// if no match, set current to the [left, top].max
// if match, get the top-left count and + 1

function longestCommonSubstr(s1,s2) {
  var grid = createGrid(s1,s2);
  fillZeros(grid);

  for (var i = 1; i < grid.length; i++) {
    for (var j = 1; j < grid[i].length; j++) {
      var x = j - 1, y = i - 1
      if (s1[x] !== s2[y]) {
        grid[i][j] = Math.max(grid[i][j - 1], grid[i - 1][j]);
      } else {
        grid[i][j] = grid[i - 1][j - 1] + 1;
      }
    }
  }
  return findCommonSeq(grid, s1, s2);
}

function findCommonSeq(grid, x, y) {
  var count = 0;
  var result = [];
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > count) {
        count = grid[i][j];
        result.push(x[j - 1])
      }
    }
  }
  return result.join("")
}

function fillZeros(grid) {
  for (i = 0; i < grid.length; i ++ ) {
    for (j = 0; j < grid[i].length; j ++ ) {
      if (i === 0 || j === 0) {
        grid[i][j] = 0;
      }
    }
  }
  return grid;
}

function createGrid(s1, s2) {
  var grid = Array.apply(null, Array(s2.length + 1));
  grid.forEach(function(el, idx) {
    grid[idx] = Array.apply(null, Array(s1.length + 1));
  })
  return grid;
}

//  "AGGTAB" and "GXTXAYB" is "GTAB" of length 4.
console.log(longestCommonSubstr("AGGTAB", "GXTXAYB"));
