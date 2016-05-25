# find largest sum subarr, began and end indexes

def largest_sum_arr(arr)
  max = nil
  current = 0
  i = nil
  j = nil

  arr.each_with_index do |n, idx|
    max = n if max.nil?
    i = idx if i.nil?
    j = idx if j.nil?

    current += n
    if current < 0
      current = 0
      i = nil
    end

    if current > max
      max = current
      j = idx
    end
  end

  "#{[i, j]} and max is #{max}"
end


p largest_sum_arr([1,4,-6,2,-1,4,5,-2,-4,1,3]) # [3, 6] max sum = 10
