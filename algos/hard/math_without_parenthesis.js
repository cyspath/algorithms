var eq = '2*3+5/6*3+15';
var eq2 = '2*3+5/6*3+3*5';

var ops = ['+','-','*','/'];
function math(eq) {
  var a = genArr(eq);
  var s1 = [], s2 = [], idx = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] === "+" || a[i] === "-") {
      s1.push(a.slice(idx, i));
      s2.push(a[i]);
      idx = i + 1;
    }
  }
  s1.push(a.slice(idx, i));
  console.log(s1);
  
  s1 = s1.map(function (a) {
    return getResult(a);
  })

  var total = s1[0];
  s1.forEach(function (e, i) {
    if (s2[i - 1] === '+') {
      total += e;
    } else if (s2[i - 1] === '-') {
      total -= e;
    }
  })
  return total;
}

function genArr(eq) {
  var result = [];
  var current = "";
  for (var i = 0; i < eq.length; i++) {
    if (ops.indexOf(eq[i]) === -1) {
      current += eq[i];
    } else {
      result.push(parseInt(current));
      current = "";
      result.push(eq[i]);
    }
  }
  result.push(parseInt(current));
  return result;
}

function getResult(a) {
  var r = a[0];
  a.forEach(function (e,i) {
    if (e === '*') {
      r *= a[i + 1];
    } else if (e === '/') {
      r /= a[i + 1];
    }
  })
  return r;
}

console.log(math(eq));
console.log(math(eq2));
