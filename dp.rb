# Fib
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

#############################
# recursive
def fib_rec(n)
  return 0 if n == 1
  return 1 if n == 2
  fib_rec(n - 1) + fib_rec(n - 2)
end

def timer_rec(arg)
  start = Time.now
  result = fib_rec(arg)
  duration = Time.now - start
  result.to_s + " - recursive solution, took runtime of: " + duration.to_s
end

p timer_rec(33)

#############################
# recursive with hash look up
$hash_table = {1 => 0, 2 => 1}
def fib_rec_hash(n)
  return $hash_table[n] if $hash_table[n]
  $hash_table[n] = fib_rec_hash(n - 2) + fib_rec_hash(n - 1)
  $hash_table[n]
end

def timer_rec_hash(arg)
  start = Time.now
  result = fib_rec_hash(arg)
  duration = Time.now - start
  result.to_s + " - recursive hash look up solution, took runtime of: " + duration.to_s
end

p timer_rec_hash(33)
