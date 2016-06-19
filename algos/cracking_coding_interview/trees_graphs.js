function treeNode(val) {
  this.left;
  this.right;
  this.val = val;
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
root.left = new treeNode(3);
root.left.left = new treeNode(2);
root.left.left.left = new treeNode(1);
root.left.right = new treeNode(4);
root.right = new treeNode(8);
root.right.left = new treeNode(7);
root.right.left.left = new treeNode(6);
root.right.right = new treeNode(9);

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

console.log(generateLinkedListForEachDepth(root));

////////////////////    ////////////////////
////////////////////    ////////////////////
