function ToH(n) {
  this.a = [];
  this.b = [];
  this.c = [];
  var i = n;
  while (i >= 1) {
    this.a.push(i);
    i--
  }
  console.log(this.a);
  console.log(this.b);
  console.log(this.c);
  console.log("");
}

ToH.prototype.run = function (peg, from, to, other, stacks) {
  if (peg === 1) {
    var d = from.pop();
    to.push(d);
    printStack(stacks)
  } else {
    ToH.prototype.run(peg - 1, from, other, to, stacks)
    var d = from.pop();
    to.push(d);
    printStack(stacks)
    ToH.prototype.run(peg - 1, other, to, from, stacks)
  }
}

function printStack(stacks) {
  console.log(stacks[0]);
  console.log(stacks[1]);
  console.log(stacks[2]);
  console.log("");
}



var t = new ToH(4);

console.log(t.run(4, t.a, t.c, t.b, [t.a, t.b, t.c]));

console.log(t);
