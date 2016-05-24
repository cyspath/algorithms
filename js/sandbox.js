// global variable later overrides local variable

var myFriend = "Jackson";
var locales = {
  europe: function() {          // The Europe continent's local scope
    myFriend = "Monique";

    var france = function() {   // The France country's local scope
      var paris = function() {  // The Paris city's local scope
        console.log(myFriend);
      };

      paris();
    };

    france();
  }
};

console.log(myFriend)
locales.europe();
console.log(myFriend)

// all variable are hoisted in its current scope
console.log(chick)
var chick = "kfc"
console.log(chick)
