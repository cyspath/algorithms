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
//////////////////////////// nodeA (A-H linked list) //////////////////////////

var nodesValues = [1,2,3,4,5,6,7];
var nodeA = createLinkedList(nodesValues);

// console.log(nodeA.showValues());

//////////////////////////// problems //////////////////////////

// delete middle node
// use 2 pointers, one run twice as fast

// console.log(deleteMidNode(nodeA));
// console.log(nodeA.showValues());

function deleteMidNode(startNode) {
  var slow = startNode, fast = startNode;
  while (true) {
    if (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    } else if (fast.next) {
      return startNode // return since there is no middle node, even length linked list needs no modification
    } else {
      // fast node IS the last node, middle node is slow node
      break;
    }
  }
  // find and delete middle node
  var node = startNode;
  while (node.next != slow) {
    node = node.next;
  }
  node.next = slow.next;
  return startNode;
}

// partition - partition linkedlist around value x, all nodes less than x should be before all nodes which are x or greater than x
// O(n) O(1)
var variables = {
  lessStart: null,
  lessEnd:null,
  equalStart: null,
  equalEnd: null,
  greaterStart: null,
  greaterEnd: null
}

var partition = function(x, node) {
  console.log(node.showValues());
  while (node) {
    if (node.val < x) {
      partitionStartEnd('less', node);
    } else if (node.val === x) {
      partitionStartEnd('equal', node);
    } else if (node.val > x) {
      partitionStartEnd('greater', node);
    }
    node = node.next;
  }
  var result = partitionCombine();
  console.log(result.showValues());
  return result;
}

var partitionStartEnd = function(condition, node) {
  if (!variables[condition + 'Start']) {
    variables[condition + 'Start'] = node;
    variables[condition + 'End'] = node;
  } else {
    variables[condition + 'End'].next = node;
    variables[condition + 'End'] = node;
  }
}

var partitionCombine = function() {
  if (variables.lessEnd && variables.equalStart) {
    variables.lessEnd.next = variables.equalStart
  } else if (variables.lessEnd && variables.greaterStart) {
    variables.lessEnd.next = variables.greaterStart
  } else {
    variables.lessEnd.next = null;
  }

  if (variables.equalEnd && variables.greaterStart) {
    variables.equalEnd.next = variables.greaterStart;
  } else {
    variables.equalEnd.next = null;
  }

  if (variables.greaterEnd) {
    variables.greaterEnd.next = null;
  }

  if (variables.lessStart) {
    return variables.lessStart;
  } else if (variables.equalStart) {
    return variables.equalStart;
  } else if (variables.greaterStart) {
    return variables.greaterStart;
  }
}

// console.log(partition(5, createLinkedList([3,5,8,5,10,2,1])));
// 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8

// sum lists - sum the values of 2 linked lists

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

// intersection - check if two lists intersect by reference to the same node
// O(a + b) O(1)

// var a = new LinkedListNode(1);
// var c = new LinkedListNode(4);
// a.next = new LinkedListNode(2);
// a.next.next = c;
// var b = new LinkedListNode(3);
// b.next = c;
// c.next = new LinkedListNode(5);
// //        4 - 5
// //      /  \
// // 1 - 2    3
// console.log(intersect(a, b)); // true
//
// var c = createLinkedList([1,2,3,4]);
// var d = createLinkedList([2,3,4])
// console.log(intersect(c, d)); // false

function intersect(a,b) {
  // find end node
  var endNode;
  while (a) {
    endNode = a;
    a = a.next;
  }
  // if a and b intersect, when I loop through b, it should also reach the same endNode at some point;
  while (b) {
    if (b === endNode) {
      return true;
    }
    b = b.next;
  }
  return false;
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
