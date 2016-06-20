// longest palindrom
// O(n^2) soln - better than all substring matching O(n^3)

// iterate down str, for each idx check its odd and even palindrome length...

function longestPalindrome(str) {
  var length = 0;
  var result = "";
  for (var i = 0; i < str.length; i++) {
    var odd = oddMatch(i, str);
    var even = evenMatch(i, str);
    var current = odd.length > even.length ? odd : even;
    if (current.length > length) {
      length = current.length;
      result = current;
    }
  }
  return result;
}

function oddMatch(idx, str) {
  var length = 1;
  var result = str[idx];
  var leftIdx = idx - 1;
  var rightIdx = idx + 1;
  while (leftIdx >= 0 && rightIdx <= str.length - 1) {
    if (str[leftIdx] === str[rightIdx]) {
      length += 2;
      result = str.slice(leftIdx, rightIdx + 1)
    } else {
      break;
    }
    leftIdx -= 1;
    rightIdx += 1;
  }
  return result;
}

function evenMatch(idx, str) {
  if (str[idx + 1] === undefined || str[idx + 1] !== str[idx]) {
    return "";
  }
  var length = 2;
  var result = str.slice(idx, idx + 2)
  var leftIdx = idx - 1;
  var rightIdx = idx + 2;
  while (leftIdx >= 0 && rightIdx <= str.length - 1) {
    if (str[leftIdx] === str[rightIdx]) {
      length += 2;
      result = str.slice(leftIdx, rightIdx + 1)
    } else {
      break;
    }
    leftIdx -= 1;
    rightIdx += 1;
  }
  return result;
}

// console.log(oddMatch(1, 'aracecar')); // 3
// console.log(evenMatch(4, 'araceecar')); // 8
console.log(longestPalindrome('aracecarora'));
console.log(longestPalindrome('arttttracewecarora')); //racewecar
