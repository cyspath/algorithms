function maxSubarr(arr) {
  var current = 0, s, e, max;
  for (var i = 0; i < arr.length; i++) {
    if (max === undefined) {
      max = arr[i];
    }
    if (s === undefined) {
      s = i;
    }
    if (e === undefined) {
      e = arr[i];
    }
    current += arr[i]
    if (current > max) {
      max = current;
      e = i;
    }

    if (current < 0) {
      current = 0;
      s = undefined;
    }
  }
  return "start and end idx are: " + s + ", " + e + " and max is: " + max
}


console.log(maxSubarr([5,-3,2,-8,2,4,1,-5,3])); // [4,6,7]
console.log(maxSubarr([1,4,-6,2,-1,4,5,-2,-4,1,3])); // [3, 6] max sum = 10
