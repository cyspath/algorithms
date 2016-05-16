# In place shuffle of an array
# basically rand a idx and swap that index el with arr[j], then decrement j and rand(j - 1)

def shuffle_arr(arr)
  j = arr.length - 1
  while j >= 0
    idx = rand(j + 1)
    arr[idx], arr[j] = arr[j], arr[idx]
    j -= 1
  end
  arr
end

def dist(arr)
  hash = Hash.new(0)
  100000.times do
    hash[shuffle_arr(arr).join("")] += 1
  end
  hash
end

p dist(['a','b','c'])
