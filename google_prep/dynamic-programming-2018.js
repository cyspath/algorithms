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
// LARGEST SQUARE IN MATRIX
// *****************************************************
//
// find largest square in a matrix

var largestSquare = function (m) {
  var largest = 0;

  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m[i].length; j++) {
      var current = m[i][j];
      if (current === 0) continue;

      if (i === 0 || j === 0) {
        m[i][j] = 1;
      } else {
        m[i][j] = Math.min(m[i - 1][j], m[i - 1][j - 1], m[i][j - 1]) + 1;
      }

      if (m[i][j] > largest) largest = m[i][j];
    }
  }

  return largest;
}

// console.log(largestSquare([
//   [1,0,1,1,0,1],
//   [1,0,1,1,1,1],
//   [1,1,1,1,1,1],
//   [1,1,1,1,1,0],
//   [1,0,1,1,1,1]
// ]))


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

// console.log(optimalCoinPicking([8,15,3,7]));



// *****************************************************
// KNAPSACK PROBLEM (CANNOT USE MULTIPLE OF ITEMS)
// *****************************************************
//
// Given weights and values of n items, put these items in a knapsack of capacity W
// to get the maximum total value in the knapsack. In other words, given
// two integer arrays val[0..n-1] and wt[0..n-1] which represent values and
// weights associated with n items respectively. Also given an integer W which
// represents knapsack capacity, find out the maximum value subset of val[] such
// that sum of the weights of this subset is smaller than or equal to W.
// You cannot break an item, either pick the complete item, or don’t pick it

// var knapsackProblem = function (wts, vals, maxW) { // brutal force ish....
// 	var hash = {};
//
//   function recurse (maxW, i) {
// 		if (hash[[maxW, i]]) return hash[[maxW, i]];
// 		console.log(maxW, i)
// 		var val = 0;
// 		while (i < wts.length) {
// 			if (maxW >= wts[i]) {
// 				var child = recurse(maxW - wts[i], i + 1);
// 				if (child + vals[i] > val) val = child + vals[i];
// 			}
// 			i++;
// 		}
//
// 		return hash[[maxW, i]] = val;
//   }
//
// 	return recurse(maxW, 0);
// }

// DP thought process:
// 			0			1			2			3			4			5 	weights
// 0		0			0			0			0			0			0
// 1		0			60		60		60		60		60
// 2		0 		60		100		160		160		160
// 3		0			60		100		160		180		220
//
// for each, we can do two things:
// a)	not use the current item, in this case use the number above which is
// 		max value obtained not including current item
// b) 	use current item, in this case we need to sum current item value
// 		+ max value obtained for weight (current max w - current item w)
// 		one row above (which means not using current item)

var knapsackProblem = function (wts, vals, w) { // O(n * w) time, O(w) space
		// create two rows
		var row = [], n = 0;
		while (n <= w) {
			row.push(0);
			n++;
		}
		var rows = [row.slice(), row.slice()];

		for (var i = 0; i < wts.length; i++) {
			var currentW = wts[i];
			for (var j = 1; j < rows[0].length; j++) {
				var maxValueNotUsingCurrentItem = rows[0][j];
				if (j < currentW) { // if current max w is less than current item w, set value to max value above
					rows[1][j] = maxValueNotUsingCurrentItem;
				} else { // else set value to max between 1. using current item - (value above) vs. 2. current item value + max value of (current max w - current item w) - which is in row above
					var maxValueUsingCurrentItem = vals[i] + rows[0][j - currentW];
					rows[1][j] = Math.max(maxValueUsingCurrentItem, maxValueNotUsingCurrentItem);
				}
			}
			rows[0] = rows[1].slice();
		}

		return rows[1][rows[1].length - 1];
};

// console.log(knapsackProblem(
// 	[1, 2, 3],
// 	[60, 100, 120],
// 	5
// ))

// *****************************************************
// SHORTEST COMMON SUPERSEQUENCE
// *****************************************************
//
// Shortest Common Supersequence
// Given two strings str1 and str2, find the shortest string that has both str1 and str2 as subsequences.
//
// Input:   str1 = "geek",  str2 = "eke"
// Output: "geeke"
//
// Input:   str1 = "AGGTAB",  str2 = "GXTXAYB"
// Output:  "AGXGTXAYB"

var smallestSupersequence = function (s1, s2) {
	var hash = {};
	function recurse (i, j) {
		if (hash[[i,j]]) return hash[[i,j]];

		if (i >= s1.length && j >= s2.length) {
			return hash[[i,j]] = '';
		} else if (i >= s1.length) {
			return hash[[i,j]] = s2.slice(j);
		} else if (j >= s2.length) {
			return hash[[i,j]] = s1.slice(i);
		};

		if (s1[i] === s2[j]) {
			return s1[i] + recurse(i + 1, j + 1);
		}

		var left = recurse (i + 1, j);
		var right = recurse(i, j + 1);

		if (left.length < right.length) {
			return hash[[i,j]] = s1[i] + left;
		} else {
			return hash[[i,j]] = s2[j] + right;
		}
	}

	return recurse(0,0);
}

// console.log(smallestSupersequence(
// "AGGTAB", "GXTXAYB"
// )); //AGXGTXAYB


// *****************************************************
// CUTTING A ROD
// *****************************************************
//
// Given a rod of length n inches and an array of prices that contains prices of
// all pieces of size smaller than n. Determine the maximum value obtainable by
// cutting up the rod and selling the pieces. For example, if length of the rod
// is 8 and the values of different pieces are given as following, then the
// maximum obtainable value is 22 (by cutting in two pieces of lengths 2 and 6)
//
//
// length   | 1   2   3   4   5   6   7   8
// --------------------------------------------
// price    | 1   5   8   9  10  17  17  20
// And if the prices are as following, then the maximum obtainable value is 24
// (by cutting in eight pieces of length 1)
//
// length   | 1   2   3   4   5   6   7   8
// --------------------------------------------
// price    | 3   5   8   9  10  17  17  20

// hint - grid time!

var cuttingRod = function (n, p) { // time ad space O(np)
	var hash = {};
	p.unshift(0);
	var m = p.map(function(el) {
		return Array(n + 1);
	})

	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m[i].length; j++) {
			if (i === 0 || j === 0) {
				m[i][j] = 0;
				continue;
			}

			var notUsingCurrentLength = m[i - 1][j];
			if (j < i) {
				m[i][j] = notUsingCurrentLength;
			} else {
				m[i][j] = Math.max(
					notUsingCurrentLength,
					p[i] + m[i][j - i]
				)
			}
		}
	}
	// console.log(m);
	return m[m.length - 1][m[0].length - 1];
}

// console.log(cuttingRod(8, [1,5,8,9,10,17,17,20]));

// *****************************************************
// WAYS TO MAKE CHANGE
// *****************************************************
//
// For example, for N = 4 and S = {1,2,3}, there are four solutions:
// {1,1,1,1},{1,1,2},{2,2},{1,3}. So output should be 4.
//
// For N = 10 and S = {2, 5, 3, 6}, there are five solutions:
// {2,2,2,2,2}, {2,2,3,3}, {2,2,6}, {2,3,5} and {5,5}. So the output should be 5.

var waysToMakeChange = function(n, s) {
	s.unshift(0);
	var m = s.map(function(el) { return Array(n + 1) });

	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m[i].length; j++) {
			// set left and top results
			if (j === 0) {
				m[i][j] = 1;
				continue;
			} else if (i === 0) {
				m[i][j] = 0;
				continue;
			}

			// core logic
			var waysNotUsingCurrentCoin = m[i - 1][j];
			if (s[i] > j) {
				m[i][j] = waysNotUsingCurrentCoin;
			} else {
				// set item to ways using current coin + ways not using current coin
				m[i][j] = m[i][j - s[i]] + waysNotUsingCurrentCoin;
			}
		}
	}

	// console.log(m);
	return m[m.length - 1][m[0].length - 1];
}

// console.log(waysToMakeChange(4, [1,2,3])); // 4
// console.log(waysToMakeChange(10, [2,5,3,6])); // 5


// *****************************************************
// WORD BREAK PROBLEM
// *****************************************************
//
// Given an input string and a dictionary of words, find out if the input
// string can be segmented into a space-separated sequence of dictionary words.
//
// This is a famous Google interview question, also being asked by many other
// companies now a days.
//
// Consider the following dictionary { i, like, sam, sung, mobile, ice, go }
//
// Input:  ilikesamsung
// Output: Yes
// The string can be segmented as "i like sam sung".

var wordBreak = function(str, dict) { // O(n^2)
	var hash = {};
	function recurse(i,j) {
		if (hash[[i,j]]) return hash[[i,j]];

		if (i > j) return true;

		if (dict[str.slice(i,j + 1)]) return hash[[i,j]] = true;

		var idx = i;
		while (idx < j) {
			var result = recurse(i, idx) && recurse(idx + 1, j);
			if (result === true) return hash[[i,j]] = true;
			idx++;
		}
		return hash[[i,j]] = false;
	}
	return recurse(0, str.length - 1);
}

// console.log(wordBreak('ilikesamsung', { i: 1, like: 1, sam: 1, sung: 1, mobile: 1, ice: 1, go: 1 }));
// console.log(wordBreak('gosamice', { i: 1, like: 1, sam: 1, sung: 1, mobile: 1, ice: 1, go: 1 }));


// *****************************************************
// MAXIMUM PRODUCT ROPE CUTTING
// *****************************************************
//
// Given a rope of length n meters, cut the rope in different parts of integer
// lengths in a way that maximizes product of lengths of all parts. You must
// make at least one cut. Assume that the length of rope is more than 2 meters.
//
// Input: n = 2		Output: 1 (Maximum obtainable product is 1*1)
//
// Input: n = 3		Output: 2 (Maximum obtainable product is 1*2)
//
// Input: n = 4		Output: 4 (Maximum obtainable product is 2*2)
//
// Input: n = 5		Output: 6 (Maximum obtainable product is 2*3)
//
// Input: n = 10		Output: 36 (Maximum obtainable product is 3*3*4)

var maxProductCutting = function(n) {
	var m = []
	for (var i = 0; i <= n; i++) {
		m.push(Array(n + 1));
	}

	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m[i].length; j++) {
			// make sure row 1 are all 1's
			if (i <= 1 || j <= 1) {
				m[i][j] = 1;
				continue;
			}

			var maxProductWithoutCurrentLength = m[i - 1][j];

			if (i >= j) { // less or equal, since we want at least have one cut
				m[i][j] = maxProductWithoutCurrentLength;
			} else {
				var maxProductWithCurrentLength = Math.max(j - i, m[i][j - i]) * i; // we take max prod of length - i or just length - i then times i
				m[i][j] = Math.max(maxProductWithCurrentLength, maxProductWithoutCurrentLength);
			}
		}
	}
	// console.log(m);
	return m[m.length - 2][m[0].length - 1]; // not last row, we need to make at least 1 cut, so i - 1 row
}

// console.log(maxProductCutting(2));
// console.log(maxProductCutting(3));
// console.log(maxProductCutting(4));
// console.log(maxProductCutting(5));
// console.log(maxProductCutting(10));



// *****************************************************
// DICE THROW
// *****************************************************
//
// Given n dice each with m faces, numbered from 1 to m, find the number of ways
// to get sum X. X is the summation of values on each face when all the dice
// are thrown.
//
// For example, For 3 Dices, Sum =5 && m = 4 solutions are
// [1, 1, 3], [1, 2, 2], [1, 3, 1], [2, 1, 2], [2, 2, 1], [3, 1, 1]


var diceThrow = function(x,m,n) { // O(n*m)
	var hash = {};

	function recurse(x,n) {
		if (hash[[x,n]]) return hash[[x,n]];

		if (x === 0 && n === 0) {
			return 1;
		} else if (x <= 0 || n <= 0) {
			return 0;
		}

		var ways = 0;
		for (var i = 1; i <= m; i++) {
			ways += recurse(x - i, n - 1);
		}

		hash[[x,n]] = ways;
		return ways;
	}

	return recurse(x,n);
}

// console.log(diceThrow(4,4,5)); // 0
// console.log(diceThrow(3,4,3)); // 1
// console.log(diceThrow(5,4,3)); // 6
// console.log(diceThrow(8, 6, 3)); // 21


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

var stackBoxes = function (boxes) { // O(n)
	var types = boxes.slice();
	boxes.forEach(function(b) {
		if (b[0] !== b[2]) types.push([b[2],b[1],b[0]]);
		if (b[1] !== b[2]) types.push([b[0],b[2],b[1]]);
	});
	types = types.sort(function(a,b) { return a[0] * a[1] - b[0] * b[1] }); // O(nlogn)

	var hash = {};
	var calls = { fn: 0, logic: 0 };

	function recurse(j) {
		calls.fn += 1;
		if (hash[j]) return hash[j];

		calls.logic += 1;

		var box = types[j];

		if (i === 0) return hash[i] = { boxes: [box], h: box[2] };

		var maxChild = { boxes: [], h: 0 };
		for (var i = 0; i < j; i++) {
			var childBox = types[i];
			if ((childBox[0] < box[0] && childBox[1] < box[1]) || (childBox[0] < box[1] && childBox[1] < box[0])) {
				var child = recurse(i);
				if (child.h > maxChild.h) maxChild = child;
			}
		}

		return hash[j] = { boxes: maxChild.boxes.concat([box]), h: box[2] + maxChild.h };
	}

	var max = { boxes: [], h: 0 };
	for (var i = 0; i < types.length; i++) {
		var result = recurse(i);
		if (result.h > max.h) max = result;
	}
	console.log(max.boxes);
	console.log(calls);
	return max.h;
}

// console.log(stackBoxes([
//   [2,2,15],
//   [1,2,6],
// 	[5,0,1],
//   [2,3,4],
//   [3,4,5]
// ]));

// *****************************************************
// WILDCARD MATCHING
// *****************************************************
//
// Given a text and a wildcard pattern, find if wildcard pattern is matched
// with text. The matching should cover the entire text (not partial text).
//
// The wildcard pattern can include the characters ‘?’ and ‘*’
// ‘?’ – matches any single character
// ‘*’ – Matches any sequence of characters (including the empty sequence)
//
// Text = "baaabab",
// Pattern = “*****ba*****ab", output : true
// Pattern = "baaa?ab", output : true
// Pattern = "ba*a?", output : true
// Pattern = "a*ab", output : false

var wildcardMatching = function(t,p) {
	t = t.split('');
	t.unshift("");
	p = p.split('');
	p.unshift("");

	var m = p.map(function(el) { return Array(t.length) });
	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m[i].length; j++) {
			if (i === 0 || j === 0) m[i][j] = true;

		}
	}

	console.log(m);

}

console.log(wildcardMatching('baaabab', 'ba*a?'));


// *****************************************************
// EGG DROPPING PUZZLE (cant solve)
// *****************************************************
// https://www.geeksforgeeks.org/dynamic-programming-set-11-egg-dropping-puzzle/
// The following is a description of the instance of this famous puzzle involving
// n=2 eggs and a building with k=36 floors.
//
// …..An egg that survives a fall can be used again.
// …..A broken egg must be discarded.
// …..The effect of a fall is the same for all eggs.
// …..If an egg breaks when dropped, then it would break if dropped from a higher floor.
// …..If an egg survives a fall then it would survive a shorter fall.
// …..It is not ruled out that the first-floor windows break eggs, nor is it ruled out that the 36th-floor do not cause an egg to break.
//
// If only one egg is available and we wish to be sure of obtaining the right
// result, the experiment can be carried out in only one way. Drop the egg from
// the first-floor window; if it survives, drop it from the second floor window.
// Continue upward until it breaks. In the worst case, this method may require
// 36 droppings. Suppose 2 eggs are available. What is the least number of
// egg-droppings that is guaranteed to work in all cases?
//
// The problem is not actually to find the critical floor, but merely to decide
// floors from which eggs should be dropped so that total number of trials are
// minimized.

var eggDrop = function(n, k) {
	var hash = {};

	function recurse(n, k) {
		if (hash[[n,k]]) return hash[[n,k]];

		console.log(n,k);
		if (k <= 0) return 0;
		if (n <= 0) return 0;

		var min;
		var s = 1;
		while (s <= k) {
			var child = Math.max(
				1 + recurse(n - 1, s - 1),
				recurse(n, k - 1)
			)
			if (!min || child < min) min = child;
			s++;
		}
		console.log(min);
		return hash[[n,k]] = min;
	}

	return recurse(n,k)
}
// console.log(eggDrop(2,36));
// console.log(eggDrop(2,4));

// *****************************************************
// BOOLEAN PARENTHESIZE (FUCK LIFE)
// *****************************************************
//
// Given a boolean expression with following symbols.
//     'T' ---> true
//     'F' ---> false
// And following operators filled between symbols
//     &   ---> boolean AND
//     |   ---> boolean OR
//     ^   ---> boolean XOR (takes two bit patterns of equal length and performs the logical exclusive OR operation on each pair of corresponding bits. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.)
// Count the number of ways we can parenthesize the expression so that the value
// of expression evaluates to true.
//
// Examples:
//
// Input: symbol[]    = {T, F, T}			operator[]  = {^, &}
// Output: 2
// The given expression is "T ^ F & T", it evaluates true
// in two ways "((T ^ F) & T)" and "(T ^ (F & T))"
//
// Input: symbol[]    = {T, F, F}			operator[]  = {^, |}
// Output: 2
// The given expression is "T ^ F | F", it evaluates true
// in two ways "( (T ^ F) | F )" and "( T ^ (F | F) )".
//
// Input: symbol[]    = {T, T, F, T}			operator[]  = {|, &, ^}
// Output: 4
// The given expression is "T | T & F ^ T", it evaluates true
// in 4 ways ((T|T)&(F^T)), (T|(T&(F^T))), (((T|T)&F)^T)
// and (T|((T&F)^T)).

// var booleanParenthesize = function (s, o) {
// 	// function to evaluate an expression
// 	function evaluate(a, b, operator) {
// 		switch (operator) {
// 			case '^':
// 				return ((a !== 0 && b === 0) || (a === 0 && b !== 0)) ? true : false;
// 			case '&':
// 				return a && b  ? true : false;
// 			case '|':
// 				return a === 0 && b === 0 ? false : true;
// 		}
// 	};
//
// 	var hash = {}; // store expression
//
// 	function recurse (i, j) {
// 		if (i === j) {
// 			return s[i] === 'T' ? 1 : 0;
// 		}
//
// 		var result = 0;
//
// 		var idx = i;
// 		while (idx < j) {
// 			var left = recurse(i, idx);
// 			var right = recurse(idx + 1, j);
//
// 			var bool = evaluate(left, right, o[idx]);
// 			console.log(left, right, o[idx], bool)
// 			if (bool) {
// 				if (!left || !right) {
// 					result += Math.max(left, right);
// 				} else {
// 					result += left * right;
// 				}
// 			}
//
// 			idx++;
// 		}
//
// 		console.log(s.slice(i, j + 1), o, i, j, 'result ', result)
// 		return result;
// 	}
//
// 	return recurse(0, s.length - 1);
// }
//
// console.log(booleanParenthesize(
// 	['T','T','F','T'],
// 	['|','&','^']
// ));




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

// console.log(subsetWithGivenSum([3,34,4,12,5,2], 9));
