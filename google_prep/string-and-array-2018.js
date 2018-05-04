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
console.log(tripletWithSumLessThanTarget([5, 1, 3, 4, 7], 12)); // 4

















//
