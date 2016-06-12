// find if str is unique without additonal data structure
function isUnique(str) {
  var sorted = sortStr(str);
  var current;
  for (i = 0; i < sorted.length; i ++) {
    if (current === undefined) {
      current = sorted[i]
    } else if (sorted[i] == current) {
      return false
    }
  }
  return true
}

function sortStr(str) {
  if (str.length <= 1) { return str }
  var left = str.slice(0, str.length / 2)
  var right = str.slice(str.length / 2)

  return mergeStr(sortStr(left), sortStr(right))
}

function mergeStr(left, right) {
  var result = "", i = 0, j = 0
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result += left[i]
      i += 1
    } else {
      result += right[j]
      j += 1
    }
  }
  var remainder = (i >= left.length ? right.slice(j) : left.slice(i))
  return result + remainder
}

// console.log(sortStr('racecar'));
// console.log(isUnique('racecar'));
// console.log(isUnique('parkbug'));

function URLfy(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] == " ") {
      result += "%20";
    } else {
      result += str[i];
    }
  }
  return result;
}

// console.log(URLfy('i want to sleep'));

function oneAway(s1,s2) {
  if (Math.abs(s1.length - s2.length) > 1) { return false }

  var sameLength = s1.length === s2.length ? true : false;
  if (s1.length > s2.length) {
    var tmp = s1, s1 = s2, s2 = tmp;
  }
  // always s1 shorter than s2
  var i = 0, j = 0, d = 0;
  while (i < s1.length) {
    if (s1[i] != s2[j]) {
      if (sameLength) {
        d += 1;
      } else {
        d += 1;
        j += 1;
        continue;
      }
    }
    i += 1;
    j += 1;
  }
  return d > 1 ? false : true;
}

// console.log(oneAway('pale', 'ple'));
// console.log(oneAway('pales', 'pale'));
// console.log(oneAway('pale', 'bale'));
// console.log(oneAway('pale', 'bake'));
