function Node(val) {
  this.val = val;
  this.next;
}

Node.prototype.append = function (val) {
  var newNode = new Node(val);
  var current = this;
  while (current != undefined) {
    if (current.next === undefined) {
      current.next = newNode;
      break;
    }
    current = current.next
  }
  return newNode;
};

// 1-2-3-4-5
var numNode = new Node(1)
numNode.append(2)
var midNode = numNode.append(3)
numNode.append(4)
numNode.append(5)

// a-b-c-d
var letterNode = new Node('a')
letterNode.append('b')
letterNode.append('c')
letterNode.append('d')

// remove middle node when given only middle node
// (make it LOOK LIKE as if u did)
function removeMid(mid) {
  while (true) {
    if (mid.next.next === undefined) {
      mid.val = mid.next.val;
      mid.next = undefined;
      break;
    } else {
      mid.val = mid.next.val;
      mid = mid.next;
    }
  }
}

// removeMid(midNode);
// console.log(JSON.stringify(numNode, null, 2));
