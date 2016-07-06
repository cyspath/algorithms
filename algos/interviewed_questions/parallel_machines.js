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
