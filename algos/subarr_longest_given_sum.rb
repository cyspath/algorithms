# find longest subarr that adds up to sum n

def longest_subarr_given_sum(sum, arr)
  hash = {}
  max_l = 0
  current = 0
  i = nil
  j = nil

  arr.each_with_index do |n, idx|
    current += n

    if current == sum
      max_l = idx + 1
      i = -1
      j = idx
    end

    if hash[current - sum]
      if (idx - hash[current - sum]) > max_l
        i = hash[current - sum]
        j = idx
        max_l = idx - i
      end
    else
      hash[current] = idx
    end
  end
  arr[(i + 1)..j]
end

p longest_subarr_given_sum(0, [3,-3,1,4,-5,2]) # [3,-3,1,4,-5]
p longest_subarr_given_sum(3, [2,-3,-1,4,-5,4]) # [4,5,4]
p longest_subarr_given_sum(5, [-3,1,4,2]) # [1,4]
p longest_subarr_given_sum(5, [2,1,3,1,-3,4]) # [3,1,-3,4]
p longest_subarr_given_sum(5, [1,4,-6,2,-1,4,5,-6,1,1,3]) # [2,-1,4,5,-6,1]
