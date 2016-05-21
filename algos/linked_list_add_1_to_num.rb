# 19993399

def add_1(node)
  starter = node

  while node != nil
    head = node if node.val < 9
    node = node.next
  end

  # if head is nil, we will also need to apend 1 to whole linked list
  if head
    head.val += 1
  else
    head = Node.new(0)
    head.next = starter
  end

  trailing_node = head.next
  while trailing_node != nil
    trailing_node.val = 0
    trailing_node = trailing_node.next
  end
end
