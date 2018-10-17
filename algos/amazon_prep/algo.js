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

