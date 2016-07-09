// # 3.Given a binary tree and two nodes, how to find the common ancestor of the two nodes?

function commonAncestor(root, node1, node2) {
  // var hash = { node1.val: true, node2.val: true }

  function recurse(node) {
    if (node === undefined) {
      return null;
    }
    if (node.val == node1.val || node.val == node2.val) {
      return node;
    }

    var left = recurse(node.left);
    var right = recurse(node.right);

    if (left && right) {
      return node;
    } else if (left) {
      return left;
    } else if (right) {
      return right;
    } else {
      return null;
    }
  }
  return recurse(root);
}

treeNode = function treeNode(val) {
  this.left;
  this.right;
  this.val = val;
  this.parent;
  this.methods = ['addLeft','addRight','left','right','val','parent']
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

root = new treeNode(5);
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

console.log(commonAncestor(root, node1, node8));
