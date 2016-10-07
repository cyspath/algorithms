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
// console.log(longestPalindrome('aracecarora'));
// console.log(longestPalindrome('arttttracewecarora')); //racewecar

// Second try
function length(arr) {
  return arr[1] - arr[0] + 1;
}

function oddAndEvenCheck(str, idx) {
  var odd = paliCheck(str, idx, idx), even = paliCheck(str, idx, idx + 1)
  return length(odd) > length(even) ? odd : even;
}

function paliCheck(str, i, j) {
  while (i >= 0 && j < str.length) {
    if (str[i] !== str[j]) {
      return [i + 1, j - 1];
    }
    i -= 1;
    j += 1;
  }
  return [i + 1, j - 1]
}

function longestPali(str) {
  if (str.length === 0) {
    return str;
  }
  var max = 0, idxs, current;
  for (var i = 0; i < str.length; i++) {
    current = oddAndEvenCheck(str, i);
    if (length(current) > max) {
      max = length(current);
      idxs = current;
    }
  }
  return str.slice(idxs[0], idxs[1] + 1);
}

console.log(longestPali("e"));
console.log(longestPali("baaaa"));
console.log(longestPali("My dad is a racecar athlete"));
// console.log(length(oddAndEvenCheck("a", 0))); // 1
// console.log(length(oddAndEvenCheck("aba", 0))); // 1
// console.log(length(oddAndEvenCheck("aba", 1))); // 3
// console.log(length(oddAndEvenCheck("cabac", 2))); // 5
// console.log(length(oddAndEvenCheck("fcabac", 3))); // 5
// console.log(length(oddAndEvenCheck("fcabac", 2))); // 1
// console.log(length(oddAndEvenCheck("fgggg", 2))); // 4
// console.log(length(oddAndEvenCheck("fggggf", 3))); // 3
