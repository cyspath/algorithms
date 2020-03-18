// Print all Jumping Numbers smaller than or equal to a given value
// A number is called as a Jumping Number if all adjacent digits in it differ by 1. The difference between ‘9’ and ‘0’ is not considered as 1.
// All single digit numbers are considered as Jumping Numbers. For example 7, 8987 and 4343456 are Jumping numbers but 796 and 89098 are not.

// Given a positive number x, print all Jumping Numbers smaller than or equal to x. The numbers can be printed in any order.

// Input: x = 20
// Output:  0 1 2 3 4 5 6 7 8 9 10 12

// Input: x = 105
// Output:  0 1 2 3 4 5 6 7 8 9 10 12
//          21 23 32 34 43 45 54 56 65
//          67 76 78 87 89 98 101

// Note: Order of output doesn't matter, 
// i.e. numbers can be printed in any order

// first approach could be checking if a number is junmping number and iterate from 0 to X for O(x)
// O(k) where k is number of jumping number smaller than n
const jumpingNumbers = function(x) {
    if (x >= 0) console.log(0);

    const base = [1,2,3,4,5,6,7,8,9];
    const recurse = function (n) {
        if (n > x) return;
        if (n <= x) console.log(n);
        const d = n % 10;
        if (d === 0) {
            recurse(n * 10 + 1);
        } else if (d === 9) {
            recurse(n * 10 + 8);
        } else {
            recurse(n * 10 + d - 1);
            recurse(n * 10 + d + 1);
        }
    }

    base.forEach((n) => recurse(n));
}
// jumpingNumbers(155);

//=============================================================================================

// Check if a Binary Tree contains duplicate subtrees of size 2 or more
// Given a Binary Tree, check whether the Binary tree contains a duplicate sub-tree of size 2 or more.
// Note : Two same leaf nodes are not considered as subtree size of a leaf node is one.

// Input :  Binary Tree 
//                A
//              /    \ 
//            B        C
//          /   \       \    
//         D     E       B     
//                      /  \    
//                     D    E
// Output : Yes

// one idea is give ids on each tree
// right idea is to serial all subtrees in a hash as string that is not leaf nodes

const binaryTreeContainsDuplicateSubtrees = function (root) {
    const hash = {};
    let hasDup = false;
    const recurse = function (node) {
        if (hasDup) return;
        if (!node.left && !node.right) {
            return node.val;
        }

        let str = '';
        if (node.left) {
            str += recurse(node.left);
        }
        str += node.val;
        if (node.right) {
            str += recurse(node.right);
        }

        if (hash[str]) {
            return hasDup = true;
        }
        hash[str] = true;
        return str;
    }
    recurse(root);
    return hasDup;
}
// const t = {
//     val: 'A',
//     left: {
//         val: 'B',
//         left: { val: 'D' },
//         right: { val: 'E' }
//     },
//     right: {
//         val: 'C',
//         right: {
//             val: 'B',
//             left: { val: 'D' },
//             right: { val: 'E' }
//         }
//     }
// }
// console.log(binaryTreeContainsDuplicateSubtrees(t))

//=============================================================================================

/**
 * Encodes a tree to array.
 */
const serialize = root => {
    if (root === null) return [];
    let s = [], q = [];
    q.push(root);
    while (q.length) {
        const node = q.shift();
        s.push(node ? node.val : null);
        if (node !== null) {
            q.push(node.left); // which could be null
            q.push(node.right); // which could be null
        }
    }
    return s;
};

const deserialize = (data) => {
    if (!data.length) return null;
    const root = new TreeNode(data.shift());
    const q = [root];
    while (q.length) {
        const node = q.shift();
        const left = data.shift();
        const right = data.shift();
        if (left !== null) {
            node.left = new TreeNode(left);
            q.push(node.left);
        }
        if (right !== null) {
            node.right = new TreeNode(right);
            q.push(node.right);   
        }
    }
    return root;
};

//=============================================================================================

