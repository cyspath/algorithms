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

def build_graph(k, arr)
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
  pool
end



p build_graph(3, [1,7,2,4]) # 3 ([1,7,4])
