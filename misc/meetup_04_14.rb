# 2 problems, one is check if there is idx where left of it adds to right of it
# another problem is calculation amt of rainfall on top of bar graphs

# def find_idx(arr)
#   left_sum = 0
#   right_sum = 0
#
#   # add up all elements and set to left sum
#   arr.each_with_index { |n, i| left_sum += n }
#
#   # from the end, start moving the index to the left
#   i = arr.length - 1
#   while i >= 0
#     right_sum += arr[i + 1] if arr[i + 1]
#     left_sum -= arr[i]
#
#     return i if right_sum == left_sum
#     i -= 1
#   end
#
#   return -1
# end
#
# find_idx([1,3,6,4,0])
# find_idx([1,2,3])

#  O(max(arr) * )

def sum_rainfall(arr)
  grid = populate_grid(arr)

  p grid
end

def populate_grid(arr)
  max = arr.max
  grid = []

  i = 0
  while i < max
    grid.push([])
    i += 1
  end

  grid.each do |row|
    i = 0
    while i < arr.length
      row.push(false)
      i += 1
    end
  end

  return grid
end

sum_rainfall([3, 0, 1, 2])
