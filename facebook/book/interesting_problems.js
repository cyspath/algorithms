// ////////////////////////////// STRING AND ARRAY ////////////////////////////////////

// determine if a string has all unique characters
// O(n) O(1)
// str.charCodeAt() String.fromCharCode(n)

// console.log(isUniq('abcd')); // t
// console.log(isUniq('abc$dx$')); // f

function isUniq(str) {
  var hash = {};
  for (var i = 32; i <= 126; i++) {
    hash[String.fromCharCode(i)] = false;
  }
  for (var i = 0; i < str.length; i++) {
    if (hash[str[i]]) {
      return false;
    } else {
      hash[str[i]] = true;
    }
  }
  return true;
}

// rotate matrix - square matrix
var sqMatrix = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]

// console.log(rotateMatrix(sqMatrix));
// O(n^2) O(n^2)

// 7 4 1
// 8 5 2
// 9 6 3

// logic first... swap i, j to give this
// 1 4 7
// 2 5 8
// 3 6 9
// next reverse each row
function rotateMatrix(arr) {
  // genereate new array with all undefined
  var result = new Array(arr.length)
  for (var i = 0; i < result.length; i++) {
    result[i] = new Array(arr.length)
  }
  // swap i and j position for new arr
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      result[j][i] = arr[i][j];
    }
  }
  // reverse each row
  for (var i = 0; i < result.length; i++) {
    result[i] = result[i].reverse();
  }
  return result;
}

// string rotation - you have method #includes(str) which can be called only once
// O(#includes) O(1)
// console.log(strRotation('waterbottle', 'erbottlewat')); // true

function strRotation(s1, s2) {
  var concated = s2 + s2;
  return concated.includes(s1);
}

// ////////////////////////////// LINKED LIST ////////////////////////////////////
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
function createLinkedList(nodesValues) {
  var startNode, node;
  for (var i = 0; i < nodesValues.length; i++) {
    var current = new LinkedListNode(nodesValues[i]);
    if (!startNode) {
      startNode = current;
    } else {
      node.next = current;
    }
    node = current;
  }
  return startNode;
}

// sum lists - sum the values of 2 linked lists
// O(a + b) O(1)
// console.log(sumLists(createLinkedList([6,1,7]), createLinkedList([2,9,5]))); // 617 + 295 = 912

function sumLists(a, b) {
  return listToNumber(a) + listToNumber(b);
}

function listToNumber(node) {
  var n = 1, sum = 0;
  var current = node;
  while (current) {
    n = n * 10;
    current = current.next;
  }
  current = node;
  while (current) {
    n = n / 10;
    sum += current.val * n;
    current = current.next;
  }
  return sum;
}

// palindrome - if linked list is a palindrome
// O(n) O(1)
// strategy, split linked list into two

// console.log(isPalindrome(createLinkedList(['a','b','b','a']))); // true
// console.log(isPalindrome(createLinkedList(['a','b','a']))); // true
// console.log(isPalindrome(createLinkedList(['a','b', 'e', 'g', 'b','a']))); // false

function isPalindrome(node) {
  var middleNodes = findMiddleNodes(node);
  var left = middleNodes[0], right = middleNodes[1]; // set variables for the 2 lists starting node
  reverseList(node); // reverses the left linked list
  return isEqual(left, right);
}

function getLength(node) {
  var count = 0;
  while (node) {
    count ++;
    node = node.next;
  }
  return count;
}

function findMiddleNodes(node) {
  var left, right, length = getLength(node);
  while (length/2 > 1) {
    node = node.next;
    length -= 2;
  }
  if (length % 2 == 0) {
    left = node;
    right = node.next;
    left.next = null;
  } else {
    left = node;
    right = node;
  }
  return [left, right];
}

function reverseList(node) {
  var prevNode = null, current;
  while (node) {
    current = node;
    node = node.next;
    current.next = prevNode;
    prevNode = current;
  }
  return prevNode;
}

function isEqual(a, b) {
  while (a && b) {
    if (a.val !== b.val) {
      return false;
    }
    a = a.next;
    b = b.next;
  }
  if (a || b) { // if a or b is longer than the other return false
    return false;
  }
  return true;
}

// loop detection - given circle linked list, returns the node at the begining of the loop
// brute force is just hash all the nodes and when it circles around you would know the start point
// O(n) O(1)
// logic: now there is a this pattern that if the loop is from node 1, then it takes 1 step from intersection to reach start of loop
// if loop at 2, then takes 2 steps from intersection, so on and so forth. for loop at n, it takes n steps from intersection to reach

// // sample:
// // 1 - 2 - 3 - 4 - 5 - 6 - 3
// var loopedNode = new LinkedListNode(1);
// loopedNode.next = new LinkedListNode(2);
// loopedNode.next.next = new LinkedListNode(3);
// loopedNode.next.next.next = new LinkedListNode(4);
// loopedNode.next.next.next.next = new LinkedListNode(5);
// loopedNode.next.next.next.next.next = new LinkedListNode(6);
// loopedNode.next.next.next.next.next.next = loopedNode.next.next;
// console.log(loopDetection(loopedNode));

function loopDetection(node) {
  // find the node that intersect happens in a looped list
  var intersectNode = isCircular(node);
  if (!intersectNode) {
    return false;
  }
  // to find intersection, start counting a from first node, and b following the intersection node
  var a = node, b = intersectNode.next;
  while (true) {
    if (a === b) {
      return a;
    }
    a = a.next;
    b = b.next;
  }
}

function isCircular(node) {
  var slow = node, fast = node.next;
  while (fast) {
    if (fast === slow) {
      return slow;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return false;
}

// /////////////////////////// STACKS AND QUEUES ////////////////////////////////////

// ////////////////////////// TREES AND GRAPHS ////////////////////////////////////

// ////////////////////////////// BIT MANIPULATION ////////////////////////////////////

// ////////////////////////////// MATH AND LOGIC ////////////////////////////////////

// ////////////////////////////// OO DESIGN ////////////////////////////////////

// ////////////////////////////// RECURSION AND DP ////////////////////////////////////

// ////////////////////////////// SYSTEM DESIGN AND SCALABILTY ////////////////////////////////////

// ////////////////////////////// SORTING AND SEARCHING ////////////////////////////////////
