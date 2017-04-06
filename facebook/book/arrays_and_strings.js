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
console.log(oneAway('pale', 'ple')); // t
console.log(oneAway('apale', 'pale')); // t
console.log(oneAway('bale', 'pale')); // t
console.log(oneAway('pale', 'bake')); // f
console.log(oneAway('b', 'c')); // t
console.log(oneAway('abc', 'accb')); // f

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
