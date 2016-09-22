var TreeNode = function (val) {
  this.val = val;
  this.children = [];
}

var node1 = new TreeNode(1);
var node2 = new TreeNode(2);
var node3 = new TreeNode(3);
var node4 = new TreeNode(4);
var node5 = new TreeNode(5);
node1.children.push(node2)
node1.children.push(node3)
node2.children.push(node4)
node2.children.push(node5)

// console.log(node1);

TreeNode.prototype.map = function (callback) {
  var recurse = function(node, callback) {
    var newNode = new TreeNode(callback(node.val));
    for (var i = 0; i < node.children.length; i++) {
      newNode.children.push(recurse(node.children[i], callback));
    }
    return newNode;
  }
  return recurse(this, callback);
};

console.log(node1.map(function(e) { return e * 2 }))
