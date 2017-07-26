var ds = require('./data_structures/stack.js');

console.log(ds);

// Given an integer array with even length, where different numbers in this array represent different kinds of candies. 
// Each number means one candy of the corresponding kind. You need to distribute these candies equally in number to brother and sister. 
// Return the maximum number of kinds of candies the sister could gain.

// Example 1:
// Input: candies = [1,1,2,2,3,3]
// Output: 3
// Explanation:
// There are three different kinds of candies (1, 2 and 3), and two candies for each kind.
// Optimal distribution: The sister has candies [1,2,3] and the brother has candies [1,2,3], too. 
// The sister has three different kinds of candies. 
// Example 2:
// Input: candies = [1,1,2,3]
// Output: 2
// Explanation: For example, the sister has candies [2,3] and the brother has candies [1,1]. 
// The sister has two different kinds of candies, the brother has only one kind of candies. 

var distributeCandies = function(candies) {
	var store = {}, el, bro_candies = 0, sis_candies = 0;
	for (var i = 0; i < candies.length; i++) {
		el = candies[i];
		if (store[el]) {
			bro_candies += 1;
		} else {
			store[el] = true;
			sis_candies += 1;
		}
	}
	// if sister types of candies are less than bro, sis has max number of types of candies
	// if sister has more than bro, bro would need to borrow candies from sis til both eql
	if (sis_candies <= bro_candies) {
		return sis_candies;
	} else {
		return sis_candies - ((sis_candies - bro_candies) / 2)
	}
};
