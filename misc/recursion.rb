def fib(nth)
  return nil if nth < 1
  return 0 if nth == 1
  return 1 if nth == 2
  fib(nth - 1) + fib(nth - 2)
end

# 0, 1, 1, 2, 3, 5, 8...
# p fib(7)

def fib(n)
  return nil if n < 1
  return [0] if n == 1
  return [0, 1] if n == 2
  result = fib(n - 1)
  result.push(result[-1] + result[-2])
end

# p fib(7)
