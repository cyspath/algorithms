# 19993399

def add_1(node)
  starter = node

  while node != nil
    lead = node if node.val < 9
    node = node.next
  end

  # if lead is nil, we will also need to apend 1 to whole linked list
  if lead
    lead.val += 1
  else
    lead = Node.new(0)
    lead.next = starter
  end

  trailing_node = lead.next
  while trailing_node != nil
    trailing_node.val = 0
    trailing_node = trailing_node.next
  end
end
