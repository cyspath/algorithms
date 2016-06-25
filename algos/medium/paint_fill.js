function paintFill(grid, pt, color) {
  var prevColor = grid[pt[0]][pt[1]];
  fillAndExpand(grid, pt, color, null, prevColor);
  return grid;
}

function fillAndExpand(grid, pt, color, prev, prevColor) {
  if(grid[pt[0]][pt[1]] !== prevColor) {
    return;
  }
  grid[pt[0]][pt[1]] = color;
  genCoors(grid, pt, prev).forEach(function (c) {
    fillAndExpand(grid, c, color, pt, prevColor);
  })
}

function genCoors(grid, pt, prev) {
  var i = pt[0], j = pt[1], result = [];
  var coors = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i , j - 1], [i, j + 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]];
  coors.forEach(function (c) {
    if (valid(grid, c, prev)) {
      result.push(c);
    }
  })
  return result;
}

function valid(grid, pt, prev) {
  if (prev === pt) {
    return false;
  }
  if (grid[pt[0]] === undefined) {
    return false;
  }
  if (grid[pt[0]][pt[1]] === undefined) {
    return false;
  }
  return true;
}

var grid = [
  [1,1,0,0,0,1],
  [0,1,1,1,0,1],
  [0,1,1,0,0,1],
  [1,1,0,0,0,1],
  [1,1,0,0,1,1],
]
// [ [ 1, 1, 8, 8, 8, 1 ],
//   [ 0, 1, 1, 1, 8, 1 ],
//   [ 0, 1, 1, 8, 8, 1 ],
//   [ 1, 1, 8, 8, 8, 1 ],
//   [ 1, 1, 8, 8, 1, 1 ] ]
console.log(paintFill(grid, [3,3], 8));
