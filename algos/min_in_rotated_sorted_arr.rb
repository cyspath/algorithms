def find_min(arr)
  return arr[0] if arr[0] <= arr[-1]
  left = arr.take(arr.length/2)
  right = arr.drop(arr.length/2)

  if left[-1] < right[-1]
    find_min(left)
  else
    find_min(right)
  end
end

p find_min([1])
p find_min([2,1])
p find_min([1,2,0])
p find_min([2,3,4,5,6,7,8,1])
p find_min([1,2,3])
