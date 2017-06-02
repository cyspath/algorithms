// Given an array of DISTINCT integers, find length of the longest subarray which contains
// numbers that can be arranged in a continuous sequence.
// O(n^2), trick is to know the difference of min and max of a subarray should always equal to last idx - first idx of the subarray
function longestSubArray1(arr) {
  var min, max, length = 0;
  for (var i = 0; i < arr.length; i++) {
    min = arr[i];
    max = arr[i];
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
      }
      if (arr[j] > max) {
        max = arr[j];
      }
      var diff = max - min;
      if (diff === j - i && diff + 1 > length) {
        // console.log(arr.slice(i, j + 1));
        length = diff + 1;
      }
    }
  }
  return length;
}
// console.log(longestSubArray1([])); // 0
// console.log(longestSubArray1([45])); // 1
// console.log(longestSubArray1([1, 56, 58, 57, 90, 92, 94, 93, 91, 45])); // 5

// now what if it is is not DISTINCT?
function longestSubArray1(arr) {
  var min, max, length = 0;
  for (var i = 0; i < arr.length; i++) {
    min = arr[i];
    max = arr[i];
    var hash = { i: true };
    for (var j = i; j < arr.length; j++) {
      if (hash[j] === true) {
        break;
      }
      if (arr[j] < min) {
        min = arr[j];
      }
      if (arr[j] > max) {
        max = arr[j];
      }
      var diff = max - min;
      if (diff === j - i && diff + 1 > length) {
        console.log(arr.slice(i, j + 1));
        length = diff + 1;
      }
    }
  }
  return length;
}
// console.log(longestSubArray1([1, 56, 58, 57, 90, 92, 91, 93, 91, 45])); // 4
// console.log(longestSubArray1([1, 56, 58, 57, 90, 92, 94, 93, 91, 45])); // 5








class STACK {
  constructor() {
    this.store = {};
    this.i = 0;
  }
  add(el) {
    this.i ++;
    this.store[this.i] = el;
    return el;
  }
  pop() {
    if (this.empty()) return;
    var el = this.store[this.i];
    delete this.store[this.i];
    this.i--;
    return el;
  }
  peek() {
    if (this.empty()) return;
    return this.store[this.i];
  }
  empty() {
    return this.i == 0;
  }
  list() {
    var arr = [];
    for (var key in this.store) {
      arr.push(this.store[key]);
    }
    return arr;
  }
}
//
// // Parse a string containing numbers and "+", "-" and parentheses. Evaluate the expression.
// // -2+(3-5) should return -4.
//
// function calculator(str) {
//   operators = {'+': true, '-': true, '*': true, '/': true, '(': true, ')': true };
//   var arr = expressionStrToArr(str, operators); // parse str into array
//   var rpn = parseArrToRpn(arr, operators);
//   // console.log(arr);
//   // console.log(rpn);
//   return solveRpn(rpn, operators);
// }
//
// function expressionStrToArr(str, operators) {
//   var arr = [], number = '';
//   if (str[0] === '-') { // if starts with negative sign, prepend a '0'
//     str = '0' + str;
//   }
//   for (var i = 0; i < str.length; i++) {
//     var current = str[i];
//     if (operators[current]) {
//       if (number.length > 0) {
//         arr.push(number);
//       }
//       arr.push(current);
//       number = '';
//     } else {
//       number += current;
//     }
//   }
//   if (number.length > 0) {
//     arr.push(number);
//   }
//   return arr;
// }
//
// function parseArrToRpn(arr, operators) {
//   var stack = new STACK, result = [];
//   for (var i = 0; i < arr.length; i++) {
//     // console.log(stack.list());
//     // console.log('   ', result);
//     var current = arr[i];
//     if (!operators[current]) { // add to result if its a number
//       result.push(current)
//     } else if (current === '(') { // add to stack if (
//       stack.add(current);
//     } else if (current === ')') { // pop operators and add to result unil reach ( if current is )
//       while (stack.peek() !== '(' && !stack.empty()) {
//         result.push(stack.pop());
//       }
//       stack.pop();
//     } else { // if operator, add to stack if nothing to compare, else compare stack.pop() and current operator and pick higher to add to result
//       if (stack.peek() === '(' || stack.empty()) {
//         stack.add(current);
//         continue;
//       }
//       var compare = compareSigns(stack.peek(), current)
//       if (compare <= 0) {
//         result.push(stack.pop());
//       }
//       stack.add(current);
//     }
//   }
//   while (stack.empty() === false) { // add remaining operators to result
//     result.push(stack.pop());
//   }
//   return result;
// }
//
// function compareSigns(a, b) {
//   var multiDiv = { '*': true, '/': true }, addMinus = { '+': true, '-': true };
//   if (multiDiv[a] && addMinus[b]) {
//     return -1;
//   } else if (addMinus[a] && multiDiv[b]) {
//     return 1;
//   } else {
//     return 0;
//   }
// }
// function solveRpn(rpn, operators) {
//   var stack = new STACK;
//   for (var i = 0; i < rpn.length; i++) {
//     var current = rpn[i];
//     if (!operators[current]) {
//       stack.add(current);
//     } else {
//       var b = stack.pop(), a = stack.pop();
//       var value = eval(a + current + b);
//       stack.add(value);
//     }
//   }
//   return stack.pop();
// }
//
// console.log(calculator('-20+(5-(1+2))')); // -18
// console.log(calculator('3-(4 + 1)*(5-2)+5')); // -7
// console.log(calculator('3-1*3+10')); // 10
// console.log(calculator('3-1*5')); // -3










// Given a schedule (array of start and end times) for meetings, provide an algorithm
// that finds the minimum number of rooms needed for the day.
function schedule(arr) {

}
console.log(schedule([[0,2], [2,3], [1,4], [0,1], [3,4], [2,5]])); // 3 rooms
