def bsearch(arr, n)
  return false if arr.length == 0
  left = arr.take(arr.length / 2)
  mid = arr[arr.length/2]
  right = arr.drop(arr.length / 2 + 1)

  if n < mid
    bsearch(left, n)
  elsif n == mid
    arr.length / 2
  else
    result = bsearch(right, n)
    return false if result == false
    arr.length / 2 + 1 + result
  end
end

# p bsearch([1,2,4,6,7,22,25,30], 3) #false
p bsearch([1,2,4,6,7,22,25,30,35], 45) #false
