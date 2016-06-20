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

////////////////////    ////////////////////
////////////////////    ////////////////////
