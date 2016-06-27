def f(n)
  return 1 if n == 1
  f(n - 1) * n
end
#
# p f(5)
# p f(10)
# p f(15)
#

def trailingZeros(n)
  zeros = 0
  i = 0
  while (i <= n)
    # how many fives can this n give?
    factor = i
    count = 0
    while factor % 5 == 0 && factor != 0
      factor = factor / 5
      count += 1
    end
    zeros += count
    
    i += 5
  end
  zeros
end

p trailingZeros(5)
p trailingZeros(10)
p trailingZeros(25)
p trailingZeros(50)

p f(25) #6
p f(50) #12
