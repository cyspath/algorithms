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
  num_zero = 32 - arr.length
  num_zero.times { arr.unshift(0) }
  arr.join()
end

# p binary_string(8)

# converts from string representation of number (4) into binary

def binary_to_int(str)
  arr = str.split('')
  sum = 0

  i = arr.length - 1
  expn = 0
  while i >= 0
    if arr[i] == '1'
      sum += (2**expn)
    end
    expn += 1
    i -= 1
  end
  sum

end

# p binary_to_int("0000000000111")
