// const Utils = require('./UTILS.js')

// https://leetcode.com/problems/max-consecutive-ones-iii/
// O(n) - sliding window
// Input: A = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
// Output: 10
// Explanation: 
// [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// Bolded numbers were flipped from 0 to 1.  The longest subarray is underlined.
var longestOnes = function(A, K) {
    var i = 0, j = 0, max = 0, runningMax = 0;
    
    while (j < A.length) {
        if (A[j] === 0) {
            if (K > 0) {
                K--;
                runningMax++;
                j++;
            } else {
                if (A[i] === 0) {
                    K++;
                }
                runningMax--;
                i++;
            }
        } else {
            runningMax++;
            j++;
        }
        
        if (runningMax > max) max = runningMax;
    }
    return max;
};

//=============================================================================================

// 438. Find All Anagrams in a String
// Input:
// s: "cbaebabacd" p: "abc"
// Output:
// [0, 6]
const findAnagrams = (s, p) => {
    const isEq = (a,b) => {
        for (let i = 0; i < 26; i++) if (a[i] !== b[i]) return false;
        return true;
    }

    if (p.length > s.length) return [];
    let i = 0, j = p.length - 1;
    
    const memo = Array(26).fill(0);
    for (let k = i; k <= j; k++) memo[s[k].charCodeAt() - 97] += 1;
    
    const target = Array(26).fill(0);
    for (let k = 0; k < p.length; k++)  target[p[k].charCodeAt() - 97] += 1;
    
    const result = [];
    while (j < s.length) {
        if (isEq(memo, target)) result.push(i);
        if (j === s.length - 1) break;
        memo[s[i++].charCodeAt() - 97] -= 1; // use i then increment i
        memo[s[++j].charCodeAt() - 97] += 1; // increment j then use j
    }
    return result;
};

//=============================================================================================

// 239. Sliding Window Maximum
// Given an array nums, there is a sliding window of size k which is moving from the very left 
// of the array to the very right. You can only see the k numbers in the window. Each time the 
// sliding window moves right by one position. Return the max sliding window.

// Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
// Output: [3,3,5,5,6,7] 

// double sided queue! Woot!
// window sliding - O(n) time and space
const maxSlidingWindow = (nums, k) => {
    const queue = [];
    for (let i = 0; i < k; i++) {
        while (queue.length && nums[i] > nums[queue[queue.length - 1]]) {
            queue.pop();
        }
        queue.push(i);
    }
    
    const result = [];
    if (queue[0] !== undefined) result.push(nums[queue[0]]);
    
    for (let i = k; i < nums.length; i++) {
        while (queue.length && queue[0] <= i - k) {
            queue.shift(); // if queue contains expired-window elements, remove them
        }
        while (queue.length && nums[i] > nums[queue[queue.length - 1]]) {
            queue.pop(); // if new element is larger than last queue elements, pop
        }
        queue.push(i);
        result.push(nums[queue[0]]);
    }
    return result;
};

//=============================================================================================
