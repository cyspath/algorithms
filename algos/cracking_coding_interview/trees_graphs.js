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


function Queue() {
  this.store = {};
  this.oldIdx = 1;
  this.newIdx = 1;
};
Queue.prototype.enqueue = function(el) {
  this.store[this.newIdx] = el;
  this.newIdx ++;
  return el;
};
Queue.prototype.dequeue = function () {
  if (this.oldIdx === this.newIdx) {
    return 'queue is empty';
  }
  var result = this.store[this.oldIdx];
  delete this.store[this.oldIdx];
  this.oldIdx ++;
  return result;
};
Queue.prototype.isEmpty = function () {
  this.oldIdx === this.newIdx;
};

function LinkedListNode(val) {
  this.val = val;
  this.next;
}

////////////////////  convert sorted arr to minimal height BST  ////////////////////

function arrToBST(a) {
  if (a.length === 0) {
    return undefined;
  } else if (a.length === 1) {
    return new treeNode(a[0]);
  }

  var midIdx = Math.floor(a.length / 2);
  var left = a.slice(0, midIdx);
  var right = a.slice(midIdx + 1);
  var node = new treeNode(a[midIdx]);
  node.left = arrToBST(left);
  node.right = arrToBST(right);
  return node;
}

var a = [1,2,3,4,5,6,7,8,9];
// console.log(arrToBST(a));

////////////////////  create a linked list at depth D of a binary tree  ////////////////////

function generateLinkedListForEachDepth(node) {
  var list = generate2DArrayOfNodes(node);
  var results = [];

  list.forEach(function(arr) {
    var llNode = new LinkedListNode(arr[0].val);
    results.push(llNode)
    for (i = 0; i < arr.length - 1; i ++) {
      var nextNode = new LinkedListNode(arr[i + 1].val);
      llNode.next = nextNode;
      llNode = nextNode;
    }
  })
  return results;
}

function generate2DArrayOfNodes(node) {
  var list = [];
  var current = [node];
  var children = [];
  while (current.length > 0) {
    current.forEach(function(e) {
      if (e.left) {
        children.push(e.left);
      }
      if (e.right) {
        children.push(e.right);
      }
    })
    list.push(current);
    current = children;
    children = [];
  }
  return list;
}

// console.log(generateLinkedListForEachDepth(root));

////////////////////  check if bt is balanced  ////////////////////

function isTreeBalanced(node) {   // similar to checking height of bt
  if (node === undefined) {
    return 0;
  }
  var leftHeight = isTreeBalanced(node.left);
  var rightHeight = isTreeBalanced(node.right);

  if (leftHeight === false || rightHeight === false) {
    return false
  }

  if (Math.abs(leftHeight - rightHeight) > 1) {
    return false
  }

  return Math.max(leftHeight, rightHeight) + 1;
}

// console.log(isTreeBalanced(root)); //4

////////////////////  validate BST  ////////////////////

var validBSTCurrent;
function validBST(node) {
  if (node.left) {
    var left = validBST(node.left);
    if (left === false) return false;
  }

  if (validBSTCurrent === undefined) {
    validBSTCurrent = node.val;
  } else {
    if (node.val < validBSTCurrent) {
      return false;
    }
    validBSTCurrent = node.val;
  }

  if (node.right) {
    var right = validBST(node.right);
    if (right === false) return false;
  }
  return true;
}

// var minMax = [undefined, undefined]
// function validBST(node) {
//   if (node.left === undefined && node.right === undefined) {
//     minMax = [node.val, node.val];
//     return true;
//   }
//
//   if (node.left) {
//     var left = validBST(node.left);
//     if (left === false) {
//       return false;
//     }
//     if (minMax[1] > node.val) {
//       return false;
//     }
//     var min = minMax[0];
//   }
//
//   if (node.right) {
//     var right = validBST(node.right);
//     if (right === false) {
//       return false;
//     }
//     if (minMax[0] <= node.val) {
//       return false;
//     }
//     var max = minMax[1];
//   }
//
//   if (node.left === undefined) {
//     var min = node.val;
//   }
//
//   if (node.right === undefined) {
//     var max = node.val;
//   }
//   minMax = [min, max];
//   return true;
// }
//
// console.log(validBST(root));
// console.log(validBSTCurrent);

////////////////////  next successor in BST  ////////////////////

function nextSuccessor(node) {
  if (node.right === undefined) {
    return node.parent;
  } else if (node.right && node.right.left === undefined) {
    return node.right;
  } else {
    var next = node.right.left;
    while (next.left !== undefined) {
      next = next.left;
    }
    return next;
  }
}

// console.log(nextSuccessor(root));

////////////////////  projects and dependencies  ////////////////////

function ProjectNode(val) {
  this.val = val;
  this.dependencies = {};
  this.ready = function() {
    return Object.keys(this.dependencies).length === 0;
  }
}
function buildHash(arr) {
  var hash = {};
  arr.forEach(function (letter) {
    hash[letter] = new ProjectNode(letter)
  })
  return hash;
}
function buildOrder(node, orderArr, store) {
  for (var key in node.dependencies) {
    if (store[key]) {
      buildOrder(store[key], orderArr, store)
    }
  }
  if (store[node.val]) {
    orderArr.push(node.val);
    delete store[node.val];
  }
  return;
}
function buildTree(projects, dependencies) {
  var store = buildHash(projects);
  dependencies.forEach(function (d) {
    store[d[0]].dependencies[d[1]] = store[d[1]];
  })

  var order = [];
  for (i = 0; i < projects.length; i++) {
    if (store[projects[i]]) {
      buildOrder(store[projects[i]], order, store)
    }
  }
  return order;
}

var projects = ['a','b','c','d','e','f'];
var dependencies = [['d','a'],['b','f'],['d','b'],['a','f'],['c','d']];

// console.log(buildTree(projects, dependencies));

////////////////////  find most recent ancestor of two nodes  ////////////////////

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

// console.log(findAncestor(root,[node7, node6]));

////////////////////  find all posible array for making a BST  ////////////////////

var bstSeqArr = [];
function bstSeq(node) {
  if (node.left === undefined && node.right === undefined) {
    return [node.val];
  } else if (node.left && node.right) {
    var left = bstSeq(node.left);
    var right = bstSeq(node.right);
  } else if (node.left) {
    var left = bstSeq(node.left);
    var right = [];
  } else {
    var left = [];
    var right = bstSeq(node.right);
  }

  var newLeft = [];
  left.forEach(function (l) {
    right.forEach(function (r) {
      newLeft.push(l + r)
    })
  })

  var newRight = [];
  right.forEach(function (r) {
    left.forEach(function (l) {
      newRight.push(r + l)
    })
  })

  return newLeft.concat(newRight).map(function (str) {
    return node.val + str;
  })
}

var root2 = new treeNode('A');
root2.addLeft(new treeNode('B'))
root2.left.addLeft(new treeNode('D'))
root2.left.addRight(new treeNode('E'))
root2.addRight(new treeNode('C'))
// root2.right.addLeft(new treeNode('F'))
// root2.right.addRight(new treeNode('G'))

// console.log(bstSeq(root2));

////////////////////  t2 is a subtree of t1  ////////////////////

function subtree(n1,n2) {
  if (n1 === undefined) {
    return false;
  }
  if (n1.val === n2.val) {
    var match = compareTrees(n1,n2);
    return match ? true : false
  }
  var left = subtree(n1.left, n2);
  if (left) {
    return true;
  }
  var right = subtree(n1.right, n2);
  if (right) {
    return true;
  }
  return false;
}

function compareTrees(n1,n2) {
  if (n1 === undefined && n1 === undefined) {
    return true;
  } else if (n1 === undefined && n2) {
    return false;
  } else if (n1 && n2 === undefined) {
    return false;
  }

  if (n1.val !== n2.val) {
    return false;
  }

  var left = compareTrees(n1.left, n2.left);
  if (left === false) {
    return false;
  }

  var right = compareTrees(n1.right, n2.right);
  if (right === false) {
    return false;
  }

  return true;
}
//
// var root3 = new treeNode(3);
// root3.addLeft(new treeNode(2))
// root3.left.addLeft(new treeNode(1))
// root3.addRight(new treeNode(4))
//
// console.log(subtree(root, root3));

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


//               11
//            /      \
//         3             -8
//       /   \         /   \
//     2      4       7     9
//   /               /     /
// 1                6    - 6

sumPath(root, 3);
console.log(sumHash);
console.log(paths);

////////////////////    ////////////////////
////////////////////    ////////////////////
////////////////////    ////////////////////
////////////////////    ////////////////////
////////////////////    ////////////////////
