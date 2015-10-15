function range(start, end, step) {
  var result = [];
  var i = start;
  while (i <= end) {
    result.push(i)
    i = i + step
  }
  return result
}


function sum(arr) {
  var sum = 0;
  var i = 0;
  while (i < arr.length) {
    sum += arr[i];
    i += 1;
  }
  return sum;
}
