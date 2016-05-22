def excel_interconverter(input)
  hash = {}
  letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  letters.each_with_index do |el, idx|
    hash[idx + 1] = el
    hash[el] = idx + 1
  end
  if input.class == String
    excel_col_to_num(input, hash)
  else
    excel_num_to_col(input, hash)
  end
end

def excel_col_to_num(str, hash)
  result = 0
  i = 0
  while i < str.length
    result += hash[str[i]] * (26 ** (str.length - 1 - i))
    i += 1
  end
  result
end

def excel_num_to_col(n, hash)
  i = 0
  while true
    prod = 26 ** i
    break if prod * 26 >= n
    i += 1
  end

  result = []
  while i >= 0
    pos = n / (26 ** i)
    result.push(hash[pos])
    n = n - ((26 ** i) * pos)
    i -= 1
  end
  result.join("")
end

p excel_interconverter("AA") # 27
p excel_interconverter("Z") # 26
p excel_interconverter("BAC") # 1381
p excel_interconverter('XFD') # 16384
p excel_interconverter(27) # ("AA")
p excel_interconverter(26) # ("Z")
p excel_interconverter(1381) # ("BAC")
p excel_interconverter(16384) # ('XFD')
