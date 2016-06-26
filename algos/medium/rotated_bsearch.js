// careful of things like [6,7,1], 1 vs [6,7,1,2,3,4], 1

function bsearch(arr,n) {
  if (arr.length === 0) {
    return false;
  } else if (arr.length === 1 && arr[0] !== n) {
    return false;
  }
  var midIdx = Math.floor(arr.length /2);
  if (arr[midIdx] === n) {
    return midIdx;
  }
  var left = arr.slice(0, midIdx), right = arr.slice(midIdx + 1);

  if (arr[0] > arr[[arr.length - 1]]) { // if rotated
    if (arr[midIdx] > arr[0]) {
      return n < arr[0] || n > arr[midIdx] ? bsearch(right, n) + midIdx + 1 : bsearch(left, n)
    } else if (arr[midIdx] < arr[0]) {
      return n > arr[midIdx] && n < left[0] ? bsearch(right, n) + midIdx + 1 : bsearch(left, n)
    }
  } else {  // if unrotated
    if (n < arr[midIdx]) {
      var result = bsearch(left, n);
      return result !== false ? result : false
    } else {
      var result = bsearch(right, n)
      return result !== false ? result + midIdx + 1 : false
    }
  }
}

console.log(bsearch([6,7,1,2,3,4,5], 1)) //2
console.log(bsearch([6,7,1,2,3,4,5], 3)) //4
console.log(bsearch([6,7,1,2,3,4,5], 7)) //1
console.log(bsearch([1,2,3,4,5,6,7], 1)) //0
console.log(bsearch([1,2,3,4,5,6,7], 5)) //4
