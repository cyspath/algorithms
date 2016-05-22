def to_binary(n)
  result = []
  while n > 0
    result.unshift(n % 2)
    n = n / 2
  end
  result.join("")
end

p to_binary(8)
p to_binary(1)
