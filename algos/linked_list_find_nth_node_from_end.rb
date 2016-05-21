# set 2 pointers, first increment one pointer n ahead, then both at the same time til one reaches end, other one is where the element is

def nth_node_from_end(n, node)
  a = node
  c = node # placeholder for b
  while n >= 0
    c = c.next
    n -= 1
  end
  b = c

  # at this point, a is at start, b is at n node ahead of a
  while b != nil
    a = a.next
    b = b.next
  end
  a
end
