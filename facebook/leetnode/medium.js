function ListNode(val) {
  this.val = val;
  this.next = null;
}

var node1 = new ListNode(2);
node1.next = new ListNode(4);
node1.next.next = new ListNode(3);
var node2 = new ListNode(5);
node2.next = new ListNode(6);
node2.next.next = new ListNode(4);

var addTwoNumbers = function(l1, l2) {
  var arr = [];
  var extraAdd = 0;

  while (l1 || l2) {
    var sum = 0;
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      sum += l2.val;
      l2 = l2.next
    }

    arr.push((sum + extraAdd) % 10);

    extraAdd = sum + extraAdd >= 10 ? 1 : 0;
  }

  if (extraAdd > 0) {
    arr.push(extraAdd);
  }

  return toList(arr);
};

var toList = function (arr) {
  var startNode = new ListNode(arr[0]);
  var node = startNode;
  for (var i = 1; i < arr.length; i++) {
      var newNode = new ListNode(arr[i]);
      node.next = newNode;
      node = newNode;
  }
  return startNode;
}
console.log(addTwoNumbers(node1, node2));
