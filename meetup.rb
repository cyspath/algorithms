require 'byebug'

# flatten array

def flatten(arr)
  i = 0
  while i < arr.length

    if arr[i].class == Array
      current = arr[i]
      arr.delete_at(i)
      flatten(current).each do |el|
        arr.insert(i, el)
        i += 1
      end
      next
    end

    i += 1
  end

  arr
end

# p flatten([[1,2,[3,4]],[5,6],7,[8,[9]]])

# binary_string
def binary_string(n)
  arr = []
  while n != 0
    arr.unshift(n % 2)
    n /= 2
  end
  num_zero = 32 - arr.length
  num_zero.times { arr.unshift(0) }
  arr.join()
end
# O(logn)
# p binary_string(8)

# converts from string representation of number (4) into binary

def binary_to_int(str)
  arr = str.split('')
  sum = 0

  i = arr.length - 1
  expn = 0
  while i >= 0
    if arr[i] == '1'
      sum += (2**expn)
    end
    expn += 1
    i -= 1
  end
  sum

end
# O(n) where n is lenght of string
# p binary_to_int("0000000000111")

# search for minimum in a stack in O(1) time
class Stack
  def initialize
    @arr = []
    @min_arr = []
  end

  def push(n)
    @arr.push(n)
    if @min_arr.last.nil? ||  n < @min_arr.last
      @min_arr.push(n)
    else
      @min_arr.push(@min_arr.last)
    end

    @arr
  end

  def pop
    @arr.pop
    @min_arr.pop
    @arr
  end

  def min
    @min_arr[-1]
  end
end

# stack = Stack.new
# stack.push(1)
# stack.push(3)
# stack.push(2)
# stack.push(-2)
#
# p stack.min

class Node
  attr_accessor :left, :right, :tag, :val, :parent
  def initialize(left, right, tag, val)
    @left = left
    @right = right
    @tag = tag
    @val = val
    @parent = nil
    set_parent
  end

  def set_parent
    @left.parent = self if !@left.nil?
    @right.parent = self if !@right.nil?
  end

end

m = Node.new(nil, nil, 'm', 6)
l = Node.new(nil, nil, "l", 30)
k = Node.new(nil, l, "k", 25)

j = Node.new(nil, nil, "j", 12)
h = Node.new(nil, nil, "h", 16)
i = Node.new(nil, nil, "i", 19)
g = Node.new(h, i, "g", 18)
f = Node.new(j, g, "f", 15)
c = Node.new(f, k, "c", 20)

d = Node.new(nil, nil, "d", 3)
e = Node.new(nil, m, "e", 8)
b = Node.new(d, e, "b", 5)
a = Node.new(b, c, "a", 10)

    #             a
    #         /       \
    #       b           c
    #    /    \       /    \
    #  d       e     f       k
    #         /    /   \       \
    #       m     j     g       l
    #                  / \
    #                 h   i

# _______________________
# Height Balanced Binary Tree

def height_balanced_binary_tree(node)

  return 0 if node.left.nil? && node.right.nil?

  if node.left
    hl = height_balanced_binary_tree(node.left)
    return false if hl == false
    left_height = hl + 1
  else
    left_height = 0
  end

  if node.right
    hr = height_balanced_binary_tree(node.right)
    return false if hr == false
    right_height = hr + 1
  else
    right_height = 0
  end

  if (left_height - right_height).abs > 1
    p "#{node.tag} is not balanced"
    p "left vs right: #{left_height - right_height}"
    return false
  end

  return [left_height, right_height].max
end

# puts !!height_balanced_binary_tree(a)

# common ancestor

def common_ancestor(node_a, node_b, root)

  if node_a == root
    return root.tag
  elsif
    node_b == root
    return root.tag
  end

  if (root.val >= node_a.val && root.val < node_b.val) || (root.val < node_a.val && root.val >= node_b.val)
    return root.tag
  end

  if node_a.val <= root.val && node_b.val <= root.val
    return common_ancestor(node_a, node_b, root.left)
  end

  if node_a.val > root.val && node_b.val > root.val
    return common_ancestor(node_a, node_b, root.right)
  end

end


# p common_ancestor(i, h, a)
