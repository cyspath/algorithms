// find target in vertically and horizontally sorted grid
function findTargetInSortedMatrix(t, grid) {
	for (var i = 0; i < Math.min(1, grid.length); i++) {
		for (var j = 0; j < grid[i].length; j++) {
			console.log(grid[i][j]);
			
			if (grid[i][j] === t) {
				return [i,j];
			}

			if (grid[i][j] > t) {
				var rowIdx = i;
				var colIdx = j;
				break;
			}
		}
	}

	while (rowIdx >= 0 && colIdx >= 0) {
		var current = grid[rowIdx][colIdx];
		console.log(current);
		if (current === t) {
			return [rowIdx, colIdx];
		} else if (current < t) {
			rowIdx++;
		} else {
			colIdx--;
		}
	}
	return -1;
}

// // O(n + n)
// console.log(findTargetInSortedMatrix(31, [
// 	[1,10,20,30,40],
// 	[2,15,25,35,45],
// 	[3,27,29,37,48],
// 	[26,32,33,39,50],
// 	[31,40,50,60,70]
// ]));
// console.log(findTargetInSortedMatrix(31, [
// ]));

//cost enqueue
class SlowPushStack {
	constructor() {
		this.empty = [];
		this.full = [];
	}

	push(el) {
		this.empty.push(el);
		while(this.full.length !== 0) {
			this.empty.push(this.full.shift());
		}
		const temp = this.empty;
		this.empty = this.full;
		this.full = temp;
	}

	pop() {
		return this.full.shift();
	}
}

// const s1 = new SlowPushStack();
// s1.push(1)
// s1.push(2)
// s1.push(3)
// console.log(s1.pop());
// console.log(s1);

class SlowPopStack {
	constructor() {
		this.empty = [];
		this.full = [];
	}

	push(el) {
		this.full.push(el);
	}

	pop() {
		let el;
		while(this.full.length !== 0) {
			el = this.full.shift();
			if (this.full.length === 0) {
				break;
			} else {
				this.empty.push(el);
			}
		}
		const temp = this.full;
		this.full = this.empty;
		this.empty = temp;
		return el;
	}
}

function countPalindromeSubstrings(str) {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		let l = i, r = i + 1;
		while (l >= 0 && r < str.length) {
			if (str[l] === str[r]) {
				count++;
				l--;
				r++;
			} else {
				break;
			}
		}
	}

	for (let i = 0; i < str.length; i++) {
		let l = i - 1, r = i + 1;
		while (l >= 0 && r < str.length) {
			if (str[l] === str[r]) {
				count++;
				l--;
				r++;
			} else {
				break
			}
		}
	}

	return count;
}
// // O(n^2)
// console.log(countPalindromeSubstrings('abbaeae'));
// console.log(countPalindromeSubstrings('abaab'));

function maxSumBT(node) {
	let max = 0;
	function recurse(node) {
		if (!node) return 0;
		const lc = recurse(node.left);
		const rc = recurse(node.right);

		const currentMax = Math.max(node.val, node.val + lc, node.val + rc, node.val + lc + rc);
		if (currentMax > max) max = currentMax;
		// console.log(currentMax);
		
		return node.val + Math.max(0, lc, rc);
	}
	recurse(node);
	return max;
}

// const tree = {
// 	val: 10,
// 	left: {
// 		val: 2, 
// 		left: { val: 20 }, 
// 		right: { val: 1 }
// 	},
// 	right: {
// 		val: 10, 
// 		right: {
// 			val: -25,
// 			left: { val: 3 },
// 			right: { val: 4 }
// 		}
// 	}
// }
// console.log(maxSumBT(tree));

class LRU {
	constructor(capacity) {
		this.capacity = capacity;
		this.count = 0;
		this.head = null;
		this.tail = null;
		this.hash = {};
	}

	add(el) {
		if (this.hash[el]) {
			this.renew(el);
		} else {
			const node = this.newNode(el);
			this.count++;
			if (this.head === null) {
				this.head = node;
			} else {
				this.tail.right = node;
				node.left = this.tail;
			}
			this.tail = node;

			this.removeOldestIfExceedsCapacity();
			this.hash[el] = node;
		}
	}

	get(el) {
		if (this.hash[el]) {
			this.renew(el);
			return this.hash[el].val;
		} else {
			return undefined
		}
	}

	renew(el) {
		if (this.tail.val === el) return; // if already tail don't do anything
		const node = this.hash[el];
		const leftNode = node.left;
		const rightNode = node.right;

		this.tail.right = node;
		node.left = this.tail;
		this.tail = node;
		this.tail.right = null;

		// join the empty slot
		if (leftNode) {
			leftNode.right = rightNode;
		} else {
			// renewed item WAS the head
			this.head = rightNode;
		}
		rightNode.left = leftNode;
	}

	removeOldestIfExceedsCapacity() {
		if (this.count > this.capacity) {
			this.count--;
			const secondNode = this.head.right;
			this.head.right = null;
			delete(this.hash[this.head.val]); // delete from hash map
			this.head = secondNode; // set head to next node or null
			if (secondNode) {
				secondNode.left = null;
			}
		}
	}

	newNode(el) {
		return { left: null, right: null, val: el };
	}
}


function findElementInRotatedSortedArray(el, arr) {
	// find pivot distance
	let distance = 0;
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i - 1]) {
			distance++;
		} else if (arr[i] >= arr[i-1]) {
			distance++;
		} else {
			break;
		}
	}

	// find portion to search from
	let i, j;
	const max = arr[distance - 1];
	const start = arr[0];
	const last = arr[arr.length - 1];
	
	if (el >= start) {
		i = 0;
		j = distance - 1;
	} else {
		i = distance;
		j = arr.length - 1;
	}

	// console.log(arr[i], arr[j]);

	function recurse(el, i, j, arr) {
		if (i > j) return 'not found';

		const midIdx = i + Math.floor((j - i) / 2);
		const mid = arr[midIdx];

		if (mid === el) return midIdx;

		if (mid > el) {
			// search left
			return recurse(el, i, midIdx - 1, arr);
		} else {
			// search right
			return recurse(el, midIdx + 1, j, arr);
		}
	}

	return recurse(el, i, j, arr);
}

// console.log(findElementInRotatedSortedArray(71, [5, 6, 7, 8, 9, 10, 1, 2, 3]));
// console.log(findElementInRotatedSortedArray(7, [5, 6, 7, 8, 9, 10, 1, 2, 3]));
// console.log(findElementInRotatedSortedArray(5, [5, 6, 7, 8, 9, 10, 1, 2, 3]));
// console.log(findElementInRotatedSortedArray(3, [5, 6, 7, 8, 9, 10, 1, 2, 3]));
// console.log(findElementInRotatedSortedArray(1, [5, 6, 7, 8, 9, 10, 1, 2, 3]));

function doRectanglesOverlap(rectALeft, rectARight, rectBLeft, rectBRight) {
	function axisOverlap(a1, a2, b1, b2) {
		if (a1 >= b1 && a1 <= b2) {
			// console.log(a1);
			return true;
		} else if (a2 >= b1 && a2 <= b2) {
			// console.log(a2);
			return true;
		} else if (b1 >= a1 && b1 <= a2) {
			// console.log(b1);
			return true;
		} else if (b2 >= a1 && b2 <= a2) {
			// console.log(b2);
			return true;
		} else {
			// console.log(a1,a2,b1,b2);
			return false;
		}
	}
	
	return axisOverlap(rectALeft[0], rectARight[0], rectBLeft[0], rectBRight[0]) && axisOverlap(rectARight[1], rectALeft[1], rectBRight[1], rectBLeft[1]);
}

// console.log(doRectanglesOverlap(
// 	[0,5], [10, 0], [7, 4], [20, 2]
// ));
// console.log(doRectanglesOverlap(
// 	[0,5], [10, 0], [11, 4], [20, 2]
// ));
// console.log(doRectanglesOverlap(
// 	[0,5], [10, 0], [7, 7], [20, 6]
// ));

// function splitWords(string, dict) {
// 	const store = {};

// 	function recurse(i,j) {

// 		let result;
// 		const str = string.slice(i, j+1);
// 		console.log(str);

// 		if (store[str]) {
// 			return store[str];
// 		}
		
// 		if (dict[str]) {
// 			result = [str];
// 			store[str] = result;
// 			return result; 
// 		}

// 		let current;
// 		let rest;
// 		// console.log(str);
// 		for (let s = i; s < j; s++) {
// 			current = string.slice(i, s + 1);
// 			rest = string.slice(s + 1, j + 1);

// 			if (!dict[current]) continue; // current word not in dict, continue

// 			const restChild = recurse(s + 1, j);

// 			if (restChild) {
// 				result = [current].concat(restChild);
// 				store[str] = result;
// 				return result;
// 			} else {
// 				continue;
// 			}

// 		}
// 		return store[str] = false;
// 	}

// 	const result = recurse(0, string.length - 1)
// 	// console.log(store);
// 	return result;
// }
function splitWords(string, dict) {
	const store = {};
	let count = 0;

	function recurse(str) {
		count++;

		if (store[str]) return store[str];

		if (dict[str]) return store[str] = [str];


		for (var i = 0; i < str.length; i++) {
			count++;

			const pre = str.slice(0, i+1);
			const post = str.slice(i + 1);
			// console.log(pre, post);

			if (!dict[pre]) {
				continue;
			}

			const result = recurse(post);
			if (result) {
				return store[str] = [pre].concat(result);
			}
		}

		return store[str] = false;
	}

	const result = recurse(string);
	return [result, count, string.length];
}

// console.log(splitWords(
// 	'hellocatold', {
// 		'hello': true,
// 		'cat': true,
// 		'old': true
// 	}
// ));

// console.log(splitWords(
// 	'hellocatoldcatcatoldhelloold', {
// 		// 'hello': true,
// 		// 'cat': true,
// 		// 'old': true
// 	}
// ));
// console.log(splitWords(
// 	'', {
// 		'hello': true,
// 		'cat': true,
// 		'old': true,
// 		'ocat': true,
// 		'told': true,
// 		'helloc': true
// 	}
// ));
// function getSqHf(n) {
// 	const sq = n*n;
// 	let count = 0;
// 	while (n >= 0) {
// 		count += n;
// 		n--;
// 	}
// 	return [sq, count];
// }

const cities = [1,2,3,4,5,6];
const roads = [[1,2],[2,4],[3,5],[2,6]];

function countContinents(cities, roads) {
	const roadMap = generateRoadMap(roads);
	let count = 0;

	const visited = cities.map((c) => false); // [ false, false, false, false, false, false ]
	
	for (var i = 0; i < visited.length; i++) {
		if (visited[i] === true) continue; // if this city is already visited, move on
		count++;
		createPathsAndMarkVisited(i + 1, roadMap, visited) // pass in cityId, map, and visited cities array
	}

	return count;
}

function createPathsAndMarkVisited(city, roadMap, visited) {
	// if visited, stop, else set visited to true
	if (visited[city - 1] === true) return;
	visited[city - 1] = true;

	// recursively visit destinations, when there mark it as visited to avoid infinite loops
	const destinations = roadMap[city];
	if (!destinations) return; // if no roads lead to other cities - we are done with this city
	destinations.forEach((destinationCity) => {
		createPathsAndMarkVisited(destinationCity, roadMap, visited);
	})
}

function generateRoadMap(roads) { // O(R)
	// generate a map where each key present a city and value is array of destinations
	// { '1': [ 2 ], '2': [ 1, 4, 6 ], '3': [ 5 ], '4': [ 2 ], '5': [ 3 ], '6': [ 2 ] }
	const map = {};
	function addDestinationToMap(city1, city2) {
		if (map[city1]) {
			map[city1].push(city2);
		} else {
			map[city1] = [city2];
		}
	}
	roads.forEach((r) => {
		const city1 = r[0], city2 = r[1];
		addDestinationToMap(city1, city2);
		addDestinationToMap(city2, city1);
	})
	return map;
}

console.log(countContinents(cities, roads)); 
// 2 continents 1,2,4,6  and 3,5
// O(C + R) where C is number of cities and R is number of roads