//=============================================================================================
// Array and Strings
//=============================================================================================

// 1.1 Is Unique - determine is a string has unique characters
// hash table for O(n) time and space
// sort array for O(nlogn) time and O(1) space

// 1.2 Check Permutations - if one string is a permutation of other
// hash table for O(n) time and space
// sort array for O(nlogn) time and O(1) space

// 1.3 URLify - convert a string with enough to hold additional character by replacing ' ' with '%20'
// O(n) O(1) solution is to just count number of spaces, tripling that, then start at end of the same string to make edits

// 1.4 Palindrome Permutation - given string check if its a permutation of palindrome
// O(n) O(1) check if all the character are even counted, or at most 1 odd letter. If not the case then return false
// 26 bit vector can be used to flip each index (points to an letter) from 0 to 1, in the end check if its even with only 1 odd

// 1.5 On Away - Given 2 strings, check if they are one edit away (insert, remove, replace) a character
// O(n) O(1) find longer and shorter, if same find if 1 is diff, or else if 1 is extra

// 1.6 String Compression - aabccccaaa => a2b1c5a3
// O(n) O(n) with a current letter and count of it

// 1.7 Rotate Matrix - rotate by 90 degrees in place
// for clockwise - flip vertically then swap the top right and bottom left halves
// for counterclock - flip horizontally then swap the top right and bottome left halves

// 1.8 Zero Matrix - if el is 0, its row and column are set to 0
// O(mn) O(1) idea is to use top row and left column to store whether there is any [i,j] in matrix has 0
// we would also need to first go through first row to see if it needs to be converted zero, and first column as well
// go through each cell and set the two headers, go through each cell and based on headers convert it to 0, then 
// convert the headers to all 0 if necessary based on initial findings

// 1.9 String Rotation - assume you have method isSubstring() that checks if one word is substring of another, check if s2
// is a rotation of s1 using only one call to isSubstring
// 'waterbottle' is a substring of 'erbottlewat' - for O(n) where its dictated by isSubstring()
// we can concat the strings: so first check length, if same length concat s1 with itself and then call isSubstring(s1+s1, s2);

//=============================================================================================
// Linked Lists
//=============================================================================================

// 2.1 Remove Dups - remove duplicates from unsorted linked list
// O(n) just use hash table to keep track if we have seen a val, on subsequent hits of same val just delete it

// 2.2 Return kth to Last - find kth to last element of a singly linked list
// O(n) 2 pointer, advance one pointer by k steps, then advance both

// 2.3 Delete Middle Node - given only access to that node to be deleted
// what if I just transfer the values from next to this node? 
// Given b from a->b->c->d, change b to c, change c to d. (note edge case is middle node is the last node, point it out to interviewer)

// 2.4 Partition - given x, all nodes smaller than x comes before all nodes >= x
// ex. 3-5-8-5-10-2 => 3-2-10-5-5-8
// create 2 other lists, one accumlate smaller nodes, other accumulate >= nodes, then combine them

// 2.5 Sum Lists - (7-1-6) + (5-9-2) => output 2-1-9
// if list are reversesd, we can do two ways:
// one is pad shorter list with zeros, then recursively call each two nodes, and sum it up that way
// two is reverse the link, and add them

// 2.6 Palindrome - check if a linked list is a palindrome
// one option is to reverse the list, other is.. recursive
// end case is when it reaches mid node, else recursively check if current value equals to recurse child.next.val
function LLPalindrome (node) {
    let i = 0, root = node;
    while (node.next && node.next.next) {
        i++;
        node = node.next.next;
    } // abcd, i = 1. abcde, i = 2

    const recurse = function (node, i, odd) {
        if (i === 0) {
            if (odd) return node;
            return node.val === node.next.val ? node.next : false;
        }
        const child = recurse(node.next, i - 1, odd);
        if (child === false) return false;
        return node.val !== child.next.val ? false : child.next;
    }
    return !!recurse(root, i, true) || !!recurse(root, i, false);
}
// console.log(LLPalindrome({ val: 3, next: { val: 2, next: { val: 1, next: { val: 2, next: { val: 3, next: null } } } } } )) // true
// console.log(LLPalindrome({ val: 3, next: { val: 2, next: { val: 1, next: { val: 1, next: { val: 2, next: { val: 3, next: null } } } } } } )) // true
// console.log(LLPalindrome({ val: 3, next: { val: 2, next: { val: 1, next: { val: 2, next: null } } } } )) // false

// 2.7 Intersection - determine if two lists intersect, return the intersecting node by reference (not by val)
// find end nodes of both list a and b, check against other list to see if node exists for O(a+b) time and O(1) space

// 2.8 Loop Detection - given a circular ll, return the node at the beginning of the loop
// way one is of course use hash
// clever way involves using 2 pointers, a and b, where b moves twice as fast, with this logic:
// when a is at beginning of loop after traveling k steps, b is k steps into the loop.
// in order for b to catchup to a (b in loop already), it would take loopsize - k steps because when a is loopsize - k steps in, b will be at the same spot!
// with that said, a is now loopsize - (loopsize - k) from loop start, which is k steps away from loop start
// now that k is the same k as k steps to beginning of loop, so set a pointer at beginning of loop after a and b meet, increment by one til reaching the same node

//=============================================================================================
// Stacks and Queues
//=============================================================================================

// 3.1 Three in One - how to use a single array to implement 3 stacks
// for equal size just do mod 3 for indexes
// for 2 stacks, start on opposite sides, if 3 stacks, have it in the middle somewhere and shift it as left or right gets full

// 3.2 Stack Min - how to design a stack with min function?
// have 2 stacks, one with actual elements and other with current min elements, pushed and popped in sync

// 3.4 Queue via Stacks - implement queue using two stacks
// have stack1 for push and dump stack1 to stack2 when popping. And when pushing, dump back from stack2 to stack1 if needed

// 3.5 Sort Stack - sort a stack so smallest items are on top, may use additional temp stack, but not array
// stack1 is original, stack2 is sorted. if el from stack1 is smaller than stack2 peek, put in stack2.
// if stack1 element is bigger, pop from stack 2 until not bigger, put el in stack 2. start over from stack1
// O(n^2) time O(n) space, if unlimited space we can do mergesort

//=============================================================================================
// Trees and Graphs
//=============================================================================================

// * Complete BT - every level is filled, except perhaps last level, and filled from left to right
// * Full BT - all nodes have either 0 or 2 children
// * Perfect BT - both complete and full, and leaf nodes are at same level

function DFS (node) { // recursive
    if (!node) return;
    visit(node);
    node.visited = true;
    node.children.forEach((child) => {
        if (child.visited === false) DFS(child);
    })
}

function BFS (root) {
    const queue = new Queue();
    root.visited = true;
    p.enqueue(root);
    while (!queue.isEmpty()) {
        const node = queue.dequeue();
        visit(node);
        node.children.forEach((child) => {
            child.visited = true;
            queue.enqueue(child);
        })
    }
}

// 4.1 Route between Nodes - given directed graph
// DFS is simpler to implement but BFS can give the shortest path from A to B!!!

// 4.2 Minimal Tree - given a sorted array with unique integers, create BST with minimal height
// just do a binary search on it, except there is no need to search just create tree with mid integer, then attach left and right 
// as left and right part of array

// 4.3 List of Depths - given BST, create a ll of all nodes at each depth
// can be done with BFS - intuitive to do
// can be done with DFS - in-order traversal passing in the level to create ll per level

// 4.4 Check Balanced - a balance BT here refers to for any node in tree the subtrees heights will differ max by 1
// DFS, get maxHeight of left and right child recursively, then return max + 1 up. If left and right child are differ
// by 1, return -1. O(n) time for go through each node and O(h) space where we return the heights

// 4.5 Validate BST - check if a BT is a valid bst
// O(n) time O(logn) logn is same as height h.

// 4.6 Successor - find next node in a BST given a node, and node have reference to their parent
// if given node has right substree, then next node will be left most of its right subtree, easy
// if no right subtree, we need to know if this node is left child or right child of its parent
// if left child, then next node is its parent
// if right child, then next node is the closest grandparent node that has its parents as left child

// 4.7 Build Order
// projects ['a','b','c','d','e','d'], dependencies = { d: ['a'], b: ['f'], d: ['b'], a: ['f'], c: ['d'] }
function buildOrder (proj, dep) {
    const r = [];
    const visited = {};
    const recurse = function (p) {
        if (visited[p]) return;
        visited[p] = true;
        (dep[p] || []).forEach((c) => {
            if (!visited[c]) {
                recurse(c)
            }
        });
        r.push(p);
    }
    proj.forEach((p) => recurse(p));
    return r;
}
// console.log(buildOrder(['a','b','c','d','e','d'], { d: ['a'], b: ['f'], d: ['b'], a: ['f'], c: ['d'] }))

// 4.8 First Common Ancestor - find first common ancestor of two nodes ina bt, do not store nodes
// return A or B or FCA or null: if left and right both not null return FCA, if only left or right return that, if no left or right return null unless current is a A or B

// 4.9 BST Sequences - ambiguous make look up what is requested page 110

// 4.10 Check Subtree - if t2 is a subtree of t1 which is much larger
// O(n + km) where k is occurance of t2, search for t2 root in t1, if found return compare tree of two

// 4.12 Paths with Sum - bt each node is integer, count number of paths sum to given value, path do not need to start or
// end at root or leaf, but must be downwards
// NOT OPTIMIZED - NEED TO REVISIT O(nlogn)
function pathWithSum (root, target) {
    let count = 0;

    const getSum = function (node, sum) {
        if (!node) return 0;
        const newSum = node.val + sum;

        let c = 0;
        if (newSum === target) c++;
        c += getSum(node.left, newSum)
        c += getSum(node.right, newSum)
        return c;
    }
    const recurse = function (node) {
        if (!node) return;
        count += getSum(node, 0);
        recurse(node.left);
        recurse(node.right);
    }
    recurse(root);
    return count; 
}
// console.log(pathWithSum({
//     val: 3, 
//     left: { val: -1, left: { val: 3, left: { val: 3 } }, right: { val: 2, left: { val: 2 } } },
//     right: { val: 4, right: { val: 2, right: { val: -3, right: { val: 3 } } } }
// }, 6))

//=============================================================================================
// Recusion and DP
//=============================================================================================

// 8.1 TRiple steps - number of ways to climb stairs with either 1 hop, 2 hops or 3 hops
// O(n) classic
function tripleSteps (n) {
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;
    for (let s = 3; s <= n; s++) {
        dp[s] = dp[s - 1] + dp[s - 2] + dp[s - 3];
    }
    return dp[n];
}
// console.log(tripleSteps(4));

// 8.2 Robot in a Grid - robot can only go right and down, but certain cells are off limits
// O(mn) O(mn)
function robotInAGrid (g) {
    const memo = {};
    const recurse = function (r,c) {
        if (r < 0 || r >= g.length || c < 0 || c >= g[0].length) return false;
        if (g[r][c] === 1) return false;
        if (!memo[r]) memo[r] = {};
        if (memo[r][c] !== undefined) return memo[r][c];
        if (r === 0 && c === 0) return 0;

        const top = recurse(r - 1, c);
        const left = recurse(r, c - 1);

        let result = 1;
        if (top !== false && left !== false) {
            result += Math.min(top, left);
        } else if (top !== false) {
            result += top;
        } else if (left !== false) {
            result += left;
        } else {
            result = false;
        }
        return memo[r][c] = result;
    }
    return recurse(g.length - 1, g[0].length - 1);

}
// console.log(robotInAGrid([
//     [0,0,0,0],
//     [0,0,1,0],
//     [0,0,0,1],
//     [0,1,0,0]
// ]))

// 8.3 Magic Index - is dedfined to be an index where A[i] = i
// given sorted array of distinct integers (what if it is not distinct), find magic index if exists
function magicIndex (arr) {
    const bsearch = function(i,j) {
        console.log(arr.slice(i,j+1))
        if (i > j) return - 1;
        if (i === j) return arr[i] === i ? i : -1;
        const midIdx = Math.floor((j - i) / 2) + i;
        if (arr[midIdx] === midIdx) return midIdx;
        if (arr[midIdx] > midIdx) return bsearch(midIdx + 1, j);
        if (arr[midIdx] < midIdx) return bsearch(i, midIdx - 1);
    }
    return bsearch(0, arr.length - 1);
} 
// console.log(magicIndex([1,2,3,3,14])) // 3
// console.log(magicIndex([0,1,1,1,5,6])) // 1
// console.log(magicIndex([0,4,4,4,5,6])) // -1

// 8.4 Power Set - all setsets of a set (NOTE THE BIG O)
// O(2^n) time and space - what happens is for each additional letter, we would need to double the previous result
// this means doubling in iteration time (n) and space
function subsets (arr) {
    const recurse = function (i) {
        if (i < 0) return [[]];
        const child = recurse(i - 1);
        return child.concat(child.map((a) => a.concat([arr[i]])));
    }
    return recurse(arr.length - 1);
}
// console.log(subsets(['a','b','c']))

// 8.5 Recusively Multiply - multiple 2 numbers with using the *
// O(logS) where S is the smaller of a and b
function recursiveMultiply (a,b) {
    [a,b] = [Math.max(a,b), Math.min(a,b)];
    const recurse = function (c) {
        if (c === 0) return 0;
        let i = 1;
        let accum = a;
        while (i + i <= c) {
            i = i + i;
            accum = accum + accum;
        }
        return accum + recurse(c - i);
    }
    return recurse(b);
}
// console.log(recursiveMultiply(3,3)) 
// console.log(recursiveMultiply(3,4)) 
// console.log(recursiveMultiply(3,11)) 

// 8.6 Tower of Hanoi - write program to move disks from first tower to last using stacks
// draw it out... essentially for n = 3
// we need to first we need to recusively first move 2(n-1) from a->b using c as temp
// now we move 3 from a->c
// then move the remaining recusively, so move 2(n - 1) from b->c using a as temp
// so this run time is O(2^n), doubling work each time we add another peg
function towerOfHanoi (towers) { // eg [[2,1],[],[]]
    const recurse = function (fromTower, toTower, usingTower, n) {
        if (n === 0) return;
        recurse(fromTower, usingTower, toTower, n - 1);
        toTower.push(fromTower.pop());
        console.log(towers);
        recurse(usingTower, toTower, fromTower, n - 1);
    }
    console.log(towers);
    recurse(towers[0], towers[2], towers[1], towers[0].length);
}
// console.log(towerOfHanoi([[4,3,2,1],[],[]]));

// 8.7 Permutation without Dups - get permutation of string with unique characters
// O(n!) since there are n! permutations, we cannot do better than this
function permutationWithoutDups (str) {
    const memo = {};
    const recurse = function(str) {
        if (str.length === 1) return [str];
        if (memo[str]) {
            console.log(str, memo[str])
            return memo[str];
        }
        let result = [];
        for (let i = 0; i < str.length; i++) {
            const rest = str.slice(0, i) + str.slice(i + 1);
            const child = recurse(rest);
            result = result.concat(child.map((s) => s + str[i]));
        }
        return memo[str] = result;
    }
    return recurse(str);
}
// console.log(permutationWithoutDups('abc'))
// console.log(permutationWithoutDups('abcdef'))

// 8.8 Permutation with Dups 
// essentially, for each recusive context, if we have already used a letter, should skip using the next time encountering it
function permutationWithDups (str) {
    const memo = {};
    const recurse = function(str) {
        if (str.length === 1) return [str];
        if (memo[str]) return memo[str];
        let seen = {};
        let result = [];
        for (let i = 0; i < str.length; i++) {
            if (seen[str[i]]) {
                continue;
            }
            seen[str[i]] = true;
            const rest = str.slice(0, i) + str.slice(i + 1);
            const child = recurse(rest);
            result = result.concat(child.map((s) => s + str[i]));
        }
        return memo[str] = result;
    }
    return recurse(str);
}
// console.log(permutationWithDups('aabc'))

// 8.9 Parens - given n print all valid parentheses 
// O(2^n)
function parens (n) {
    const recurse = function (str, b) {
        if (b < 0) return [];
        if (str.length === n * 2) {
            return b === 0 ? [str] : [];
        }
        return recurse(str + '(', b + 1).concat(recurse(str + ')', b - 1));
    }
    return recurse('', 0);
}
// function parens2 (n) { // SEEMS TO BE WRONG MISSING VALUE '(())(())' for n = 3
//     const memo = {};
//     const recurse = function(n) {
//         if (n === 0) return [''];
//         if (memo[n]) return memo[n];
//         const uniqs = {};
//         recurse(n - 1).forEach((p) => {
//             uniqs['(' + p + ')'] = true;
//             uniqs['()' + p] = true;
//             uniqs[p + '()'] = true;
//         });
//         return memo[n] = Object.keys(uniqs);
//     }
//     return recurse(n);
// }
// console.log(parens(4))

// 8.10 Paint Fill - ez

// 8.11 Coins - given infinite number of quarters, dimes, nickles and pennies, calculate number of ways giving change
//   | 0 1 2 3 4 5 6 7 8 9
// 0 | 0 0 0 0 0 0 0 0 0 0
// 2 | 1 0 1 0 1 0 1 0 1 0
// 3 | 1 0 1 1 1 0 2 1 1 2
// 6 | 1 0 1 1 1 0 3 1 2 3
// O(mn) time where m is total value, and n is number of coins for change
function coins(value, changes) {
    const dp = [];
    for (let i = 0; i <= changes.length; i++) {
        dp.push(Array(value + 1).fill(0));
    }
    for (let r = 1; r < dp.length; r++) {
        for (let v = 0; v < dp[r].length; v++) {
            if (v === 0) {
                dp[r][v] = 1;
            } else {
                const coin = changes[r - 1];
                const waysUsingCurrentCoin = v >= coin ? dp[r][v - coin] : 0;
                dp[r][v] = dp[r - 1][v] + waysUsingCurrentCoin;
            }
        }
    }
    return dp[dp.length - 1][dp[0].length - 1];
}
// console.log(coins(9, [2,3,6])) // 3
// console.log(coins(6, [2,3,6])) // 3

// 8.12 Eight Queens - all ways of arranging 8 queens on 8x8 board so that none share same row, column, or diagonal
const eightQueens = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
        board.push(Array(8).fill(0));
    }

    const validQueenPos = (b, i, j) => {
        return validPos(b, i, j, -1, 0) && 
            validPos(b, i, j, -1, 1) && 
            validPos(b, i, j, 0, 1) && 
            validPos(b, i, j, 1, 1) &&
            validPos(b, i, j, 1, 0) &&
            validPos(b, i, j, 1, -1) &&
            validPos(b, i, j, 0, -1) &&
            validPos(b, i, j, -1, -1);
    }

    const validPos = (b, i, j, dI, dJ) => {
        if (b[i] === undefined || b[i][j] === undefined) return true;
        if (b[i][j] === 1) return false;
        return validPos(b, i + dI, j + dJ, dI, dJ);
    }

    const recurse = (n, b, i) => {
        if (n === 0) {
            console.log(b);
            return 1;
        }
        if (i >= b.length || i !== 8 - n) return false;

        let count = 0;
        for (let j = 0; j < 8; j++) {
            if (validQueenPos(b, i, j)) {
                const newB = b.map((r) => r.slice());
                newB[i][j] = 1;
                const child = recurse(n - 1, newB, i + 1);
                count += child === false ? 0 : child;
            }
        }
        return count;
    }
    return recurse(8, board, 0);
}
// eightQueens();

// 8.13 Stack of Boxes
// n boxes with w,h,d, can only be stacked if in w,h,and d. Boxes cannot be rotated. Compute height of tallest stack
// dp failed... so recursive is better in this case
// I think O(n^2) is run time complexity with memoization
const stackOfBoxes = (arr) => {
    arr = arr.sort((a,b) => a[0] < b[0] ? 1 : -1);

    const memo = {};
    const recurse = (w,d,h,i) => {
        if (i >= arr.length) return 0;
        
        if (!memo[i]) memo[i] = {};
        if (!memo[i][w]) memo[i][w] = {};
        if (!memo[i][w][d]) memo[i][w][d] = {};
        if (memo[i][w][d][h]) return memo[i][w][d][h];

        const box = arr[i];

        let maxH = 0;
        if (box[0] <= w && box[1] <= d && box[2] <= h) {
            maxH += box[2] + recurse(box[0] - 1, box[1] - 1, box[2] - 1, i + 1); // use current box if dimensions ok
        }
        maxH = Math.max(maxH, recurse(w, d, h, i + 1)); // not use current box
        return memo[i][w][d][h] = maxH;
    }

    let maxW = 0, maxD = 0, maxH = 0;
    arr.forEach((a) => {
        maxW = Math.max(maxW, a[0]);
        maxD = Math.max(maxD, a[1]);
        maxH = Math.max(maxH, a[2]);
    })
    return recurse(maxW, maxD, maxH, 0)
}
// console.log(stackOfBoxes([[5,5,10],[4,6,20],[4,4,6],[1,2,5],[3,3,1],[2,2,9],[1,1,7],[2,3,8]]))


//=============================================================================================

//=============================================================================================