
require 'byebug'
require 'set'

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
