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


// You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water. 
// Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, 
// and there is exactly one island (i.e., one or more connected land cells). The island doesn't have "lakes" (water 
// inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid 
// is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

// Example:

// [[0,1,0,0],
//  [1,1,1,0],
//  [0,1,0,0],
//  [1,1,0,0]]

// Answer: 16

var islandPerimeter = function(grid) {
	var el, p = 0, prev_count = 0, current_count, current_cells, connected;
	// each level will calc its max perimeter, then compare with previous level and subtract the level with min num blocks
	for (var i = 0; i < grid.length; i++) {
		current_count = 0;
		current_cells = [];
		connected = false;
		for (var j = 0; j < grid[i].length; j++) {
			el = grid[i][j];
			if (el === 1 && connected) {
				current_cells[current_cells.length - 1]
			}

		}
		// now subtract the joints

	}
};


