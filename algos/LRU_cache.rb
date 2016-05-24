class LRU # O(1) insert, delete, and search
  def initialize
    @store = {}
    @head = nil
  end

  def list
    result = []
    current = @head
    while current != nil
      result.push(current.val)
      current = current.next
    end
    result.join(', ')
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
      @head = next_node
    else
      return
    end

    node.prev = nil
    if @head && @head != node
      node.next = @head
      @head.prev = node
    end
    @head = node
  end

  def add_new_node(val)
    new_node = DoubleLinkedListNode.new(val)
    @store[val] = new_node
    if @head
      new_node.next = @head
      @head.prev = new_node
    end
    @head = new_node
  end

  def delete(val)
    node = @store[val]
    left = node.prev
    right = node.next
    node.prev = nil
    node.next = nil
    if left && right
      left.next = right
      right.prev = left
    elsif left
      left.next = nil
    elsif right
      right.prev = nil
    end
    @store.delete(val)
  end

  def search(val)
    @store[val]
  end
end

class DoubleLinkedListNode
  attr_accessor :val, :next, :prev
  def initialize(val)
    @val = val
    @next = nil
    @prev = nil
  end

  def head?
    self.prev.nil?
  end

  def tail?
    self.next.nil?
  end
end
