# flatten array

def flatten(arr)
  i = 0
  while i < arr.length

    if arr[i].class == Array
      current = arr[i]
      arr.delete_at(i)
      flatten(current).each do |el|
        arr.insert(i, el)
        i += 1
      end
      next
    end

    i += 1
  end

  arr
end

# p flatten([[1,2,[3,4]],[5,6],7,[8,[9]]])

# binary_string
def binary_string(n)
  arr = []
  while n != 0
    arr.unshift(n % 2)
    n /= 2
  end
  arr
end

binary_string(8)
