// LONGEST COMMON SUB-SEQUENCE

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


// LONGEST INCREASING SUB-SEQUENCE

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


// EDIT DISTANCE
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



// STACKING BOXES
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
