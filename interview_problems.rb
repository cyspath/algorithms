require 'byebug'
require 'set'

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
