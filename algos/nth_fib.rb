# Nth Fibonacci number
# Write a function fib() that a takes an integer n and returns the nth Fibonacci number.
#
# Example
#
# fibo(5) => 5
# fibo(10) => 55
# Solution
#
# We can use a top down recursive approach and memoize it to make it efficient, but we're adding extra O(n) space here.
# Or we can use a bottom up iterative approach and avoid using the extra space

# iterative O(n) time, O(1) space
def iterative_nth_fib(n)
  return 1 if n <= 2
  a = 1
  b = 1
  i = 3
  while i <= n
    new_a = b
    b = a + b
    a = new_a
    i += 1
  end
  b
end

p iterative_nth_fib(5) #5
p iterative_nth_fib(10) #55

# recursion O(n), O(n) space

def recur_nth_fib(n)
  nth_fib(n, { 1 => 1, 2 => 1 })[n]
end

def nth_fib(n, hash)
  return hash if n <= 2
  nth_fib(n, hash)
  hash[n] = hash[n -1] + hash[n - 2]
  hash
end

p recur_nth_fib(5) #5
p recur_nth_fib(10) #55
