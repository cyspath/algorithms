# Find a duplicate, Space Edition™.
# We have a list of integers, where:
#
# The integers are in the range 1..n
# The list has a length of n+1
# It follows that our list has at least one integer which appears at least twice. But it may have several duplicates, and each duplicate may appear more than twice.
#
# Write a function which finds any integer that appears more than once in our list.

# O(n) time and O(1) space
def find_dup(arr)
  # flag index
  first_dup = nil

  arr.each do |el|
    if arr[el.abs] < 0
      first_dup = el.abs
      break
    else
      arr[el.abs] = - arr[el.abs]
    end
  end

  arr.each_with_index { |n, i| arr[i] = n.abs } # make sure array is at original form
  first_dup
end

p find_dup([4,3,4,2,1,5,2,2,2,8,9]) #2 or 4
p find_dup([6,5,4,3,2,1,5]) #5
