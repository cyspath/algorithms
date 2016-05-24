// a closure is any function that keeps reference to variables from its parent’s scope even after the parent has returned.

// a function can refer to, or have access to:
//   * any variables and parameters in its own function scope
//   * any variables and parameters of outer (parent) functions
//   * any variables from the global scope.


// Inner functions can refer to variables defined in outer functions even after the latter have returned.

function setLocation(city) {
 var country = "France";

 function printLocation() {
   console.log("You are in " + city + ", " + country);
 }

 return printLocation;
}

var currentLocation = setLocation ("Paris");
currentLocation();   // output: You are in Paris, France

// As we can see, printLocation() is executed outside its lexical scope. It seems that setLocation() is gone, but printLocation() still has access to, and “remembers”, its variable (country) and parameter (city).

////////////////////////////////////////////////////////

// Inner functions store their outer function’s variables by reference, not by value.

function cityLocation() {
  var city = "Paris";

  return {
    get: function() { console.log(city); },
    set: function(newCity) { city = newCity; }
  };
}

var myLocation = cityLocation();

myLocation.get();           // output: Paris
myLocation.set('Sydney');
myLocation.get();           // output: Sydney

// Here cityLocation() returns an object containing two closures – get() and set() – and they both refer to the outer variable city. get() obtains the current value of city, while set() updates it. When myLocation.get() is called for the second time, it outputs the updated (current) value of city – “Sydney” – rather than the default “Paris”.

// This means that closures store references to their outer variables, rather than copying their values. 

////////////////////////////////////////////////////////
