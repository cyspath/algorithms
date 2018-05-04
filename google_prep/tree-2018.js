// *****************************************************
// MIN DEPTH OF BINARY TREE
// *****************************************************
//
// Given a binary tree, find its minimum depth. The minimum depth is the number
// of nodes along the shortest path from root node down to the nearest leaf node.
//
// For example, minimum height of below Binary Tree is 2.
//
// { val : 1,
//   left: {
//     val: 2,
//     left: { val: 4 },
//     right: { val: 5}
//   },
//   right: {
//     val: 3
//   }
// }
//         1
//       /   \
//     2       3
//   /  \
//  4     5

var minDepth = function(node) {
  if (!node) return 0;
  return Math.min(minDepth(node.left), minDepth(node.right)) + 1;
}

// console.log(minDepth({ val : 1,
//   left: {
//     val: 2,
//     left: { val: 4 },
//     right: { val: 5}
//   },
//   right: {
//     val: 3
//   }
// }));


// *****************************************************
// MAX PATH SUM IN BINARY TREE
// *****************************************************
//
// Given a binary tree, find the maximum path sum. The path may start and end
// at any node in the tree.
//
// sum is 47
//
// { val : 15,
//   left: {
//     val: 2,
//     left: { val: 20 },
//     right: { val: 9 }
//   },
//   right: {
//     val: 10,
//     right: {
//       val: -25,
//       left: { val: 3 },
//       right: { val: 4}
//     }
//   }
// }
//
//          15
//       /     \
//     2        10
//   /  \         \
// 20     9       -25
//       /       /   \
//      8      3       4

// find child with most sum, return self + one child's sum or 0 if negative

var maxPathSum = function(node) {
  var max ;

  function recurse(node) {
    if (!node) return 0;

    var left = recurse(node.left);
    var right = recurse(node.right);

    if (left < 0) left = 0;
    if (right < 0) right = 0;

    var maxSumIncludingCurrentNode = node.val + left + right;
    if (!max || maxSumIncludingCurrentNode > max) max = maxSumIncludingCurrentNode;

    return node.val + Math.max(left, right);;
  }

  recurse(node);
  return max;
}


// console.log(maxPathSum({ val : 15,
//   left: {
//     val: 2,
//     left: { val: 20 },
//     right: { val: 9, left: { val: 8 } }
//   },
//   right: {
//     val: 10,
//     right: {
//       val: -25,
//       left: { val: 3 },
//       right: { val: 4}
//     }
//   }
// })); // 47


// *****************************************************
// CHECK IF A BT IS A FULL BT
// *****************************************************
//
// A full binary tree is defined as a binary tree in which all nodes have either
// zero or two child nodes. Conversely, there is no node in a full binary tree,
// which has one child node.

var isFullBinaryTree = function(node) {
  if (!node) return undefined;

  var left = isFullBinaryTree(node.left);
  var right = isFullBinaryTree(node.right);

  if (left === undefined && right === undefined) return true;
  if (left === undefined || right === undefined) return false;
  if (left === false || right === false) return false;
  return true;
}

// console.log(isFullBinaryTree({ val : 15,
//   left: {
//     val: 2,
//     left: { val: 20 },
//     right: { val: 9 }
//   },
//   right: {
//     val: 10
//   }
// }));



// *****************************************************
// BOTTOM VIEW OF A BT
// *****************************************************
//
// Given a Binary Tree, we need to print the bottom view from left to right.
// A node x is there in output if x is the bottommost node at its horizontal
// distance. Horizontal distance of left child of a node x is equal to
// horizontal distance of x minus 1, and that of right child is horizontal
// distance of x plus 1.
//
//           20
//         /    \
//       8       22
//     /   \      \
//    5      3      25
//          / \
//       10    14
//
// 5, 10, 3, 14, 25.
//
//
//           20
//         /    \
//        8       22
//      /   \    /   \
//     5      3 4     25
//           / \
//        10    14
//
// 5, 10, 4, 14, 25.

var bottomView = function(node) {

  function recurse(node, lvl) {
    if (!node) return;

    node.lvl = lvl;

    recurse(node.left, lvl + 1);
    recurse(node.right, lvl - 1);
  }

  recurse(node,0); // assign level

  var hash = {};
  var parents = [node];
  var children = [];

  while (parents.length > 0) {
    for (var i = 0; i < parents.length; i++) {
      var p = parents[i];
      hash[p.lvl] = p.val;

      if (p.left) children.push(p.left);
      if (p.right) children.push(p.right);
    }
    parents = children;
    children = [];
  }

  var results = [];
  for (var k in hash) results.push(hash[k]);
  return results;
}

// console.log(bottomView({ val: 20, left: { val: 8, left: { val: 5 }, right: { val: 3, left: { val: 10 }, right: { val: 14 } } }, right : { val: 22, right: { val: 25 }}}));
// console.log(bottomView({val:20, left:{ val: 8, left: { val: 5 }, right: {val:3, left: { val: 10}, right: {val:14}},  }, right: { val: 22, left: { val: 4}, right: {val: 25}}}));



// *****************************************************
// TOP VIEW OF BT
// *****************************************************
//
// Top view of a binary tree is the set of nodes visible when the tree is viewed
// from the top. Given a binary tree, print the top view of it. The output nodes
// can be printed in any order. Expected time complexity is O(n)
//
// A node x is there in output if x is the topmost node at its horizontal distance.
// Horizontal distance of left child of a node x is equal to horizontal distance
// of x minus 1, and that of right child is horizontal distance of x plus 1.
//
//       1
//     /     \
//    2       3
//  /  \    / \
// 4    5  6   7
// Top view of the above binary tree is
// 4 2 1 3 7
//
//  1
// /   \
// 2       3
// \
//  4
//    \
//      5
//       \
//         6
// Top view of the above binary tree is
// 2 1 3 6

var topView = function(node) {

  function recurse(node, lvl) {
    if (!node) return;
    node.lvl = lvl;
    recurse(node.left, lvl - 1);
    recurse(node.right, lvl + 1);
  }
  recurse(node, 0);

  var parents = [node];
  var children = [];
  var hash = {};

  while (parents.length > 0) {
    for (var i = 0; i < parents.length; i++) {
      var p = parents[i];
      if (!hash[p.lvl]) hash[p.lvl] = p.val;

      if (p.left) children.push(p.left);
      if (p.right) children.push(p.right);
    }
    parents = children;
    children = [];
  }

  var results = [];
  for (var k in hash) results.push(hash[k]);

  return results;
}

// console.log(topView({val:1,left:{val:2,left:{val:4},right:{val:5}},right:{val:3,left:{val:6},right:{val:7}}}));
// console.log(topView({val:1,left:{val:2,right:{val:4,right:{val:5,right:{val:6}}}},right:{val:3}}));



// *****************************************************
// REMOVE NODES ON PATHS < K
// *****************************************************
//
// Given a Binary Tree and a number k, remove all nodes that lie only on root to
// leaf path(s) of length smaller than k. If a node X lies on multiple
// root-to-leaf paths and if any of the paths has path length >= k, then X is
// not deleted from Binary Tree. In other words a node is deleted if all paths
// going through it have lengths smaller than k.
//              1
//           /      \
//         2          3
//       /     \         \
//     4         5        6
//   /                   /
// 7                   8
// Input: Root of above Binary Tree
// k = 4
//
// Output: The tree should be changed to following
//              1
//           /     \
//         2          3
//       /             \
//     4                 6
//   /                  /
// 7                  8

var removeShortPathNodes = function(root,k) {

  function recurse(node,d) {
    if (!node.left && !node.right) return d;

    if (node.left) var left = recurse(node.left, d + 1);
    if (node.right) var right = recurse(node.right, d + 1);

    if (left && left < k) node.left = null;
    if (right && right < k) node.right = null;

    return Math.max((left || 0), (right || 0));
  }

  recurse(root, 1);
  return root;
}

// console.log(removeShortPathNodes(
//   {
//     val: 1,
//     left: {
//       val: 2,
//       left: { val: 4, left: { val: 7} },
//       right: { val: 5 }
//     },
//     right: {
//       val: 3,
//       right: { val: 6, left: { val: 8 }}
//     }
//   }, 4
// ));
// console.log(removeShortPathNodes(
//   {
//     val: 1,
//     left: {
//       val: 2,
//       left: { val: 4, left: { val: 7} },
//       right: { val: 5, left: { val: 9, left: { val: 10 } }, right: { val: 11 } }
//     },
//     right: {
//       val: 3,
//       right: { val: 6, left: { val: 8 }}
//     }
//   }, 5
// ));



// *****************************************************
// LOWEST COMMON ANCESTOR IN BST
// *****************************************************
//
// Given values of two values n1 and n2 in a Binary Search Tree, find the Lowest
// Common Ancestor (LCA). You may assume that both the values exist in the tree.
//
// LCA of 10 and 14 is 12
// LCA of 14 and 8 is 8
// LCA of 10 and 22 is 20
//              20
//           /      \
//         8          22
//       /     \
//     4         12
//             /    \
//           10      14


var lcsBst = function(root, n1, n2) {
  var lcs;

  function recurse(node) {
    if (!node) return;

    var left = recurse(node.left);
    var right = recurse(node.right);
    // console.log(node.val, left, right);
    if ((left === n1 && right === n2) || (left === n2 && right === n1)) {
      lcs = node.val;
      return;
    }

    if (((left === n1 || right === n1) && node.val === n2) || ((left === n2 || right === n2) && node.val === n1)) {
      lcs = node.val;
      return;
    }

    if (left === n1 || left === n2) return left;
    if (right === n1 || right === n2) return right;
    if (node.val === n1 || node.val === n2) return node.val;
  }
  recurse(root);
  return lcs;
}

// console.log(lcsBst({
//   val: 20, left: {
//     val: 8,
//     left: {
//       val: 4
//     },
//     right: {
//       val: 12, left: { val: 10 }, right: { val : 14 }
//     }
//   },
//   right: {
//     val: 22
//   }
// }, 10, 22));
//



// *****************************************************
// FIRST TREE IS SUBTREE OF SECOND
// *****************************************************
//
// Given two binary trees, check if the first tree is subtree of the second one.
// A subtree of a tree T is a tree S consisting of a node in T and all of its
// descendants in T.
//
// The subtree corresponding to the root node is the entire tree; the subtree
// corresponding to any other node is called a proper subtree.
//
// not sub tree
//       x
//     /    \
//   a       b
//   /
// c
//         x
//       /    \
//     a       b
//   /         \
// c            d
//
//
// is sub tree
//         x
//       /    \
//     a       b
//      \
//       c
//             z
//           /   \
//         x      e
//       /    \     \
//     a       b      k
//      \
//       c


var areTreesEqual = function(n1, n2) {
  if (n1 === undefined && n2 === undefined) return true;
  if (n1 === undefined || n2 === undefined) return false;
  if (n1.val !== n2.val) return false;

  return areTreesEqual(n1.left, n2.left) && areTreesEqual(n1.right, n2.right);
}

var isSubtree = function(root1, root2) { // O(n*(number of matching root nodes - usually just 1))
  var candidates = [];
  function findCandidates(n2) {
    if (!n2) return;
    if (n2.val === root1.val) candidates.push(n2);
    findCandidates(n2.left);
    findCandidates(n2.right);
  }
  findCandidates(root2);

  for (var i = 0; i < candidates.length; i++) {
    var node = candidates[i];
    var result = areTreesEqual(root1, node);
    if (result === true) return true;
  }

  return false;
}

// console.log(isSubtree({
//   val: 'x', left: { val: 'a', left: { val: 'c' } }, right: { val: 'b' }
// },{
//   val: 'x', left: { val: 'a', left: { val: 'c' } }, right: { val: 'b', right: { val: 'd' } }
// }));
//
// console.log(isSubtree({
//   val: 'x', left: { val: 'a', right: { val: 'c' } }, right: { val: 'b' }
// },{
//   val: 'x', left: {
//     val: 'x', left: { val: 'a', right: { val: 'c' } }, right: { val: 'b' }
//   }, right: {
//     val: 'e', right: { val: 'k' }
//   }
// }));



// *****************************************************
// REVERSE ALTERNATE LEVEL NODES OF PERFECT BT
// *****************************************************
//
// Given a Perfect Binary Tree, reverse the alternate level nodes of the
// binary tree.
//
// Given tree:
//                a
//             /     \
//            b       c
//          /  \     /  \
//         d    e    f    g
//        / \  / \  / \  / \
//        h  i j  k l  m  n  o
//
// Modified tree:
//   	            a
//             /     \
//            c       b
//          /  \     /  \
//         d    e    f    g
//        / \  / \  / \  / \
//       o  n m  l k  j  i  h

var reverseAlternateLevelNodes = function(root) {
  var parents = [root];
  var children = [];

  var arr = [];

  var reverse = false;

  while (parents.length > 0) {
    arr.push(reverse ? parents.slice().reverse() : parents);
    for (var i = 0; i < parents.length; i++) {
      var p = parents[i];
      if (p.left) children.push(p.left);
      if (p.right) children.push(p.right);
    }

    parents = children;
    children = [];

    reverse = !reverse;
  }

  // console.log(arr.map(function(e) { return e.map(function(el) { return el.val })}));

  for (var i = 0; i < arr.length - 1; i++) {
    var row = arr[i];
    for (var j = 0; j < row.length; j++) {
      row[j].left = arr[i + 1][j*2];
      row[j].right = arr[i + 1][j*2 + 1];
    }
  }

  return root;

}

// console.log(reverseAlternateLevelNodes({ val: 'a', left: {
//   val: 'b', left: { val: 'd' , left: { val: 'h'}, right: { val: 'i'} }, right: { val: 'e', left: { val: 'j'}, right: { val: 'k'}}
// }, right: {
//   val: 'c', left: { val: 'f' , left: { val: 'l'}, right: { val: 'm'} }, right: { val: 'g', left: { val: 'n'}, right: { val: 'o'}}
// }}));
//













//
