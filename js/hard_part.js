// function instruction() {
//   function multiplyBy2(num) {
//     return num * 2;
//   }
//   return multiplyBy2;
// }
//
// var generatedFunc = instruction()


function addByX(x) {
	function add(num) {
    return x + num;
  }
  return add;
}

var addByTwo = addByX(2);

// now call addByTwo with an input of 1

console.log(addByTwo(1));


// now call addByTwo with an input of 2

console.log(addByTwo(2))

//--------------------------------------------------
// Extension
//--------------------------------------------------

function once(func) {
  var firstTime;
	return function(num) {
    if (firstTime === undefined) {
      return firstTime = func(num)
    } else {
      return firstTime
    }
  }
}

var onceFunc = once(addByTwo);

// UNCOMMENT THESE TO TEST YOUR WORK!
console.log(onceFunc(4));  //should log 6
console.log(onceFunc(10));  //should log 6
console.log(onceFunc(9001));  //should log 6


function after(count, func) {
	return function() {
    count -=1;
    if (count === 0) {
      return func();
    }
  }
}

var called = function() { console.log('hello') };
var afterCalled = after(3, called);

afterCalled(); //-> nothing is printed
afterCalled(); //-> nothing is printed
afterCalled(); //-> 'hello' is printed


function delay(func, wait) {
	return setTimeout(func, wait)
}

delay(function() { return console.log('delayed') }, 2000)
