// find all a,b,c,d where a,b,c,d all < 50 and
// a cube + b cube = c cube + d cube

// O(n^2) runtime

function abcd() {
  var hash = {}
  for (var i = 0; i < 50; i++) {
    for (var j = i + 1; j < 50; j++) {
      var sum = Math.pow(i, 3) + Math.pow(j, 3)
      if (hash[sum]) {
        hash[sum].push([i, j])
      } else {
        hash[sum] = [[i, j]]
      }
    }
  }

  var result = []
  for (var key in hash) {
    if (hash.hasOwnProperty(key) && hash[key].length > 1) {
      // console.log([key, hash[key]]);
      result = result.concat(combination(hash[key]))
    }
  }
  return result
}

function combination(arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      result.push(arr[i].concat(arr[j]))
    }
  }
  return result
}

console.log(abcd());
