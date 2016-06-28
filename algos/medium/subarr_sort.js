// give the smallest subarray that needs sorting to make entire array sorted

function subSort(a) {
  var max, min, s = 0, e = a.length - 1, sorted = true;

  for (var i = 0; i < a.length; i++) {
    if (max === undefined) {
      max = a[i];
    }
    if (a[i] < max) {
      sorted = false;
      if (min === undefined || a[i] < min) {
        min = a[i];
      }
    }
    if (a[i - 1] && a[i - 1] < max && a[i] > max) {
      e = i - 1;
    }
    if (a[i] > max) {
      max = a[i];
    }
  }

  for (var i = 0; i < a.length; i++) {
    if ( min > a[i]) {
      s = i + 1;
    }
  }

  return sorted ? [] : a.slice(s, e + 1)
}

console.log(subSort([1,2,4,7,10,11,7,12,6,7,16,18,19]));
console.log(subSort([20,2,4,7,10,11,7,12,6,7,16,18,19]));
console.log(subSort([1,2,3,4,5]));
