// Given is array containing N numbers, A[0], A[1], ... A[N-1].
// Compute the array B of length N, such that
// B[i] = A[0]*A[1]*...A[i-1]*A[i+1]...*A[N-1].
// Algorithm should work in time O(N) and can't use division.

var a = [1,2,3,4,5]
// var b = [120, 60, 40, 30, 24]

function genArr(a) {
  var left = [];
  var right = [];
  var accum = 1;
  a.forEach(function(e) {
    accum *= e;
    left.push(accum);
  })

  accum = 1;
  for (var i = a.length - 1; i >= 0; i--) {
    accum *= a[i];
    right.push(accum);
  }

  reverse(right);


  a.forEach(function(e,i) {
    if (i === a.length - 1) {
      a[i] = left[a.length - 2];
    } else if (i === 0) {
      a[i] = right[1];
    } else {
      a[i] = left[i - 1] * right[i + 1];
    }
  })
  return a;
}

function reverse(a) {
  var mid = Math.floor(a.length / 2);
  for (var i = 0; i < mid; i++) {
    var temp = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1 - i] = temp;
  }
}

console.log(genArr(a));
