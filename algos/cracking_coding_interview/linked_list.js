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
//
// removeMid(midNode);
// console.log(JSON.stringify(numNode, null, 2));



// add two numberes represented by linked list
function sum(n1, n2) {
  var result = [];
  return arrToNum(toReverseArr(n1)) + arrToNum(toReverseArr(n2));
}

function toReverseArr(node) {
  var nums = [];
  while (node !== undefined) {
    nums.push(node.val);
    node = node.next;
  }
  return nums.reverse();
}

function arrToNum(arr) {
  var result = 0
  for (i = 0; i < arr.length; i++) {
    result += arr[i] * (Math.pow(10, i));
  }
  return result;
}

n1 = new Node(1)
n1.append(6)
n1.append(1)
n1.append(7)
n2 = new Node(2)
n2.append(9)
n2.append(5)

// console.log(sum(n1, n2)); // 1912
