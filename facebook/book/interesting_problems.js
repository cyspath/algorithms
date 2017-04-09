// ////////////////////////////// STRING AND ARRAY ////////////////////////////////////

// determine if a string has all unique characters
// O(n) O(1)
// str.charCodeAt() String.fromCharCode(n)

// console.log(isUniq('abcd')); // t
// console.log(isUniq('abc$dx$')); // f

function isUniq(str) {
  var hash = {};
  for (var i = 32; i <= 126; i++) {
    hash[String.fromCharCode(i)] = false;
  }
  for (var i = 0; i < str.length; i++) {
    if (hash[str[i]]) {
      return false;
    } else {
      hash[str[i]] = true;
    }
  }
  return true;
}

// rotate matrix - square matrix
var sqMatrix = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]

// console.log(rotateMatrix(sqMatrix));
// O(n^2) O(n^2)

// 7 4 1
// 8 5 2
// 9 6 3

// logic first... swap i, j to give this
// 1 4 7
// 2 5 8
// 3 6 9
// next reverse each row
function rotateMatrix(arr) {
  // genereate new array with all undefined
  var result = new Array(arr.length)
  for (var i = 0; i < result.length; i++) {
    result[i] = new Array(arr.length)
  }
  // swap i and j position for new arr
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      result[j][i] = arr[i][j];
    }
  }
  // reverse each row
  for (var i = 0; i < result.length; i++) {
    result[i] = result[i].reverse();
  }
  return result;
}

// string rotation - you have method #includes(str) which can be called only once
// O(#includes) O(1)
// console.log(strRotation('waterbottle', 'erbottlewat')); // true

function strRotation(s1, s2) {
  var concated = s2 + s2;
  return concated.includes(s1);
}

// ////////////////////////////// LINKED LIST ////////////////////////////////////

// /////////////////////////// STACKS AND QUEUES ////////////////////////////////////

// ////////////////////////// TREES AND GRAPHS ////////////////////////////////////

// ////////////////////////////// BIT MANIPULATION ////////////////////////////////////

// ////////////////////////////// MATH AND LOGIC ////////////////////////////////////

// ////////////////////////////// OO DESIGN ////////////////////////////////////

// ////////////////////////////// RECURSION AND DP ////////////////////////////////////

// ////////////////////////////// SYSTEM DESIGN AND SCALABILTY ////////////////////////////////////

// ////////////////////////////// SORTING AND SEARCHING ////////////////////////////////////
