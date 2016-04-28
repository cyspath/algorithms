var tree = {
    data: 5,
    left: {
        data: 3,
        left: {
            data: 1,
            left: null,
            right: null,
        },
        right: {
            data: 4,
            left: null,
            right: null,
        },
    },
    right:{
        data: 7,
        left:{
            data: 6,
            left: null,
            right: null,
        },
        right:{
            data: 8,
            left: null,
            right: null,
        },
    }
}
var badTree = {
    data: 5,
    left: {
        data: 3,
        left: {
            data: 4,
            left: null,
            right: null,
        },
        right: {
            data: 4,
            left: null,
            right: null,
        },
    },
    right:{
        data: 7,
        left:{
            data: 6,
            left: null,
            right: null,
        },
        right:{
            data: 8,
            left: null,
            right: null,
        },
    }
}


result = new LinkedList()

var mike =  function(node) {
  um(node)
  return result
}

var um = function(node) {
  if (node.left != null) {
    um(node.left)
  }

  result.add(new Node(node))

  if (node.right != null) {
    um(node.right)
  }
}

var LinkedList = function() {
  this.head = null
  this.tail = null
  this.current = null
  this.length = 0
}

LinkedList.prototype.print = function () {
  while (this.current != null) {
    console.log(this.current.data + " -> ")
    this.current = this.current.next
  }
};

LinkedList.prototype.add = function (node) {
  if (this.head == null) {
    this.head = node
    this.tail = node
    this.current = node
  } else {
    this.tail.next = node
    this.tail = node
  }
  this.length += 1
};


var Node = function(data) {
  this.data = data,
  this.next = nil
}

var verify_bst = function(node) {
  return (!!verify(node))
}
var verify = function(node) {
  if (node.left && (node.left.data >= node.data || verify(node.left) == false)) {
    return false
  }
  if (node.right && (node.right.data <= node.data || verify(node.right) == false)) {
    return false
  }
  return node
}
