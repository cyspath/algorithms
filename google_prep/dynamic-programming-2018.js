// *****************************************************
// WAYS TO NAVIGATE TO BOTTOM RIGHT
// *****************************************************

// The problem is to count all the possible paths from top left to bottom right of a mXn matrix with the constraints 
// that from each cell you can either move only to right or down

var numberPathsFromTopLeftToBottomRight = function (r,c) { // O(rc)
	var hash = {};

	function recurse(r,c) {
		if (hash[[r,c]]) return hash[[r,c]];

		if (r < 1 || c < 1) return hash[[r,c]] = 0;

		if (r === 1 && c === 1) return hash[[r,c]] = 1;

		var ways = recurse(r - 1, c) + recurse(r, c - 1);
		return hash[[r,c]] = ways;
	}

	return recurse(r,c);
}

// console.log(numberPathsFromTopLeftToBottomRight(2, 3)) // 3
// console.log(numberPathsFromTopLeftToBottomRight(3, 3)) // 6

// *****************************************************
// LONGEST COMMON SUB-SEQUENCE
// *****************************************************

//           f(32)            base case 1 is if one index is -1, return 0
//         /       \          base case 2 is if both last elements are same, return 1 and recurse both with one less
//     f(22)       f(31)
//     /  \         /
// f(12)  f(21)  xf(21)
//         /      /
//       f(11)  xf(11)

var lcs = function (a,b) { // with memorization its O(ab) instead of O(2^(a+b))
  var hash = {};
  function recurse(i, j) {
    if (hash[[i,j]]) return hash[[i,j]];

    if (i < 0 || j < 0) return 0; // base case, if one is 'empty', return no match

    if (a[i] === b[j]) return 1 + recurse(i - 1, j - 1); // if current el in both match, we get 1 + recurse on both with one less

    var left = recurse(i - 1, j); // if current el in both do not match, we take the max so far from indexes (i - 1, j) and (i, j - 1)
    var right = recurse(i, j - 1);

    hash[[i,j]] = left > right ? left : right;
    return hash[[i,j]];
  }
  return recurse(a.length - 1, b.length - 1);
};

// var a = "AGGTAB".split(''), b = "GXTXABY".split('');
// console.log(lcs(a, b)); // 4


// *****************************************************
// LONGEST INCREASING SUB-SEQUENCE
// *****************************************************

//             f(3)           where things are memoized, its O(n^2)
//          /    |   \        is n + n-1 + n-2 ... 1
//       f(2)   f(1)  f(0)    where input is index, each function call returns
//      /   \    |            highest count of subsequence when USING current element
//    f(1)  f(0) f(0)
//   /
// f(0)

var lis = function (arr) { // O(n^2) soln, nlogn available via bsearch not dp
  var hash = {}; // memoize

  var recurse = function(i) {
    if (hash[i]) return hash[i];

    var result = 1; // default, at least one subseq

    if (i === 0) return hash[i] = result; // base case

    for (var j = i - 1; j >= 0; j--) {
      var child = recurse(j);
      if (arr[i] > arr[j] && child + 1 > result) result = child + 1;
    }

    return hash[i] = result;
  }
  return recurse(arr.length - 1);
}

// var arr = [10, 22, 9, 33, 21, 50, 41, 60];
// console.log(lis(arr)); // 6



// *****************************************************
// EDIT DISTANCE
// *****************************************************

// Given two strings str1 and str2 and below operations that can performed on str1.
// Find minimum number of edits (operations) required to convert ‘str1’ into ‘str2’.
// Insert, Remove, Replace
//
// Input:   str1 = "sunday", str2 = "saturday"
// Output:  3
// Last three and first characters are same.  We basically
// need to convert "un" to "atur".  This can be done using
// below three operations.
// Replace 'n' with 'r', insert t, insert a


// solution: notice insert first insert second is same as del first del second,
// so total operations are really this:
// 1. if current el are same, recurse both down with one less
// 2. if not same, do three things, either replace, del first, or del second

var editDistance = function (a,b) { // similar to LCS, also O(ab) for time and space
  var hash = {};

  function min(a,b,c) {
    if (a < b && a < c) return a;
    if (b < c && b < a) return b;
    return c;
  };

  function recurse (i,j) {
    if (hash[[i,j]]) return hash[[i,j]];

    if (i < 0 && j < 0) return 0;
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;

    if (a[i] === b[j]) return recurse(i - 1, j - 1);

    var replace = recurse(i - 1, j - 1);
    var delFirst = recurse(i - 1, j);
    var delSecond = recurse(i, j - 1);

    return hash[[i,j]] = min(replace, delFirst, delSecond) + 1;
  }

  return recurse(a.length - 1, b.length - 1);
}

// console.log(editDistance('cat', 'cut')); // 1
// console.log(editDistance('sunday', 'saturday')); // 3



// *****************************************************
// PARTITION INTO TWO SETS WITH MINIMUM DIFFERENCE IN SUM (not done in dp, should retry)
// *****************************************************

// https://www.geeksforgeeks.org/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum/
// Partition a set into two subsets such that the difference of subset sums is minimum
// Given a set of integers, the task is to divide it into two sets S1 and S2 such
// that the absolute difference between their sums is minimum.

var partitionTwoSetsWithMinimumSumDifference = function (arr) { // O(2^n)

  function recurse(idx, sum1, sum2) {
    if (idx < 0) return { diff: Math.abs(sum1 - sum2), lists: [[], []] };

    var current = arr[idx];
    var left = recurse(idx - 1, sum1 + current, sum2);
    var right = recurse(idx - 1, sum1, sum2 + current);

    if (left.diff < right.diff) {
      left.lists[0].push(current);
      return left;
    } else {
      right.lists[1].push(current);
      return right;
    }
  }

  return recurse(arr.length - 1, 0, 0).lists;
}

// console.log(partitionTwoSetsWithMinimumSumDifference([1,6,11,5]));
// console.log(partitionTwoSetsWithMinimumSumDifference([10,20,15,5,25]));


// *****************************************************
// COUNT NUMBER OF WAYS TO COVER A DISTANCE (top down soln here, whats bottom soln?)
// *****************************************************

// Given a distance n, count total number of ways to cover the
// distance with 1, 2 and 3 steps.
//
// Input:  n = 3
// Output: 4
// Below are the four ways
//  1 step + 1 step + 1 step
//  1 step + 2 step
//  2 step + 1 step
//  3 step
//
// Input:  n = 4
// Output: 7

var waysToCoverDistance = function (n) { // O(nm) n is distance, m is types of a step
  var hash = {
    1: 1,
    2: 2,
    3: 4
  };

  function recurse (n) {
    if (hash[n]) return hash[n];
    var steps = recurse(n - 1) + recurse(n - 2) + recurse(n - 3);
    return hash[n] = steps;
  }

  return recurse(n);
}

// console.log(waysToCoverDistance(5)) // 7


// *****************************************************
// LONGEST PATH IN A MATRIX - INCREASING BY 1 EACH STEP
// *****************************************************

// https://www.geeksforgeeks.org/find-the-longest-path-in-a-matrix-with-given-constraints/
// Given a n*n matrix where all numbers are distinct, find the maximum
// length path (starting from any cell) such that all cells along the
// path are in increasing order with a difference of 1.
//
// We can move in 4 directions from a given cell (i, j), i.e.,
// we can move to (i+1, j) or (i, j+1) or (i-1, j) or (i, j-1)
// with the condition that the adjacent cells have a difference of 1.
//
// Input:  mat[][] = {{1, 2, 9}
//                    {5, 3, 8}
//                    {4, 6, 7}}
// Output: 4
// The longest path is 6-7-8-9.

var longestPathIncreasingByOne = function (m) { // O(mn)
  var checked = {}; // keeps tracks of ones we seen, and count of chain starting at this position

  function check (i, j) {
    if (checked[[i,j]]) return checked[[i,j]];
    var count = 1;
    // check surrounding recursively, and add the one increasing's count to current count
    [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]].forEach(function(coor) {
      if (m[coor[0]] && m[coor[0]][coor[1]]) {
        var adj = m[coor[0]][coor[1]];
        if (m[i][j] + 1 === adj) {
          count += check(coor[0], coor[1]);
        }
      }
    });

    return checked[[i,j]] = count;
  }

  // loop through matrix and record the increasing count for each cell
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m[i].length; j++) {
      check(i, j);
    }
  }

  // backtrack and generate the list
  // find head first
  var maxCount = 0, head;
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m[i].length; j++) {
      if (checked[[i,j]] > maxCount) {
        maxCount = checked[[i,j]];
        head = [i,j];
      }
    }
  }
  var list = [];
  function backtrack(i,j) {
    list.push(m[i][j]);
    [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]].forEach(function(coor) {
      var adj = checked[[coor[0], coor[1]]];
      if (adj !== undefined && m[coor[0]][coor[1]] === m[i][j] + 1) {
        backtrack(coor[0], coor[1]);
      }
    });
  };
  backtrack(head[0], head[1]);

  return list;
};

// console.log(longestPathIncreasingByOne([
//   [1,2,9],
//   [5,3,8],
//   [4,6,7]
// ]))



// *****************************************************
// OPTIMAL STRATEGY FOR A GAME
// *****************************************************
// 
// Problem statement: Consider a row of n coins of values v1 . . . vn, where n is even. We play a game against an opponent by 
// alternating turns. In each turn, a player selects either the first or last coin from the row, removes it from the row permanently, 
// and receives the value of the coin. Determine the maximum possible amount of money we can definitely win if we move first.

// Note: The opponent is as clever as the user.

// Let us understand the problem with few examples:

//     5, 3, 7, 10 : The user collects maximum value as 15(10 + 5)

//     8, 15, 3, 7 : The user collects maximum value as 22(7 + 15)

// Does choosing the best at each move give an optimal solution? no...

var optimalCoinPicking = function (coins) { // O(n^2)
	var hash = {};
	function recurse (i, j) {
		if (hash[[i,j]]) return hash[[i,j]];

		if (i + 1 === j) return hash[[i,j]] = Math.max(coins[i], coins[j]);

		// I want max score right now between: which is either first + min of my next 2 choices after choosing first, 
		// or last + min of my next 2 choices after choosing last
		return hash[[i,j]] = Math.max(
			coins[i] + Math.min(recurse(i + 2, j), recurse(i + 1, j - 1)),
			coins[j] + Math.min(recurse(i + 1, j - 1), recurse(i, j - 2))
		)
	}

	return recurse(0,coins.length - 1, true);
}

console.log(optimalCoinPicking([8,15,3,7]));

// *****************************************************
// SUBSET WITH A GIVEN SUM
// *****************************************************
//
// Given a set of non-negative integers, and a value sum,
// determine if there is a subset of the given set with sum equal to given sum.
//
// Examples: set[] = {3, 34, 4, 12, 5, 2}, sum = 9
// Output:  True  //There is a subset (4, 5) with sum 9.


var subsetWithGivenSum = function (arr, target) {
  var found = false;

  function recurse (arr, target) {
    if (found) return;

    if (target < 0) return;

    if (target === 0) {
      found = true;
      return [];
    }

    for (var i = 0; i < arr.length; i++) {
      var child = recurse(arr.slice(0, i), target - arr[i]);
      if (child) {
        child.push(arr[i]);
        return child;
      }
    }

  }

  return recurse(arr, target);
};

console.log(subsetWithGivenSum([3,34,4,12,5,2], 9));

// *****************************************************
// STACKING BOXES
// *****************************************************

// stacking boxes, given n types of boxes, stack them as high as possible
// each type can be used more than once
// 15 by
// 1,2,3
// 2,3,4
// 3,4,5
// 4,5,3

var stackBoxes = function (boxes) {

}

var boxes = [
  [2,2,15],
  [1,2,6],
  [2,3,4],
  [3,4,5]
];

console.log(stackBoxes(boxes));
