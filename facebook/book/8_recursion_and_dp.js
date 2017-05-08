// triple step, a child is running up staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time. count how many possible ways the child can run the stairs.



// magic index where a[i] = i
function magicIdx(a) {
  function recurse(a, i1, i2) {
    if (i2 < i1) return -1;
    // find mid index and return index if mid is correct
    var midIdx = Math.floor((i1 + i2)/2);
    if (a[midIdx] == midIdx) {
      return midIdx;
    }
    // search left up to a[midIdx]
    var leftIdx = Math.min(a[midIdx], midIdx - 1);
    var left = recurse(a, 0, leftIdx);
    if (left >= 0) {
      return left;
    }
    // search right
    var rightIdx = Math.max(a[midIdx], midIdx + 1);
    var right = recurse(a, rightIdx, i2);
    return right;
  }
  return recurse(a, 0, a.length - 1)
}

// console.log(magicIdx([1,2,2,4,4,5,6])); // 4

// subsets
function subsets(arr) {
  if (arr.length <= 0) {
    return [[]];
  }
  var letter = arr[0];
  var current = subsets(arr.slice(1));
  var newArr = current.slice();
  for (var i = 0; i < current.length; i++) {
    newArr.push(current[i].concat([letter]));
  }
  return newArr;
}

// console.log(subsets([1,2,3]));


// multiple without *
function multiply(a,b) {
  var l = Math.max(a,b);
  var s = Math.min(a,b);
  var sum = 0;
  for (var i = 0; i < s; i++) {
    sum += l;
  }
  return sum;
}

function multiply(a,b) {
  var l = Math.max(a,b), s = Math.min(a,b), sum = 0;
  function recurse(s, l) {
    if (s == 1) {
      return sum += l;
    }
    recurse(Math.floor(s/2), l)
    sum = s % 2 == 0 ? sum + sum : sum + sum + l;
    console.log(sum);

  }
  recurse(s, l);
  return sum;
}
// multiply(3, 20)
