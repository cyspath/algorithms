var letters = {};
for (var i = 65; i <= 90; i++) letters[String.fromCharCode(i)] = true;
for (var i = 97; i <= 122; i++) letters[String.fromCharCode(i)] = true;


// *****************************************************
// REVERSE STRING WITHOUT AFFECTING SPECIAL CHAR
// *****************************************************
//
// Given a string, that contains special character together with
// alphabets (‘a’ to ‘z’ and ‘A’ to ‘Z’), reverse the string in a way that
// special characters are not affected.
//
// Input:   str = "a,b$c"
// Output:  str = "c,b$a"
// Note that $ and , are not moved anywhere.
// Only subsequence "abc" is reversed
//
// Input:   str = "Ab,c,de!$"
// Output:  str = "ed,c,bA!$"

var reverseStringWithSpecialChar = function(str) {
  var i = 0, j = str.length - 1, arr = str.split('');
  while (i < j) {
    if (!letters[arr[i]]) {
      i++;
      continue;
    }
    if (!letters[arr[j]]) {
      j--;
      continue;
    }
    var temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;;
    i++;
    j--;
  }
  return arr.join('');
}

// console.log(reverseStringWithSpecialChar("a,b$c"));
// console.log(reverseStringWithSpecialChar("Ab,c,de!$"));



// *****************************************************
// PRINT ALL POSSIBLE PALINDROME PARTITION
// *****************************************************
//
// Given a string, find all possible palindromic partitions of given string.
//
// nitin gives:
// n i t i n
// n iti n
// nitin

var isPali = function(str) {
  var i = 0, j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) return false;
    i++;
    j--;
  }
  return true;
}

var generateSubstringList = function(str) {

  function recurse(i,j) {
    if (i === j) return [[str[i]]];
    if (i > j) return [[]];

    var result = [];

    for (var k = i; k <= j; k++) {
      var prefix = str.slice(i, k + 1);
      var sufix = str.slice(k + 1);

      var child = recurse(k + 1, j);

      result = result.concat(child.map(function(a) {
        a.unshift(prefix);
        return a;
      }));
    }

    return result;
  }
  return recurse(0, str.length - 1);
}

// console.log(generateSubstringList('abcd'));

var possiblePalindromeParitiion = function(str) {
  var arr = listOfPossibleSubstringPartition = generateSubstringList(str);

  var paliHash = {};

  var results = [];

  for (var i = 0; i < arr.length; i++) {
    var allPali = true;
    for (var j = 0; j < arr[i].length; j++) {
      var s = arr[i][j];

      if (paliHash[s] === undefined) {
        paliHash[s] = isPali(s);
      }

      if (paliHash[s] === false) {
        allPali = false;
        break;
      }
    }

    if (allPali) results.push(arr[i].join(' '));
  }

  // console.log(arr);
  return results;
}

// console.log(possiblePalindromeParitiion('nitin'));
// console.log(possiblePalindromeParitiion('abacarhbb'));
// console.log(possiblePalindromeParitiion('geeks'));



// *****************************************************
// NUMBER TRIPLETS WITH SUMM SMALLER THAN TARGET (interesting soln)
// *****************************************************
//
// Given an array of distinct integers and a sum value. Find count of triplets
// with sum smaller than given sum value. Expected Time Complexity is O(n2).
//
// Examples:
//
// Input : arr[] = {-2, 0, 1, 3}
//         sum = 2.
// Output : 2
// Explanation :  Below are triplets with sum less than 2
//                (-2, 0, 1) and (-2, 0, 3)
//
// Input : arr[] = {5, 1, 3, 4, 7}
//         sum = 12.
// Output : 4
// Explanation :  Below are triplets with sum less than 4
//                (1, 3, 4), (1, 3, 5), (1, 3, 7) and
//                (1, 4, 5)

var tripletWithSumLessThanTarget = function(arr, target) { // O(n^2)

  arr = arr.sort(function(a,b) { return a - b });

  var count = 0;

  for (var i = 0; i < arr.length - 2; i++) {
    var first = arr[i];
    var j = i + 1;
    var k = arr.length - 1;

    while (j < k) {
      if (first + arr[j] + arr[k] < target) {
        count += k - j; // super important here~!
        // if sum is less than target, that means (k-j) 3rd elements after j, when
        // added to first and arr[j], will ALL be less than the target woot woot
        j++;
      } else {
        k--;
      }
    }
  }

  console.log(arr);
  return count;
}

// console.log(tripletWithSumLessThanTarget([-2,0,1,3],2)); // 2
// console.log(tripletWithSumLessThanTarget([5, 1, 3, 4, 7], 12)); // 4



// *****************************************************
// ZIG ZAG ARRAY
// *****************************************************
//
// Given an array of distinct elements, rearrange the elements of array in zig-zag
// fashion in O(n) time. The converted array should be in form
// a < b > c < d > e < f.
//
// Input:  arr[] = {4, 3, 7, 8, 6, 2, 1}
// Output: arr[] = {3, 7, 4, 8, 2, 6, 1}
//
// Input:  arr[] =  {1, 4, 3, 2}
// Output: arr[] =  {1, 4, 2, 3}
//
var zigZagArray = function(arr) {
  var low = true;
  for (var i = 0; i < arr.length - 1; i++) {
    var el = arr[i];
    if ((low && el > arr[i + 1]) || (!low && el < arr[i + 1])) {
      arr[i] = arr[i + 1];
      arr[i + 1] = el;
    }
    low = !low;
  }
  return arr;
}

// console.log(zigZagArray([4, 3, 7, 8, 6, 2, 1]));
// console.log(zigZagArray([1, 4, 3, 2]));



// *****************************************************
// ALL POSSIBLE SORTED ARRAY ALTERNATE FROM TWO SORTED ARRAY STARTING A ENDING B
// *****************************************************
//
// Given two sorted arrays A and B, generate all possible arrays such that first
// element is taken from A then from B then from A and so on in increasing order
// till the arrays exhausted. The generated arrays should end with an element
// from B.
//
// A = {10, 15, 25}
// B = {1, 5, 20, 30}
//
// The resulting arrays are:
//   10 20
//   10 20 25 30
//   10 30
//   15 20
//   15 20 25 30
//   15 30
//   25 30

var sortedAltArray = function(a, b) {

  function recurse(i, j, currentArr, otherArr, accum) {
    if (accum.length % 2 === 0) console.log(accum);

    while (i < currentArr.length) {
      if (currentArr[i] > accum[accum.length - 1]) {
        recurse(j, i + 1, otherArr, currentArr, accum.concat([currentArr[i]]));
      }
      i++;
    }
  }

  for (var i = 0; i < a.length; i++) {
    recurse(0, i + 1, b, a, [a[i]]);
  }
}

// console.log(sortedAltArray([10, 15, 25], [1, 5, 20, 30]));


// *****************************************************
// PYTHAGOREAN triplet
// *****************************************************
//
// Given an array of integers, write a function that returns true if there is a
// triplet (a, b, c) that satisfies a2 + b2 = c2.
//
// Input: arr[] = {3, 1, 4, 6, 5}
// Output: True
// There is a Pythagorean triplet (3, 4, 5).
//
// Input: arr[] = {10, 4, 6, 12, 5}
// Output: False
// There is no Pythagorean triplet.

var pythagoreanTriplet = function(arr) {
  var cSqHash = {};
  for (var i = 0; i < arr.length; i++) {
    cSqHash[Math.pow(arr[i],2)] = i;
  }

  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      var a = arr[i], b = arr[j];
      var hashVal = cSqHash[Math.pow(a, 2) + Math.pow(b, 2)];
      if (hashVal && hashVal !== i && hashVal !== j) {
        // console.log(a,b);
        return true;
      }
    }
  }

  return false;
}

// console.log(pythagoreanTriplet([3, 1, 4, 6, 5]));
// console.log(pythagoreanTriplet([0, 4, 6, 12, 5]));



// *****************************************************
// LENGTH OF LONGEST SUBARRAY WITH ELEMENTS CAN BE CONTINOUS (interesting)
// *****************************************************
//
// Given an array of distinct integers, find length of the longest subarray which
// contains numbers that can be arranged in a continuous sequence.
//
// Input:  arr[] = {10, 12, 11};
// Output: Length of the longest contiguous subarray is 3
//
// Input:  arr[] = {14, 12, 11, 20};
// Output: Length of the longest contiguous subarray is 2
//
// Input:  arr[] = {1, 56, 58, 57, 90, 92, 94, 93, 91, 45};
// Output: Length of the longest contiguous subarray is 5

var longestSubarrContinuousElements = function(arr) { // because distinct! O(n^2)
  var maxLength = 0;
  for (var i = 0; i < arr.length; i++) {
    var min = arr[i], max = arr[i];
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < min) min = arr[j];
      if (arr[j] > max) max = arr[j];
      var diff = max - min;
      if (diff === j - i && diff > maxLength) maxLength = diff + 1;
    }
  }
  return maxLength;
}

// console.log(longestSubarrContinuousElements([10, 12, 11]));
// console.log(longestSubarrContinuousElements([14, 12, 11, 20]));
// console.log(longestSubarrContinuousElements([89, 56, 58, 57, 90, 92, 94, 93, 91, 45]));


// *****************************************************
// SMALLEST POSITIVE INTEGER VALUE CANNOT BE REPRESENTED BY ANY SUBSET SUM (fancy, interesting)
// *****************************************************
//
// Given a sorted array (sorted in non-decreasing order) of positive numbers,
// find the smallest positive integer value that cannot be represented as sum
// of elements of any subset of given set.
// Expected time complexity is O(n).
//
// Examples:
//
// Input:  arr[] = {1, 3, 6, 10, 11, 15};
// Output: 2
//
// Input:  arr[] = {1, 1, 1, 1};
// Output: 5
//
// Input:  arr[] = {1, 1, 3, 4};
// Output: 10
//
// Input:  arr[] = {1, 2, 5, 10, 20, 40};
// Output: 4
//
// Input:  arr[] = {1, 2, 3, 4, 5, 6};
// Output: 22
//
// 1) We decide that ‘res’ is the final result: If arr[i] is greater than ‘res’,
// then we found the gap which is ‘res’ because the elements after arr[i] are also
// going to be greater than ‘res’.
//
// 2) The value of ‘res’ is incremented after considering arr[i]: The value of
// ‘res’ is incremented by arr[i] (why? If elements from 0 to (i-1) can represent
// 1 to ‘res-1’, then elements from 0 to i can represent from 1 to
// ‘res + arr[i] – 1’ be adding ‘arr[i]’ to all subsets that represent 1 to ‘res’)

var smallestPositiveInteger = function(arr) { // O(n), crazy soln
  var n = 1;
  for (var i = 0; i < arr.length; i++) {
    var current = arr[i];
    if (current > n) return n;
    n += current;
  }
  return n;
}

// console.log(smallestPositiveInteger([1, 3, 6, 10, 11, 15]));
// console.log(smallestPositiveInteger([1, 1, 1, 1]));
// console.log(smallestPositiveInteger([1, 1, 3, 4]));
// console.log(smallestPositiveInteger([1, 2, 3, 4, 5, 6]));




// *****************************************************
// SMALLEST SUBARR WITH SUM > A VALUE (interesting soln)
// *****************************************************
//
// Given an array of integers and a number x, find the smallest subarray with sum
// greater than the given value.
//
// Examples:
// arr[] = {1, 4, 45, 6, 0, 19}
//    x  =  51
// Output: 3
// Minimum length subarray is {4, 45, 6}
//
// arr[] = {1, 10, 5, 2, 7}
//    x  = 9
// Output: 1
// Minimum length subarray is {10}
//
// arr[] = {1, 11, 100, 1, 0, 200, 3, 2, 1, 250}
//     x = 280
// Output: 4
// Minimum length subarray is {100, 1, 0, 200}
//
// arr[] = {1, 2, 4}
//     x = 8
// Output : Not Possible
// Whole array sum is smaller than 8.

var smallestSubarrWithSumGreater = function(x, arr) { //O(n)
  var minLength, i = 0, j = 0, sum = arr[0];

  while (j < arr.length && i < arr.length) {
    if (sum <= x) { // if sum at range i..j is less or eq to target, add 1 more and increment j
      j++;
      sum += arr[j];
    } else { // if sum is greater than target, we first check to update minLength, then get rid of el at i and increment
      if (!minLength || j - i + 1 < minLength) minLength = j - i + 1;

      sum -= arr[i];
      i++;
    }
  }

  return minLength;
}
// var smallestSubarrWithSumGreater = function(target, arr) { // O(n^2)
//   var minLength;
//
//   for (var i = 0; i < arr.length; i++) {
//     var count = 0, sum = 0;
//     for (var j = i; j < arr.length; j++) {
//       count++;
//       sum += arr[j];
//       if (sum > target && (!minLength || count < minLength)) {
//         minLength = count;
//       }
//     }
//   }
//
//   return minLength;
// }

// console.log(smallestSubarrWithSumGreater(51,[1, 4, 45, 6, 0, 19])); //3
// console.log(smallestSubarrWithSumGreater(9,[1, 10, 5, 2, 7])); //1
// console.log(smallestSubarrWithSumGreater(280,[1, 11, 100, 1, 0, 200, 3, 2, 1, 250])); //4
// console.log(smallestSubarrWithSumGreater(8,[1, 2, 4])); // not possible


// *****************************************************
// MAX PROFIT FROM STOCK - BUY MULTIPLE TIMES (creative soln, interesting)
// *****************************************************
//
// The cost of a stock on each day is given in an array, find the max profit that
// you can make by buying and selling in those days. For example, if the
// given array is {1, 18, 26, 31, 4, 53, 70}, the maximum profit can
// earned by buying on day 0, selling on day 3. Again buy on day 4 and sell on
// day 6. If the given array of prices is sorted in decreasing order, then profit
// cannot be earned at all.

var maxProfitFromStock = function(arr) { // O(n)
  var total = 0;
  var findLocalMin = true;
  var localMin;
  var localMax;

  for (var i = 0; i < arr.length; i++) {
    if (findLocalMin) {
      if (arr[i] < arr[i+1]) {
        console.log('min', arr[i]);
        localMin = arr[i];
        findLocalMin = !findLocalMin;
      }
    } else {
      if (i === arr.length - 1 || arr[i] > arr[i+1]) {
        console.log('max', arr[i]);
        localMax = arr[i];
        total += localMax - localMin;
        findLocalMin = !findLocalMin;
      }
    }
  }

  return total;
}

// var maxProfitFromStock = function(arr) {
//   var hash = {};
//   function recurse(i,j) {
//     if (hash[[i,j]]) return hash[[i,j]];
//     if (i >= j) return 0;
//
//     var max = 0;
//     for (var b = i; b < j; b++) {
//       for (var s = b + 1; s <= j; s++) {
//         var currentProfit = Math.max(arr[s] - arr[b], 0);
//         var childProfit = recurse(s + 1, j);
//         var totalProfit = currentProfit + childProfit;
//         if (currentProfit + childProfit > max) max = currentProfit + childProfit;
//       }
//     }
//
//     return hash[[i,j]] = max;
//   }
//
//   return recurse(0, arr.length - 1);
// }
// console.log(maxProfitFromStock([1, 28, 26, 31])); // 30 + 64
// console.log(maxProfitFromStock([1, 18, 26, 31, 4, 53, 70])); // 30 + 66
// console.log(maxProfitFromStock([1, 18, 17, 31, 4, 53, 70])); // 30 + 66




// Consecutive Numbers Sum
// User Accepted: 190
// User Tried: 349
// Total Accepted: 191
// Total Submissions: 634
// Difficulty: Medium
// Given a positive integer N, how many ways can we write it as a sum of consecutive positive integers?
//
// Example 1:
//
// Input: 5
// Output: 2
// Explanation: 5 = 5 = 2 + 3
// Example 2:
//
// Input: 9
// Output: 3
// Explanation: 9 = 9 = 4 + 5 = 2 + 3 + 4
// Example 3:
//
// Input: 15
// Output: 4
// Explanation: 15 = 15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5


var consecutiveNumbersSum = function(N) {
    if (N < 3) return 1;
    var ways = 1;
    var num = Math.floor((N + 1) / 2);
    var arr = [];
    while (num > 0) {
      arr.push(num);
      num--;
    }
    console.log(arr);

    var i = 0, j = 0, sum = arr[0];
    while (i < arr.length && j < arr.length) {

      if (sum < N) {
        j++;
        sum += arr[j];
      } else {
        if (sum === N) {
          ways++;
        }
        sum -= arr[i];
        i++;
      }

    }

    return ways;
};
// console.log(consecutiveNumbersSum(1));
// console.log(consecutiveNumbersSum(2));
// console.log(consecutiveNumbersSum(3));
// console.log(consecutiveNumbersSum(4));
// console.log(consecutiveNumbersSum(15));
// console.log(consecutiveNumbersSum(9));
// console.log(consecutiveNumbersSum(5));



var uniqueLetterString = function(S) {
  var hash = {};
  var count = 0;

  for (var i = 0; i < S.length; i++) {
    for (var j = i; j < S.length; j++) {
      count += countUniq(i,j);
    }
  }

  function countUniq(i,j) {
    if (hash[i,j]) return hash[[i,j]];

    var ch = {};
    for (var a = i; a <= j; a++) {
      if (ch[S[a]]) {
        ch[S[a]] += 1;
      } else {
        ch[S[a]] = 1;
      }
    }
    var c = 0;
    for (var k in ch) {
      if (ch[k] === 1) c++;
    }

    hash[[a,j]] = c;
    return c;
  }

  return count;
};

// console.log(uniqueLetterString('ABC')); //10
// console.log(uniqueLetterString('ABA')); //8
























//
