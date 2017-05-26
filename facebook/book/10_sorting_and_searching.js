// search in rotated Array

function rotatedArray(arr, n) {
  var result = -1;
  function recurse(s,e) {
    if (e - s <= 0) return;
    var midIdx = s + Math.floor((e - s) / 2);
    if (arr[midIdx] === n) {
      return result = midIdx;
    } else if ((n > arr[midIdx] && n <= arr[e]) || (n < arr[midIdx] && n < arr[s])) { // search right
      recurse(midIdx + 1, e);
    } else { // search left
      recurse(0, midIdx - 1);
    }
  }
  recurse(0, arr.length - 1);
  return result;
}

// console.log(rotatedArray([7,8,1,5,6,6,6,6], 5)); // 3
// console.log(rotatedArray([7,8,1,2,3,4,5,6], 5)); // 6
// console.log(rotatedArray([4,5,6,2,3,3,3,4], 5)); // 1
// console.log(rotatedArray([4,5,6,7,8,1,2,3], 5)); // 1
// console.log(rotatedArray([6,6,6,7,8,1,5,6], 5)); // 6
// console.log(rotatedArray([7,8,1,2,3,4,5,6], 0)); // -1
// console.log(rotatedArray([7,8,1,2,3,4,5,6], 9)); // -1

function sortSearchNoSize(arr, x) {
  var l = 1;
  while (arr[l]) {
    l = l * 2;
  }
  // now we know the approximate length
  var result = -1;
  function recurse(s, e) {
    if (e < s) return;
    var midIdx = Math.floor((e - s)/2);
    var current = arr[s + midIdx];
    if (current === x) {
      return result = s + midIdx;
    } else if (x < current) {
      recurse(s, midIdx - 1);
    } else {
      recurse(s + midIdx + 1, e);
    }
  }
  recurse(0, l);
  return result;
}

// console.log(sortSearchNoSize([1,2,2,2,3,4], 1)); // 0
// console.log(sortSearchNoSize([1,1,1,2,3,4], 2)); // 3
// console.log(sortSearchNoSize([1,1,1,2,3,4], 3)); // 4
// console.log(sortSearchNoSize([1,1,1,2,3,4], 0)); // -1
// console.log(sortSearchNoSize([1,1,1,2,3,4], 5)); // -1

// Peaks and valleys, in array of int, peaks are greater or eq to adjacent and valley is less or equal to adjacent, others are neither
// sort array into alterating sequence of peaks and valleys
function peaksAndValleys(arr) {
  var sortedArr = arr.sort();

  return sortedArr
}

console.log(peaksAndValleys([5,3,1,2,3])); // 5 1 3 2 3
