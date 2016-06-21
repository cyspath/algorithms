function treeNode(val) {
  this.left;
  this.right;
  this.val = val;
  this.parent;
}
treeNode.prototype.addLeft = function(e) {
  this.left = e;
  e.parent = this;
  return e;
}
treeNode.prototype.addRight = function(e) {
  this.right = e;
  e.parent = this;
  return e;
}
var btObj = { val: 5,
            left: { val: 3,
               left: { val: 2, left: { val: 1 } },
               right: { val: 4 }
             },
            right: { val: 8,
               left: { val: 7, left: { val: 6 } },
               right: { val: 9 }
             }
          }
var root = new treeNode(5);
var node3 = root.addLeft(new treeNode(3))
var node2 = root.left.addLeft(new treeNode(2))
var node1 = root.left.left.addLeft(new treeNode(1))
var node4 = root.left.addRight(new treeNode(4))
var node8 = root.addRight(new treeNode(8))
var node7 = root.right.addLeft(new treeNode(7))
var node6 = root.right.left.addLeft(new treeNode(6))
var node9 = root.right.addRight(new treeNode(9))

//                5
//            /      \
//         3             8
//       /   \         /   \
//     2      4       7     9
//   /               /
// 1                6

////////////////////  find most recent ancestor of two nodes  ////////////////////

// each child return array, and add to it, update ancestor when the array contains all children

var ancestor;

function findAncestor(node, arr) {
  hash = {};
  arr.forEach(function (el) {
    hash[el.val] = true
  })

  recurseFindAncestor(node, hash, arr)

  return ancestor;
}

function recurseFindAncestor(node, hash, arr) {
  if (node === undefined) {
    return [];
  }
  if (ancestor !== undefined) {
    return [];
  }
  var left = recurseFindAncestor(node.left, hash, arr);
  var right = recurseFindAncestor(node.right, hash, arr);

  var children = left.concat(right);

  if (children.length === arr.length) {
    if (ancestor === undefined) {
      ancestor = node.val;
    }
  }

  var current = hash[node.val] ? [node.val] : []
  return children.concat(current)
}

console.log(findAncestor(root,[node7, node6]));
