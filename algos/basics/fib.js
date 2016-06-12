function fib(n) {
  if (n === 1) {
    return [1]
  } else if (n === 2) {
    return [1,1]
  } else {
    var result = fib(n - 1)
    return result.concat(result[result.length - 1] + result[result.length - 2])
  }
}

console.log(fib(10));
