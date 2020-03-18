function showMessage(message){
  setTimeout(function(){
    console.log(message);
  }, 3000);
}

showMessage('Function called 3 seconds ago');

////////////////////////////////////////////////////////

function fullName(firstName, lastName, callback){
  console.log("My name is " + firstName + " " + lastName);
  callback(lastName);
}

var greeting = function(ln){
  console.log('Welcome Mr. ' + ln);
};

fullName("Jackie", "Chan", greeting);

// because callbacks behave as if they are actually placed inside that function, they are in practice closures: they can access the containing function’s variables and parameters, and even the variables from the global scope.

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
