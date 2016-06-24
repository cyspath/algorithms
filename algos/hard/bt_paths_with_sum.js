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


var root = new treeNode(11);
var node3 = root.addLeft(new treeNode(3))
var node2 = root.left.addLeft(new treeNode(2))
var node1 = root.left.left.addLeft(new treeNode(1))
var node4 = root.left.addRight(new treeNode(4))
var node8 = root.addRight(new treeNode(-8))
var node7 = root.right.addLeft(new treeNode(7))
var node6 = root.right.left.addLeft(new treeNode(6))
var node9 = root.right.addRight(new treeNode(9))
var node9 = root.right.right.addLeft(new treeNode(-6))



////////////////////  path sum  ////////////////////

// find how many path adds up to a given sum
// have a hash, keeping track of all top down paths by having key = node.val and value = {all paths to current node}

var sumHash = {};
var paths = 0;

function sumPath(node, target) {

  var currentHash = {};
  currentHash[node.val] = parseInt(node.val);

  if (node.left) {
    sumPath(node.left, target);
    for (var key in sumHash[node.left.val]) {
      var sum = sumHash[node.left.val][key] + parseInt(node.val);
      currentHash[sum] = sum;
    }
  }

  if (node.right) {
    sumPath(node.right, target);
    for (var key in sumHash[node.right.val]) {
      var sum = sumHash[node.right.val][key] + parseInt(node.val);
      currentHash[sum] = sum;
    }
  }

  if (currentHash[target]) {
    paths += 1;
  }

  sumHash[node.val] = currentHash;
}


//               11
//            /      \
//         3             -8
//       /   \         /   \
//     2      4       7     9
//   /               /     /
// 1                6    - 6

sumPath(root, 3);
// console.log(sumHash);
console.log(paths); // 4 paths that add to 4
