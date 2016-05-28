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

def height(node)
  return 0 if node.nil?
  left_height = height(node.left)
  right_height = height(node.right)
  [left_height, right_height].max + 1
end

p height(root) #6
