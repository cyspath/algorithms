function Pokemon(name, type) {
  this.name = name;
  this.type = type;
  this.sayBye = function () { console.log(this.name + " says bye"); }
}

// class (static) methods - since a function is a object, can give it properties such as 'whatIs'
Pokemon.whatIs = function() {
  console.log('pokemon is a cartoon');
}

// instance methods
Pokemon.prototype.attack = function(n = 1) {
  for (var i = 0; i < n; i++) {
    console.log(this.name + " attacks and deals damage: " + parseInt(Math.floor(Math.random() * 5)));
  }
}

// new instance of pokemon
var p = new Pokemon('Pikachu', 'electric')

// function extend(a,b) {
//   for (var key in b) {
//     a[key] = b[key];
//   }
//   return a;
// }
// console.log(extend({a: 1, c: 3}, {b: 2, c: 4})) // => {a: 1, b: 2, c: 4}
