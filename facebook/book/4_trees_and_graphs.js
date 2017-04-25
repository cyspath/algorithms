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


// build order - find a build order for list a projects, and their dependencies where first one depends on second
var projects = 'abcdef'.split('');
var dependencies = [
  ['d','a'],
  ['b','f'],
  ['d','b'],
  ['a','f'],
  ['c','d'],
  // ['f','c'] // circurlar code test
]

class GraphNode {
  constructor(val = null) {
    this.val = val;
    this.children = [];
  }
}

class LinkedListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
  showValues() {
    let values = [];
    let node = this;
    while (node.next) {
      values.push(node.val);
      node = node.next;
    }
    values.push(node.val);
    return values.join(' -> ')
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(el) {
    var newNode = new LinkedListNode(el);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return el;
  }
  remove() {
    if (!this.head) {
      return;
    } else {
      var node = this.head;
      this.head = node.next;
      node.next = null;
      if (!this.head) {
        this.tail = null;
      }
      return node.val;
    }
  }
  isEmpty() {
    return !this.head && !this.tail;
  }
}

function buildOrder(p, d) {
  // initiate a hash with all the projects, set the default root = true for each
  var hash = toHash(p);
  // set childrens, and toggle the projects that depends on others to be root = false
  setChildren(hash, d); // only 2 nodes are roots now
  // find the nodes, go through each and add to result
  var result = [];
  for (var key in hash) {
    if (hash[key].root) {
      addToResult(result, hash[key]);
    }
  }
  console.log(hash);
  return result.length == p.length ? result : 'error'; // circular dependencies ends up error
}

function toHash(p) {
  var hash = {};
  for (var i = 0; i < p.length; i++) {
    var node = new GraphNode(p[i]);
    node.root = true;
    hash[p[i]] = node;
  }
  return hash;
}

function setChildren(hash, d) {
  for (var i = 0; i < d.length; i++) {
    hash[d[i][0]].root = false;
    hash[d[i][0]].visited = false;
    hash[d[i][1]].children.push(hash[d[i][0]]);
  }
  return hash;
}

function addToResult(result, node) {
  var queue = new Queue();
  queue.add(node);
  node.visited = true;
  while (!queue.isEmpty()) {
    var current = queue.remove();
    result.push(current.val);
    for (var i = 0; i < current.children.length; i++) {
      var child = current.children[i];
      if (!child.visited) {
        child.visited = true;
        queue.add(child);
      }
    }
  }
  return result;
}

// console.log(buildOrder(projects, dependencies));


// first common ancestor in binary tree
function commonAncestor(node, n1, n2) {
  var result = null;

  function recurse(node) {
    if (!node) {
      return 0;
    }
    var left = recurse(node.left);
    var right = recurse(node.right);

    if (left === true || right === true) {
      // done, found
      return true;
    }

    if (left + right == 2 && !result) {
      result = node.val;
      return true;
    }

    if (node === n1 || node === n2) {
      return left + right + 1;
    }
    return left + right;
  }

  recurse(node);

  return result;
}

// var a = new Node('a')
// var b = new Node('b')
// var c = new Node('c')
// a.left = b
// a.right = c
// var d = new Node('d')
// var e = new Node('e')
// var f = new Node('f')
// var g = new Node('g')
// b.right = d
// c.left = e
// c.left.left = f
// c.right = g
// // console.log(a);
// console.log(commonAncestor(a, e, g));


// find number of paths that adds to a specific sum
var sumNode = {
  val: 10,
  left: {
    val: 5,
    left: { val: 3, left: { val: 3 }, right: { val: -2 } },
    right: { val: 1, right: { val: 2 } }
  },
  right: {
    val: -3,
    right: { val: 11 }
  }
}
//         10
//       /    \
//      5      -3
//    /   \      \
//   3     1      11
//  / \     \
// 3   2     2

function numPaths(node, targetSum) {
  var result = 0;

  function recurse(node, hash, runningSum) {
    if (!node) {
      return 0;
    }
    runningSum += node.val;

    if (hash[runningSum]) {
      hash[runningSum] += 1;
    } else {
      hash[runningSum] = 1;
    }

    if (hash[runningSum - targetSum]) {
      result += 1;
    }

    if (node.left) {
      recurse(node.left, hash, runningSum);
    }
    if (node.right) {
      recurse(node.right, Object.assign({}, hash), runningSum);
    }
  }

  recurse(node, {}, 0)
  return result;
}

console.log(numPaths(sumNode, 6)); // 3
