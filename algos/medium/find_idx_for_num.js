function findPos(arr, n) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < n) { count += 1 }
  }
  return count;
}

console.log(findPos([30,20,10,40,50], 35)); // 3
