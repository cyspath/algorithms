//2. Given a 2D matrix of booleans, find the biggest continuous square submatrix of "trues" and return its dimension.
//Example:
// t t t t t t
// t t t f f f
// t t t f f f
// t f f t t f returns 3

// t t f t
// f t f t
// t t t t
// f t t f returns 2

// f f
// t t returns 1

// f f f
// f f f
// f f f returns 0

var t = true
var f = false
var mat = [
    [t,t,f,t,f,t],
    [f,f,t,t,t,t],
    [f,f,t,t,t,t],
    [f,t,t,t,t,t],
    [t,t,t,t,t,t],
    [f,f,t,t,t,f]
];

var sq = function(mat) {
  size = 0

  i = 0
  while (i < mat.length) {
    j = 0
    while (j < mat[i].length) {
      // initial value conversion for visual awesomeness
      if (mat[i][j] == false) {
        mat[i][j] = 0
      } else {
         mat[i][j] = 1
      }

      if (i == 0 || j == 0) {
        if (mat[i][j] == true) {
          mat[i][j] = 1
        }
      } else if (mat[i - 1][j - 1] == 0) {
        mat[i][j] = 1
      } else {
        var upleft = mat[i - 1][j - 1]
        var checkup = true
        for (var u = 1; u <= upleft; u++) {
          if (mat[i - u][j] == 0) { checkup = false }
        }
        var checkleft = true
        for (var l = 1; l <= upleft; l++) {
          if (mat[i][j - l] == 0) { checkleft = false }
        }
        if (checkleft && checkup) {
          mat[i][j] = upleft + 1
        }
      }

      if (mat[i][j] > size) { size = mat[i][j] }
      j += 1
    }
    i += 1
  }
  return size

}
// ROOM TO IMPROVE - memorize 3 numbers, max num of true above and max num of true to left as you go
sq(mat)

// 3. The problem:
// There are a row of houses. Each house can be painted with three colors: red, blue and green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color. You have to paint the houses with minimum cost. How would you do it?
// Note: The cost of painting house 1 red is different from that of painting house 2 red. Each combination of house and color has its own cost.

//Example:
//3 houses:
//r = [1,4,6], g = [2,100,2], b = [3,100,4]


function minPaint(rc,gc,bc) {
    var numHouses = rc.length
    var i = 1
    var r = []
    var b = []
    var g = []
    r.push(rc[0]); b.push(gc[0]); g.push(bc[0])
    while (i < numHouses) {
        r[i] = rc[i] + Math.min(b[i-1], g[i-1])
        b[i] = bc[i] + Math.min(r[i-1], g[i-1])
        g[i] = gc[i] + Math.min(b[i-1], r[i-1])
        i++
    }
}
