// Do an in-place (without allocating any extra memory   ) rearrangement of a list of integers, putting non-zero elements first.

function rearrangement(arr) {
  var i = 0, j = arr.length - 1;
  while (j > 0) {
    if (arr[j] !== 0) {
      break;
    }
    j--;
  }
  while (i < j) {
    if (arr[i] === 0) {
      arr[i] = arr[j];
      arr[j] = 0;
      j --;
    }
    i++;
  }
  return arr;
}
// console.log(rearrangement([0,3,4,0,1,2,0,1,2,3,0]));
// console.log(rearrangement([0]));


// How can you get the longest path in a tree regardless the directions?
function longestPath(node) {
  if (!node) {
    return [];
  }
  var left = longestPath(node.left);
  var right = longestPath(node.right);
  return left.length > right.length ? left.concat([node.val]) : right.concat([node.val]);
}

var longestPathTree = {
  val: 5,
  left: {
    val: 3,
    left: { val: 2, left: { val: 1} },
    right: { val: 4 }
  },
  right: {
    val: 7,
    left: { val: 6 },
    right: { val: 10, left: { val: 9, left: { val: 8 } } }
  }
}
// console.log(longestPath(longestPathTree));


// Given an array of DISTINCT integers, find length of the longest subarray which contains
// numbers that can be arranged in a continuous sequence.
// O(n^2), trick is to know the difference of min and max of a subarray should always equal to last idx - first idx of the subarray
function longestSubArray1(arr) {
  var min, max, length = 0;
  for (var i = 0; i < arr.length; i++) {
    min = arr[i];
    max = arr[i];
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
      }
      if (arr[j] > max) {
        max = arr[j];
      }
      var diff = max - min;
      if (diff === j - i && diff + 1 > length) {
        // console.log(arr.slice(i, j + 1));
        length = diff + 1;
      }
    }
  }
  return length;
}
// console.log(longestSubArray1([])); // 0
// console.log(longestSubArray1([45])); // 1
// console.log(longestSubArray1([1, 56, 58, 57, 90, 92, 94, 93, 91, 45])); // 5

// now what if it is is not DISTINCT?
function longestSubArray1(arr) {
  var min, max, length = 0;
  for (var i = 0; i < arr.length; i++) {
    min = arr[i];
    max = arr[i];
    var hash = { i: true };
    for (var j = i; j < arr.length; j++) {
      if (hash[j] === true) {
        break;
      }
      if (arr[j] < min) {
        min = arr[j];
      }
      if (arr[j] > max) {
        max = arr[j];
      }
      var diff = max - min;
      if (diff === j - i && diff + 1 > length) {
        console.log(arr.slice(i, j + 1));
        length = diff + 1;
      }
    }
  }
  return length;
}
// console.log(longestSubArray1([1, 56, 58, 57, 90, 92, 91, 93, 91, 45])); // 4
// console.log(longestSubArray1([1, 56, 58, 57, 90, 92, 94, 93, 91, 45])); // 5
