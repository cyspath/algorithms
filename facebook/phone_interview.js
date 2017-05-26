Given a string with alpha-numeric characters and parentheses, return a string with balanced parentheses by removing the fewest characters possible. You cannot add anything to the string.

balance( "()" ) -> "()"
balance( ")(" ) -> ""
balance( "a(b)c)" ) -> "a(b)c"

i/p: "(((adfs)b)"
o/p: "((adfs)b)"


"((())"
// 1
[0]
[(]


"(    "

")))()("
// 4
// 4
)))(
()

stack {
  push()
  pop()
  peek()
  size()
}

 [1,2] [3,4]

"12"

// time O(n)

function balance(str) {
  var stack = new Stack();
  for (var i = 0; i < str.length; i++) {
    if (stack.peek() !== null && str[stack.peek()] === '(' && str[i] === ')') {
      stack.pop();
    } else {
      stack.push(i);
    }
  }
  var result = [];
  for (var j = str.length - 1; j >= 0; j--) {
    if (stack.peek() === j) {
      stack.pop();
    } else {
      result.push(j);
    }
  }
  return result.reverse().join('');
}
