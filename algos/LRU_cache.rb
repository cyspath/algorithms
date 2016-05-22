class LRU # O(1) insert, delete, and search
  def initialize
    @store = {}
    @node = nil
  end

  def insert(val)
    if @store[val]
      relink_node(val)
    else
      add_new_node(val)
    end
  end

  def relink_node(val)
    node = @store[val]

    # relink left and right nodes
    prev_node = node.prev
    next_node = node.next
    if prev_node && next_node
      prev_node.next = next_node
      next_node.prev = prev_node
    elsif prev_node
      prev_node.next = nil
    elsif next_node
      next_node.prev = nil
    end

    # update current node's left and right
    node.prev = nil
    if @node
      node.next = @node
    else
      node.next = nil
    end
    @node = node
  end

  def add_new(val)
    new_node = DoubleLinkedListNode.new(val)
    @store[val] = new_node
    if @node
      new_node.next = @node
      @node = new_node
    else
      @node = new_node
    end
  end

  def delete(val)
  end

  def search(val)
  end




end

class DoubleLinkedListNode
  attr_accessor :val, :next, :prev
  def initialize(val)
    @val = val
  end

  def head?
    self.prev.nil?
  end

  def tail?
    self.next.nil?
  end
end
