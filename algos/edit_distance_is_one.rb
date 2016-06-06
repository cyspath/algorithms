def longest_str(s1, s2)
  if s1.length > s2.length
    return -1
  elsif s1.length < s2.length
    return 1
  else
    return 0
  end
end

def edit_distance_is_one(s1,s2)
  count = 0
  longest = longest_str(s1, s2) # 0 is eql, -1 is s1, 1 is s2

  count = 0
  idx1 = 0
  idx2 = 0
  while idx1 < s1.length || idx2 < s2.length
    if s1[idx1] != s2[idx2]
      count += 1
      if (longest == -1)
        idx1 += 1
      elsif longest == 0
        idx1 += 1
        idx2 += 1
      else
        idx2 += 1
      end
    end
    idx1 += 1
    idx2 += 1
  end
  count == 1 ? true : count
end

p edit_distance_is_one("geeks", "geek")
p edit_distance_is_one("geeks", "geeks")
p edit_distance_is_one("geeks", "geaks")
p edit_distance_is_one("peaks", "geeks")
p edit_distance_is_one("gks", "geeks")

# true
# 0
# true
# 2
# 2
