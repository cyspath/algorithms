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
