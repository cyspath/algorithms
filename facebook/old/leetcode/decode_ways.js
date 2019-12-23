var numDecodings = function(s) {
  var store = {};

  function recurse(s) {
    // console.log('strs:', s);
    if (store[s]) {
      return store[s];
    } else if (s.length === 0) {
      return 0;
    } else if (s.length <= 2) {
      return legit(s);
    }
    var a1 = legit(s.slice(0,1));
    var b1 = legit(s.slice(0,2));

    var a2 = recurse(s.slice(1));
    var b2 = recurse(s.slice(2));

    var a = (a1 === 0 || a2 === 0) ? 0 : a2;
    var b = (b1 === 0 || b2 === 0) ? 0 : b2;
    return store[s] = a + b;
  }
  return recurse(s);
};

function legit(str) {
  if (str.length === 2) {
    var n = Number(str);
    if (n === 10 || n === 20) {
      return 1;
    } else if (n % 10 === 0) {
      return 0;
    } else if (n > 26) {
      return 1;
    } else if (n < 10) {
      return 0;
    } else {
      return 2;
    }
  } else if (str.length === 1) {
    return str === '0' ? 0 : 1;
  }
}

console.log(numDecodings('1123')); // 5
console.log(numDecodings('10')); // 1
console.log(numDecodings('27')); // 1
console.log(numDecodings('11')); // 2
console.log(numDecodings('101')); // 1
console.log(numDecodings('')); // 0
console.log(numDecodings('00')); // 0
console.log(numDecodings('01')); // 0
console.log(numDecodings('012')); // 0
console.log(numDecodings('230')); // 0
