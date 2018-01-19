var ds = require('./data_structures/stack.js');


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

var islandPerimeter = function(grid) {
	var loc = (function(grid) {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid[i].length; j++) {
				var el = grid[i][j];
				if (el === 1) return [i, j];
			}
		}
		return false;
	})(grid);

	var perimeter = 0, checked = {};
	function recurse(coor) {
		if (checked[coor]) return;

		checked[coor] = true; // set current to checked
		
		var i = coor[0], j = coor[1], edges = 4;
		var coorList = [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1]];
		
		for (var ci = 0; ci < coorList.length; ci++) {
			var cc = coorList[ci];
			if (checked[cc]) {
				edges --;
				continue;
			} else if (grid[cc[0]] === undefined || grid[cc[0]][cc[1]] === undefined) {
				continue;
			} else if (grid[cc[0]][cc[1]] === 1) {
				edges --;
				recurse(cc);
			}
		}

		perimeter += edges;
	}

	recurse(loc);
	return perimeter;
};

// islandGrid = [
// 	[0,1,0,0],
// 	[1,1,1,0],
// 	[0,1,0,0],
// 	[1,1,0,0]
// ] // Answer: 16
// console.log(islandPerimeter(islandGrid))


// Assign cookies

// Example 1:
// Input: [1,2,3], [1,1]

// Output: 1

// Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
// And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
// You need to output 1.
// Example 2:
// Input: [1,2], [1,2,3]

// Output: 2

// Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
// You have 3 cookies and their sizes are big enough to gratify all of the children, 
// You need to output 2.

const assignCookies = (g, s) => {
	const sortedChildren = g.sort((a,b) => a - b);
	const sortedCookies = s.sort((a,b) => a - b);
    console.log(sortedChildren)
    console.log(sortedCookies)

	let count = 0, i = 0, j = 0;
	while (i < sortedChildren.length && j < sortedCookies.length) {
        if (sortedChildren[i] <= sortedCookies[j]) {
            count++;
        } else {
            i--;
        }
        i++;
        j++;
    }
	return count;
}

// Given a circular array (the next element of the last element is the first element of the array), print the Next Greater Number for every element. The Next Greater Number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, output -1 for this number.

// Example 1:
// Input: [1,2,1]
// Output: [2,-1,2]
// Explanation: The first 1's next greater number is 2; 
// The number 2 can't find next greater number; 
// The second 1's next greater number needs to search circularly, which is also 2.

var nextGreaterElements = function(nums) {
	let result = [], current, j;
	const steps = nums.length - 1;
	for (let i = 0; i < nums.length; i++) {
		let pushed = false;
		current = nums[i];
		j = findNextIdx(i, nums);
		while (j !== i) {
			if (nums[j] > current) {
				result.push(nums[j]);
				pushed = true;
				break;
			}
			j = findNextIdx(j, nums);
		}
		!pushed && result.push(-1);
	}
	return result;
};

const findNextIdx = (i, arr) => {
	return i === arr.length - 1 ? 0 : i + 1;
}

// console.log(nextGreaterElements([1,2,1]));


// You are given two arrays (without duplicates) nums1 and nums2 where nums1’s elements are subset of nums2. Find all the next greater numbers for nums1's elements in the corresponding places of nums2.

// The Next Greater Number of a number x in nums1 is the first greater number to its right in nums2. If it does not exist, output -1 for this number.

// Example 1:
// Input: nums1 = [4,1,2], nums2 = [1,3,4,2].
// Output: [-1,3,-1]
// Explanation:
//     For number 4 in the first array, you cannot find the next greater number for it in the second array, so output -1.
//     For number 1 in the first array, the next greater number for it in the second array is 3.
//     For number 2 in the first array, there is no next greater number for it in the second array, so output -1.

var nextGreaterElement = function(findNums, nums) {
	let store = {}, result = [];
	nums.forEach((n, i) => store[n] = i);
	findNums.forEach((n, i) => {
		result.push(findGreaterAfterIdx(n, store[n]))
	})
	function findGreaterAfterIdx(n, j) {
		for (let i = j + 1; i < nums.length; i++) {
			if (nums[i] > n) {
				return nums[i];
			}
		}
		return -1;
	}
	return result;
};

// console.log(nextGreaterElement([4,1,2], [1,3,4,2]));


// Given a positive 32-bit integer n, you need to find the smallest 32-bit integer which has exactly the same digits existing in the integer n and is greater in value than n. If no such positive 32-bit integer exists, you need to return -1.

// Example 1:
// Input: 12
// Output: 21

// Example 2:
// Input: 21
// Output: -1

var nextGreaterElementIII = function(n) {
	// go from right to left, check if left has a element that is smaller than current, can swap
	function nToArr(n) {
		var result = [];
		while (n > 0) {
			result.push(n % 10);
			n = Math.floor(n / 10);
		}
		return result.reverse();
	}
	var arr = nToArr(n);

	function smallerNumOnLeft(arr) {
		for (var i = arr.length - 1; i >= 0; i--) {
			for (var j = i - 1; j >= 0; j--) {
				if (arr[i] > arr[j]) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
					return arr.slice(0, j + 1).concat(arr.slice(j + 1).sort(function(a,b) { return a - b }));
				}	
			}
		}
		return -1;
	}

	function checkArrays(arr) {
		var partialArr = -1;
		for (var i = arr.length - 2; i >= 0; i--) {
			var newArr = arr.slice(i);
			partialArr = smallerNumOnLeft(newArr);
			if (partialArr !== -1) {
				break;
			}
		}
		if (partialArr === -1) {
			return -1;
		}
		var result = arr.reverse();
		partialArr.reverse().forEach(function(el, i) {
			result[i] = el;
		});
		return result.reverse();
	}
	
	var result = checkArrays(arr);
	if (result === -1) {
		return -1;
	} else {
		var number = Number(result.join(''));
		return number >= (Math.pow(2, 32) / 2) ? -1 : number;
	}
};

// console.log(nextGreaterElementIII(12443322)) //13222344
// console.log(nextGreaterElementIII(1999999999));
// console.log(Math.pow(2, 32));

