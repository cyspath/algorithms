###################### COIN CHANGE PROBLEM ########################

def ways_coin_change(total, a)
  store = Hash.new(0)

  changes = (0..total).to_a
  a.unshift(0).each_with_index do |coin, i|
    changes.each do |change|
      # set boundries
      if change == 0
        store[[i, change]] = 1
        next
      elsif i == 0
        store[[i, change]] = 0
        next
      end

      # calculate current ways to make change
      change >= coin ? new_ways = store[[i, (change - coin)]] : new_ways = 0
      old_ways = store[[(i - 1), change]]
      store[[i, change]] = new_ways + old_ways
    end
  end
  store[[(a.length - 1), (changes.length - 1)]]
end

p ways_coin_change(5, [1,2,3]) #5
p ways_coin_change(6, [1,3,5]) #4 ways

# Objec­tive: Given a set of coins and amount, Write an algo­rithm to find out how many ways we can make the change of the amount using the coins given.
#
# Exam­ple:
#
# Amount = 5
# coins [] = {1,2,3}
# Ways to make change = 5
# {1,1,1,1,1} {1,1,1,2}, {1,2,2}, {1,1,3} {2,3}

# tables:

#   0 1 2 3 4 5
# 1 1 1 1 1 1 1
# 2 1 1 2 2 3 3
# 3 1 1 2 3 4 5
#
#   0 1 2 3 4 5 6
# 1 1 1 1 1 1 1 1
# 3 1 1 1 2 2 2 3
# 5 1 1 1 2 2 3 4

def coin_change(total, coins)
  arr = Array.new(coins.length + 1, nil)
  arr.map! { |e| e = Array.new(total + 2, nil)  }

  # set up columns and rows
  i = -2
  arr[0].map! do |e|
    i += 1
  end
  coins.each_with_index { |e, idx| arr[idx + 1][0] = e }

  # logic
  i = 1
  while i < arr.length
    j = 1
    while j < arr[i].length
      if i == 1 || j == 1
        arr[i][j] = 1
      elsif arr[0][j] < arr[i][0]
        arr[i][j] = arr[i - 1][j]
      else
        diff = arr[0][j] - arr[i][0]
        arr[i][j] = arr[i - 1][j] + arr[i][diff + 1]
      end
      j +=1
    end
    i += 1
  end
  arr[i - 1][j - 1]
end

# p coin_change(5, [1,2,3]) #5 ways
# p coin_change(6, [1,3,5]) #4 ways
