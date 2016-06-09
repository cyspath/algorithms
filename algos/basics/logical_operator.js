// # Write a function or that works like ||, but only uses! and &&.
// # Write a function and that works like &&, but only uses ! and ||.

function or(a , b) {
  if (!!a) { return true }
  if (!!b) { return true }
  return false
}

console.log(or("a", undefined));
console.log(or(null, undefined));


function and(a, b) {
  if (!!a == false || !!b == false) { return false }
  return true
}

console.log(and("a", undefined));
console.log(and("b", 2));
