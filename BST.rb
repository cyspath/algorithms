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
