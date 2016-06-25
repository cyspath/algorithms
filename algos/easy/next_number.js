// Given is sequence of numbers:
// 1, 11, 21, 1211, 111221, ...
// Find out how the sequence works and
// create the function to compute the next element.

// Look-and-say sequence.... LOL

var arr = [1, 11, 21, 1211, 111221]

function next(arr) {
  var n = arr[arr.length - 1];
  n = parseIntToArr(n)

  var result = [];
  var count = 0;
  var current;
  for (var i = 0; i < n.length; i++) {
    if (current === undefined) {
      current = n[i];
      count = 1;
    } else if (current !== n[i]) {
      result.push(count);
      result.push(current);
      current = n[i];
      count = 1;
    } else if (current === n[i]) {
      count += 1;
    }
  }
  result.push(count);
  result.push(current);
  return result;
}

function parseIntToArr(n) {
  var arr = [];
  while (n > 0) {
    arr.push(n%10);
    n = Math.floor(n/10);
  }
  var result = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

console.log(next(arr));
