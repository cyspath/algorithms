def reverse_num(n)
  # check if n is negative, if it is convert to pos first
  n < 0 ? neg = true : neg = false
  n = n.abs

  arr = []
  while n != 0
    arr.unshift(n % 10)
    n = n / 10
  end

  i = 0
  while i < arr.length
    n += arr[i] * (10**i)
    i += 1
  end

  neg ? -n : n
end

p reverse_num(12345)
p reverse_num(-123)
