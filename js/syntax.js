arr = ['a', 'b', 'c', 'a']

'abc'.split('')             // [ 'a', 'b', 'c' ]
"i like sugar".split(' ')   // ["i", "like", "sugar"]

['a','b','c'].map(function(el) { return el + "T"})  // [ 'aT', 'bT', 'cT' ]

'hello'.indexOf('l')              // 1
'hello'.lastIndexOf('l')          // 3
['a', 'b', 'c', 'a'].indexOf('a') // 0

// #slice does not mutate the original, it only returns a new array
// #slice takes 2 args - start_idx and end_idx
['a', 'b', 'c', 'a'].slice(0,0)   // []
['a', 'b', 'c', 'a'].slice(0,1)   // ["a"]
['a', 'b', 'c', 'a'].slice(1,2)   // ["b"]
['a', 'b', 'c', 'a'].slice(1,100) // ["b", "c", "a"]

// #splice mutates original array
// #splice takes 2 args - start_idx and length
a = ['a', 'b', 'c', 'a']
a.splice(2,3)                     // ["c", "a"] even tho length is 3 it can only slice up to length of 2 here
a                                 // ["a", "b"] remaining
