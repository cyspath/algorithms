# Given a string S, print the longest substring P such that P > S lexicographically.
# You may assume that such substring exists.

def longest_lexi_sub(str)
  i = 0
  while i < str.length
    if str[i] >= str[0]
      break if higher_lexi(str, str[i..-1])
    end
    i += 1
  end
  str[i .. -1]
end

def higher_lexi(str1, str2)
  i = 0
  while i < str2.length
    if str2[i] > str1[i]
      return true
    end
    i += 1
  end
  false
end

# p longest_lexi_sub("africa") #frica
# p longest_lexi_sub("talongesty") #ty

########################################################################

# Given a 2D matrix of integers, sort it such that:
#
# - every row is sorted in ascending order from left to right
# - every column is sorted in ascending order from top to down
# - all items in the same row are unique
#
# You may assume the input matrix is always valid, meaning that such a sort is always possible.
#
# For example:
# for input matrix
#
#
# 1 3 5
# 3 2 4
# the output could be any of the following:
# valid output #1:
#
#
# 1 3 4
# 2 3 5
# valid output #2:
#
#
# 1 2 3
# 3 4 5
# valid output #3:
#
#
# 1 3 4
# 2 3 5
# One kinda trivial solution is to sort the 2D matrix column wise. For example, you can push all items into a heap and pop one after another, putting it into the matrix column after column. This would be a `O(n lg n)` time complexity where `n` is the number of items in the matrix, i.e., `n = rows*cols`. Can you design a more efficient algorithm?
#
# Follow-up: What if all items in the same column are also required to be unique?


########################################################################

# Define a function that can detect whether the characters of a string can be shuffled without repeating same characters as one other's neighbors. E.g. :
# apple >> alpep, so valid
# a >> a, valid
# aa >> aa, invalid/impossible
# aab >> aba, valid
# aaaabbcc >> acabacab, valid
# etc.
# You do not have to find one representation, just have to detect if it is possible or not!

def can_be_shuffled(str)
  return true if str.length == 1

  hash = {}
  i = 0
  while i < str.length
    if hash[str[i]]
      hash[str[i]] += 1
    else
      hash[str[i]] = 1
    end
    i += 1
  end
  return false if hash.length <= 1

  most_common_count = 0
  hash.each do |k, v|
    if v > most_common_count
      most_common_count = v
    end
  end

  if str.length%2 == 0
    return false if most_common_count > str.length/2
  else
    return false if most_common_count > str.length/2 + 1
  end
  true
end

# p can_be_shuffled('a')
# p can_be_shuffled('apple')
# p can_be_shuffled('aaaabbcc')
# p can_be_shuffled('abacabacabaca')
# p can_be_shuffled('aa') # false
# p can_be_shuffled('aaaaaabbbb') # false

########################################################################

# IMPORTANT!

# find consecutive integers in a list that give you the biggest sum
#
# Like for -2 5 -1 7 -3 it would be 5 -1 7

def consecutive_int_biggest_sum(arr)
  max = 0
  current_sum = 0

  result = []
  current_result = []

  arr.each_with_index do |n, i|
    if current_sum + n > 0
      current_sum = current_sum + n
      current_result.push(n)
    else
      current_sum = 0
      current_result = []
    end

    if current_sum > max
      max = current_sum
      result = current_result.dup
    end

  end

  result
end

# p consecutive_int_biggest_sum([-2,5,-1,7,-3]) # [5, -1, 7]
# p consecutive_int_biggest_sum([-5,5,-1,3,-7, -8, 5,1,-2]) # [5,-1,3]


########################################################################

# How many Fibonacci numbers exists less than a given number n.Can you find a function in terms of n , to get the number of fibonacci number less than n.
# Example : n = 6
# Answer: 6 as (0, 1, 1, 2, 3, 5)

def fib_less_than(n)
  return 0 if n <= 0
  return 1 if n <= 1
  fibs = [0, 1]
  while true
    i = fibs[-1] + fibs[-2]
    if i >= n
      p fibs
      return fibs.length
    else
      fibs.push(i)
    end
  end

end

# p fib_less_than(2)
# p fib_less_than(20)


########################################################################

# find the no of possible patterns in android lock screen. write a program to count them.


########################################################################

def max_consec_numbers(arr)
  max = 0
  current_sum = 0

  arr.each do |n|
    if current_sum + n >= 0
      current_sum += n
    else
      current_sum = 0
    end
    max = current_sum if current_sum > max
  end
  max
end

# p max_consec_numbers([-5,2,5,-3,1,6,-4,7,-3,2,1,-4]) #14
########################################################################

########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
