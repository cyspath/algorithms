BinaryHeap = function BinaryHeap(scoreFunction){
  this.content = [];
  this.scoreFunction = scoreFunction;
  this.methods = ['peak', 'push', 'pop', 'size']
}
BinaryHeap.prototype = {
  peak: function() {
    return this.content[0]
  },
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1);
  },

  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },

  remove: function(node) {
    var length = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < length; i++) {
      if (this.content[i] != node) continue;
      // When it is found, the process seen in 'pop' is repeated
      // to fill up the hole.
      var end = this.content.pop();
      // If the element we popped was the one we needed to remove,
      // we're done.
      if (i == length - 1) break;
      // Otherwise, we replace the removed element with the popped
      // one, and allow it to float up or sink down as appropriate.
      this.content[i] = end;
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  },

  size: function() {
    return this.content.length;
  },

  bubbleUp: function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n], score = this.scoreFunction(element);
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1,
      parent = this.content[parentN];
      // If the parent has a lesser score, things are in order and we
      // are done.
      if (score >= this.scoreFunction(parent))
        break;

      // Otherwise, swap the parent with the current element and
      // continue.
      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }
  },

  sinkDown: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
    element = this.content[n],
    elemScore = this.scoreFunction(element);

    while(true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2, child1N = child2N - 1;
      // This is used to store the new position of the element,
      // if any.
      var swap = null;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
        child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore)
          swap = child1N;
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N],
        child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score))
          swap = child2N;
      }

      // No need to swap further, we are done.
      if (swap == null) break;

      // Otherwise, swap and continue.
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  }
};

// heap = new BinaryHeap(function(x){return x;});
// [3,4,1,6,2].forEach(function (n) {
//   heap.push(n)
// })
// console.log(heap);

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


Queue = function Queue() {
  this.store = {};
  this.oldIdx = 1;
  this.newIdx = 1;
  this.methods = ['enqueue','dequeue','isEmpty']
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

queue = new Queue()

LinkedListNode = function LinkedListNode(val) {
  this.val = val;
  this.next;
}
