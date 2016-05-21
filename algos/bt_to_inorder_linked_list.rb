
$current = nil
def to_linked_list(node)
  return nil if node.nil?
  to_linked_list(node.left)
  $current.next = node if $current
  $current = node
  to_linked_list(node.right)
end

p to_linked_list(root)
