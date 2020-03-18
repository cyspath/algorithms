// https://leetcode.com/problems/basic-calculator-iii/
// "2*(5+ 5*2)/3+(6/ 2+8)" = 21
// O(n), mostly just manual labor, good to do in steps
// 1st iteration remove spaces
// 2nd iteration chunk numbers and convert to integer
// 3rd iteration use stack to calcArr children and itself
// calcArr takes it arr with no parenthesis, then first do * or / to generate new arr, then do + and -
var calculate = function(s) {
    var numbers = '1234567890'.split('').reduce((ac, n) => {
        ac[n] = true;
        return ac;
    }, {});
    
    function chunkNumber(arr) {
        var result = [];
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            if (numbers[arr[i]]) {
                str += arr[i];
            } else {
                if (str !== '') {
                    result.push(Number(str));
                    str = '';
                }
                result.push(arr[i]);
            }
        }
        
        if (str !== '') {
            result.push(Number(str));
        }
    
        return result;
    }
    function eliminateParenthesis(arr) {
        var stack = [];
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            if (el === ')') {
                var revChild = [];
                while (stack[stack.length - 1] !== '(') {
                    revChild.push(stack.pop());
                }
                stack.pop();
                stack.push(calcArr(revChild.reverse()))
            } else {
                stack.push(el);
            }
        }
        return calcArr(stack);
    }
    function calcArr(arr) { // arr does not contain ( or )   
        var stack = [];
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            if (stack.length && (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')) {
                var newEl = calc(stack.pop(), stack.pop(), el);
                stack.push(newEl);
            } else {
                stack.push(el);
            }
        }
        var result = 0;
        var sign = '+';
        for (var i = 0; i < stack.length; i++) {
            var el = stack[i];
            if (el === '+' || el === '-') {
                sign = el;
            } else {
                result = calc(sign, result, el);
            }
        }
        return result;
    }
    function calc(op, n1, n2) {
        if (op === '*') {
            return n1 * n2;
        } else if (op === '/') {
            return Math.floor(n1 / n2);
        } else if (op === '+') {
            return n1 + n2;
        } else if (op === '-') {
            return n1 - n2;
        };
    }
    var arr = s.split('').filter((el) => el !== ' ');
    arr = chunkNumber(arr);
    console.log(arr)
    return result = eliminateParenthesis(arr);
};

