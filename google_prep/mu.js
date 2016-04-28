//-1) In a sorted array, find the first occurrence of a number (index), if it exists, null otherwise.

function findK(arr, n) {
  if ((arr.length === 1 && n != arr[0]) || arr.length === 0) { return null }

  var midIdx = Math.floor(arr.length/2)
  var left = arr.slice(0, midIdx)
  var right = arr.slice(midIdx + 1, arr.length)

  if (n <= arr[midIdx]) {
    var result = findK(left, n)
    if (result == null && n == arr[midIdx]) {
      return midIdx
    } else if (result == null) {
      return null
    } else {
      return result
    }
  } else {
    var result = findK(right, n)
    if (result == null) { return null } else { return midIdx + 1 + result }
  }
}

findK([0,0,1,3,4,7,9,11,17],7) //5
findK([0,0,1,3,4,7,9,11,17],0) //0
findK([0,0,1,3,4,7,9,11,17],69) //null

//0) Find the smallest number in a cyclically sorted array.
//A cyclically sorted array is basically a sorted array, but shifted, for example:
//[4,5,6,7,1,2,3]
//careful with a corner case, which is that a regular sorted array is considered a cyclically sorted array as well (you'd just rotate the array by 0)
