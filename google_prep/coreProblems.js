const data = require('./data.js');

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


// require('../general/data_structures.js');

// logic:
// for machines [2,3,5] and tasks up to 9
//
// tasks           machines           min      added(2, 3, or 5) machine
// 1           2      3      5         2            2
// 2           4      3      5         3            3
// 3           4      6      5         4            2
// 4           6      6      5         5            5
// 5           6      6      10        6            2
// 6           8      6      10        6            3
// 7           8      9      10        8            2
// 8           10     9      10        9            3
// 9           10     12     10        10           2
//
// we can use a min heap to keep track of min, first initiate a min heap with initial values
// for 1 task, take the min of minheap by pop(), this means that if we have to compare
// using machine 1 vs 2 vs 3, 1 with 2 second time is more efficient. Now we need to
// modify the heap, since we have choosen machine 1(2sec), we pop() and add in a new node
// where it is still machine 1, but now at value of 4, meaning that if we use machine 1 again
// for second job, it will take 4 seconds. However, now we have heap of 3, 4, and 5, so we will
// pop() and get machine 2(3sec), then reintroduce it back in by adding machine2(now 6sec)

function minTime(arr, tasks) {
  var minHeap = new BinaryHeap(function (x) { return x.val }); // heap compares node's val attribute

  arr.forEach(function (n) {
    minHeap.push({ val: n, machine: n });
  })

  var result = { val: 0 };
  for (var i = 1; i <= tasks; i++) {
    result = minHeap.pop();
    minHeap.push({ val: result.val + result.machine, machine: result.machine })
  }

  return result.val + ' seconds';
}

// console.log(minTime([2,3,5], 0)); // 0
// console.log(minTime([2,3,5], 8)); // 9


const rand7FromRand2 = () => {
	const rand2 = () => Math.floor(Math.random() * 2); // 0-1
	// 0 or 8 + 0 or 4 + 0 or 2 + 0 or 1
	const n = (8 * rand2() + 4 * rand2() + 2 * rand2() + rand2()) + 1;
	if (n > 7) return rand7FromRand2();

	return n % 7 + 1;
}



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
