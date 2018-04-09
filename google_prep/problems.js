const data = require('./data.js');

const numbersSmaller = (arr, num) => {
	const numLength = getNumberLength(num);

	let results = arr;
	let prevList = arr;
	let currentList = [];

	for (let p = 1; p < numLength; p++) {
		arr.forEach((a) => {
			prevList.forEach((b) => {
				const newNumber = a * Math.pow(10, p) + b;
				if (newNumber < num) {
					currentList.push(newNumber);
				}
			})
		})
		results = results.concat(currentList);
		prevList = currentList;
		currentList = [];
	}
	return results;
}

const getNumberLength = (num) => {
	let count = 0;
	while (num > 1) {
		count++;
		num = num / 10;
	}
	return count;
}


// console.log(numbersSmaller([7,3,8], 8700))


const subarr = (arr) => {
	let sum = 0;
	let currentSum = 0;

	for (let i = 0; i < arr.length; i++) {
		for (var j = i; j < arr.length; j++) {
			currentSum += arr[j];
			console.log(currentSum);
			sum += currentSum;
		}
		currentSum = 0;
	}
	return sum;
}
//  console.log(subarr([1, 3, 7])) // 36

const generateParenthesis = (n) => {
	const results = [];
	const recurse = (l, r, str) => {
		if (l > r) return;
		if (l === 0 && r === 0) results.push(str);
	
		if (l > 0) recurse(l - 1, r, str + '(');
		if (r > 0) recurse(l, r - 1, str + ')');
	}
	recurse(n, n, '');
	return results;
}

// console.log(generateParenthesis(3)); // [ '((()))', '(()())', '(())()', '()(())', '()()()' ]

const combination = (arr) => {
	if (!arr.length) return [[]];
	const result = [];
	const el = arr.pop();
	const child = combination(arr);
	return result.concat(child).concat(child.map((c) => c.concat([el])));
}

// console.log(combination(['a','b','c']));

const isMirrorBST = (n1, n2) => {		
	if (n1 === undefined && n2 === undefined) return true;
	if (!!n1 !== !!n2) return false;
	if (n1.val !== n2.val) return false;
	
	const child1 = isMirrorBST(n1.left, n2.right);
	if (!child1) return false;

	const child2 = isMirrorBST(n1.right, n2.left);
	if (!child2) return false;

	return true;
}

// console.log(isMirrorBST(data.bst1, data.bst1Mirror));
// console.log(isMirrorBST(data.bst1, data.bstBad));

const binarySearch = (arr, n) => { // return index or false
	if (!arr.length) return false;
	const midIdx = Math.floor(arr.length / 2);
	
	if (n === arr[midIdx]) {
		return midIdx;
	} else if (n < arr[midIdx]) {
		return leftIdx = binarySearch(arr.slice(0, midIdx), n);
	} else {
		const rightIdx = binarySearch(arr.slice(midIdx + 1), n);
		return midIdx + 1 + rightIdx;
	}
}

// console.log(binarySearch([1,2,3,4,5,6,7], 5)); // 4
// console.log(binarySearch([1,2,3,4,5,6,7], 0)); // false

const occuranceOfNumberSortedArray = (arr, n) => {
	const firstIdx = binarySearch(arr, n);
	if (firstIdx === false) return 0;
	
	let count = 1;
	for (let i = firstIdx - 1; i >= 0; i--) {
		if (arr[i] === n) count++;
	}
	for (let i = firstIdx + 1; i < arr.length; i++) {
		if (arr[i] === n) count++;
	}
	return count;
}

// console.log(occuranceOfNumberSortedArray([1,2,3,4,5,5,5,5,6,7], 5));

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	print() {
		console.log(`HEAD: ${this.head ? this.head.val : ''}, TAIL: ${this.tail ? this.tail.val : ''}`);
		
		let current = this.head;
		while(current) {
			console.log(`<${current.val}>`);
			current = current.next;
		}
	}

	add(node) {
		if (this.tail) {
			this.tail.next = node;
			node.prev = this.tail;
		} else {
			this.head = node;
		}
		this.tail = node;
		return node;
	}

	removeFirst() {
		const first = this.head;
		if (first) {
			this.head = first.next;
			if (this.head) {
				this.head.prev = null;
			}
			first.next = null;
		}
		return first;
	}

	moveNodeToEnd(node) {
		const left = node.prev;
		const right = node.next;

		node.next = null;
		node.prev = null;

		if (left) left.next = right;
		if (right) right.prev = left;

		if (this.head === node) {
			this.head = right;
		}

		if (this.tail === node) {
			this.tail = left;
		}
		this.add(node);
	}
}

class LRU {
	constructor() {
		this.ll = new LinkedList;
		this.store = {};
		this.count = 0;
		this.max = 5;
	}

	get(val) {
		let node = this.store[val];
		if (node) {
			// cache still has node, move node to end of ll
			this.ll.moveNodeToEnd(node);
		} else {
			// cache does not have node;
			node = { val, next: null, prev: null };
			this.store[val] = node;
			// add node to linked list
			this.ll.add(node);
			if (this.count >= this.max) {
				this.removeOldest()
			} else {
				this.count++;
			}
		}
		this.ll.print();
		console.log(Object.keys(this.store));
		
		return node;
	}

	removeOldest() {
		const oldestNode = this.ll.removeFirst();
		delete this.store[oldestNode.val];
		return oldestNode;
	}

}

// const lru = new LRU;
// lru.get('a');
// lru.get('b');
// lru.get('c');
// lru.get('d');
// lru.get('e');
// lru.get('f');
// lru.get('a');
// lru.get('d');
// lru.get('f');

const findMaxInCircularArr = (arr) => {
	if (arr.length === 1) return arr[0];
	if (arr[0] < arr[arr.length - 1]) return arr[arr.length - 1];
	
	const midIdx = Math.floor(arr.length / 2);
	const mid = arr[midIdx];
	if (mid === arr[arr.length - 1] || mid < arr[arr.length - 1]) {
		return findMaxInCircularArr(arr.slice(0, midIdx));
	} else {
		return findMaxInCircularArr(arr.slice(midIdx));
	}
}

// [
// 	[5,6,7,8,1,2,3,4],

// 	[1,2,3,4,5,6,7,8],
// 	[7,8,1,2,3,4,5,6],
// 	[2,3,4,5,6,7,8,1],	
// 	[3,4,5,6,7,8,1,2],		
// ].forEach((a) => {
// 	console.log(findMaxInCircularArr(a));
// })

const permutations = (arr) => {
	if (arr.length === 1) return [arr];
	let result = [];
	arr.forEach((e, i, a)=> {
	  const rest = a.slice(0,i).concat(a.slice(i + 1));
	  const child = permutations(rest);
	  result = result.concat(child.map((el) => {
		return el.concat([e]);
	  }))
	})
	return result;
  }
  
  // console.log(permutations(['a','b','c']))
  
  const bst = {
	val: 5,
	left: {
	  val: 3,
	  left: { val: 1 },
	  right: { val: 4}
	},
	right: {
	  val: 8,
	  left: { val: 7, left: { val: 6 }},
	  right: { val: 9 }
	},
  }
  
  const isBst = (node) => {
	if (!node) return null;
	const left = isBst(node.left);
	const right = isBst(node.right);
	if (left === false || right === false) return false;
  
	const minMax = {};
  
	if (left === null) {
	  minMax.min = node.val;
	} else if (left.max > node.val) {
	  return false;
	} else {
	  minMax.min = left.min;
	}
	
	if (right === null) {
	  minMax.max = node.val;
	} else if (right.min <= node.val) {
	  return false;
	} else {
	  minMax.max = right.max;
	}
	return minMax;
  }
  
  
  // console.log(isBst(bst))
  
  const kLargest = (k, node) => {
	const largest = [];
	
	const recurse = (node) => {
	  if (!node) return;
	  recurse(node.right);
	  if (k > 0) {
		largest.push(node.val);
		k--;
	  }
	  recurse(node.left);
	}
	recurse(node);
	return largest;
  }
  
  // console.log(kLargest(8, bst))
  
  const lowCommonAncestor = (node, v1, v2) => {
	let ancestor;
	const recurse = (node) => {
	  if (!node) return;
	  const left = recurse(node.left);
	  const right = recurse(node.right);
	  
	  let sum = 0;
	  
	  if (left === 1 && right === 1) {
		sum = 2;
		ancestor = node.val;
		return;
	  }
	  
	  if (left === 1 || right === 1) {
		sum += 1;
	  }
	  
	  if (node.val === v1 || node.val === v2) {
		sum += 1;
	  }
	  
	  return sum;
	}
	recurse(node);
	return ancestor;
  }
  
  // console.log(lowCommonAncestor(bst, 1,9))
  
  const createBstFromInorder = (arr) => {
	if (arr.length === 0) return null;
	const midIdx = Math.floor(arr.length / 2);
	const node = { val: arr[midIdx] };
	node.left = createBstFromInorder(arr.slice(0, midIdx));
	node.right = createBstFromInorder(arr.slice(midIdx + 1));
	return node;
  }
  
  // console.log(createBst([1,2,3,4,5,6,7,8,9]))
  

// const parallelMachinesJobTime = (times, n) => {
// 	const machineLoad = times.slice().map((e) => 0); // [0, 0, 0];

// 	const recurse = (n) => {
// 		if (n === 0) return machineLoad;
// 		const child = recurse(n - 1);

// 		const minTimes = times.map((t, i) => {
// 			const childClone = child.slice();
// 			childClone[i] += t;
// 			return childClone.reduce((max, el) => {
// 				if (el > max) max = el;
// 				return max;
// 			});
// 		})

// 		const machineIdx = minTimes.reduce((accum, el, i) => {
// 			if (el < accum.min) {
// 				accum.min = el;
// 				accum.idx = i;
// 			}
// 			return accum;
// 		}, { min: minTimes[0], idx: 0 }).idx;

// 		const currentLoad = child.slice();
// 		currentLoad[machineIdx] += times[machineIdx];
// 		// console.log(currentLoad);
		
// 		return currentLoad;
// 	}
// 	return recurse(n).reduce((max, el) => {
// 		if (el > max) max = el;
// 		return max;
// 	});
// }

// tasks           machines           min      added(2, 3, or 5) machine
// 1           2      3      5         2            2
// 2           4      3      5         3            3
// 3           4      6      5         4            2
// 4           6      6      5         5            5

const parallelMachinesJobTime = (machineTimes, n) => {
	const heap = new data.Heap('min');
	machineTimes.forEach((m) => heap.add({ accumTime: m, machineTime: m }));

	let i = 1;
	while (true) {
		if (i === n) return heap.pop().accumTime;
		
		// next task would take min time of...
		const root = heap.pop();
		root.accumTime += root.machineTime;
		heap.add(root);

		i++;
	}
}

// const machineTimes = [2, 3, 5];
// console.log(parallelMachinesJobTime(machineTimes, 1)); // 2
// console.log(parallelMachinesJobTime(machineTimes, 2)); // 3
// console.log(parallelMachinesJobTime(machineTimes, 3)); // 4
// console.log(parallelMachinesJobTime(machineTimes, 4)); // 5
// console.log(parallelMachinesJobTime(machineTimes, 5)); // 6

const levelTraversal = (node) => {
	const result = [];
	let current = [node];
	while (current.length > 0) {
		current.forEach((n) => result.push(n.val));
		const temp = current.reduce((accum, n) => {
			if (n.left) accum.push(n.left);
			if (n.right) accum.push(n.right);
			return accum;
		}, []);
		current = temp;
	}
	return result;
}

// console.log(levelTraversal(data.bst1));

const divide = (a, b) => {

	const recurse = (m, rest) => {		
		if (rest < b) return 0;

		const next = b * m * 2;
		if (next === rest) return m * 2;
		if (next < rest) return recurse(m * 2, rest);
		if (next > rest) return m + recurse(1, rest - (m * b));
	}
	const m =  recurse(1, a);

	// adding 1 decimal position
	let deci = 0;
	const remainder = a - (m * b);
	if (remainder > 0) {
		deci = recurse(1, remainder * 10);
	}

	return `${m}.${deci}`;
}

// console.log(divide(2, 3));
// console.log(divide(16, 2));
// console.log(divide(24, 3));
// console.log(divide(15, 3));
// console.log(divide(20, 3));

const validBST = (node) => {
	let value;
	const recurse = (node) => {

		if (node.left) {
			const left = recurse(node.left);
			if (left === false) return false;
		}

		if (value && node.val < value) {
			return false;
		} else {
			value = node.val;
		}

		if (node.right) {
			const right = recurse(node.right);
			if (right === false) return false;
		}

		return true
	}
	return recurse(node);
}

// console.log(validBST(data.bstBad));

// interate through once and get the running sum max idx,
// then from that idx interate back to beginning and find running sum max idx again
// result is from 2nd max sum idx to 1st max sum index
var maxSubArray = function(nums) {
	const maxValue = nums.reduce((accum, el) => el > accum ? el : accum);
	if (maxValue < 0) return `[${maxValue}] ${maxValue}`;

    let maxEndingHere = 0; maxSoFar = 0; a = 0; b = 0;
    for (let i = 0; i < nums.length; i++) {
		maxEndingHere = maxEndingHere + nums[i];

		if (maxEndingHere < 0) {
			maxEndingHere = 0;
			a = i + 1;
		}

		if (maxEndingHere > maxSoFar) {
			maxSoFar = maxEndingHere;
			b = i;
		}
    }

	return `[${nums.slice(a, b+1)}] ${maxSoFar}`;
};

// console.log(maxSubArray([-1, -2])); // -1
// console.log(maxSubArray([-2, -1])); // -1
// console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
// console.log(maxSubArray([-1,0,-2,2])); //2

const rand7FromRand5 = () => {
	const rand5 = () => Math.floor(Math.random() * 5); // 0-4
	
	const n = (5 * rand5() + rand5()) + 1;
	if (n > 21) return rand7FromRand5();

	return n % 7 + 1;
}

const rand7FromRand2 = () => {
	const rand2 = () => Math.floor(Math.random() * 2); // 0-1
	
	const n = (8 * rand2() + 4 * rand2() + 2 * rand2() + rand2()) + 1;
	if (n > 7) return rand7FromRand2();

	return n % 7 + 1;
}

const rand5FromRand3 = () => {
	const rand3 = () => Math.floor(Math.random() * 3); // 0-2
	
	const n = (3 * rand3() + rand3()) + 1;
	if (n > 5) return rand5FromRand3();

	return n % 5 + 1;
}

const rand7FromRand5Hash = {};
for (var i = 0; i < 1000000; i++) {
	const n = rand7FromRand2();
	// const n = rand5FromRand2();
	rand7FromRand5Hash[n] !== undefined ? rand7FromRand5Hash[n]++ : rand7FromRand5Hash[n] = 1;
}

// console.log(rand7FromRand5Hash);


// Input:  txt[] = "BACDGABCDA"  pat[] = "ABCD"
// Output:   Found at Index 0
// 		  Found at Index 5
// 		  Found at Index 6

const anagramSearch = (a, b) => {
	const letters = ('abcdefghijklmnopqrstuvwxyz'.toUpperCase()).split('');
	const freqA = letters.map((l) => 0);
	const freqCurrent = letters.map((l) => 0);
	
	// populate freqA with a
	for (let i = 0; i < a.length; i++) {
		const el = a[i].charCodeAt()-65;
		freqA[el] ? freqA[el] += 1 : freqA[el] = 1;
		const el2 = b[i].charCodeAt()-65;;
		freqCurrent[el2] ? freqCurrent[el2] += 1 : freqCurrent[el2] = 1;		
	}

	const results = [];

	let i = 0, j = a.length - 1;
	while (j < b.length) {
		const mismatch = freqCurrent.some((l, i) => l !== freqA[i]);
		if (!mismatch) {
			results.push(i);
		}
		freqCurrent[b[i].charCodeAt()-65] -= 1;
		i++;
		j++;
		
		if (j >= b.length) continue;
		freqCurrent[b[j].charCodeAt()-65] += 1;	
	} 
	return results;
}

// console.log(anagramSearch("ABCD", "BACDGABCDA"));
