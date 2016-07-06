// Parallel machines
//
// in this problem you are given an array of n machines and number of tasks needs to be performed
// for each item in the array, it will be a number repressenting the time required for this
// machine to perform one task. Find the minimum time needed to complete all the tasks.
//
// for example, imagine an array of machines which can complete a task in 2sec, 3sec, and 5sec,
// and to perform 4 tasks. The Answer should be 5sec
//
// machines: [2,3,5]
// t: 4
// answer => 5 because if you assign 2 jobs to machine 1, 1 job to machine 2, and 1 job to machine 3
// you will require minimum of 5 seconds to complete all 4 tasks.
//
// hint: dp, sorting data structure
//
//               insert  	  deleteMin  	  remove  	  findMin
// binary heap	 O(log n)	     O(log n)	   O(log n)	      O(1)


require('../general/data_structures.js');

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

console.log(minTime([2,3,5], 0)); // 0
console.log(minTime([2,3,5], 8)); // 9
