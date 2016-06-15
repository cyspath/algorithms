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
