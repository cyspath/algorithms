//// console.log(genArr(5))

// input number of rounds
// output is array all possible rock paper scissors combs

function permutation(arr) {
  function recurse(arr, accum) {
    if (arr.length === 0) {
      return [accum];
    }
  	var result = [];
  	for (var i = 0; i < arr.length; i++) {
      var newArr = arr.slice()
      var newAccum = accum.slice()
      newArr.splice(i,1);
      newAccum.push(arr[i]);
      result = result.concat(recurse(newArr, newAccum))
  	}
    return result;
  }

  return recurse(arr, [])
}

function rpsPermDup(n) {
  var arr = ['r','p','s']

  function recurse(accum) {
    if (accum.length === n) {
      return [accum];
    }
  	var result = [];
  	for (var i = 0; i < arr.length; i++) {
      var newAccum = accum.slice();
      newAccum.push(arr[i]);
      result = result.concat(recurse(newAccum));
  	}
    return result;
  }

  return recurse([])
}

console.log(permutation(['a','b','c']));

console.log(rpsPermDup(4));
