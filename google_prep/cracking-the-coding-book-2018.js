// *****************************************************
// EIGHT QUEENS
// *****************************************************

function markGrid(i,j,queen,g) {
  for (var idx = 0; idx < g[i].length; idx++) {
    g[i][idx] = 1;
  }
  for (var idx = 0; idx < g.length; idx++) {
    g[idx][j] = 1;
  }
  function markDiagonals(di, dj, i, j, g) {
    if (i >= g.length || i < 0 || j >= g[i].length || j < 0) return;
    g[i][j] = 1;
    markDiagonals(di, dj, i + di, j + dj, g)
  }
  markDiagonals(-1,1,i,j,g);
  markDiagonals(1,1,i,j,g);
  markDiagonals(1,-1,i,j,g);
  markDiagonals(-1,-1,i,j,g);
  g[i][j] = queen;
}

function cloneGrid(g) {
  return g.map(function(row) { return row.slice() });
}

function placeQueen(i,j,n,g) {

  if (i >= g.length) return 0;
  if (g[i][j] > 0) return 0;

  markGrid(i,j,8,g);

  if (n === 1) {
    console.log(g);
    return 1;
  }

  var ways = 0;
  for (var idx = 0; idx < g[i].length; idx++) {
    ways += placeQueen(i+1,idx,n - 1, cloneGrid(g));
  }
  return ways;
}

var queens = function(n, g) {
  var ways = 0;
  for (var i = 0; i < g[0].length; i++) {
    ways += placeQueen(0,i,n,cloneGrid(g));
  }
  return ways;
}
// console.log(queens(4,[
//   [,0,0,0,0],
//   [,0,0,0,0],
//   [,0,0,0,0],
//   [,0,0,0,0]
// ]));
// console.log(queens(8,[
//   [0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0]
// ]));

// *****************************************************
// SUM TWO LINKED LISTS
// *****************************************************
//
var sumLinkedLists = function(a,b) {

  var toNum = function(node) {
    var num = 0;
    while (node) {
      num = num * 10 + node.val;
      node = node.next;
    }
    return num;
  }

  var sum = toNum(a) + toNum(b);

  var node = null;
  while (sum > 0) {
    var newNode = { val: sum % 10 };
    newNode.next = node;
    node = newNode;

    sum = Math.floor(sum / 10);
  }

  return node;
}

// console.log(sumLinkedLists(
//   { val: 6, next: { val: 1, next: { val: 7 } } },
//   { val: 2, next: { val: 9, next: { val: 5 } } }
// ));
// console.log(sumLinkedLists(
//   { val: 6, next: { val: 1 } },
//   { val: 8, next: { val: 9 } }
// ));

var isPaliLinkedList = function(node) {
  var head = node;
  var current = node;
  node = node.next;
  while (node) {
    node.prev = current;
    current = node;
    node = node.next
  }

  console.log(head);

  while (head && current) {
    if (head.val !== current.val) {
      return false;
    }
    head = head.next;
    current = current.prev;
  }

  return true;
}

// console.log(isPaliLinkedList(
//   { val: 1, next: { val: 2, next: { val : 1 } }}
// ));






// *****************************************************
// isUniq - sort for 0 space, else use hash
// *****************************************************
// check permutation - use hash count
// *****************************************************

// LINKED LISTS
// *****************************************************
// remove dups
// o(n) time o(n) space use hash
// o(n^2) time and o(1) space use 2 pointers one checks for dup after
// *****************************************************
// given a node that is not head, delete it
// can be done by copying information after it to it and go on
// *****************************************************
//
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************

//
