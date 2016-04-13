################## Fibonacci ########################

def fib(n)
  store = {}
  i = 1
  while i <= n
    if i <= 2
      store[i] = 1
    else
      val = store[i - 1] + store[i - 2]
      store[i] = val
    end
    i += 1
  end
  store[n]
end

################## BYTELANDIAN COIN ########################

# Each Bytelandian gold coin has an integer number written on it. A coin n can be exchanged in a bank into three coins: n/2, n/3 and n/4. But these numbers are all rounded down (the banks have to make a profit).
#
# You can also sell Bytelandian coins for American dollars. The exchange rate is 1:1. But you can not buy Bytelandian coins.
#
# You have one gold coin. What is the maximum amount of American dollars you can get for it?
#
# Input
#
# The input will contain several test cases (not more than 10). Each testcase is a single line with a number n, 0 <= n <= 1 000 000 000. It is the number written on your coin.
#
# Output
#
# For each test case output a single line, containing the maximum amount of American dollars you can make.
#
# Example
#
# Input:
# 12
# 2
#
# Output:
# 13
# 2
# You can change 12 into 6, 4 and 3, and then change these into $6+$4+$3 = $13. If you try changing the coin 2 into 3 smaller coins, you will get 1, 0 and 0, and later you can get no more than $1 out of them. It is better just to change the 2 coin directly into $2.

def byte_coin(n)
  hash = {0 => 0}
  i = 1
  while i <= n
    sum = hash[i/2] + hash[i/3] + hash[i/4]
    sum > i ? hash[i] = sum : hash[i] = i
    i += 1
  end
  hash[n]
end

# p byte_coin(12) #13
# p byte_coin(16) #17
# p byte_coin(6) #6

##################### Matrix top-left to bot-right paths #########################

# Given a MxN matrix, find the total number of possible paths from top-left to bottom-right element, you can go rightwards and downwards only.
# Now, assume some of the entries in the matrix are blocked, find the number of such paths. For example: For a 3X3 matrix, total number of paths in first case is 6!/3!3! = 20.
# For second case, if we block entry (2,2), we have only 2 paths available.

# 1  1  1  1
# 1  2  3  4
# 1  3  6  10
# 1  4  10 20

# 4x4

def topleft_to_botright_path(m)
  i = 0
  while i < m.length
    j = 0
    while j < m[i].length
      if i == 0 || j == 0
        m[i][j] = 1
      else
        m[i][j] = m[i][j - 1] + m[i - 1][j]
      end
      j += 1
    end
    i += 1
  end
  # return last index
  m[i - 1][j - 1]
end

# p topleft_to_botright_path([[0,0,0],[0,0,0],[0,0,0]]) #6
# p topleft_to_botright_path([[0,0,0,0],[0,0,0,0],[0,0,0,0], [0,0,0,0]]) #20


###################### COIN CHANGE PROBLEM ########################

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


##################### LEAST COIN CHANGE PROBLEM #########################

#   0 1 2 3 4 5 6 7 8 9 10
# 1 0 1 2 3 4 5 6 7 8 9 10
# 2 0 1 1 2 2 3 3 4 4 8 9
# 5 0 1 1 2 2 1 2 2 3 3 2

def least_coin_change(n, coins)
  arr = Array.new(coins.length) { Array.new(n + 2) }

  i = 0
  while i < arr.length
    j = 0
    while j < arr[i].length

      if j == 0
        arr[i][j] = coins[i]
      elsif i == 0
        arr[i][j] = j - 1
      elsif arr[0][j] >= arr[i][0]
        # get min of num_coins above vs arr[row][total val - coin val] + 1
        new_coin_count = arr[i][(arr[0][j] - arr[i][0]) + 1] + 1
        arr[i][j] = [arr[i - 1][j], new_coin_count].min
      else
        arr[i][j] = arr[i - 1][j]
      end
      j += 1
    end
    i += 1
  end
  arr[i - 1][j - 1]
end

# p least_coin_change(30, [1,10,25]) #3


##############################################
# Given two integers ‘n’ and ‘sum’, find count of all n digit numbers with sum of digits as ‘sum’. Leading 0’s are not counted as digits.
# 1 <= n <= 100 and 1 <= sum <= 50000
#
# Example:
#
# Input:  n = 2, sum = 2
# Output: 2
# Explanation: Numbers are 11 and 20
#
# Input:  n = 2, sum = 5
# Output: 5
# Explanation: Numbers are 14, 23, 32, 41 and 50
#
# Input:  n = 3, sum = 6
# Output: 21

# THINKING LOGIC....
# $count = {}
#   sum
#    0  1  2  3  4  5  6
# 1  1  1  1  1  1  1  1
# 2  1  2  3  4  5  6  7
# 3  1  3  6  10 15 21 28
# 4  1  4  10 20 35 56 84
#
# for n = 3 sum = 6 we get 28, subtract the 0 elements, so 28 - 7(n=2, sum=6) = 21
# for n = 4 sum = 3 we get 20, subtract the 0 elements, so 20 - 10 = 10

def count_n_digit_number_with_sum(n, sum)
  total = recurse_count(n, sum)
  total - $count[[n - 1, sum]]
end

def recurse_count(n, sum)
  return 1 if n == 1

  c = 0
  (0..sum).each do |s|
    if !$count[[n - 1, s]]
      $count[[n - 1, s]] = recurse_count(n - 1, s)
    end
    c += $count[[n - 1, s]]
  end
  c
end

# p count_n_digit_number_with_sum(3, 6) #21
# p count_n_digit_number_with_sum(4, 3) #10


##############################################


# Samantha and Sam are playing a game. They have 'N' balls in front of them, each ball numbered from 0 to 9, except the first ball which is numbered from 1 to 9. Samantha calculates all the sub-strings of the number thus formed, one by one. If the sub-string is S, Sam has to throw 'S' candies into an initially empty box. At the end of the game, Sam has to find out the total number of candies in the box, T. As T can be large, Samantha asks Sam to tell T % (109+7) instead. If Sam answers correctly, he can keep all the candies. Sam can't take all this Maths and asks for your help.
#
# Help him!
#
# Input Format
# A single line containing a string of numbers that appear on the first, second, third ball and so on.
#
# Output Format
# A single line which is the number of candies in the box, T % (109+7)
#
# Constraints
# 1 ≤ N ≤ 2*105
#
# Sample Input #00
#
# 16
# Sample Output #00
#
# 23
# Explanation #00
#
# The substring of number 16 are 16, 1 and 6. Whose sum is 23.
#
# Sample Input #01
#
# 123
# Sample Output #01
#
# 164
# Explanation #01
#
# The sub-strings of 123 are 1, 2, 3, 12, 23, 123 which sums to 164.


def combination(arr)
  return [[]] if arr.length == 0
  current = arr.pop
  result = combination(arr)
  result.concat(result.map { |el| el.dup.push(current) })
end

# def sum_of_comb(str)
#   sum = 0
#   arr = str.split("")
#   combination(arr).each do |el|
#     sum += el.join("").to_i
#   end
#   sum
# end

def sum_of_comb(str)
  arr = str.split("")
  sum = 0

  i = 0
  while i < arr.length
    j = i
    while j < arr.length
      sum += (arr[i..j].join("").to_i)
      j += 1
    end
    i += 1
  end
  sum % (10**9+7)
end

##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
