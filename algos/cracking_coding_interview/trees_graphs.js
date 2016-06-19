
////////////////////  convert sorted arr to minimal height BST  ////////////////////
function treeNode(val) {
  this.left;
  this.right;
  this.val = val;
}

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

var bt = { val: 5,
            left: { val: 3,
               left: { val: 2, left: { val: 1 } },
               right: { val: 4 }
             },
            right: { val: 8,
               left: { val: 7, left: { val: 6 } },
               right: { val: 9 }
             }
          }

//                5
//            /      \
//         3             8
//       /   \         /   \
//     2      4       7     9
//   /               /
// 1                6



////////////////////    ////////////////////
////////////////////    ////////////////////
