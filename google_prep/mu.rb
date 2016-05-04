# Actual Tree for Testing

class Node
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

root = Node.new(5)
root.left = Node.new(2)
root.left.left = Node.new(1)
root.left.right = Node.new(4)
root.left.right.left = Node.new(3)
root.left.right.left.left = Node.new(2.5)
root.left.right.left.left.right = Node.new(3)


root.right = Node.new(7)
root.right.left = Node.new(6)
root.right.right = Node.new(9)
root.right.right.left = Node.new(8)
root.right.right.right = Node.new(10)
root.right.right.right.right = Node.new(11)

#           5
#       /       \
#     2           7
#   /   \       /   \
# 1       4    6     9
#       /          /   \
#     3           8     10
#   /                    \
# 2.5                     11
#  \
#   3

# given a binary tree find hte longest path in the tree

$arr = []

def build_max(node)
  node.left ? left = build_max(node.left) : left = []
  node.right ? right = build_max(node.right) : right = []

  path = left.map(&:val).concat([node.val]).concat(right.reverse.map(&:val))
  $arr = path if path.length > $arr.length

  if left.length >= right.length
    return left.concat([node])
  else
    return right.concat([node])
  end
end

def find_path(node)
  build_max(node)
  $arr
end

# p find_path(root)

def two_sum_time(arr, sum)
  hash = {}
  arr.each do |n|
    hash[n] ? hash[n] += 1 : hash[n] = 1
  end

  result = []
  arr.each do |n|
    if hash[sum - n] && hash[sum - n] > 0
      hash[sum - n] -= 1
      hash[n] -= 1
      result.push([n, sum - n])
    end
  end
  result
end

# p two_sum_time([2,3,-2,1,5,4,6,3], 5)


def two_sum_space(arr, sum)
  arr.sort! # use quick or merge sort if not builtin
  result = []

  i = 0
  j = arr.length - 1
  while i != j
    current_sum = arr[i] + arr[j]
    if current_sum == sum
      result.push([arr[i], arr[j]])
      i += 1
    elsif current_sum < sum
      i += 1
    else # when current_sum > sum
      j -= 1
    end
  end
  result
end

# p two_sum_space([2,3,-2,1,5,4,6,3], 5)

def three_sum(arr, sum)
  arr.sort! #nlogn, this sorting step is critical in avoiding duplicates
  store = {}
  result = []

  arr.each_with_index { |n, idx| store[n] ? store[n].push(idx) : store[n] = [idx] }

  i = 0
  while i < arr.length - 1
    j = i + 1
    while j < arr.length
      d = sum - arr[i] - arr[j]
      result.push([arr[i], arr[j], d]) if store[d] && store[d].last > j
      j += 1
    end
    i += 1
  end
  result # nlogn + n^2 = n^2 overall runtime
end

# p three_sum([2,3,-2,1,4,2], 7)
