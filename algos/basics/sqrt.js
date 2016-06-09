// Write your own square-root function called sqrt that accepts a number parameter
// and returns an approximate square root. Square-root approximations make use of averages.
// Be sure to use the average function you previously wrote.
// The first version of your square root function should perform no more than 3
// successive averages.

function sqrt(n) {
  var i = 0
  while(true) {
    if (i * i > n) break
    i += 1
  }
  return avg(i, i - 1)
}

function avg(a,b) {
  return (a + b)/2
}

console.log(sqrt(15));
