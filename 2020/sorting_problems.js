// https://leetcode.com/problems/count-of-smaller-numbers-after-self/
// You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].
// Input: [5,2,6,1]
// Output: [2,1,1,0] 
// O(nlogn) modified mergeshort instead of O(n^2), anything in mergesort that got moved to left, when b < a, a will increase number of smaller el on its right
var countSmaller = function(nums) {
    var mergeSort = function (arr) {
       var divide = function (i,j) {
           if (i > j) return [];
           if (i === j) return [{ val: arr[i], count: 0, idx: i }];
           var k = Math.floor((j - i) / 2 + i);
           return merge(divide(i, k), divide(k + 1, j));
       }
       var merge = function(a,b) {
           var r = [];
           var i = 0, j = 0, smallerCount = 0;
           while (i < a.length && j < b.length) {
               if (b[j].val < a[i].val) { // put b before a, if equal put after since it wont count as being smaller than a on the right side
                    smallerCount++;
                    r.push(b[j]);
                    j++;
               } else {
                    a[i].count += smallerCount;
                    r.push(a[i]);
                    i++;
               }
           }
           while (i < a.length) {
               a[i].count += smallerCount;
               r.push(a[i]);
               i++;
           }
           while (j < b.length) {
               r.push(b[j]);
               j++;
           }
           return r;
       }
       return divide(0, arr.length - 1); // empty arr will return []
    }

    var nodesSortedList = mergeSort(nums);
    var hash = nodesSortedList.reduce(function(ac, node) {
        ac[node.idx] = node.count;
        return ac;
    }, {});

    var result = [];
    for (var i = 0; i < nums.length; i++) {
        result.push(hash[i]);
    }
    return result;
};
// console.log(countSmaller([5,2,6,1]));
