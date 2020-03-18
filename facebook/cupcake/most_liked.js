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

var isValid = function(s) {
    var stack = [], targetHash = { ')': '(', ']': '[', '}': '{'};
    for (var i = 0; i < s.length; i++) {
        var target = targetHash[s[i]];
        if (target) {
            // its closing, try match
            if (stack[stack.length - 1] === target) {
                stack.pop();
            } else {
                return false;
            }
        } else {
            // its starting bracket
            stack.push(s[i]);
        }
    }
    return true ? stack.length === 0 : false;
};
isValid("([)]");


// thot process, each node would combine left and right, then add itself to every val, then add it self to it as well
var pathSum = function(root, sum) {
    var count = 0;
    var recurse = function(node) {
        if (!node) {
            return {};
        }

        var children = {};
        var left = recurse(node.left);
        var right = recurse(node.right);

        // add all values of left to children
        for (var k in left) {
            children[k] = left[k];
        }
        // add all values of right to children, combine counts of each key
        for (var k in right) {
            children[k] = children[k] ? children[k] + right[k] : right[k];
        }
    
        var result = {};
        // add self to children values and self itself
        for (var k in children) {
            result[Number(k) + node.val] = children[k];
        }
        result[node.val] =  result[node.val] ? result[node.val] + 1 : 1;

        // if any subtrees have the difference, add to count
        if (result[sum]) {
            count += result[sum];
        }

        return result;
    }

    var rootResult = recurse(root);
    // if (rootResult[sum]) {
    //     count += rootResult[sum];
    // }
    return count;
};


//@@ interesting problem because of the not use current and optionall use current

// The thief has found himself a new place for his thievery again. There is only one entrance to this area, called the "root." Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that "all houses in this place forms a binary tree". It will automatically contact the police if two directly-linked houses were broken into on the same night.

// Determine the maximum amount of money the thief can rob tonight without alerting the police.
// approach: each node will return an array of two items, first item will be the max value NOT using current, and using current (using current means current + 2 nodes away)
var rob = function(root) {
    
    var recurse = function(node) {
        if (!node) {
            return [0,0];
        }

        var left = recurse(node.left);
        var right = recurse(node.right);

        // first in result is not using self, 2nd is maximum of either use self or not
        var notUseCurrent = left[1] + right[1];
        var useCurrent = left[0] + right[0] + node.val;
        return [notUseCurrent, Math.max(notUseCurrent, useCurrent)];
    }

    var result = recurse(root);
    return Math.max(result[0], result[1]);
};

// @@ interesting
// https://leetcode.com/problems/unique-binary-search-trees/submissions/
// Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?
// my logic... current value is false(n-1) x 2 + the sum so far of everything up to n - 1
var numTrees = function(n) {
    var hash = {
        0: 1,
        1: 1
    }

    if (hash[n]) return hash[n];
    
    var i = 2;
    while (i <= n) {
        var ways = 0;
        for (var j = 0; j <= i - 1; j++) {
            var leftCount = j, rightCount = i - 1 - j;
            ways += hash[leftCount] * hash[rightCount];
        }
        hash[i] = ways; // record at current i, how many ways
        i++;
    }

    console.log(hash);
    return hash[n];
};

// @@ interesting, brute force O(n^2), 2 points from side maybe O(n)
// Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

// Note: You may not slant the container and n is at least 2.
// Input: [1,8,6,2,5,4,8,3,7]
// Output: 49
var maxArea = function(height) {
    var max = 0;
    for (var i = 0; i < height.length - 1; i++) {
        for (var j = 1; j < height.length; j++) {
            var area = Math.min(height[i], height[j]) * (j - i); // min of 2 heights times the width which is diff of indexes
            if (area > max) max = area;
        }
    }
    return max;
};
var maxArea = function(height) {
    var max = 0;
    var p1 = 0, p2 = height.length - 1;
    while (p1 < p2) {
        var width = p2 - p1;
        var minHeight = Math.min(height[p1], height[p2]);
        var area = width * minHeight;
        if (area > max) {
            max = area;
        }
        // now we make rectangle smaller, but increase p1 or decreasing p2 depends on the one that is smaller
        if (height[p1] < height[p2]) {
            p1++;
        } else {
            p2--;
        }
    }
    return max;
};

// @@ interesting stack / parenthesis question https://leetcode.com/problems/decode-string/
// Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

// Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].

// Examples:

// s = "3[a]2[bc]", return "aaabcbc".
// s = "3[a2[c]]", return "accaccacc".
// s = "2[abc]3[cd]ef", return "abcabccdcdcdef".
var decodeString = function(s) {
    var result = '';

    var stack = [];

    var numHash = '1234567890'.split('').reduce(function(accum, n) {
        accum[n] = true;
        return accum;
    }, {});

    var collectingNumber = false;

    for (var i = 0; i < s.length; i++) {
        var el = s[i];
        if (numHash[el]) { // when we see a number, we can either start a new item in stack or append number to previous
            if (!collectingNumber) {
                stack.push({ count: el, phrase: '' });
                collectingNumber = true;
            } else {
                stack[stack.length - 1]['count'] += el;
            }
        } else if (el === '[') { // stop collecting number
            collectingNumber = false;
        } else if (el === ']') {
            var phraseWithCount = stack.pop();
            if (stack.length) { // add to one tier higher
                var repeatedPhrase = phraseWithCount['phrase'].repeat(phraseWithCount['count']);
                stack[stack.length - 1]['phrase'] += repeatedPhrase;
            } else {
                // empty stack means we can add directly to result
                result += phraseWithCount['phrase'].repeat(phraseWithCount['count']);
            }
        } else {
            // if its a letter, add to result if nothing is waiting in stack, or add to current stack
            stack.length ? stack[stack.length - 1]['phrase'] += el : result += el;
        }
    }

    return result;
};

decodeString('abc2[de3[fgh]]ij')

// O(2^(n));
var findTargetSumWays = function(nums, S) {

    var hash = {};
    
    var recurse = function(idx, positive) {
        if (hash[[idx, positive]]) return hash[[idx, positive]];

        var current = positive ? nums[idx] : 0 - nums[idx];

        if (idx === nums.length - 1) {
            return [current];
        }

        var children = recurse(idx + 1, true).concat(recurse(idx + 1, false));

        for (var i = 0; i < children.length; i++) {
            children[i] = children[i] + current;
        }

        hash[[idx, positive]] = children;
        return children;
    }

    var allSums = recurse(0, true).concat(recurse(0, false));
    // console.log(allSums);

    var count = 0;
    allSums.forEach(function(n) {
        if (n === S) count++;
    })

    return count;
};

findTargetSumWays([1, 1, 1, 1, 1], 3);

// var maxProfit = function(prices) {

//     var hash = {};

//     var recurse = function(arr) {
//         if (arr.length <= 1) return 0;

//         if (hash[arr]) return hash[arr];

//         var max = 0;

//         for (var i = 0; i < arr.length - 1; i++) {
//             for (var j = i + 1; j < arr.length; j++) {
//                 var gain = Math.max(0, arr[j] - arr[i]);
//                 var remainingPricesMaxSoFar = recurse(arr.slice(j + 2));
//                 var total = gain + remainingPricesMaxSoFar;
//                 if (total > max) max = total;
//             }
//         }

//         hash[arr] = max;
//         return max;
//     }

//     return recurse(prices);
// };
// maxProfit([1,2,3,0,2])


// @@@ https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
// Very interesting, state machine problem, can be drawn in like this
// state 1 (resting) can point to itself to continue resting or point to state 2 to buy
// state 2 (bought) can point to itself or point to state 3 to sell
// state 3 (sold) can only point to state 1 because it needs to rest

// 309. Best Time to Buy and Sell Stock with Cooldown
// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:

// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
// After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
// Example:

// Input: [1,2,3,0,2]
// Output: 3 
// Explanation: transactions = [buy, sell, cooldown, buy, sell]
var maxProfit = function(prices) {
    if (!prices.length) return 0;

    var s1 = [], s2 = [], s3 = [];

    // s1[i] = max(s1[i - 1], s3[i - 1])
    // s2[i] = max(s2[i - 1], s1[i - 1] - price[i])
    // s3[i] = s2[i - 1] + p[i]

    for (var i = 0; i < prices.length; i++) {
        var p = prices[i];
        // base case
        if (i === 0) {
            s1.push(0);
            s2.push(0 - p);
            s3.push(Number.MIN_SAFE_INTEGER)
        } else {
            s1.push(Math.max(s1[i - 1], s3[i - 1]));
            s2.push(Math.max(s2[i - 1], s1[i - 1] - p));
            s3.push(s2[i - 1] + p);
        }
    }

    var lastIdx = prices.length - 1;
    return Math.max(s1[lastIdx], s2[lastIdx], s3[lastIdx]);
};
maxProfit([1,2,3,0,2])


// O(nlogn)
var maxCoins = function(nums) {
    var sum = 0;
    if (!nums.length) return sum;

    var head = null, current = null;
    var list = [];

    nums.forEach(function(n) {
        var node = { val: n, left: null, right: null };
        list.push(node);
        if (head === null) {
            head = node;
            current = head;
        } else {
            current.right = node;
            node.left = current;
            current = node;
        }
    })
    // console.log(head);
    
    var sortedList = list.sort(function(a,b) {
        return a.val - b.val;
    });
    // console.log(sortedList);

    sortedList.forEach(function(node) {
        if (node.left && node.right) {
            sum += node.left.val * node.val * node.right.val;
            node.left.right = node.right;
            node.right.left = node.left;
        } else if (node.left) {
            sum += node.left.val * node.val;
            node.left.right = null;
        } else if (node.right) {
            sum += node.val * node.right.val;
            node.right.left = null;
        } else {
            sum += node.val;
        }
        node.left = null;
        node.right = null;
    });

    return sum;
};

maxCoins([3,1,5,8])

// 105. Construct Binary Tree from Preorder and Inorder Traversal
// Given preorder and inorder traversal of a tree, construct the binary tree.
// You may assume that duplicates do not exist in the tree.

// For example, given
// preorder = [3,9,20,15,7]
// inorder = [9,3,15,20,7]
// Return the following binary tree:

//     3
//    / \
//   9  20
//     /  \
//    15   7

var buildTree = function(preorder, inorder) {
    // if (!preorder) return null;
    var preorderHash = preorder.reduce(function(accum, n, idx) {
        accum[n] = idx;
        return accum;
    }, {});

    var inorderHash = inorder.reduce(function(accum, n, idx) {
        accum[n] = idx;
        return accum;
    }, {});

    var recurse = function(p1, p2, i1, i2) {
        // console.log(p1, p2, i1, i2)
        if (p1 > p2 || i1 > i2) return null;

        var node = new TreeNode(preorder[p1]);
        if (p1 === p2) {
            return node;
        }

        var inArrNodeIdx = inorderHash[node.val];

        var inArrLeft = [i1, inArrNodeIdx - 1]; // inArr.slice(0, inArrNodeIdx);
        var inArrRight = [inArrNodeIdx + 1, i2]; // inArr.slice(inArrNodeIdx + 1);

        var preArrLeft = [p1 + 1, p1 + inArrNodeIdx - i1]; //preArr.slice(1, 1 + inArrLeft.length);
        var preArrRight = [p1 + inArrNodeIdx - i1 + 1, p2]; // preArr.slice(1 + inArrLeft.length);

        node.left = recurse(preArrLeft[0], preArrLeft[1], inArrLeft[0], inArrLeft[1]);
        node.right = recurse(preArrRight[0], preArrRight[1], inArrRight[0], inArrRight[1]);

        return node;
    }

    return recurse(0, preorder.length - 1, 0, inorder.length - 1);
};



// https://leetcode.com/problems/regions-cut-by-slashes/
var regionsBySlashes = function(grid) {
    // convert each slash into a 3x3 grid
    var map = [];

    for (var r = 0; r < grid.length; r++) {
        row1 = [];
        row2 = [];
        row3 = [];

        c = 0;
        while (c < grid[r].length) {
            if (grid[r][c] === ' ') { // add empty 3x3
                row1 = row1.concat([0,0,0]);
                row2 = row2.concat([0,0,0]);
                row3 = row3.concat([0,0,0]);
            } else if (grid[r][c] === '/') {
                row1 = row1.concat([0,0,1]);
                row2 = row2.concat([0,1,0]);
                row3 = row3.concat([1,0,0]);
            } else {
                row1 = row1.concat([1,0,0]);
                row2 = row2.concat([0,1,0]);
                row3 = row3.concat([0,0,1]);
            }
            c++;
        }
        map.push(row1);
        map.push(row2);
        map.push(row3);
    }
    // console.log(map);

    var recurse = function(r,c) {
        if (map[r] === undefined || map[r][c] !== 0) {
            return;
        }
        // mark current square
        map[r][c] = 2;
        recurse(r + 1, c);
        recurse(r - 1, c);
        recurse(r, c + 1);
        recurse(r, c - 1);
    }

    var islandsCount = 0;
    for (var r = 0; r < map.length; r++) {
        for (var c = 0; c < map[r].length; c++) {
            if (map[r][c] === 0) {
                islandsCount++;
                recurse(r, c); // mark visited;
            }
        }
    }

    return islandsCount;
};

regionsBySlashes([
    "\\/",
    "/\\"
  ])