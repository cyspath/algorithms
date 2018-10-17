function DoubleEdgeGraph(n, arr) {
  this.grid = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push({ edge: 0, val: null });
    }
    this.grid.push(row);
  }

  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    var a = this.grid[el[0] - 1][el[1] - 1];
    var b = this.grid[el[1] - 1][el[0] - 1];
    a.val = el[2];
    b.val = el[2];
    a.edge = 1;
    b.edge = 1;
  }
}

DoubleEdgeGraph.prototype.get = function(a,b) {
  return this.grid[a - 1][b - 1];
}


// *****************************************************
// NUMBER OF BLACK SHAPES
// *****************************************************
//
// Given n*m fields of O's and X's, where O=white, X=black, for example

var numberBlackShapes = function(m) {
  var visited = {};

  function inBound(i,j) {
    return (i < 0 || j < 0 || i >= m.length || j >= m[0].length) ? false : true;
  }

  function recurse(i,j) {
    visited[[i,j]] = true;

    [[i-1,j],[i,j+1],[i+1,j],[i,j-1]].forEach(function(c) {
      var key = [c[0],c[1]];

      if (inBound(c[0],c[1]) && !visited[key] && m[c[0]][c[1]] === 'X') {
        recurse(c[0],c[1]);
      }
    });
  }

  var count = 0;
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m[i].length; j++) {
      var el = m[i][j];
      if (el === 'X' && !visited[[i,j]]) {
        recurse(i,j);
        count++;
      }
    }
  }

  return count;
}

// console.log(numberBlackShapes([
//   [ 'X', 'O', 'O', 'X', 'O', 'O', 'O' ],
//   [ 'X', 'O', 'X', 'X', 'O', 'X', 'O' ],
//   [ 'O', 'X', 'O', 'O', 'O', 'X', 'O' ]
// ])); // 4


// *****************************************************
// COMMUTABLE ISLANDS
// *****************************************************
//
// There are n islands and there are many bridges connecting them. Each bridge
// has some cost attached to it.
//
// We need to find bridges with minimal cost such that all islands are connected.
//
// It is guaranteed that input data will contain at least one possible scenario in
// which all islands are connected with each other.
//
// n = 4
// [
// [1,2,1],
// [2,3,4],
// [1,4,3],
// [4,3,2],
// [1,3,10]
// ]
//
// In the above example, we can select bridges 1(connecting islands 1 and 2
// with cost 1), 3(connecting islands 1 and 4 with cost 3), 4(connecting islands
// 4 and 3 with cost 2). Thus we will have all islands connected with the
// minimum possible cost(1+3+2 = 6).

var commutableIslands = function(n, m) {
  var cost;
  var g = new DoubleEdgeGraph(n, m);

  function recurse(sum, l1, l2) {
    if (l2.length === 0) {
      if (!cost || sum < cost) cost = sum;
    }

    l2.forEach(function(el, idx) {
      if (l1.length > 0) {
        var e = g.get(l1[l1.length - 1], el);
        if (e.edge) {
          recurse(sum + e.val, l1.concat([el]), l2.slice(0,idx).concat(l2.slice(idx + 1)))
        }
      } else {
        recurse(sum, l1.concat([el]), l2.slice(0,idx).concat(l2.slice(idx + 1)))
      }
    })
  }

  var l2 = [];
  for (var i = 1; i <= n; i++) {
    l2.push(i);
  }
  recurse(0, [], l2)

  return cost;
}
// console.log(commutableIslands(4, [
// [1,2,1],
// [2,3,4],
// [1,4,3],
// [4,3,2],
// [1,3,10]
// ])); // 6



// *****************************************************
// BOGGLE - FIND ALL POSSIBLE WORDS IN A BOARD
// *****************************************************
//
// Given a dictionary, a method to do lookup in dictionary and a M x N board where
// every cell has one character. Find all possible words that can be formed by a
// sequence of adjacent characters. Note that we can move to any of 8 adjacent
// characters, but a word should not have multiple instances of same cell.
//
// Example:
//
// Input: dictionary[] = {"GEEKS", "FOR", "QUIZ", "GO"};
//        boggle[][]   = {{'G','I','Z'},
//                        {'U','E','K'},
//                        {'Q','S','E'}};
//       isWord(str): returns true if str is present in dictionary
//                    else false.
//
// Output:  Following words of dictionary are present
//          GEEKS
//          QUIZ

function checkWordInBoggle(word, boggle) {

  for (var i = 0; i < boggle.length; i++) {
    for (var j = 0; j < boggle[i].length; j++) {

      if (hasLetter(word, 0, boggle, i, j, {})) return true;

    }
  }

  return false;

  function hasLetter(word, idx, boggle, row, col, visited) {

    if (visited[[row,col]]) return false;
    visited[[row,col]] = true;

    if (idx >= word.length) return true;
    if (row >= boggle.length || row < 0 || col >= boggle[0].length || col < 0) return false;
    if (word[idx] !== boggle[row][col]) return false;

    var directions = [[row-1,col],[row-1,col+1],[row,col+1],[row+1,col+1],[row+1,col],[row+1,col-1],[row,col-1],[row-1,col-1]];

    for (var i = 0; i < directions.length; i++) {
      var d = directions[i];

      var newVisited = {};
      for (var k in visited) newVisited[k] = true;

      if (hasLetter(word, idx + 1, boggle, d[0], d[1], newVisited) === true) return true;
    }

    return false;
  }

}

var boggle = function(words, boggle) {
  var inBoggle = [];
  for (var i = 0; i < words.length; i++) {
    if (checkWordInBoggle(words[i], boggle) === true) {
      inBoggle.push(words[i]);
    }
  }
  return inBoggle;
}
// 
// console.log(boggle(
//   ["GEEKS", "FOR", "QUIZ", "GO"],
//   [ ['G','I','Z'],
//     ['U','E','K'],
//     ['Q','S','E'] ]
// ));
