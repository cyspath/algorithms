var a = [
  ['t','u','v'],
  ['p','q','r','s'],
  ['d','e','f']
]

function genWords(a, i) {
  if (i === a.length - 1) {
    return a[i];
  }
  var result = [];
  a[i].forEach(function (e) {
    var current = genWords(a, i + 1);
    var newCurrent = current.map(function (str) {
      return e + str;
    })
    result = result.concat(newCurrent);
  })
  return result;
}

console.log(genWords(a, 0));
