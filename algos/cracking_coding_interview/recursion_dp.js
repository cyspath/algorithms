// give array of [0..n-1], sorted, what is O(logn) soln
// where arr[i] = i

function findMagicIdx(arr, i) {
  if (arr.length === 0) {
    return false;
  }

  var midIdx = Math.floor(arr.length / 2);
  var left = arr.slice(0, midIdx);
  var right = arr.slice(midIdx + 1);

  // console.log(midIdx + i + 1);

  if (midIdx + i + 1 > arr[midIdx]) {
    return findMagicIdx(left, i);
  } else if (midIdx + i + 1 === arr[midIdx]) {
    return i + midIdx + 1;
  } else if (midIdx + i + 1 < arr[midIdx]) {
    return findMagicIdx(right, i + midIdx + 1);
  }
}

// console.log(findMagicIdx([1,2,3,4,4,4], 0)); // 4
//                       //  0 1 2 3 4 5
// console.log(findMagicIdx([1,1,1,2,3,4,5,6], 0)); // 1


function subset(arr) {
  if (arr.length === 0) {
    return [[]];
  }

  var current = arr[0]
  var result = subset(arr.slice(1));
  var currentResult = [];

  result.forEach(function (e) {
    var el = e.slice();
    el.push(current);
    currentResult.push(el);
  })

  return result.concat(currentResult);
}

console.log(subset([1,2,3]));
