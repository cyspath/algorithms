function parenthesis(n) {
  if (n === 1) {
    return ['()'];
  }
  var result = [];
  var prev = parenthesis(n - 1);
  prev.forEach(function (str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i - 1] === '(' && str[i] === ')') {
        var newStrs = replace(str, i);
        newStrs.forEach(function (newStr) {
          if (hash[newStr] === undefined) {
            hash[newStr] = true;
            result.push(newStr);
          }
        })
      }
    }
  })
  return result;
}

function replace(str, i) {
  return [str.slice(0, i - 1) + '(())' + str.slice(i + 1), str.slice(0, i - 1) + '()()' + str.slice(i + 1)]
}

var hash = {};

console.log(parenthesis(4));
// console.log(parenthesis(3));
