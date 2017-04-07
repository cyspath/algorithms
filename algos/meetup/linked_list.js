var list1 = {
  val: 'O', next: {
    val: 'X', next: {
      val: 'O', next: {
        val: 'O', next: {
          val: 'O', next: {
            val: 'W', next: null }}}}}};

var list2 = {
  val: '1', next: {
    val: '2', next: {
      val: '3', next: {
        val: '4', next: {
          val: '5', next: {
            val: '6', next: null }}}}}};

function uniq(node) {
  var val = node.val; values = { val: true }, prevNode = node, current = node.next;
  while (current) {
    if (!values[current.val]) {
      values[current.val] = true;
      prevNode = current;
    } else {
      current.next = null;
      prevNode.next = current.next;
    }
    current = current.next;
  }
  return node
}

function kFromEnd(k, node) {
  var followerNode = node;
  var leaderNode = node;
  for (var i = 0; i < k; i++) {
    if (leaderNode.next) {
      leaderNode = leaderNode.next;
    } else {
      return;
    }
  }

  while(leaderNode) {
    followerNode = followerNode.next;
    leaderNode = leaderNode.next;
  }
  return followerNode;
}
