// result should not have perm of dup

function permDup(str, accum) {
  if (str.length === 0) {
    return [accum];
  }
  var hash = {};
  var result = [];
  for (var i = 0; i < str.length; i++) {
    if (hash[str[i]] === undefined) {
      var newAccum = accum + str[i];
      var newStr = str.slice(0, i) + str.slice(i + 1);
      result = result.concat(permDup(newStr, newAccum));
    }
    hash[str[i]] = true;
  }
  return result;
}

console.log(permDup('abac', ''));
