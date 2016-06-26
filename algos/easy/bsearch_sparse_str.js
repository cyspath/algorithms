function bs(arr, str) {
  if (arr.length === 0 || (arr.length === 1 && arr[0] !== str)) {
    return false;
  }
  var midIdx = Math.floor(arr.length / 2);
  if (arr[midIdx] === str) {
    return midIdx;
  }
  for (var i = midIdx + 1; i < arr.length; i++) {
    if (arr[i] !== "") {
      if (arr[i] === str) {
        return i;
      } else if (arr[i] > str) {
        var result = bs(arr.slice(0, midIdx), str)
        return result ? result : false
      } else {
        var result = bs(arr.slice(i + 1), str)
        return result ? result + i + 1 : false
      }
    }
  }
  return false;
}

var arr = ["at", "", "", "", "ball",  "", "", "", "car", "", "", "", "", "", "", "dog", "", "", "jugg", ""]
// ball 4
// jugg 18

console.log(bs(arr, 'ball'));
console.log(bs(arr, 'jugg'));
console.log(bs(arr, 'video'));
