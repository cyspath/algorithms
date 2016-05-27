# given arr of n length, and k, find number of pairs [i,j] that is divisible by k.

def two_sum_divisible_by_k(k, arr)
  count = 0
  i = 0
  while i < arr.length - 1
    j = i + 1
    while j < arr.length
      count += 1 if (arr[i] + arr[j]) % k == 0
      j += 1
    end
    i += 1
  end
  count
end


p two_sum_divisible_by_k(3, [1, 3, 2, 6, 1, 2])

result = []
100.times { result.push rand(100) }
p result
