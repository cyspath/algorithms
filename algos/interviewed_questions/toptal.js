// TASK NO.	
// TASK TOTAL SCORE
// CORRECTNESS
// PERFORMANCE
// AGGREGATED TOTAL SCORE
// Task 1
// 62%
// 80%
// 33%
// Task 2
// 41%
// 71%
// 0%
// Task 3
// 80%
// 100%
// 50%

// Find number of pair combinations in an array
// [3, 5, 6, 3, 3, 5] should give 4 because:
// 4 indexes => [0, 3], [0,4], [3,4], and [1,5] are pairs

// expects O(nlogn) time, O(n) space

function pairCombinations(A) {
  var hash = {};
  for (var i = 0; i < A.length; i++) {
    if (hash.hasOwnProperty(A[i])) {
      hash[A[i]] += 1;
    } else {
      hash[A[i]] = 1;
    }
  }
  var sum = 0;
  for (var key in hash) {
    sum += numberPairs(hash[key]);
  }
  return sum;
}

var memo = {}
function numberPairs(n) {
  if (memo.hasOwnProperty(n)) {
    return memo[n];
  }
  if (n === 1) {
    return 0;
  }
  var result = factorial(n) / (factorial(n - 2) * 2)
  memo[n] = result;
  return result;
}

function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(pairCombinations([3, 5, 6, 3, 3, 5]));


// you are allow transformation of:
// AA->AA, BA->AA, CB->CC, BC->CC, AA->A, CC->C
// given a string, after a number of transformations, what is the smallest result?

// expects O(n) time, O(n) space

function transformString(S) {
  if (S.length === 0) {
    return S;
  }
  var transform = { 'AB': 'A', 'BA': 'A', 'CB': 'C', 'BC': 'C', 'AA': 'A', 'CC': 'C' }
  var result = "", current = S[0]
  for (var i = 1; i < S.length; i++) {
    if (transform.hasOwnProperty(current + S[i])) {
      current = transform[current + S[i]];
    } else {
      result += current;
      current = S[i];
    }
  }
  result += current;
  return result;
}

console.log(transformString('ABBCC')); //AC
console.log(transformString('ABBB')); //A



// find bitwise XOR product of range M to N, where M <= N
// example 5 and 8 gives 12,
// because 5 XOR 6 XOR 7 XOR 8 gives 101,110,111,1000

// expects O(n) time, O(1) space

function toBinary(n) {
  if (n === 0) {
    return "0";
  }
  var result = "";
  while (n > 0) {
    result += n % 2;
    n = Math.floor(n/2);
  }
  return result;
}

function toNumber(binary) {
  binary = binary.split("").reverse().join("")
  return parseInt(binary, 2);
}

function bitXOR(a,b) {
  var result = "", i = 0, j = 0;
  for (var i = 0; i < a.length; i++) {
    result += a[i] === b[i] ? "0" : "1";
  }
  return result + b.slice(i);
}

function bitXORProduct(M, N) {
  if (M === N) {
    return 0;
  }
  var current = toBinary(M);
  var i = M + 1;
  while (i <= N) {
    current = bitXOR(current, toBinary(i));
    i += 1;
  }
  return toNumber(current);
}

console.log(bitXORProduct(5,8)); //12
