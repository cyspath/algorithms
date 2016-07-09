
// # 4.Write a C program to Delete a Tree. 5.Given a linked list, reverse alternate nodes and append at the end
// # Given a linked list, reverse alternate nodes and append them to end of list. Extra allowed space is O(1)
// # Examples
// #
// # Input List:  1->2->3->4->5->6
// # Output List: 1->3->5->6->4->2
// #
// # Input List:  12->14->16->18->20
// # Output List: 12->16->20->18->14

var node = {
  val: 1, next: {
    val: 2, next: {
      val: 3, next: {
        val: 4, next: {
          val: 5, next: {
            val: 6
          }
        }
      }
    }
  }
}

function genTwoList(node) {
  var l1 = node;
  var l2 = node.next;

  var newL1 = l1;
  var newL2 = l2;

  var i = 1;
  node = node.next.next
  while (node) {
    if (i % 2 != 0) {
      newL1.next = node;
      newL1 = node;
    } else {
      newL2.next = node;
      newL2 = node;
    }
    i += 1;
    node = node.next;
  }
  newL1.next = undefined;
  newL2.next = undefined;
  return [l1, l2]
}

function reverseList(node) {
  var prev = node;
  node = node.next;
  prev.next = undefined;

  while (node) {
    var current = node;
    node = node.next;
    current.next = prev;
    prev = current;
  }
  return current;
}

function reverseAlt(node) {
  var lists = genTwoList(node);
  var result = lists[0];

  var first = lists[0];
  var second = reverseList(lists[1]);

  while (first.next) {
    first = first.next;
  }
  first.next = second;
  return result;
}

// console.log(genTwoList(node));
// console.log(reverseList(node));
console.log(reverseAlt(node));
