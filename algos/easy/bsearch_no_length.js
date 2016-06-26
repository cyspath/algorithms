function getSize(arr) {
  for (var i = 0; true; i++) {
    if (arr[i] === undefined) {
      return i;
    }
  }
}

function bs(arr,n,size) {
  if (size === 0 || (size === 1 && arr[0] !== n)) {
    return false;
  }
  var midIdx = Math.floor(size / 2);
  var left = arr.slice(0, midIdx);
  var right = arr.slice(midIdx + 1);
  var rightSize = size - midIdx;
  if (arr[midIdx] === n) {
    return midIdx;
  } else if (n > arr[midIdx]) {
    var result = bs(right, n, rightSize);
    return result ? midIdx + 1 + result : false
  } else {
    var result = bs(left, n, midIdx);
    return result ? result : false
  }
}

function bsearch(arr, n) {
  var size = getSize(arr)
  return bs(arr, n, size);
}

console.log(bsearch([1,2,3,4,5], 2));
console.log(bsearch([1,2,3,4,5], 8));
