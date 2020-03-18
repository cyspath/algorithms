// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
// Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
// thought process, current is cross dp, current = Max(current + 2 above, 1 above), which means use max 2 ago and current vs not use current
var rob = function(nums) {
    var grid = Array(nums.length).fill().map(function(el) {
        return Array(nums.length);
    });

    for (var r = 0; r < nums.length; r++) {
        for (var c = 0; c < nums.length; c++) {
            if (r === 0) {
                grid[r][c] = nums[c];
                continue;
            }

            if (r <= c + 1) {
                grid[r][c] = grid[r-1][c];
                continue;
            }

            var twoAbove = r - 2 < 0 ? 0 : grid[r - 2][c];
            grid[r][c] = Math.max(twoAbove + nums[r], grid[r-1][c]);
        }
    }

    var max = 0;
    for (var r = 0; r < nums.length; r++) {
        for (var c = 0; c < nums.length; c++) {
           if (grid[r][c] > max) max = grid[r][c];
        }
    }
    return max;
};
// rob([1,2,3,1])

//=============================================================================================

// Unbounded Knapsack (Repetition of items allowed) - https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/
// Given a knapsack weight W and a set of n items with certain value vali and weight wti, we need to calculate minimum amount that could make up this quantity exactly. This is different from classical Knapsack problem, here we are allowed to use unlimited number of instances of an item.

// example: 
// Max capactiy 6
// item weight = [1, 3, 4];
// item values = [1, 2, 5];
// result should be 1x2 + 1x5 = 7

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

// O(MN), usually I do this in topdown but bottom up is faster slightly, good for practice
// FIND MINIMUM Number of deletes to make 2 strings the same uses this same thing, just in the end delete the common seq twice

var longestCommonSubsequence = function(text1, text2) { // USEFUL!
    const memo = [];
    for (let i = 0; i <= text1.length; i++) {
        memo.push(Array(text2.length + 1).fill(0));
    }
    
    for (let r = 1; r < memo.length; r++) {
        for (let c = 1; c < memo[r].length; c++) {
            if (text1[r - 1] === text2[c - 1]) {
                memo[r][c] = memo[r - 1][c - 1] + 1;
            } else {
                memo[r][c] = Math.max(memo[r - 1][c], memo[r][c - 1]);
            }
        }
    }
    return memo[memo.length - 1][memo[0].length - 1];
};
