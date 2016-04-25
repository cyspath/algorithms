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

p find_path(root)
