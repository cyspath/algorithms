// determine if a string has all unique characters
// O(n) O(1)
// str.charCodeAt() String.fromCharCode(n)

// console.log(isUniq('abcd')); // t
// console.log(isUniq('abc$dx$')); // f

function isUniq(str) {
  var hash = {};
  for (var i = 32; i <= 126; i++) {
    hash[String.fromCharCode(i)] = false;
  }
  for (var i = 0; i < str.length; i++) {
    if (hash[str[i]]) {
      return false;
    } else {
      hash[str[i]] = true;
    }
  }
  return true;
}

// check permutations, 2 strings to see if one is permutation of another
// O(a + b) O(a + b)

// console.log(strPermutation('abc', 'cbaa')); // f
// console.log(strPermutation('abc', 'c baa')); // f
// console.log(strPermutation('abc', 'cba')); // t
// console.log(strPermutation('abcde', 'edcba')); // t

function strPermutation(a, b) {
  var count = {};
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; i++) {
    if (count[a[i]]) {
      count[a[i]] ++;
    } else {
      count[a[i]] = 1;
    }
  }

  for (var i = 0; i < b.length; i++) {
    if (!count[b[i]]) {
      return false;
    } else if (count[b[i]] <= 0) {
      return false;
    } else {
      count[b[i]] --;
    }
  }
  return true;
}

// URLify - replace all spaces in str with %20

// console.log(urlify('  ab c ')); // '%20%20ab%20c%20'

function urlify(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      arr.push('%20');
    } else {
      arr.push(str[i]);
    }
  }
  return arr.join("");
}

// palindrome - if str is a permutation of palindrome
// O(n) O(1) if use 26 key hash where each is a letter

// console.log(isPermutationPalindrome('Tact Coa')); // true
// console.log(isPermutationPalindrome('Tactsss Coa')); // false, 1 'o', 3 's'

function isPermutationPalindrome(str) {
  str = str.toLowerCase();
  var count = {};
  for (var i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      continue;
    }
    if (count[str[i]]) {
      count[str[i]] ++;
    } else {
      count[str[i]] = 1;
    }
  }

  var numberOfOdds = 0;
  for (var key in count) {
    if (count[key] % 2 != 0) {
      numberOfOdds ++;
    }
  }
  console.log(numberOfOdds);
  return numberOfOdds > 1 ? false : true;
}


// one away - insert, remove, or replace 1 character... given 2 strs check if 1 edit away
// O(shorter str length) O(1)
// console.log(oneAway('pale', 'ple')); // t
// console.log(oneAway('apale', 'pale')); // t
// console.log(oneAway('bale', 'pale')); // t
// console.log(oneAway('pale', 'bake')); // f
// console.log(oneAway('b', 'c')); // t
// console.log(oneAway('abc', 'accb')); // f

function oneAway(a, b) {
  if (Math.abs(a - b) > 1) return false;

  var count = 0;
  if (a.length === b.length) { // replace

    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        count ++;
      }
    }

  } else { // add or remove

    if (a.length > b.length) {
      var long = a, short = b;
    } else {
      var long = b, short = a;
    }
    var idx1 = 0, idx2 = 0;
    while (idx1 < long.length || idx2 < short.length) {
      if (count > 1) {
        break;
      } else if (!long[idx1] || !short[idx2]) {
        count ++;
      } else if (long[idx1] != short[idx2]) {
        count ++;
        idx2 --;
      }
      idx1 ++;
      idx2 ++;
    }

  }
  return count > 1 ? false : true;

}

// string compression
// O(n) O(n)

// console.log(strCompression('aabcccccaaa')); // a2b1c5a3
// console.log(strCompression('a')); // a
// console.log(strCompression('')); // ''

function strCompression(str) {
  if (str.length === 0) {
    return str;
  }
  var currentLetter = "", result = "", count = 0;
  for (var i = 0; i < str.length; i++) {
    if (currentLetter === "") {
      currentLetter = str[i];
      count = 1;
    } else if (currentLetter === str[i]) {
      count ++;
    } else {
      result += currentLetter;
      result += count.toString();
      currentLetter = str[i];
      count = 1;
    }
  }
  result += currentLetter;
  result += count.toString();
  return str.length > result.length ? result : str;
}

// rotate matrix - square matrix
var sqMatrix = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]

// console.log(rotateMatrix(sqMatrix));
// O(n^2) O(n^2)

// 7 4 1
// 8 5 2
// 9 6 3

// logic first... swap i, j to give this
// 1 4 7
// 2 5 8
// 3 6 9
// next reverse each row
function rotateMatrix(arr) {
  // genereate new array with all undefined
  var result = new Array(arr.length)
  for (var i = 0; i < result.length; i++) {
    result[i] = new Array(arr.length)
  }
  // swap i and j position for new arr
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      result[j][i] = arr[i][j];
    }
  }
  // reverse each row
  for (var i = 0; i < result.length; i++) {
    result[i] = result[i].reverse();
  }
  return result;
}

// zero matrix - if element in MxN matrix == 0, entire row and column are set to 0
// O(M*N) O(1)
var zMatrix = [
  [1,1,0,1],
  [1,0,1,1],
  [1,1,1,1]
]
// console.log(zeroMatrix(zMatrix));

function zeroMatrix(arr) {
  // determine first row and/or col should be zeros in the end
  var firstRowZero = false, firstColZero = false;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] === 0) {
      firstColZero = true;
      break;
    }
  }
  for (var j = 0; j < arr[0].length; j++) {
    if (arr[0][j] === 0) {
      firstRowZero = true;
    }
  }

  // record the i and j on the first row and col where should be zeros
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 0) {
        arr[i][0] = true;
        arr[0][j] = true;
      }
    }
  }
  for (var i = 1; i < arr.length; i++) {
    if (arr[i][0] === true) {
      // mark entire row 0's unless it is a true (first row)
      for (var j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
  }
  for (var j = 1; j < arr[0].length; j++) {
    if (arr[0][j] === true) {
      // mark entire column 0's
      for (var i = 0; i < arr.length; i++) {
        arr[i][j] = 0;
      }
    }
  }
  if (firstRowZero) {
    for (var j = 0; j < arr[0].length; j++) {
      arr[0][j] = 0;
    }
  }
  if (firstColZero) {
    for (var i = 0; i < arr.length; i++) {
      arr[i][0] = 0;
    }
  }
  return arr;
}

// string rotation - you have method #includes(str) which can be called only once
// O(#includes) O(1)
// console.log(strRotation('waterbottle', 'erbottlewat')); // true

function strRotation(s1, s2) {
  var concated = s2 + s2;
  return concated.includes(s1);
}
