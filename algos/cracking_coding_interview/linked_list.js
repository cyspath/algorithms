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






////////////////////// remove middle node when given only middle node ////////////////////
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



//////////////////// add two numberes represented by linked list ////////////////////
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



//////////////////// is palindrome ll? ////////////////////
// O(1) space

function isPalindrome(n1, n2) {
  if (n2 === undefined) {
    return n1;
  }

  var newN1 = isPalindrome(n1, n2.next);

  if (newN1 === false) { return false } // if the last comparation is false, return false
  if (newN1.next === undefined) { return true }  // if newN1.next is undef, that means we have reached the end

  return newN1.val === n2.val ? newN1.next : false
}

var pali = new Node('a')
pali.append('b').append('c').append('b').append('a')

var pali2 = new Node('a')
pali2.append('b').append('c').append('c').append('b').append('e')

// console.log(isPalindrome(pali, pali));
// console.log(isPalindrome(pali2, pali2));



////////////////////  Loop Detection, return the node where it loops  ////////////////////

// two pointer one runs twice as fast, first intersection is start of loop
// DO NOT KNOW HOW TO RETURN THE NODE

function isLoop(node) {
  // find interspection with 2 pointers
  var i = node, j = node.next;
  while (true) {
    if (j.next === undefined) {
      return false;
    } else if (i === j) {
      break;
    }
    i = i.next;
    j = j.next.next;
  }

  // find loop size
  var size = 1;
  i = i.next;
  while (i !== j) {
    size += 1;
    i = i.next;
  }

  // using two pointers size distance away, start of loop is where i === j
  i = node, j = node
  for (d = 1; d <= size; d++ ) {
    j = j.next;
  }
  while (true) {
    if (i == j) {
      return i.val;
    } else {
      i = i.next;
      j = j.next;
    }
  }

}

var l = l1 = new Node(1)
l1.append(2)
l1.append(3)
l1.append(4)
l1.append(5)
l1.append(6).next = l
console.log(isLoop(l1)); //1

var l1 = new Node(1)
var l = l1.append(2)
l1.append(3)
l1.append(4)
l1.append(5)
l1.append(6).next = l
console.log(isLoop(l1)); //2


var l1 = new Node(1)
l1.append(2)
var l = l1.append(3)
l1.append(4)
l1.append(5)
l1.append(6).next = l
console.log(isLoop(l1)); // 3

var l1 = new Node(1)
l1.append(2)
l1.append(3)
var l = l1.append(4)
l1.append(5)
l1.append(6).next = l
console.log(isLoop(l1)); // 4

var l1 = new Node(1)
l1.append(2)
l1.append(3)
l1.append(4)
var l = l1.append(5)
l1.append(6).next = l
console.log(isLoop(l1)); // 5

var l1 = new Node(1)
l1.append(2)
l1.append(3)
var l = l1.append(4)
l1.append(5)
l1.append(6)
l1.append(7).next = l
console.log(isLoop(l1)); // 4

////////////////////    ////////////////////
////////////////////    ////////////////////
