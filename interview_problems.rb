require 'byebug'
require 'set'


# The is a clever interview question that asks you to calculate the cube root of a number quickly. We can solve this by some mathematical tricks that won't require any calculates to take place, only table lookups. This algorithm will focus on calculating the cube root of 6 digit numbers (or less). For example, if the input is 636056 then your program should output 86.

def cube_root(n)
  table = {}
  (1..99).to_a.each { |num| table[(num * num * num)] = num }
  table[n] ? table[n] : 'invalid input - must be less than 7 digits long'
end

# p cube_root(636056)


# This is a common interview question where you need to write a program to find all duplicates in an array where the numbers in the array are in the range of 0 to n-1 where n is the size of the array. For example: [1, 2, 3, 3] is okay but [1, 2, 6, 3] is not. In this version of the challenge there can be multiple duplicate numbers as well.
#
# The algorithm below is commented to explain what each piece of code does, but the general algorithm is:
#
# (1) Loop through the array
# (2) For each element, find array[absolute(array[i])] in the array and set its value to negative if positive
# (3) If in step 2 you encounter a negative number, then it means the element at index i in the array is a duplicate

def duplicate_in_array(arr)
  arr.each do |num|
    return false if num < 0 || num >= arr.length
  end

  hash = {}
  arr.each do |num|
    if hash[num]
      hash[num] += 1
    else
      hash[num] = 1
    end
  end
  hash.select { |k,v| v > 1}.keys
end

# For this popular algorithm interview question, the input will be a string consisting only of the characters 0, 1 and ?, where the ? acts as a wildcard that can be either a 0 or 1, and your goal is to print all possible combinations of the string. For example, if the string is "011?0" then your program should output a set of all strings, which are: ["01100", "01110"].

def wildcard_combo(str)
  return [str] if !str.include?('?')

  i = 0
  while i < str.length
    if str[i] == '?'
      pos = i
      break
    end
    i += 1
  end

  pre = pos - 1 <= 0 ? "" : str[0..(pos - 1)]
  post = wildcard_combo(str[pos + 1..-1])

  result = []
  post.each do |el|
    result.push(pre + "1" + el)
    result.push(pre + "0" + el)
  end
  result

end
# p wildcard_combo("?00?00?")


# Implement a queue using two stacks, with only push and pop methods
class Queue
  def initialize
    @stack1 = []
    @stack2 = []
  end

  def stack_check
    if @stack1.empty?
      @old_stack = @stack2
      @new_stack = @stack1
    else
      @old_stack = @stack1
      @new_stack = @stack2
    end
  end

  def enqueue(x)
    stack_check

    while !@old_stack.empty?
      @new_stack.push(@old_stack.pop)
    end

    @old_stack.push(x)

    while !@new_stack.empty?
      @old_stack.push(@new_stack.pop)
    end

    @old_stack
  end

  def dequeue
    @old_stack.pop
    @old_stack
  end

end

# This is one type of very common interview question that is usually asked, where your goal is to implement some built-in language function, such as exponentiation, division, hash tables, etc. In this challenge we need to implement exponentiation, or raising a to some power of b which is usually written pow(a, b). In this variation of the challenge, we also need to implement a solution without using the multiplication or division operations, only addition and subtraction are allowed.

# example 3^4 = 3 * 3 * 3 * 3 = (3+3+3) * 3 * 3 = (9+9+9) * 3 = 27+27+27

def exponentiation(a, b)
  acum = a
  n = 1
  while n < b
    current_sum = 0
    a.times { current_sum += acum }
    acum = current_sum
    n += 1
  end
  acum
end

# Write a function called lucky_sevens which takes an array of integers and returns true if any three consecutive elements sum to 7.

def lucky_sevens(arr)
  return false if arr.length < 3
  i = 2
  while i < arr.length
    return true if arr[i] + arr[i - 1] + arr[i - 2] == 7
    i += 1
  end
  false
end


# You will be given 2 parameters: a low number, and high number. Your goal is to print all numbers between low and high, and for each of these numbers print whether or not the number is divisible by 3. If the number is divisible by 3, print the word "div3" directly after the number.
# Example
# If the function call is: test_divisors(2, 10) then the output should be:
# 2
# 3
# "div3"
# 4
# 5
# 6
# "div3"
# 7
# 8
# 9
# "div3"
# 10

def test_divisors(x,y)
  while x <= y
    puts x
    puts 'div3' if x % 3 == 0
    x += 1
  end
end


# You will be given an array of several arrays that each contain integers and your goal is to write a function that will sum up all the numbers in all the arrays. For example, if the input is [[3, 2], [1], [4, 12]] then your program should output 22 because 3 + 2 + 1 + 4 + 12 = 22.
# Full stack academy

def sum_arr_nums(arr)
  sum = 0
  arr.each do |el|
    if el.class == Array
      sum += sum_arr_nums(el)
    else
      sum += el
    end
  end
  sum
end


# hackerRank str compression: 'aaabcc' -> 'a3bc2'
def  compress( str)
    result = ""
    table = {}
    i = 0
    while i < str.length
        table[str[i]] ? table[str[i]] += 1 : table[str[i]] = 1
        if str[i] != str[i - 1]
            result += str[i - 1] if table[str[i - 1]]
            result += table[str[i - 1]].to_s if table[str[i - 1]] && table[str[i - 1]] != 1
            table[str[i - 1]] = nil
        end
        i += 1
    end
    result += str[i - 1] if table[str[i - 1]]
    result += table[str[i - 1]].to_s if table[str[i - 1]] && table[str[i - 1]] != 1
    result
end


# frog crosses river with leaves problem
# O(n) result
def frog_cross_river(d,leap,arr)
  leaf_pos = Set.new
  current = 0

  arr.each_with_index do |pos, index|
    leaf_pos.<<(pos)

    step = 1
    while step <= leap
      if leaf_pos.include?(current + step)
        current = current + step
        step = 1
        next
      end
      step += 1
    end
    return index if current + leap >= d

  end
  return false
end

# p frog_cross_river(10, 3, [6, 2, 1, 1, 3, 6, 8, 4, 1, 5, 9]) #6



#  find most common letter in a string

def common_letter(str)
  hash = {}
  str.split("").each { |letter| hash[letter] ? hash[letter] += 1 : hash[letter] = 1 }
  hash.max_by { |k, v| v } [0]
end

# p common_letter("bbaaacca")
