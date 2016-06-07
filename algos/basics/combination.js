function combination(str) {
  if (str.length == 0) { return [""] }
  
  var newStr = str.slice(1,str.length)
  var current = str.slice(0,1)

  var result = combination(newStr)
  var newResult = result.map(function (el) {
    return el + current
  })

  return result.concat(newResult)
}

console.log(combination('abc'));
