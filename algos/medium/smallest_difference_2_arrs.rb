# find smallest difference in 2 arrs

# not o(n^2), there is a better soln

a1 = [1,3,15,11,2]
a2 = [23,127,235,19,8]

def smallest_diff(a1,a2)
  a1 = a1.sort
  a2 = a2.sort
  diff = nil
  pair = []

  i = 0
  j = 0
  while i < a1.length && j < a2.length
    diff = (a1[i] - a2[j]).abs if diff.nil?
    return 0 if a1[i] == a2[j]

    if a1[i] > a2[j]
      if a1[i] - a2[j] < diff
        diff = a1[i] - a2[j]
        pair = [a1[i], a2[j]]
      end
      j += 1
    else
      if a2[j] - a1[i] < diff
        diff = a2[j] - a1[i]
        pair = [a1[i], a2[j]]
      end
      i += 1
    end
  end
  {pair: pair, diff: diff}
end

p smallest_diff(a1,a2)
