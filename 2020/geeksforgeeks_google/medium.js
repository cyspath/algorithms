// https://www.geeksforgeeks.org/Google-topics-interview-preparation/

// backtrack
var solveSudoku = function(board) {
    const nums = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true };

    function valid(i, j, g) {    
        // check if row is unique
        let list = new Set();
        let count = 0;
        for (let k = 0; k < 9; k++) {
            if (g[i][k] != '.') {
                list.add(g[i][k]);
                count++;
            }
        }
        if (list.size !== count) return false;
        
        // check if column is unique
        list = new Set();
        count = 0;
        for (let k = 0; k < 9; k++) {
            if (g[k][j] != '.') {
                list.add(g[k][j]);
                count++;
            }
        }
        if (list.size !== count) return false;
        
        // check if quadrant is unique
        list = new Set();
        count = 0;
        
        let qI = Math.floor(i / 3) * 3, qJ = Math.floor(j / 3) * 3;
        const coors = [[qI, qJ], [qI, qJ + 1], [qI, qJ + 2], [qI + 1, qJ], [qI + 1, qJ + 1], [qI + 1, qJ + 2], [qI + 2, qJ], [qI + 2, qJ + 1], [qI + 2, qJ + 2]];
        for (let k = 0; k < coors.length; k++) {
            if (g[coors[k][0]][coors[k][1]] !== '.') {
                list.add(g[coors[k][0]][coors[k][1]]);
                count++;
            }
        }
        if (list.size !== count) return false;
        
        return true;
    }
    
    function hasCoor(memo, i, j) {
        if (!memo[i]) memo[i] = {};
        if (!memo[i][j]) memo[i][j] = {};
        return memo[i][j];
    }
    
    const recurse = function(i,j, g) {
        if (i === 9) return g;
        if (j === 9) return recurse(i + 1, 0, g);
        if (g[i][j] !== '.') return recurse(i, j + 1, g);
        
        for (n in nums) {
            g[i][j] = n;
            if (valid(i, j, g)) {
                const child = recurse(i, j, g);
                if (child !== false) {
                    return child;
                }
            }
        }
        g[i][j] = '.';
        return false;
    }
    
    return recurse(0,0,board);
};
// console.log(solveSudoku([
//     ["5","3",".",".","7",".",".",".","."],
//     ["6",".",".","1","9","5",".",".","."],
//     [".","9","8",".",".",".",".","6","."],
//     ["8",".",".",".","6",".",".",".","3"],
//     ["4",".",".","8",".","3",".",".","1"],
//     ["7",".",".",".","2",".",".",".","6"],
//     [".","6",".",".",".",".","2","8","."],
//     [".",".",".","4","1","9",".",".","5"],
//     [".",".",".",".","8",".",".","7","9"]
// ]))

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

// https://leetcode.com/problems/interleaving-string/
// Find if a string is interleaved of two other strings | DP-33
// Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.

// Input: s1 = "aa bc c", s2 = "dbbc a", s3 = "aa dbbc bc a c"
// Output: true

// Input: s1 = "aa b cc", s2 = "dbb ca", s3 = "aa dbb baccc"
// Output: false

var isInterleave = function(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) return false;
    
    const memo = {};
    
    const recurse = function (i,j,k) {
        if (!memo[i]) memo[i] = {};
        if (!memo[i][j]) memo[i][j] = {};
        if (memo[i][j][k] !== undefined) return memo[i][j][k];
        
        if (k > s3.length) return true;
        
        let one = false, two = false;
        if (s1[i] === s3[k]) {
            one = recurse(i + 1, j, k + 1);
        }
        if (s2[j] === s3[k]) {
            two = recurse(i, j + 1, k + 1);
        }
        return memo[i][j][k] = one || two;
    }
    return recurse(0,0,0);
};
// console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));

//=============================================================================================

// Connect nodes at same level
// Write a function to connect all the adjacent nodes at the same level in a binary tree. Structure of the given Binary Tree node is like following.

// Input Tree
//        A
//       / \
//      B   C
//     / \   \
//    D   E   F


// Output Tree
//        A--->NULL
//       / \
//      B-->C-->NULL
//     / \   \
//    D-->E-->F-->NULL

const connectNodesAtSameLevel = function (root) {
    let p = [root];
    while (p.length) {
        const c = [];
        for (let i = 0; i < p.length; i++) {
            if (i === p.length - 1) {
                p[i].nextRight = null;
            } else {
                p[i].nextRight = p[i + 1].val;
            }
            if (p[i].left) c.push(p[i].left);
            if (p[i].right) c.push(p[i].right);
        }
        p = c;
    }
    return root;
}
// console.log(connectNodesAtSameLevel({
//     val: 'A',
//     left: { val: 'B', left: { val: 'D' }, right: { val: 'E' } },
//     right: { val: 'C', right: { val: 'F' } }
// }))

//=============================================================================================

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


//=============================================================================================

// Egg Drop Problem

var eggDrop = function(K, N) { // K is number of eggs and N is floor
    
    // const minDropsNeeded = function (breakFloor, steps, prevDrops) {
    //     if (breakFloor >= N) return 0;
    //     if (steps < 1) return N - breakFloor; // left over drops
    //     const numDrops = steps + prevDrops;
    //     const worstCaseDrops = minDropsNeeded(breakFloor + steps, steps - 1, prevDrops + 1);
        
    //     const result = Math.max(numDrops, worstCaseDrops);
    //     console.log(breakFloor, numDrops, result);
    //     return result;
    // }

    let firstStep;
    for (let x = 1; x < N; x++) {
        let sum = 0, steps = x;
        while (steps > 0) {
            sum += steps;
            steps--;
        }
        if (sum >= N) {
            firstStep = x;
            break;
        }
    }
    console.log(firstStep);

    const minDropsNeeded = function (maxFloor, breakFloor, steps, prevDrops) {
        if (breakFloor >= N) return 0;
        if (steps < 1) return N - breakFloor; // left over drops
        const numDrops = steps + prevDrops;
        const worstCaseDrops = minDropsNeeded(breakFloor + steps, steps - 1, prevDrops + 1);
        
        const result = Math.max(numDrops, worstCaseDrops);
        console.log(breakFloor, numDrops, result);
        return result;
    }

    const recurse = function (numEggs, from, to, ) {
        if (n === 1) return to - from;

    }


    // minDropsNeeded(0, 8, 0)
    // minDropsNeeded(0, 6, 0)
    // minDropsNeeded(0, 7, 0)
    // minDropsNeeded(0, 10, 0)
    // minDropsNeeded(0, 2, 0)
    minDropsNeeded(0, 1, 0)

};

// console.log(eggDrop(2, 100));
// console.log(eggDrop(1, 2));

//=============================================================================================

const minDistanceStrFromTwoEnd = function (s, iEnd, jEnd) {
    const memo = {};
    const recurse = function (i, j) {
        // console.log(i,j)
        if (i > iEnd) return j - jEnd + 1;
        if (j < jEnd) return iEnd - i + 1;

        if (!memo[i]) memo[i] = {}
        if (memo[i][j] !== undefined) return memo[i][j];

        let result;
        if (s[i] === s[j]) {
            result = recurse(i+1, j-1);   
        } else {
            result = Math.min(recurse(i + 1, j), recurse(i, j - 1)) + 1;
        }

        return memo[i][j] = result;
    }
    return recurse(0,s.length - 1);
}
// console.log(minDistanceStrFromTwoEnd('abcdcb', 2, 3)) // 2
// console.log(minDistanceStrFromTwoEnd('abccba', 2, 3)) // 0

var minInsertions = function(s) {
    let minDistance = s.length;
    for (let k = 0; k < s.length; k++) {
        minDistance = Math.min(
            Math.min(minDistanceStrFromTwoEnd(s, k, k), minDistanceStrFromTwoEnd(s, k, k + 1)),
            minDistance
        );
    }
    return minDistance;
};
// console.log(minInsertions('leetcode')) // 5
// console.log(minInsertions('abcda')) // 2

//=============================================================================================

// Word Break Problem | DP-32
// Given an input string and a dictionary of words, find out if the input string can be segmented into a space-separated sequence of dictionary words. See following examples for more details.
// This is a famous Google interview question, also being asked by many other companies now a days.

// { i, like, sam, sung, samsung, mobile, ice, cream, icecream, man, go, mango}
// Input:  ilikesamsung
// Output: Yes
// The string can be segmented as "i like samsung" or "i like sam sung".

// dp soln, both ways should be O(n^2) time O(n) space
// although arguably O(n^3) due to substring's complexity is O(n), so solution is O(n^3)
const wordBreak1 = function(s, wordDict) {
    const dic = new Set(wordDict);
    
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (dic.has(s.slice(j, i + 1)) && dp[j] === true) {
                dp[i + 1] = true;
            }
        }
    }

    return dp[s.length];
}
// recursion with memo
const wordBreak2 = function(s, wordDict) {
    const dic = new Set(wordDict);
    const memo = {};
    
    const recurse = function(w, i) {
        if (!memo[i]) memo[i] = {};
        if (memo[i][w] != undefined) return memo[i][w];  

        if (i >= s.length) return w === '' ? true : false;
        
        const newWord = w + s[i];
        
        if (dic.has(newWord)) return memo[i][w] = recurse('', i + 1) || recurse(newWord, i + 1);
        return memo[i][w] = recurse(newWord, i + 1);
    }
    return recurse('', 0);
};
// console.log(wordBreak1("aaaaaaa",
// ["aaaa","aaa"]
// ))

//=============================================================================================

// Given a matrix of ‘O’ and ‘X’, replace ‘O’ with ‘X’ if surrounded by ‘X’

// Input: mat[M][N] =  {{'X', 'O', 'X', 'X', 'X', 'X'},
//                      {'X', 'O', 'X', 'X', 'O', 'X'},
//                      {'X', 'X', 'X', 'O', 'O', 'X'},
//                      {'O', 'X', 'X', 'X', 'X', 'X'},
//                      {'X', 'X', 'X', 'O', 'X', 'O'},
//                      {'O', 'O', 'X', 'O', 'O', 'O'},
// };
// Output: mat[M][N] =  {{'X', 'O', 'X', 'X', 'X', 'X'},
//                       {'X', 'O', 'X', 'X', 'X', 'X'},
//                       {'X', 'X', 'X', 'X', 'X', 'X'},
//                       {'O', 'X', 'X', 'X', 'X', 'X'},
//                       {'X', 'X', 'X', 'O', 'X', 'O'},
//                       {'O', 'O', 'X', 'O', 'O', 'O'},
// };

// USE OF FLOOD FILL ALGORTHM - 1. fill `O` with `-`, 2. go edge `O` traverse and fill `X`, 3. finally fill rest `-` with `O`

const matrixFillSurroundedIsland = function(g) {
    if (!g.length) return g;

    const recurseFillO = function(r, c) {
        console.log([r,c])
        if (!g[r] || !g[r][c] || g[r][c] !== '-') return;
        g[r][c] = 'O'; // fill
        [[r - 1, c], [r, c + 1], [r + 1, c], [r, c - 1]].forEach((c) => recurseFillO(c[0], c[1])); // fill surrounding
    }

    const replaceAll = function (a, b) {
        g.forEach((row, i) => {
            row.forEach((el, j) => {
                if (el === a) g[i][j] = b
            });
        })
    }

    replaceAll('O', '-'); // replace all O with -

    // find edge O's and fill them recursively;
    for (let i = 0; i < g.length; i++) { // left and right edge
        if (g[i][0] === '-') recurseFillO(i, 0);
        if (g[i][g[0].length - 1] === '-') recurseFillO(i, g[0].length - 1);
    }
    for (let j = 0; j < g[0].length; j++) { // top and bottom edge
        if (g[0][j] === '-') recurseFillO(0, j);
        if (g[g.length - 1][j] === '-') recurseFillO(g.length - 1, j);
    }

    replaceAll('-', 'X'); // now for the ones which are surrounded, which are the ones left that has '-', fill them

    return g;
}
// console.log(matrixFillSurroundedIsland([
//     ['X', 'O', 'X', 'X', 'X', 'X'],
//     ['X', 'O', 'X', 'X', 'O', 'X'],
//     ['X', 'X', 'X', 'O', 'O', 'X'],
//     ['O', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'O', 'X', 'O'],
//     ['O', 'O', 'X', 'O', 'O', 'O']
// ]))

//=============================================================================================

// How to print maximum number of A’s using given four keys
// This is a famous interview question asked in Google, Paytm and many other company interviews.

// Below is the problem statement.
// Imagine you have a special keyboard with the following keys: 
// Key 1:  Prints 'A' on screen
// Key 2: (Ctrl-A): Select screen
// Key 3: (Ctrl-C): Copy selection to buffer
// Key 4: (Ctrl-V): Print buffer on screen appending it
//                  after what has already been printed. 

// If you can only press the keyboard for N times (with the above four
// keys), write a program to produce maximum numbers of A's. That is to
// say, the input parameter is N (No. of keys that you can press), the 
// output is M (No. of As that you can produce).

// Input:  N = 3
// Output: 3
// We can at most get 3 A's on screen by pressing 
// following key sequence.
// A, A, A

// Input:  N = 7
// Output: 9
// We can at most get 9 A's on screen by pressing 
// following key sequence.
// A, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V

// Input:  N = 11
// Output: 27
// We can at most get 27 A's on screen by pressing 
// following key sequence.
// A, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V, Ctrl A, 
// Ctrl C, Ctrl V, Ctrl V

// O(N) solution - my thought process
// N = 0, 1, 2, 3, 4, 5, 6, 7,  8,  9, 10, 11, 12, 13
// T = 0, 1, 2, 3, 4, 5, 6, 9, 12, 16, 20, 27, 36, 48
// know that the max T for given N must be the max of the following 3 options:
// 1. f(N - 3) x 2, this is a Ctr A + C + V
// 2. f(N - 4) x 3, this is a Ctr A + C + V + V, thus 3 times
// 3. f(N - 5) x 4, this is a Ctr A + C + V + V + V, where we paste 3 times, anything above this should be double again

const printLongestText = function(N) {
    const dp = [0,1,2,3,4,5,6]; // index is N, value is T
    const recurse = function (n) {
        if (dp[n]) return dp[n];
        const max = Math.max(recurse(n - 3) * 2, recurse(n - 4) * 3, recurse(n - 5) * 4);
        return dp[n] = max; 
    }
    return recurse(N);
}
// console.log(printLongestText(23));

//=============================================================================================

// rotate matrix counter clock wise
const rotateCounterClockwise = function(m) {
    const g = [];
    m.forEach((row) => g.push(Array(row.length).fill(0)))
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            g[m.length - 1 - j][i] = m[i][j];
        }
    }
    return g;
}
// console.log(rotateCounterClockwise([
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
// ],))

//=============================================================================================

// Maximum absolute difference between sum of two contiguous sub-arrays
// Given an array of integers, find two non-overlapping contiguous sub-arrays such that the absolute difference between the sum of two sub-arrays is maximum.

// Example:

// Input: [-2, -3, 4, -1, -2, 1, 5, -3]
// Output: 12
// Two subarrays are [-2, -3] and [4, -1, -2, 1, 5]

// Input: [2, -1, -2, 1, -4, 2, 8]
// Output: 16
// Two subarrays are [-1, -2, 1, -4] and [2, 8] 

// O(n) -> find continous max sum subarray and min subarray individually
// this is Kadane’s algorithm
const maxDifferenceBetweenSumOfTwoContiguousSubarrays = function(arr) {

    const getSubarray = function (max = true) {
        let peak = 0, peakCoor = [0,0], currentSum = 0, i = 0, j = i;
        while (i < arr.length) {
            const newSum = currentSum + arr[j];
            if ((max && newSum > 0) || (!max && newSum < 0)) {
                currentSum = newSum;
                if ((max && newSum > peak) || (!max && newSum < peak)) {
                    peak = newSum;
                    peakCoor = [i, j + 1];
                }
                j++;
            } else {
                currentSum = 0;
                i = j = j + 1;
            }
        }
        return arr.slice(peakCoor[0], peakCoor[1]);
    }

    return [getSubarray(true), getSubarray(false)];
}
// console.log(maxDifferenceBetweenSumOfTwoContiguousSubarrays([-2, -3, 4, -1, -2, 1, 5, -3]))
// console.log(maxDifferenceBetweenSumOfTwoContiguousSubarrays([2, -1, -2, 1, -4, 2, 8]))

//=============================================================================================

// O(n) where n is max possible time
// const overlappingIntervals = function(arr) {
//     const s = {};
//     let max = 0;
//     arr.forEach((el) => { // set hash with start to end, and where if same start the end is the highest
//         if (!s[el[0]]) {
//             s[el[0]] = el[1];
//         } else {
//             s[el[0]] = Math.max(el[1], s[el[0]]);
//         }
//         max = Math.max(max, el[1]);
//     })

//     const r = [];
//     let i = null, j = null;
//     for (let t = 0; t <= max; t++) {
//         if (i === null && s[t] !== undefined) {
//             i = t;
//             j = s[t];
//         } else if (s[t] !== undefined) { // already have a interval, update end time
//             j = Math.max(j, s[t]);
//         } else if (i != null && t >= j) {
//             r.push([i,j]);
//             i = null;
//             j = null;
//         } 
//     }
//     return r;
// }

// O(nlogn)
const overlappingIntervals = function(arr) {
    arr = arr.sort((a,b) => a[0] - b[0]);
    const r = [];
    let interval = null;

    for (let i = 0; i < arr.length; i++) {
        const s = arr[i][0];
        const e = arr[i][1];
        if (!interval) {
            interval = [s,e];
        } else if (s <= interval[1]) { // extend
            interval[1] = Math.max(interval[1], e);
        } else if (s > interval[1]) {
            r.push(interval);
            interval = [s,e];
        }
    }
    if (interval) r.push(interval);
    return r;
}
// console.log(overlappingIntervals([[1,3], [2,4], [5,7], [6,8]]));

//=============================================================================================

// Paper Cut into Minimum Number of Squares | Set 2
// Given a paper of size A x B. Task is to cut the paper into squares of any size. Find the minimum number of squares that can be cut from the paper. 

// Input  : 36 x 30
// Output : 5
// Explanation : 
// 3 (squares of size 12x12) + 
// 2 (squares of size 18x18)

// Input  : 4 x 5
// Output : 5
// Explanation : 
// 1 (squares of size 4x4) + 
// 4 (squares of size 1x1)

const minPaperCutSquares = function(m,n) {
    const memo = {};
    const recurse = function(h,w) {
        // console.log(h,w)
        if (h === w) return 1;
        if (!memo[h]) memo[h] = {};
        if (memo[h][w] !== undefined) return memo[h][w];

        const ways = [];

        const remainingH = h - w;
        ways.push(1 + recurse(Math.max(remainingH, w), Math.min(remainingH, w))); // cut square of size = w x w

        if (w > h / 2) {
            const remainingW = w - (h / 2);
            ways.push(2 + recurse(Math.max(remainingW, h), Math.min(remainingW, h))) // cut 2 squares of size h/2 x h/2

        }

        const minWays = ways.reduce((ac, way) => Math.min(ac, way));
        return memo[h][w] = minWays;
    }
    return recurse(Math.max(m,n), Math.min(m,n));
}
console.log(minPaperCutSquares(30,36)); // 5
console.log(minPaperCutSquares(5,4)); // 5
console.log(minPaperCutSquares(6,4)); // 3
console.log(minPaperCutSquares(13,29)); // 9

//=============================================================================================


//=============================================================================================


//=============================================================================================


//=============================================================================================


//=============================================================================================
