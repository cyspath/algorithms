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

// build order - find a build order for list a projects, and their dependencies where first one depends on second
var projects = 'abcdef'.split('');
var dependencies = [
  ['d','a'],
  ['b','f'],
  ['d','b'],
  ['a','f'],
  ['c','d'],
  // ['f','c'] // circurlar code test
]

class GraphNode {
  constructor(val = null) {
    this.val = val;
    this.children = [];
  }
}

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

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(el) {
    var newNode = new LinkedListNode(el);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return el;
  }
  remove() {
    if (!this.head) {
      return;
    } else {
      var node = this.head;
      this.head = node.next;
      node.next = null;
      if (!this.head) {
        this.tail = null;
      }
      return node.val;
    }
  }
  isEmpty() {
    return !this.head && !this.tail;
  }
}

function buildOrder(p, d) {
  // initiate a hash with all the projects, set the default root = true for each
  var hash = toHash(p);
  // set childrens, and toggle the projects that depends on others to be root = false
  setChildren(hash, d); // only 2 nodes are roots now
  // find the nodes, go through each and add to result
  var result = [];
  for (var key in hash) {
    if (hash[key].root) {
      addToResult(result, hash[key]);
    }
  }
  console.log(hash);
  return result.length == p.length ? result : 'error'; // circular dependencies ends up error
}

function toHash(p) {
  var hash = {};
  for (var i = 0; i < p.length; i++) {
    var node = new GraphNode(p[i]);
    node.root = true;
    hash[p[i]] = node;
  }
  return hash;
}

function setChildren(hash, d) {
  for (var i = 0; i < d.length; i++) {
    hash[d[i][0]].root = false;
    hash[d[i][0]].visited = false;
    hash[d[i][1]].children.push(hash[d[i][0]]);
  }
  return hash;
}

function addToResult(result, node) {
  var queue = new Queue();
  queue.add(node);
  node.visited = true;
  while (!queue.isEmpty()) {
    var current = queue.remove();
    result.push(current.val);
    for (var i = 0; i < current.children.length; i++) {
      var child = current.children[i];
      if (!child.visited) {
        child.visited = true;
        queue.add(child);
      }
    }
  }
  return result;
}

// console.log(buildOrder(projects, dependencies));


///////////////// find number of paths that adds to a specific sum /////////////////
var sumNode = { val: 10, left: { val: 5, left: { val: 3, left: { val: 3 }, right: { val: -2 } }, right: { val: 1, right: { val: 2 } } }, right: { val: -3, right: { val: 11 } } }
//         10
//       /    \
//      5      -3
//    /   \      \
//   3     1      11
//  / \     \
// 3   2     2

function numPaths(node, targetSum) {
  var result = 0;

  function recurse(node, hash, runningSum) {
    if (!node) {
      return 0;
    }
    runningSum += node.val;

    if (hash[runningSum]) {
      hash[runningSum] += 1;
    } else {
      hash[runningSum] = 1;
    }

    if (hash[runningSum - targetSum]) {
      result += 1;
    }

    if (node.left) {
      recurse(node.left, hash, runningSum);
    }
    if (node.right) {
      recurse(node.right, Object.assign({}, hash), runningSum);
    }
  }

  recurse(node, {}, 0)
  return result;
}

console.log(numPaths(sumNode, 6)); // 3


// ////////////////////////////// BIT MANIPULATION ////////////////////////////////////

// ////////////////////////////// MATH AND LOGIC ////////////////////////////////////

// 1. heavy pills in one bottle of 1.1 gram, where rest are 1.0 grams, 20 bottles - one measurement exactly

// 2. basketball, at what making a shot's probability would be worth for: one shot to make hoop vs. make at least two of three shots

// 3. ants on triangle, chance to collide

// 4. jugs of water, 3L and 5L jug to make 4 L

// 5. blue eyed ppl and normal eyed people live on island and blue eyed people have to leave in the morning for pickup,
//    no one knows their own eye color but can see all others eye color (answer: c days for c number of blue eyed people)

// 6. apocalypse, all families need to have child til 1 girl, then stop. whats the boy girl ratio? (answer 50%)

// 7. egg drop

// 8. 100 lockers, open and close, cats in the hat (3 vs 4 unique factors)

// 9. poison, 1000 bottles, 1 poisoned. you have 10 test strips, can be used as many times/as many drops as possible, 1 drop
//    will turn it black, you can run test once a day, and takes 7 day to get resuls. (answer good soluion 28 days, then, 10 days if reuse, then 7 days if use binary representation)

function toBinary(n) {
  var result = "";
  while (n >= 1) {
    result = (n % 2).toString() + result;
    n = Math.floor(n / 2);
  }
  return result;
}

function binaryToInt(str) {
  var arr = str.split("").reverse();

  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "1") {
      sum += Math.pow(2, i);
    }
  }
  return sum;
}
// ////////////////////////////// OO DESIGN ////////////////////////////////////

// ////////////////////////////// RECURSION AND DP ////////////////////////////////////

// triple step, a child is running up staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time. count how many possible ways the child can run the stairs.

function tripleStep(n) {
  var hash = {};

  function recurse(n) {
    if (n < 0) {
      return 0;
    } else if (n == 0) {
      return 1;
    }

    var result = 0;
    for (var step = 1; step <= 3; step++) {
      if (!hash[n - step]) {
        hash[n - step] = recurse(n - step);
      }
      result += hash[n - step];
    }
    return result;
  }
  return recurse(n);
}

// console.log(tripleStep(1));
// console.log(tripleStep(2));
// console.log(tripleStep(3));
// console.log(tripleStep(4));
// console.log(tripleStep(5));


// ///////////////// magic index where a[i] = i
function magicIdx(a) {
  function recurse(a, i1, i2) {
    if (i2 < i1) return -1;
    // find mid index and return index if mid is correct
    var midIdx = Math.floor((i1 + i2)/2);
    if (a[midIdx] == midIdx) {
      return midIdx;
    }
    // search left up to a[midIdx]
    var leftIdx = Math.min(a[midIdx], midIdx - 1);
    var left = recurse(a, 0, leftIdx);
    if (left >= 0) {
      return left;
    }
    // search right
    var rightIdx = Math.max(a[midIdx], midIdx + 1);
    var right = recurse(a, rightIdx, i2);
    return right;
  }
  return recurse(a, 0, a.length - 1)
}

// console.log(magicIdx([1,2,2,4,4,5,6])); // 4


// ////////////////////////////// SYSTEM DESIGN AND SCALABILTY ////////////////////////////////////

// ////////////////////////////// SORTING AND SEARCHING ////////////////////////////////////
