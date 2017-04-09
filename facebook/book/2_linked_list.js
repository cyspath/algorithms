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

//////////////////////////// nodeA (A-H linked list) //////////////////////////

var nodesValues = [1,2,3,4,5,6,7];
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

console.log(sumLists(createLinkedList([6,1,7]), createLinkedList([2,9,5]))); // 617 + 295 = 912

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
