def edit_distance_is_one(s1,s2)
  count = 0
  longest = longest_str(s1, s2) # 0 is eql, -1 is s1, 1 is s2

  if longest == 0
    change_check(s1, s2)
  elsif longest == -1
    add_check(s2, s1)
  elsif longest == 1
    add_check(s1, s2)
  end
end

def longest_str(s1, s2)
  if s1.length > s2.length
    return -1
  elsif s1.length < s2.length
    return 1
  else
    return 0
  end
end

def change_check(s1, s2)
  count = 0
  i = 0
  while i < s1.length
    count += 1 if s1[i] != s2[i]
    i += 1
  end
  count == 1 ? true : count
end

def add_check(short, long)
  count = 0
  idx1 = 0
  idx2 = 0
  while idx2 < long.length
    if short[idx1] != long[idx2]
      count += 1
      idx2 += 1
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
