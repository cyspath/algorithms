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

##########################################

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

##############################################

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



##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
##############################################
