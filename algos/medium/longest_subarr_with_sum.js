// max subarry sums to 0 or n

function maxSubarrSum(arr, n) {
  var hash = {};
  var length = 0, s, e, sum = 0;

  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (hash[sum] !== undefined) {
      var currentLength = i - hash[sum];
      if (currentLength > length) {
        length = currentLength;
        s = hash[sum] + 1;
        e = i;
      }
    }
    hash[sum + n] = i;
  }
  console.log(hash);
  return "longest length is " + length + " and the indexes are: " + [s, e]
}

console.log(maxSubarrSum([-3,1,4,2], 5)); // 1,3 and length 2
console.log(maxSubarrSum([2,6,3,4,-3,-7,3,5,-6,2,4], 0)); // 2,6 length = 5p longest_subarr_given_sum(0, [3,-3,1,4,-5,2]) # [3,-3,1,4,-5]
// p longest_subarr_given_sum(3, [2,-3,-1,4,-5,4]) # [4,5,4]
// p longest_subarr_given_sum(5, [-3,1,4,2]) # [1,4]
// p longest_subarr_given_sum(5, [2,1,3,1,-3,4]) # [3,1,-3,4]
// p longest_subarr_given_sum(5, [1,4,-6,2,-1,4,5,-6,1,1,3]) # [2,-1,4,5,-6,1]
