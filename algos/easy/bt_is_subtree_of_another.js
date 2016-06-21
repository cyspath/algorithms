
////////////////////  t2 is a subtree of t1  ////////////////////

function subtree(n1,n2) {
  if (n1 === undefined) {
    return false;
  }
  if (n1.val === n2.val) {
    var match = compareTrees(n1,n2);
    return match ? true : false
  }
  var left = subtree(n1.left, n2);
  if (left) {
    return true;
  }
  var right = subtree(n1.right, n2);
  if (right) {
    return true;
  }
  return false;
}

function compareTrees(n1,n2) {
  if (n1 === undefined && n1 === undefined) {
    return true;
  } else if (n1 === undefined && n2) {
    return false;
  } else if (n1 && n2 === undefined) {
    return false;
  }

  if (n1.val !== n2.val) {
    return false;
  }

  var left = compareTrees(n1.left, n2.left);
  if (left === false) {
    return false;
  }

  var right = compareTrees(n1.right, n2.right);
  if (right === false) {
    return false;
  }

  return true;
}
//
// var root3 = new treeNode(3);
// root3.addLeft(new treeNode(2))
// root3.left.addLeft(new treeNode(1))
// root3.addRight(new treeNode(4))
//
// console.log(subtree(root, root3));
