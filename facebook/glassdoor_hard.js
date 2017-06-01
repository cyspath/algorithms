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


// Given a schedule (array of start and end times) for meetings, provide an algorithm
// that finds the minimum number of rooms needed for the day.
function schedule(arr) {

}
console.log(schedule([[0,2], [2,3], [1,4], [0,1], [3,4], [2,5]])); // 3 rooms

// Parse a string containing numbers and "+", "-" and parentheses. Evaluate the expression.
// -2+(3-5) should return -4.
function parseCalc(str) {
  var stack = []; // simulate a stack...

}

function calc(str) {
  var total = 0, operator = '+', current = '0';
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '+' || str[i] === '-') {
      total = operator === '+' ? total + Number(current) : total - Number(current);
      operator = str[i];
      current = '0';
    } else {
      current += str[i];
    }
  }
  total = operator === '+' ? total + Number(current) : total - Number(current);
  return total;
}
console.log(parseCalc('-20+(5-(1+2))')); // -18
