// global variable later overrides local variable
// also variable call will trace back the scope from inside to outside

var myFriend = "Jackson";
var locales = {
  europe: function() {          // The Europe continent's local scope
    myFriend = "Monique";
    myPet = "Dodo"
    var france = function() {   // The France country's local scope
      var paris = function() {  // The Paris city's local scope
        console.log(myFriend);
        console.log(myPet);
      };
      paris();
    };
    france();
  }
};
console.log(myFriend) // Jackson
locales.europe();     // Monique, Dodo
console.log(myFriend) // Monique

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
