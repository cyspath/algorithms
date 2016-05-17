# Sum 0
# Given an array, find the longest sub-array that sums up to 0.
#
# Solution
#
# It would be tempting to do recursion, and find all sub-arrays starting at each index (similar to the longest palindrome problem) and then find the longest - that's a O(n^2) algorithm
# Better algo is to track cumulative sum, if the sum has been seen before then we know that elements between current index and prev sum index adds up to 0 sum.
# Repeat this until we reach the end of the array and track the longest sub-array seen so far.

# O(n)

def longest_subarr(arr)
  max_len = 0
  sum = 0
  store = {}

  arr.each_with_index do |n, i|
    sum += n

    # special case if started at 0
    max_len = i + 1 if sum == 0

    if store[sum]
      max_len = [max_len, i - store[sum]].max
    else
      store[sum] = i
    end
  end
  max_len
end

p longest_subarr([7,5,-3,1,2]) # 3
p longest_subarr([-3,1,2,3]) # 3
p longest_subarr([-3,1,2,3,-6,4,-3,5,-13,6,7,8,9]) # 2 3 -6 4 -3 = 5
