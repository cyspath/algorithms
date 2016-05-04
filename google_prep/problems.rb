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
# four sum
# [3,4,8,1,4,5,2,3,5,1,0] to get 12 use [3,4,3,4], [2,1,1,8] etc

def four_sum(arr, sum)
  hash = {}

  i = 0
  while i < arr.length - 1
    j = i + 1
    while j < arr.length
      # hash will have sum as key, and val is another hash where its keys are
      # i and j indexs and values are arr[i] and arr[j]
      current_sum = arr[i] + arr[j]
      current_pair = {i => arr[i], j => arr[j]}
      if hash[current_sum]
        hash[current_sum].push(current_pair)
      else
        hash[current_sum] = [current_pair]
      end

      j += 1
    end
    i += 1
  end

  result = []
  hash.each do |k, v|
    diff = sum - k
    if hash[diff]
      arr1 = hash[diff]
      arr2 = v
      arr1.each do |el_a|
        arr2.each do |el_b|
          if el_a.keys.include?(el_b.keys[0]) || el_a.keys.include?(el_b.keys[1])
            next
          else
            quad = el_a.values.concat(el_b.values).sort
            result.push(quad) if !result.include?(quad)
          end
        end
      end

    end

  end
  result
end

# p four_sum([5,13,1,7,16,4,2,1,3], 25) # [[3, 4, 5, 13], [2, 3, 4, 16], [1, 3, 5, 16], [2, 3, 7, 13], [1, 4, 7, 13], [1, 1, 7, 16]]

########################################################################

# The is a clever interview question that asks you to calculate the cube root of a number quickly. We can solve this by some mathematical tricks that won't require any calculates to take place, only table lookups. This algorithm will focus on calculating the cube root of 6 digit numbers (or less). For example, if the input is 636056 then your program should output 86.

def cube_root(n)
  # n is less than 1,000,000
  digits = {0=>0, 1=>1, 2=>8, 3=>7, 4=>4, 5=>5, 6=>6, 7=>3, 8=>2, 9=>9}
  digit = digits[n % 10]

  (0..9).to_a.each do |t|
    tens = (t * 10)**3
    if n > tens
      next
    elsif n < tens
      return (t - 1) * 10 + digit
    end
  end
  90 + digit
end

# p cube_root(636056) #86

########################################################################

# For this popular algorithm interview question, the input will be a string consisting only of the characters 0, 1 and ?, where the ? acts as a wildcard that can be either a 0 or 1, and your goal is to print all possible combinations of the string. For example, if the string is "011?0" then your program should output a set of all strings, which are: ["01100", "01110"].

def all_possible_01(str)
  i = 0
  while i < str.length
    if str[i] == "?"
      a = all_possible_01(str[i+1..-1])
      b = all_possible_01(str[i+1..-1])
      return a.concat(b).map{ |s| str[0..i-1] + "1" + s }
    end
    i += 1
  end
  [str]
end



# p all_possible_01("aa?b?ccc?d")

########################################################################

# Car parking problem. An array given represents actual order of cars need to be parked. Like for example order is 4,6,5,1,7,3,2,empty. If cars are parked in some order like empty,1,2,3,7,6,4,2. Some person needs to get them into correct order, list out all instructions to the person to get in correct order with least number of swaps.

def car_parking(current, result)
  final_empty_idx = result.index(nil)

  hash = {}
  (0..current.length - 1).each do |idx|
    hash[current[idx]] = idx
  end

  while hash[nil] != final_empty_idx
    swap_el = result[hash[nil]]
    swap_el_idx = hash[swap_el]
    nil_pos = hash[nil]

    hash[nil] = swap_el_idx
    hash[swap_el] = nil_pos

    hash.values.sort.each do |i|
      hash.each do |k,v|
        if v == i
          print (k.to_s + " ")
        end
      end
    end
    puts
  end

  hash
end

# p car_parking([nil,1,2,3,7,6,4,2], [4,6,5,1,7,3,2,nil])

########################################################################

# excel header problem

def excel_header_to_n(str)
  arr = str.split("")

  multiplier = {}
  ("A".."Z").to_a.each_with_index { |l, i| multiplier[l] = i + 1 }

  expo = []
  arr.each_with_index { |l, i| expo.push(arr.length - 1 - i) }

  accum = 0
  arr.each_with_index do |letter, idx|
    accum += 26**(expo[idx]) * multiplier[letter]
  end

  accum
end

def excel_header_to_l(n)
  dic = {}
  ("A".."Z").to_a.each_with_index { |l, i| dic[i + 1] = l }

  result = ""
  while n >= 0
    break if n == 0
    result = dic[n % 26] + result
    n = n / 26
  end

  result
end

# p excel_header_to_n("AA") #27
# p excel_header_to_n("AAC") #705
#
# p excel_header_to_l(27) # "AA"
# p excel_header_to_l(705) # "AAC"

########################################################################
### VERY EASY
# A decimal representing of the fraction of positive numbers in the array.
# A decimal representing of the fraction of negative numbers in the array.
# A decimal representing of the fraction of zeroes in the array.
# Sample Input
#
# 6
# -4 3 -9 0 4 1
# Sample Output
#
# 0.500000
# 0.333333
# 0.166667

def count_pos_neg_zero_numbers(arr)
  hash = { pos: 0, zero: 0, neg: 0 }
  arr.each do |n|
    if n > 0
      hash[:pos] += 1
    elsif n < 0
      hash[:neg] += 1
    else
      hash[:zero] += 1
    end
  end
  total = hash.values.inject(:+).to_f
  puts hash[:pos]/total
  puts hash[:neg]/total
  puts hash[:zero]/total
end

count_pos_neg_zero_numbers([-4, 3, -9, 0, 4, 1])

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
