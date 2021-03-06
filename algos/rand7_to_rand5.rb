# You have a function rand7() that generates a random integer from 1 to 7. Use it to write a function rand5() that generates a random integer from 1 to 5.

def rand7
  rand(7) + 1
end

def rand7_to_rand5
  while true
    dist = 7 * (rand7 - 1) + (rand7 - 1)
    break if dist <= 44
  end
  (dist % 5) + 1
end

def test
  hash = Hash.new(0)
  100000.times do
    hash[rand7_to_rand5] += 1
  end
  hash
end

p test

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
