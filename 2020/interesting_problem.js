// The Celebrity Problem - https://leetcode.com/problems/find-the-celebrity/submissions/
// In a party of N people, only one person is known to everyone. Such a person may be present in the party, if yes, (s)he doesn’t know anyone in the party. We can only ask questions like “does A know B? “. Find the stranger (celebrity) in minimum number of questions.

// We can describe the problem input as an array of numbers/characters representing persons in the party. We also have a hypothetical function HaveAcquaintance(A, B) which returns true if A knows B, false otherwise. How can we solve the problem.

// O(n) - first iteration find candidate that does not know anyone
const celebrityProblem = function (n) {
    let celeb = 0;
    for (let i = 0; i < n; i++) if (knows(celeb, i)) celeb = i; // if candidate knows current person, then current person could be celeb
    for (let i = celeb - 1; i >= 0; i--) if (knows(celeb, i)) return -1; // if candidate knows anyone before him then he is not celeb
    for (let i = 0; i < n; i++) if (!knows(i, celeb)) return -1; // if not everyone know celeb then return no celeb
    return celeb;
}

//=============================================================================================

// Unbounded Knapsack (Repetition of items allowed) - https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/
// Given a knapsack weight W and a set of n items with certain value vali and weight wti, we need to calculate minimum amount that could make up this quantity exactly. This is different from classical Knapsack problem, here we are allowed to use unlimited number of instances of an item.

// example: 
// Max capactiy 6
// item weight = [1, 3, 4];
// item values = [1, 2, 5];
// result should be 1x2 + 1x5 = 7

// O(capacity x w) DP bottom up
const unboundedKnapsack = function (capacity, w, v) {
    let row = Array(capacity + 1).fill(0); // [0,0,0,0,0,0,0]

    for (let r = 0; r < w.length; r++) {
        let newRow = row.slice();
        for (let c = 0; c <= capacity; c++) {
            if (c >= w[r]) { // if less than current val no need to change
                const newVal = v[r] + newRow[c - w[r]]; // new potential value is using current item one more time + max gained with left over capacity upto using this item
                newRow[c] = Math.max(newVal, newRow[c]);
            }
        }
        row = newRow;
    }
    return row[row.length - 1];
}
// console.log(unboundedKnapsack(6, [1, 3, 4], [1, 2, 5])) // 7
// console.log(unboundedKnapsack(6, [3, 4], [2, 5])) // 5
// console.log(unboundedKnapsack(6, [3, 4], [3, 5])) // 6

//=============================================================================================

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

// How to print maximum number of A’s using given four keys - https://leetcode.com/problems/4-keys-keyboard/
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

// 68. Text Justification - https://leetcode.com/problems/text-justification/
// words = ["This", "is", "an", "example", "of", "text", "justification."]
// maxWidth = 16
// Output:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]
// O(n)
var fullJustify = function(words, maxWidth) {
    const r = [];
    
    let w = 0;
    let row = [];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        row.push(word);
        w += word.length;
        if (w + row.length - 1 > maxWidth) {
            row.pop();
            r.push(row);
            row = [];
            w = 0;
            i--;
        }
    }
    if (row.length) r.push(row);
    
    // [ [ 'This', 'is', 'an' ], [ 'example', 'of', 'text' ], [ 'justification.' ] ]
    // now we have figured out the rows in O(n) time, we need to figure out spaces
    
    const s = [];
    for (let i = 0; i < r.length - 1; i++) {
        const row = r[i];
        s.push(getSpaces(maxWidth, row));
    }
        
    
    // now we also have spaces [ [ '    ', '    ' ], [ '  ', ' ' ], [] ] time to merge
    
    const result = [];
    for (let i = 0; i < r.length - 1; i++) {
        result.push(merge(r[i], s[i]));
    }
    
    // special case for last row
    result.push(getLineForLastRow(maxWidth, r[r.length - 1]));

    return result;  
};

function getSpaces(maxW, row) {
    const charCount = row.reduce((sum, word) => { return sum + word.length }, 0);
    let spaces = maxW - charCount;
    let n = row.length - 1;
    
    if (n === 0) return [generateSpaces(spaces)];
    
    const result = [];
    while (n > 0) {
        const d = Math.ceil(spaces / n);
        result.push(generateSpaces(d));
        spaces -= d;
        n--;
    }
    return result;
}

function generateSpaces(times) {
    let r = '';
    while (times > 0) {
        r += ' ';
        times --;
    }
    return r;
}

function merge(words, spaces) {
    let line = '';
    for (let i = 0; i < words.length; i++) {
        line += words[i];
        line += spaces[i] || '';
    }
    return line;
}

function getLineForLastRow(maxW, row) {
    let line = '';
    for (let i = 0; i < row.length; i++) {
        line += row[i];
        line += ' ';
    }
    line = line.trim();
    if (maxW - line.length > 0) {
        line += generateSpaces(maxW - line.length);
    }
    return line;
}

//=============================================================================================

// 301. Remove Invalid Parentheses
// Remove the minimum number of invalid parentheses in order to make the input string valid. Return all possible results.
// Input: "(a)())()"
// Output: ["(a)()()", "(a())()"]
// in the worst case we still have 2 options per parenthesis and that gives us a complexity of O(2^N)
const removeInvalidParentheses = (s) => {
    let maxL = 0, longestStrs = {};
    const recurse = (str, b, i) => {
        if (b < 0) return;
        if (i === s.length) {
            if (b !== 0) return;
            if (str.length > maxL) {
                maxL = str.length;
                longestStrs = {};
                longestStrs[str] = true;
            } else if (str.length === maxL) {
                longestStrs[str] = true;
            }
            return;
        }
        const el = s[i];
        if (el !== '(' && el !== ')') return recurse(str + el, b, i + 1);
        
        if (el === '(') {
            recurse(str + el, b + 1, i + 1);
        } else if (el === ')') {
            recurse(str + el, b - 1, i + 1);
        }
        return recurse(str, b, i + 1);
    }
    recurse('', 0, 0);
    return Object.keys(longestStrs);
};

//=============================================================================================

// 31. Next Permutation
// 1,2,3 → 1,3,2
// 3,2,1 → 1,2,3
// 1,1,5 → 1,5,1
//  // 1. find increasing peak and next, the number to left of peak 
//  // (skip 2 and 3 if next is < 0 which means whole array needs reversed)
//  // 2. from right to peak idx, find first idx with value greater than next
//  // 3. swap newNext value with next value
// // 4. sort(aka reverse) the peak to end of array via swapping

//=============================================================================================

// 689. Maximum Sum of 3 Non-Overlapping Subarrays
// Hard
// Input: [1,2,1,2,6,7,5,1], 2
// Output: [0, 3, 5]
// Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].

// input
// [ 1,  2,  1,  2,  6,  7,  5,  1], k = 2

// [ 3,  3,  3,  8,  13, 12, 6  ] sums at each idx
// [ 3,  3,  3,  8,  13, 13, 13 ] maxSum asc
// [ 13, 13, 13, 13, 13, 12, 6  ] maxSum desc

// O(n) time O(n) space solution can be obtained
// for any idx m, the total sum = maxSumAsc[m - k] + sums[m] + maxSumDesc[m + k]
// note that after getting the 3 indexes, the left and right index need to find first occurance of that sum for lexical order

const maxSumOfThreeSubarrays = (nums, k) => {
    // generate a cache of sums for each k this is O(n) time via sliding window
    const sums = [0];
    for (let i = 0; i < k; i++) sums[0] += nums[i];
    for (let i = 1; i + k <= nums.length; i++) {
        sums.push(sums[i - 1] - nums[i - 1] + nums[i + k -1]);
    }
        
    const maxAsc = sums.slice();
    for (let i = 1; i<sums.length;i++) maxAsc[i] = Math.max(maxAsc[i-1], maxAsc[i]);
    
    const maxDesc = sums.slice();
    for (let i=sums.length-2;i>=0;i--) maxDesc[i] = Math.max(maxDesc[i + 1], maxDesc[i]);

console.log(sums, maxAsc, maxDesc)
    let m = k, totalSum, result;
    while (m + k < sums.length) {
        const newTotalSum = maxAsc[m - k] + sums[m] + maxDesc[m + k];
        if (!totalSum || newTotalSum > totalSum) {
            totalSum = newTotalSum;
            result = [m-k, m, m + k];
        }
        m++;
    }
    for (let i = 0; i <= result[0]; i++) {
        if (sums[i] === maxAsc[result[0]]) {
            result[0] = i;
            break;
        }
    }
    for (let i = result[2]; i < sums.length; i++) {
        if (sums[i] === maxDesc[result[2]]) {
            result[2] = i;
            break;
        }
        
    }
    return result;

// at index = 0, maxSum = Math.max of..
//      1. sum(0...size-1) + rec(idx + size, c - 1)
//      2. rec(idx + 1, c);
// O(3xn) => O(n) where n is length of nums and 3 is the number of subarrays
// without memoization this would be O(2^n)
//     const rec = (idx, c) => {
//         if (!memo[idx]) memo[idx] = {};
//         if (memo[idx][c]) return memo[idx][c];
        
//         if (c === 0) return 0;
//         if (idx >= nums.length) return 0;
        
//         return memo[idx][c] = Math.max(
//             sums[idx] + rec(idx + k, c - 1),
//             rec(idx + 1, c)
//         )
//     }
};

//=============================================================================================

// 739. Daily Temperatures
// Given a list of daily temperatures T, return a list such that, for each day in the input, 
// tells you how many days you would have to wait until a warmer temperature. 
// If there is no future day for which this is possible, put 0 instead.

// For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], 
// your output should be [1, 1, 4, 2, 1, 1, 0, 0].

// O(n) soln using stack, of course brute force is O(n^2)
const dailyTemperatures = (T) => {
    const stack = [];
    for (let i = 0; i < T.length; i++) {
        while (stack.length > 0 && T[i] > T[stack[stack.length - 1]]) {
            const idx = stack.pop();
            T[idx] = i - idx;
        }
        stack.push(i);
    }
    while (stack.length > 0) {
        const idx = stack.pop();
        T[idx] = 0;
    }
    return T;
};

//=============================================================================================
