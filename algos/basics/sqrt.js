// Write your own square-root function called sqrt that accepts a number parameter
// and returns an approximate square root. Square-root approximations make use of averages.
// Be sure to use the average function you previously wrote.
// The first version of your square root function should perform no more than 3
// successive averages.

function sqrt(n) {
  var result = n/2

  var low = 0
  var high = n

  var iteration = 0
  while (iteration <= 100) {
    if (result * result < n) {
      low = result
    } else if (result * result > n) {
      high = result
    } else {
      break
    }
    iteration += 1
    result = avg(low, high)
  }

  return result
}

function avg(a,b) {
  return (a + b)/2
}

console.log(sqrt(17));
