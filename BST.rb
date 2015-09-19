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

root.right = Node.new(7)
root.right.left = Node.new(6)
root.right.right = Node.new(9)
root.right.right.left = Node.new(8)
root.right.right.right = Node.new(10)

#           5
#       /       \
#     2           7
#   /   \       /   \
# 1       4    6     9
#       /          /   \
#     3           8     10


# given a node in BST, find next largest value

def next_largest(node)
  if node.right
    return node.right.val if node.right.left.nil?
    child = node.right
    while true
      return child.left.val if child.left.left.nil?
      child = child.left
    end
  end

  if node.parent.left == node
    return node.parent.val
  end

  if node.parent.right == node
    parent = node.parent
    while true
      return nil if parent.parent.nil?
      if parent.parent.left == parent
        return parent.parent.val
      end
      parent = parent.parent
    end
  end

end

# find max depth of binary tree
def max_depth(root)
  return 0 if root.nil?

  if root.left || root.right
    depth = 1
  end

  return depth + (max_depth(root.left), max_depth(root.right)).max

end
