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



// magic index where a[i] = i
function magicIdx(a) {
  function recurse(a, i1, i2) {
    if (i2 < i1) return -1;
    // find mid index and return index if mid is correct
    var midIdx = Math.floor((i1 + i2)/2);
    if (a[midIdx] == midIdx) {
      return midIdx;
    }
    // search left up to a[midIdx]
    var leftIdx = Math.min(a[midIdx], midIdx - 1);
    var left = recurse(a, 0, leftIdx);
    if (left >= 0) {
      return left;
    }
    // search right
    var rightIdx = Math.max(a[midIdx], midIdx + 1);
    var right = recurse(a, rightIdx, i2);
    return right;
  }
  return recurse(a, 0, a.length - 1)
}

// console.log(magicIdx([1,2,2,4,4,5,6])); // 4

// subsets
function subsets(arr) {
  if (arr.length <= 0) {
    return [[]];
  }
  var letter = arr[0];
  var current = subsets(arr.slice(1));
  var newArr = current.slice();
  for (var i = 0; i < current.length; i++) {
    newArr.push(current[i].concat([letter]));
  }
  return newArr;
}

// console.log(subsets([1,2,3]));


// multiple without *
function multiply(a,b) {
  var l = Math.max(a,b);
  var s = Math.min(a,b);
  var sum = 0;
  for (var i = 0; i < s; i++) {
    sum += l;
  }
  return sum;
}

function multiply(a,b) {
  var l = Math.max(a,b), s = Math.min(a,b), sum = 0;
  function recurse(s, l) {
    if (s == 1) {
      return sum += l;
    }
    recurse(Math.floor(s/2), l)
    sum = s % 2 == 0 ? sum + sum : sum + sum + l;
    console.log(sum);

  }
  recurse(s, l);
  return sum;
}
// multiply(3, 20)


// string of length L has L! permutations
// n * n!
function permutationNoDup(str) {
  if (str.length <= 0) {
    return [str];
  }
  var result = [];
  for (var i = 0; i < str.length; i++) {
    var newStr = str.slice(0, i) + str.slice(i + 1);
    var arr = permutationNoDup(newStr);
    for (var j = 0; j < arr.length; j++) {
      result.push(str[i] + arr[j]);
    }
  }
  return result;
}

// console.log(permutationNoDup('abcd'));

function permutationWithDup(str) {
  if (str.length === 0) return [str];
  var result = [], store = {};
  for (var i = 0; i < str.length; i++) {
    if (!store[str[i]]) {
      store[str[i]] = true;
      var newStr = str.slice(0, i) + str.slice(i + 1);
      var arr = permutationWithDup(newStr);
      for (var j = 0; j < arr.length; j++) {
        result.push(str[i] + arr[j]);
      }
    }
  }
  return result;
}

// console.log(permutationWithDup('aabc'));

// find all correct permutations of n parentheses
// O(n^2)
function parenthesis(n) {
  var result = [];
  function recurse(str, left, right) {
    if (left > right || left < 0) {
      return;
    }
    if (left === 0 && right === 0) {
      return result.push(str);
    }
    if (left > 0) {
      recurse(str + '(', left - 1, right);
    }
    if (right > 0) {
      recurse(str + ')', left, right - 1);
    }
  }
  recurse('', n, n);
  return result;
}

// console.log(parenthesis(4));


// paint fill program for a matrix (like in mspaint)
function paintFill(grid, row, col) {
  function recurse(row, col) {
    if (!grid[row] || !grid[row][col] || grid[row][col] !== ' ') {
      return;
    } else {
      grid[row][col] = '*';
      recurse(row - 1, col);
      recurse(row + 1, col);
      recurse(row, col + 1);
      recurse(row, col - 1);
    }
  }
  recurse(row, col);
  return grid
}
// var grid = [
//   [' ', ' ', ' ', '*', ' ', ' ', ' ', ' ', ],
//   [' ', ' ', '*', ' ', '*', ' ', ' ', ' ', ],
//   [' ', '*', '0', ' ', ' ', '*', ' ', ' ', ],
//   [' ', '*', ' ', ' ', ' ', '*', ' ', ' ', ],
//   [' ', ' ', '*', ' ', ' ', '*', ' ', ' ', ],
//   [' ', ' ', ' ', '*', ' ', '*', ' ', ' ', ],
//   [' ', ' ', ' ', '*', ' ', '*', ' ', ' ', ],
//   [' ', ' ', ' ', '*', ' ', '*', ' ', ' ', ]
// ]
// console.log(paintFill(grid, 3, 3));


// ways of giving change of n cents by using american coins 25, 10, 5, and 1
// to solve, make matrix, top is ways to make using previous coin types, if current total value is >= current coin, use top + difference in value of current coin
// O(value * coins)
function coinChange(value, coins) {
  var grid = new Array(coins.length + 1);
  for (var i = 0; i < grid.length; i++) {
    grid[i] = [];
    for (var j = 0; j <= value; j++) {
      grid[i].push(0)
    }
  }
  for (var i = 1; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      var top = grid[i - 1][j];
      if (j === 0) {
        grid[i][j] = 1;
      } else if (j >= coins[i - 1]) {
        grid[i][j] = grid[i][j - coins[i - 1]] + top;
      } else {
        grid[i][j] = top;
      }
    }
  }
  console.log(grid);
  return grid[i - 1][j - 1]
}

// console.log(coinChange(25, [1,5,10,25]));


// Tower of hanoi

function toh(n) {
  var a = [], b = [], c = [];
  for (var i = n; i >= 1; i--) {
    a.push(i)
  }

  function recurse(n, from, use, to) {
    // console.log(a, b, c);
    if (n === 0) {
      return
    }
    recurse(n - 1, from, to, use);
    // move current/base to toTower
    var peg = from.pop();
    to.push(peg);
    console.log('movin', peg);
    console.log(a, b, c);
    // move top pegs to toTower
    recurse(n - 1, use, from, to);

  }
  console.log(a, b, c);
  recurse(n, a, b, c)
  return [a,b,c]
}

// console.log(toh(4));
