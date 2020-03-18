require 'byebug'

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

# p timer_rec(33)

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

# p timer_rec_hash(33)

# Coin change dp
def coin_change(coins, total)

  coins = coins.unshift(0)

  # set up table
  table = Array.new(coins.length) { Array.new(total + 1, 0) }
  table.each { |row| row[0] = 1 }

  result = 0

  x = 1
  while x < coins.length
    break if coins[x] > total

    y = 1
    while y <= total

      val1 = table[x][y - coins[x]]
      val2 = table[x - 1][y]
      table[x][y] = val1 + val2
      result = table[x][y]

      y += 1
    end
    x += 1
  end

  table.each { |row| p row }
  return result
end

puts 'coin_change([1,2,3], 7)'
puts coin_change([1,2,3], 7)
puts
puts 'coin_change([1,5,10,25], 6)'
puts coin_change([1,5,10,25], 6)
puts
puts 'coin_change([1,5,10,25], 25)'
puts coin_change([1,5,10,25], 25)
