function Node(val) {
  this.val = val
  this.left
  this.right
}

a = new Node('a')
b = new Node('b')
c = new Node('c')
d = new Node('d')
e = new Node('e')
f = new Node('f')
g = new Node('g')

a.left = b
a.right = c
b.left = d
b.right = e
c.left = f
c.right = g


a2 = new Node('a')
b2 = new Node('b')
c2 = new Node('c')
d2 = new Node('d')
e2 = new Node('e')
f2 = new Node('f')
g2 = new Node('g')

a2.left = b
a2.right = c
b2.left = d
b2.right = e
c2.left = f
c2.right = g

///////////////// Print debug tree /////////////
function printDebugNode(node, current, n) {
  if (node === undefined) { return null }
  var tail = current == node ? "*" : ""
  var line = spaces(n) + node.val + tail
  console.log(line);
  printDebugNode(node.left, current, n + 3)
  printDebugNode(node.right, current, n + 3)
}

function spaces(n) {
  var spaces = ""
  for (var i = 0; i < n; i++) {
    spaces = spaces + " "
  }
  return spaces
}
// a
//    b
//       d*
//       e
//    c
//       f
//       g

printDebugNode(a, d, 0)

///////////////// Print level order tree /////////////

function printlvlorder(node) {
  var nodes = [node]
  var current_nodes = []

  while (nodes.length > 0) {
    printarr(nodes)
    nodes.forEach(function(el) {
      if (el.left) {current_nodes.push(el.left)}
      if (el.right) {current_nodes.push(el.right)}
    })
    nodes = current_nodes
    current_nodes = []
  }
}

function printarr(arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result += (arr[i].val + " ")
  }
  console.log(result);
}

printlvlorder(a)

///////////////// compare if 2 binary trees are eql /////////////


function compare(node1, node2) {
  if (node1.val != node2.val) { return false }

  if (node1.left && node2.left == undefined) { return false }
  if (node2.left && node1.left == undefined) { return false }
  if (node1.right && node2.right == undefined) { return false }
  if (node2.right && node1.right == undefined) { return false }

  if (node1.left && node2.left ) {
    var left = compare(node1.left, node2.left)
  }

  if (node1.right && node2.right ) {
    var right = compare(node1.right, node2.right)
  }

  if (left == false || right == false ) {
    return false
  } else {
    return true
  }
}

console.log(compare(a, a2)); // true
console.log(compare(a, b2)); // false
