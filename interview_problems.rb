
require 'byebug'
require 'set'

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
