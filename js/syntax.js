var arr = ['a', 'b', 'c', 'd']

'abc'.split('');             // [ 'a', 'b', 'c' ]
"i like sugar".split(' ');   // ["i", "like", "sugar"]

// filter, map, some, every, forEach (does not mutate)
  var a = [1, 2, 3];
  a.filter(function(n) { return n > 1;} );    // [2,3]
  a.forEach(function(n) { console.log(n); })
  a.map(function(el) { return el + 10 } );    // [11, 12, 13]
  a.some(function(n) { return n > 2;})        // true
  a.every(function(n) { return n > 2;})        // false

// trim
  "   remove space     only around start & end~    ".trim()     // "remove space     only around start & end~"

// reverse
  ['a', 'b', 'c'].reverse();                  // mutates original arr, ['c', 'b', 'a']

// push, pop, unshift, shift modifies original array
  ['a', 'b'].push('c');      // 3   returns number of elements
  ['a', 'b'].unshift('c');   // 3   returns number of elements
  ['a', 'b'].pop();          // 'b'
  ['a', 'b'].shift()         // 'a'


// indexing(finding elements in string and array)
  'hello'.indexOf('l');              // 1
  'hello'.lastIndexOf('l');          // 3
  ['a', 'b', 'c', 'a'].indexOf('a'); // 0


// #slice (does not mutate the original)
// takes 2 args - start_idx and end_idx
  arr.slice(0,0)               // []
  arr.slice(0,1)              // ["a"]
  arr.slice(1,2)              // ["b"]
  arr.slice(1,100)            // ["b", "c", "d"]
  arr.slice(1)                // ['b', 'c', "d"]
  arr.slice(1, a.length + 1)  // ['b', 'c', "d"]

// #splice (mutates original array)
// takes 2 args - start_idx and length
  var arr = ['a', 'b', 'c', 'd']
  arr.splice(2,3)                     // ["c", "d"] even tho length is 3 it can only slice up to length of 2 here
  arr                                // ["a", "b"] remaining

// concat
// does not change original arrays
  a = [1,2]
  b = [3,4]
  a.concat(b)   // [1, 2, 3, 4], a and b still the same old

// deep copy for nested arr
  // could implement recursive way or use  JSON.parse(JSON.stringify(oldArray))
  b =  JSON.parse(JSON.stringify(a))

// Hash
  var h = {};
  h['a'] = 1;
  h[10] = 20;
  for (key in h) { console.log([key, h[key]]); }
  // ["a", 1]
  // ["b", 2]
  h[12] === undefined  // true
  h.hasOwnProperty(12) // false
  delete h[10]         // deletes the key and value with key 10

// Class
  function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  Person.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
  }

  var john = new Person("John", "Hud");
  john.fullName(); // "John Hud"

// Math
  //  random() method returns a random number from 0 (inclusive) up to but not including 1 (exclusive).
  Math.floor(Math.random() * 3) + 5 // random from 5-7
