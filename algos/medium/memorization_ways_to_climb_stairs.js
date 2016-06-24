// how manys ways to climb stairs hopping 1,2,or 3 steps

var store = {};
function steps(n) {
  if (store[n]) {
    return store[n];
  }
  if (n < 0) {
    return 0;
  }
  if (n === 0) {
    return 1;
  }
  var result = steps(n - 1) + steps(n - 2) + steps(n - 3)
  store[n] = result;
  return result;
}

console.log(steps(5));
console.log(store);

//
// 13
// { '1': 1, '2': 2, '3': 4, '4': 7, '5': 13 }
