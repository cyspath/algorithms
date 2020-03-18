//=============================================================================================
// PAY ATTENTION TO BIG O HERE

// Count BST nodes that lie in a given range
// Given a Binary Search Tree (BST) and a range, count number of nodes that lie in the given range.
// Examples:

// Input:
//         10
//       /    \
//     5       50
//    /       /  \
//  1       40   100
//                  \
//                  101
// Range: [5, 45]

// Output:  3
// There are three nodes in range, 5, 10 and 40

// O(k + h) k is number of nodes in range + h is height of tree since we need to check along 2 boundries all the way down for potential child nodes in range
const countBSTNodesInGivenRange = function(root, range) {
    let count = 0;
    const recurse = function (node) {
        if (!node) return;

        if (node.val >= range[0] && node.val <= range[1]) count++;
        if (node.val >= range[0]) recurse(node.left);
        if (node.val <= range[1]) recurse(node.right);
    }
    recurse(root);
    return count;
}
// console.log(countBSTNodesInGivenRange({
//     val: 10,
//     left: { val: 5, left: { val: 1 } },
//     right: { val: 50, left: { val: 40 }, right: { val: 100, right: { val: 101 } } }
// }, [5,45]))

//=============================================================================================
