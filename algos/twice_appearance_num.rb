# Which appears twice
# Given an array where every number in the range 1...n appears once except for one number which appears twice. Write a function to find the number that appears twice.
#
# Example
# The difference between expected sum of the range and actual sum is the repeating number
# i/p: [1,2,3,4,5,6,6], 6
# o/p: 6

def twice_num(arr)
  expected = (1..(arr.length - 1)).to_a
  arr.inject(:+) - expected.inject(:+)
end

p twice_num([1,2,3,4,5,6,6]) # 6
