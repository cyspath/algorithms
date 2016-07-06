// console.log(genArr(5))

// input number of rounds
// output is array all possible rock paper scissors combs

function rpsPerm(n) {
  var arr = ['r','p','s']

  function recurse(arr, accum) {
    if (accum.length === n) {
      return [accum]
    }

  	var result = [];

  	for (var i = 0; i < arr.length; i++) {
      var newAccum = accum.slice()
      newAccum.push(arr[i]);
      var newArr = arr.slice()
      result = result.concat(recurse(newArr, newAccum))
  	}

    return result;
  }

  return recurse(arr, [], n)
}
console.log(rpsPerm(4));
