def uniq_num(arr)
  result = nil
  arr.each do |n|
    if result.nil?
      result = n
    else
      result = result ^ n
    end
  end
  result
end

p uniq_num([2,2,3,3,4,4,1,5,6,6,1]) #5
