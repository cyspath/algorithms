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

# count_pos_neg_zero_numbers([-4, 3, -9, 0, 4, 1])

########################################################################

# make rand7 with rand5 as well as rand2

def rand_checker
  store = {}
  1000000.times do
    # n = rand_7_from_5
    n = rand_7_from_2
    store[n] ? store[n] += 1 : store[n] = 0
  end
  p store.keys.sort
  store.values.map {|v| v/1000}
end

def rand_7_from_5
  while true
    n = 5 * rand(5) + rand(5) # 0..24 equal chance of any
    return n % 7 if n < 21
  end
end

def rand_7_from_2
  while true
    n = 4 * rand(2) + 2 * rand(2) + rand(2)
    return n % 7 if n < 7
  end
end

# p rand_checker
# p rand_7_from_5

########################################################################

# stock_prices_yesterday = [10, 7, 5, 8, 11, 9]
# returns 6 (buying for $5 and selling for $11)

def stock_buy(a)
  min = nil
  max = nil
  i = 0
  while i < a.length
    if min.nil?
      min = a[i]
      next
    end

    if max.nil? || a[i] - min > max
      max = a[i] - min
    end

    min = a[i] if a[i] < min
    i += 1
  end
  max
end

# p stock_buy([10, 7, 5, 8, 11, 9])


########################################################################

# You have a list of integers, and for each index you want to find the product of every integer except the integer at that index.
# Write a function get_products_of_all_ints_except_at_index() that takes a list of integers and returns a list of the products.
#
# For example, given:
#
#   [1, 7, 3, 4]
#
# your function would return:
#
#   [84, 12, 28, 21]
#
# by calculating:
#
#   [7*3*4, 1*3*4, 1*7*4, 1*7*3]

def get_products_of_all_ints_except_at_index(a)
  prod = 1
  a.each { |n| prod *= n if n != 0 }
  a.map { |n| n == 0 ? prod : prod / n }
end

def get_products_of_all_ints_except_at_index_no_division(a)
  prod = 1
  a.each { |n| prod *= n if n != 0 }
  a.map { |n| n == 0 ? prod : prod / n }
end

# p get_products_of_all_ints_except_at_index([0, 1, 7, 3, 4]) #[84, 84, 12, 28, 21]

########################################################################

# Given a list_of_ints, find the highest_product you can get from three of the integers.
# The input list_of_ints will always have at least three integers.

def max_prod(a)
  first = nil
  second = a[0]
  third = nil

  a[0] < 0 ? first_neg = a[0] : first_neg = nil
  second_neg = nil

  i = 1
  while i < a.length
    # arranging the three counters
    if a[i] <= second
      if third.nil?
        third = a[i]
      else
        third = [third, a[i]].max
      end
    else
      if first.nil?
        first = a[i]
      elsif first > a[i]
        third = second
        second = a[i]
      else
        third = second
        second = first
        first = a[i]
      end
    end

    # if number is negative, arrange them
    if a[i] < 0
      if first_neg.nil?
        first_neg = a[i]
      elsif a[i] <= first_neg
        second_neg = first_neg
        first_neg = a[i]
      else
        second_neg = [second_neg, a[i]].min
      end
    end
    i += 1
  end

  if first_neg.nil? || second_neg.nil?
    first * second * third
  else
    [first * second * third, first_neg * second_neg * first].max
  end
end

# p max_prod([2,5,1,8,3,10,4]) # 400
# p max_prod([-10,-10,1,3,2]) # 300


################################## MAKING CHANGE ######################################

# Your quirky boss found out that you're a programmer and has a weird request about something they've been wondering for a long time.
#
# Write a function that, given:
#
# an amount of money
# a list of coin denominations
# computes the number of ways to make amount of money with coins of the available denominations.
#
# Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 4—the number of ways to make 44¢ with those denominations:
#
# 1¢, 1¢, 1¢, 1¢
# 1¢, 1¢, 2¢
# 1¢, 3¢
# 2¢, 2¢

def making_change_icake(total, coins)
  grid = Array.new(coins.length + 1).map { |el| Array.new(total + 1) }
  i = 0
  while i < grid.length
    j = 0
    while j < grid[i].length
      if j == 0
        grid[i][j] = 1
      elsif i == 0
        grid[i][j] = 0
      elsif j < coins[i - 1]
        grid[i][j] = grid[i - 1][j]
      else
        without_new_coin = grid[i - 1][j]
        with_new_coin = grid[i][j - coins[i - 1]]
        grid[i][j] = without_new_coin + with_new_coin
      end
      j += 1
    end
    i += 1
  end
  grid[-1][-1]
end

# p making_change_icake(4, [1,2,3]) #4
# p making_change_icake(9, [1,4,5]) #5

################################## SCHEDULER ######################################
  [[0, 1], [3, 8], [9, 12]]

def scheduler(arr)
  a = merge_sort_arr(arr) # [[0, 1], [3, 5], [4, 8], [9, 10], [10, 12]]
  result = []

  min = arr[0][0]
  max = arr[0][1]

  a.each do |el|
    if el[0] < max && el[1] > max
      max = el[1]
    elsif el[0] >= max
      result.push([min, max])
      min = el[0]
      max = el[1]
    end
  end
  result.push [min, max]
  result
end

def merge_sort_arr(arr)
  return arr if arr.length <= 1
  left = arr.take(arr.length/2)
  right = arr.drop(arr.length/2)
  merge_array(merge_sort_arr(left), merge_sort_arr(right))
end

def merge_array(left, right)
  result = []
  while left.length != 0 && right.length != 0
    if left[0][0] > right[0][0]
      result.push(right.shift)
    else
      result.push(left.shift)
    end
  end
  result.concat(left).concat(right)
end

# p scheduler([[0, 1], [3, 5], [4, 8], [10, 12], [9, 10]])
# p scheduler([[1, 10], [2, 6], [3, 5], [7, 9]])

#################################  RECTANGLE LOVE #######################################

def intersecting_rect(r1, r2)
  intesection = {}

  if r1['left_x'] < r2['left_x']
    left_rect = r1
    right_rect = r2
  else
    left_rect = r2
    right_rect = r1
  end

  left_rect_right_x = left_rect['left_x'] + left_rect['width']
  right_rect_right_x = right_rect['left_x'] + right_rect['width']

  return nil if left_rect_right_x < right_rect["left_x"]

  intersection["left_x"] = right_rect['left_x']
  intersection["width"] = right_rect_right_x > left_rect_right_x ? left_rect_right_x - right_rect['left_x'] : right_rect['width']

  if r1['bottom_y'] > r2['bottom_y']
    top_rect = r1
    bottom_rect = r2
  else
    top_rect = r2
    bottom_rect = r1
  end

  top_rect_top_y = top_rect["bottom_y"] + top_rect["height"]
  bottom_rect_top_y = bottom_rect["bottom_y"] + top_rect["height"]

  return nil if bottom_rect_top_y < top_rect["bottom_y"]

  intersection["bottom_y"] = top_rect["bottom_y"]
  intersection["height"] = top_rect_top_y > bottom_rect_top_y ? bottom_rect_top_y - top_rect["bottom_y"] : top_rect["height"]

  intersection
end

################################# FAHREHEIT TRACKER #######################################

class TempTracker
  def initialize
    @list = []
    @hash = {} # mode storing
    @mode = nil
    @sum = 0 # used for mean calc
    @max = nil
    @min = nil
    @mode = nil
    @mean = nil
  end

  def insert(t)
    @list.push(t)
    @hash[t] ? @hash[t] += 1 : @hash[t] = 1
    @mode = t if @mode.nil? || @hash[t] > @hash[@mode]
    @sum += t
    @max = t if @max.nil? || @max < t
    @min = t if @min.nil? || @min > t
  end

  def get_max
    @max
  end

  def get_min
    @min
  end

  def get_mean
    @sum.to_f / @list.length
  end

  def get_mode
    @mode
  end
end


############################## SUPERBALANCED BINARY TREE ##########################################

def super_balanced_btree(node) # leaf nodes are no greater than 1 in depth
  if node.left.nil? && node.right.nil?
    return 1
  end

  left = super_balanced_btree(node.left) if node.left
  right = super_balanced_btree(node.right) if node.right

  return false if left == false || right == false

  if node.left && node.right
    return false if (left - right).abs > 1
    return [left, right].max
  elsif node.left
    return left + 1
  else
    return right + 1
  end
end

# # Actual Tree for Testing
#
# class Node
#     attr_accessor :val, :left, :right
#     def initialize(val)
#         @val = val
#         @left, @right = nil, nil
#     end
# end
#
# root = Node.new(5)
# root.left = Node.new(2)
# root.left.left = Node.new(1)
# root.left.right = Node.new(4)
# root.left.right.left = Node.new(3)
#
# root.right = Node.new(7)
# root.right.left = Node.new(6)
# root.right.right = Node.new(9)
# root.right.right.left = Node.new(8)
# root.right.right.right = Node.new(10)
#
# #           5
# #       /       \
# #     2           7
# #   /   \       /   \
# # 1       4    6     9
# #       /          /   \
# #     3           8     10

# p super_balanced_btree(root)

################################ BST PROBLEMS ########################################

# Actual Tree for Testing

class Node
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

root = Node.new(5)
root.left = Node.new(2)
root.left.left = Node.new(1)
root.left.right = Node.new(4)
root.left.right.left = Node.new(3)
root.left.right.left.left = Node.new(2.5)
root.left.right.left.left.right = Node.new(2.7)


root.right = Node.new(7)
root.right.left = Node.new(6)
root.right.right = Node.new(9)
root.right.right.left = Node.new(8)
root.right.right.left.right = Node.new(8.5)
root.right.right.right = Node.new(10)
root.right.right.right.right = Node.new(11)

#           5
#       /       \
#     2           7
#   /   \       /   \
# 1       4    6     9
#       /          /   \
#     3           8     10
#   /              \      \
# 2.5             8.5     11
#  \
#   2.7

$in_order = []

def is_bst(root)
  add_values_to_in_order(root)
  current = nil
  $in_order.each do |n|
    if current.nil?
      current = n
      next
    end
    return false if n <= current
    current = n
  end
  true
end

def add_values_to_in_order(root)
  add_values_to_in_order(root.left) if root.left
  $in_order.push(root.val)
  add_values_to_in_order(root.right) if root.right
end

# p is_bst(root)

$in_order_rev = []

def second_largest_in_bst(root)
  add_values_to_in_order_reverse(root)
  $in_order_rev[1]
end

def add_values_to_in_order_reverse(root)
  add_values_to_in_order_reverse(root.right) if root.right
  $in_order_rev.push root.val
  add_values_to_in_order_reverse(root.left) if root.left
end

# p second_largest_in_bst(root)

################################## MILLION GAZILLION ######################################
#
# I wrote a crawler that visits web pages, stores a few keywords in a database, and follows links to other web pages. I noticed that my crawler was wasting a lot of time visiting the same pages over and over, so I made a dictionary visited where I'm storing URLs I've already visited. Now the crawler only visits a URL if it hasn't already been visited.
#
# Thing is, the crawler is running on my old desktop computer in my parents' basement (where I totally don't live anymore), and it keeps running out of memory because visited is getting so huge.
#
# How can I trim down the amount of space taken up by visited?



########################################################################

# Users on longer flights like to start a second movie right when their first one ends, but they complain that the plane usually lands before they can see the ending. So you're building a feature for choosing two movies whose total runtimes will equal the exact flight length.
#
# Write a function that takes an integer flight_length (in minutes) and a list of integers movie_lengths (in minutes) and returns a boolean indicating whether there are two numbers in movie_lengths whose sum equals flight_length.
#
# When building your function:
#
# Assume your users will watch exactly two movies
# Don't make your users watch the same movie twice
# Optimize for runtime over memory

def flight_movie(time, arr)
  # 2 sum problem
end

def nth_fib(n)
  return [1] if n == 1
  return [1,1] if n == 2
  result = nth_fib(n - 1)
  result.push(result[-1] + result[-2])
  result
end

# p nth_fib(7)

############################# CAKE PROBLEM - KNAPSACK PROBLEM ###########################################

def max_duffel_bag_value(cake_values, capacity)
  capacities = (0..capacity).to_a
  cakes = cake_values.unshift([0,0])

  grid = Array.new(cakes.length).map { |row| Array.new(capacities.length, nil) }

  i = 0
  while i < cakes.length
    j = 0
    while j < capacities.length
      if i == 0 || j == 0
        grid[i][j] = 0
      elsif capacities[j] < cakes[i][0]
        grid[i][j] = grid[i - 1][j]
      else
        remainder = capacities[j] - cakes[i][0]
        value_above = grid[i - 1][j]
        value_current = cakes[i][1] + grid[i][remainder]
        grid[i][j] = [value_current, value_above].max
      end

      j += 1
    end
    i += 1
  end
  grid[i - 1][j - 1]
end

# p max_duffel_bag_value([[1,15], [2,90], [4,160]], 6)

################################## JAVASCRIPT HOISTING ######################################

# var text = 'outside';
# function logIt(){
#   console.log(text);
# };
# logIt();

############################# WONKY COINS ###########################################

def wc(n)
  a = [n]
  while true
    break if a.uniq.length == 1 && a.first == 0
    # divide the non zeros and add to array
    a = change_arr(a)
  end
  a.length
end

def change_arr(arr)
  result = []
  arr.each { |n| n == 0 ? result.push(n) : result.push(n/2).push(n/3).push(n/4) }
  result
end

def wc_rec(n)
  return 1 if n == 0
  wc_rec(n/2) + wc_rec(n/3) + wc_rec(n/4)
end

# p wc(6) #15
# p wc_rec(6) #15

################################# GET MAX VAL IN STACK #######################################

class Stack
  attr_reader :values
  def initialize
    @values = []
    @max_arr = []
  end

  def push(el)
    @values.push el
    if @max_arr.empty?
      @max_arr.push el
    else
      @max_arr.push [el, @max_arr[-1]].max
    end
  end

  def pop
    @values.pop
    @max_arr.pop
  end

  def get_max
    @max_arr[-1]
  end
end

############################### FIND NONE DUPLICATED INTEGER #########################################

# Given the list of IDs, which contains many duplicate integers and one unique integer, find the unique integer.

def find_none_dup_int(arr)
  result = arr[0]
  i = 1
  while i < arr.length
    result = result ^ arr[i]
    i += 1
  end
  result
end

# p find_none_dup_int([3,7,5,3,2,2,5]) #1


############################### IN PLACE STR REVERSE #########################################

def rev(str)
  i = 0
  j = str.length - 1
  while true
    break if i >= j
    str[i], str[j] = str[j], str[i]
    i += 1
    j -= 1
  end
  str
end

# p rev('abcd')
# p rev('abcde')

############################### REVERSE STR OF WORDS IN PLACE #########################################

# Write a function reverse_words() that takes a string message and reverses the order of the words in-place

# reverse whole str then reverse each word
def rev_str_words(str)
  r_str = rev(str)
  i = 0
  while i < r_str.length
    j = i
    while j < r_str.length
      if j + 1 >= r_str.length || r_str[j + 1] == " "
        r_str[i..j] = rev(r_str[i..j])
        i = j + 1
        break
      end
      j += 1
    end
    i += 1
  end

  r_str
end

# p rev_str_words("today is")
# p rev_str_words("today is thursday the 12th")


################################## FIND CLOSING PARENTHESIS ######################################

sentence_with_parenthesis = "Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing."
#
# Given a sentence like the one above, along with the position of an opening parenthesis, finds the corresponding closing parenthesis.
#
# Example: if the example string above is input with the number 10 (position of the first parenthesis), the output should be 79 (position of the last parenthesis).

def find_closing_parenthesis(sentence, idx)
  idxs = []
  hash = {}
  sentence.split("").each_with_index do |l, i|
    if l == "(" || l == ")"
      hash[i] = l
      idxs.push(i)
    end
  end

  i = 0
  while i < idxs.length - 1
    if (hash[idxs[i]] == "(" && hash[idxs[i + 1]] == ")") && idxs[i] != idx
      idxs.delete_at(i + 1)
      idxs.delete_at(i)
      i = 0
      next
    elsif hash[idxs[i]] == "(" && hash[idxs[i + 1]] == ")"
      return idxs[i + 1]
    end
    i += 1
  end

end

# p find_closing_parenthesis(sentence_with_parenthesis, 10) #79
# p find_closing_parenthesis("(()(()))", 3) #6


############################### PROPERLY NESTED STRING OPENERS #########################################

# '(', '{', '[' are called "openers."
# ')', '}', ']' are called "closers."
# Write an efficient function that tells us whether or not an input string's openers and closers are properly nested.
#
# Examples:
#
# "{ [ ] ( ) }" should return True
# "{ [ ( ] ) }" should return False
# "{ [ }" should return False

#### USE STACKS

def properly_nested_openers(str)
  arr = str.split(" ")
  openers = ['(', '{', '[']
  closers = [')', '}', ']']

  stack = []

  arr.each do |el|
    if openers.include?(el)
      stack.push(el)
    else
      i = closers.index(el)
      return false if stack[-1] != openers[i]
      stack.pop
    end
  end
  true
end

# p properly_nested_openers("{ [ ] ( ) }") # t
# p properly_nested_openers("{ [ ( ] ) }") # f
# p properly_nested_openers("{ [ }") # f


################################## ANY PERMUTATION IS PALINDROME? ######################################

def permutation_palidrome(str)
  arr = str.split("")
  hash = {}
  arr.each { |el| hash[el] ? hash[el] += 1 : hash[el] = 1 }
  counts = hash.values

  has_odd_val = 0
  counts.each do |n|
    if n % 2 != 0
      has_odd_val += 1
    end
  end
  has_odd_val <= 1 ? true : false
end

# p permutation_palidrome("abccbba") # true, can be abcbcba
# p permutation_palidrome("abctcba") # true
# p permutation_palidrome("abbcba") # false

################################## PERMUTATION ######################################

# GOOD ONE TO SEE

def permutation(str, accum="")
  return [accum] if str.empty?
  list = []
  i = 0
  while i < str.length
    new_str = str[0...i] + str[i + 1...str.length]
    new_accum = accum + str[i]
    list.concat permutation(new_str, new_accum)
    i += 1
  end
  list
end

# p permutation("abc") # arr of 6

########################################################################

# Write a function for doing an in-place ↴ shuffle of a list.
# The shuffle must be "uniform," meaning each item in the original list must have the same probability of ending up in each spot in the final list.
#
# Assume that you have a function get_random(floor, ceiling) for getting a random integer that is >=floor and <=ceiling.

def get_random(low, high)
  rand(high - low + 1) + low
end

# def perm(str, accum)
#   return [accum] if str.length == 0
#   result = []
#   str.split("").each_with_index do |letter, idx|
#     new_str = str[0...idx].concat(str[(idx + 1)...(str.length)])
#     result.concat(perm(new_str, accum + letter))
#   end
#   result
# end
#
# p perm("abc", "")



########################################################################
########################################################################
########################################################################
########################################################################
########################################################################
