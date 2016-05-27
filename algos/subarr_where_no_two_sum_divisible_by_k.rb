# find sub set of array where no pairs will be divisible by k, all numbers are unique in array
class GNode
  attr_accessor :val, :links
  def initialize(val)
    @val = val
    @links = {}
  end

  def link(other)
    @links[other] = nil
    other.links[self] = nil
  end
end

def subarr_not_div_by_k(k, arr)
  return arr.length if k == 1
  pool = {}
  i = 0
  while i < arr.length - 1
    j = i + 1
    while j < arr.length
      if (arr[i] + arr[j]) % k == 0
        pool[arr[i]] = GNode.new(arr[i]) unless pool[arr[i]]
        pool[arr[j]] = GNode.new(arr[j]) unless pool[arr[j]]
        pool[arr[i]].link(pool[arr[j]])
      end
      j += 1
    end
    i += 1
  end
  count_down(arr.length, pool)
end

def count_down(size, pool)
  while true
    value = find_max_node(pool)
    break if value.nil?
    pool = delete_val_from_pool(value, pool)
    size -= 1
  end
  size
end

def delete_val_from_pool(value, pool)
  pool[value].links.each do |node, v|
    pool[node.val].links.delete(pool[value])
  end
  pool.delete(value)
  pool
end

def find_max_node(pool)
  max = 0
  value = nil
  pool.each do |v,k|
    if k.links.length > max
      max = k.links.length
      value = v
    end
  end
  value
end

p subarr_not_div_by_k(3, [1,7,2,4]) # 3 ([1,7,4])
p subarr_not_div_by_k(5, [128, 27, 11, 31, 53, 88]) # 5
