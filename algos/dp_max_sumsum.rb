# Given an array of positive and negative integers, find the max subsum along with indices.
#
# Time: O(n) since we do only a single pass over the array
# Space: constant, since we use max of 5 variables to keep track of rolling sum

def max_subsum(arr)
  max = arr[0]
  current_sum = arr[0]

  arr.each_with_index do |n, i|
    next if i == 0

    if current_sum + n <= 0
      current_sum = 0
    else
      current_sum += n
      max = current_sum if current_sum > max
    end
  end
  max

end

p max_subsum([2,-3,5,6]) # 11
p max_subsum([2,-3,5,1,-1,2, -6]) # 7
p max_subsum([2,-3,5,1,-1,2,-6,3,-2,5,-1,-2,6,-10]) # 10
p max_subsum([2,-3,5,1,-1,2,-12,3,-2,5,-1,-2,6,-10]) # 9
