class Node {
  constructor(val = null) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// create a BST with min height with array of sorted unique list of integers
var list = [1,2,3,4,5,6,7,8,9];
var idx = 0;

var createBst = function () {
  var root = createBstStructure(list.length);
  populateBst(root);
  return root;
}

var populateBst = function (node) {
  if (idx >= list.length || !node) {
    return;
  }
  populateBst(node.left);
  node.val = list[idx];
  idx += 1;
  populateBst(node.right);
}

var createBstStructure = function(n) {
  if (n <= 0) {
    return;
  }
  var root = new Node();
  var currentNodes = [root];
  var children = [];
  n -= 1;

  while(n > 0) {
    for (var i = 0; i < currentNodes.length; i++) {
      if (n <= 0) return root;
      n -= 1;
      var newNode =  new Node();
      currentNodes[i].left = newNode;
      children.push(newNode);

      if (n <= 0) return root;
      n -= 1;
      var newNode =  new Node();
      currentNodes[i].right = newNode;
      children.push(newNode);
    }
    currentNodes = children;
    children = [];
  }
  return root;
}

// console.log(createBst());


// check balanced, the heights of subtress should never be greater than 1
var root = {
  val: 6,
  left: {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 5 }
  },
  right: {
    val: 8,
    left: { val: 7 },
    right: { val: 9, right: { val: 10 } }
  }
}

//               6
//            /     \
//          4        8
//        /   \    /   \
//      2     5   7     9
//    /  \               \
//   1   3               10

function isBalanced(node) {
  if (!node) return 0;

  var left = isBalanced(node.left);
  var right = isBalanced(node.right);

  if (left === false || right === false) {
    return false;
  } else if (Math.abs(left - right) > 1) {
    return false;
  } else {
    return Math.max(left, right) + 1;
  }
}

// console.log(isBalanced(root));

function validateBST(node) {
  if (!node) return true; // no node here

  var left = validateBST(node.left);
  var right = validateBST(node.right);

  if (!left || !right) {
    return false;
  }
  if (left && left != true && node.val < left) {
    return false;
  }
  if (right && right != true && node.val >= right) {
    return false;
  }
  return node.val;
}

// console.log(validateBST(root));


function nextNode(node) {
  if (node.right) {
    return leftMostOrSelf(node.right);
  } else {
    return node.parent.val >= node.val ? node.parent : null;
  }
}
function leftMostOrSelf(node) {
  if (node.left) {
    return leftMostOrSelf(node.left);
  }
  return node;
}
