function rotateMatrix(arr) {
 var result = [];
 for (var i = 0; i < arr.length; i++) {
   result.push(Array(arr.length));
 }

 for (var j = 0; j < arr.length; j++) {
   for (var i = arr.length - 1; i >= 0; i--) {
     result[j][arr.length - 1 - i] = arr[i][j]
   }
 }

 return result;
}

var arr = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
console.log(rotateMatrix(arr));
// [7,4,1],
// [8,5,2],
// [9,6,3]

function romanToNum(str) {
  var dict = { "I": 1, "V": 5, "X": 10, "L": 50, "C": 100 }
  var result = 0, current = str[str.length - 1];
  for (var i = str.length - 1; i >= 0; i--) {
    if (dict[str[i]] < dict[current]) {
      result -= dict[str[i]];
    } else {
      result += dict[str[i]];
    }

    if (dict[str[i]] > dict[current]) {
      current = str[i];
    }
  }
  return result;
}

console.log(romanToNum("XCVIII")); // 98
console.log(romanToNum("LXIV")); // 64

// number to fraction
function deciToFraction(n) {

}

function greatestCommonFactor(a,b) {
  
}
console.log(deciToFraction(0.125)); //1/8
