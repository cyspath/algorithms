// Maximum absolute difference between sum of two contiguous sub-arrays
// Given an array of integers, find two non-overlapping contiguous sub-arrays such that the absolute difference between the sum of two sub-arrays is maximum.

// Example:

// Input: [-2, -3, 4, -1, -2, 1, 5, -3]
// Output: 12
// Two subarrays are [-2, -3] and [4, -1, -2, 1, 5]

// Input: [2, -1, -2, 1, -4, 2, 8]
// Output: 16
// Two subarrays are [-1, -2, 1, -4] and [2, 8] 

// O(n) -> find continous max sum subarray and min subarray individually
// this is Kadane’s algorithm
const maxDifferenceBetweenSumOfTwoContiguousSubarrays = function(arr) {

    const getSubarray = function (max = true) {
        let peak = 0, peakCoor = [0,0], currentSum = 0, i = 0, j = i;
        while (i < arr.length) {
            const newSum = currentSum + arr[j];
            if ((max && newSum > 0) || (!max && newSum < 0)) {
                currentSum = newSum;
                if ((max && newSum > peak) || (!max && newSum < peak)) {
                    peak = newSum;
                    peakCoor = [i, j + 1];
                }
                j++;
            } else {
                currentSum = 0;
                i = j = j + 1;
            }
        }
        return arr.slice(peakCoor[0], peakCoor[1]);
    }

    return [getSubarray(true), getSubarray(false)];
}
// console.log(maxDifferenceBetweenSumOfTwoContiguousSubarrays([-2, -3, 4, -1, -2, 1, 5, -3]))
// console.log(maxDifferenceBetweenSumOfTwoContiguousSubarrays([2, -1, -2, 1, -4, 2, 8]))

//=============================================================================================

