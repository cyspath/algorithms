# Shashank likes strings in which consecutive characters are different.
# For example, he likes ABABA, while he doesn't like ABAA.
# Given a string containing characters A and B only, he wants to change it into a string he likes.
# To do this, he is allowed to delete the characters in the string.
#
# Your task is to find the minimum number of required deletions.

# Sample Input
# 5
# AAAA
# BBBBB
# ABABABAB
# BABABA
# AAABBB
#
# Sample Output
# 3
# 4
# 0
# 0
# 4
#
# Explanation
# AAAA  A, 3 deletions
# BBBBB  B, 4 deletions
# ABABABAB  ABABABAB, 0 deletions
# BABABA  BABABA, 0 deletions
# AAABBB  AB, 4 deletions because to convert it to AB we need to delete 2 A's and 2 B's

def alternating_char(str)
  count = 0
  current = nil

  i = 0
  while i < str.length
    if current.nil?
      current = str[i]
    elsif str[i] == current
      count += 1
    else
      current = str[i]
    end
    i += 1
  end
  count
end
p alternating_char("AAAA")
p alternating_char("BBBBB")
p alternating_char("ABABABAB")
p alternating_char("BABABA")
p alternating_char("AAABBB")

# n = gets.strip.to_i
#
# str = []
# n.times { str.push(gets.strip.split(' ')) }
