require 'byebug'


# reverse a string by words

# def reverse_words(str)
#   i = 0
#   count = 0
#   length = str.length
#   while i <= length
#     if str[-1] != " "
#       str = (str[-1]) + str[0..-2]
#       count += 1
#     else
#       str.insert(count, " ")
#       str = str[0..-2]
#       count = 0
#     end
#     i += 1
#   end
#   str
# end

def reverse_words(str)
  # reverse entire string (for example 'cats in hats problem' => "melborp stah ni stac")
  str = reverse(str)

  # now reverse each word in the reversed string "melborp stah ni stac"
  idx1 = 0
  idx2 = idx1
  while idx2 < str.length
    # reverse substring(word) if the next element in array is " " or out of bound
    if str[idx2 + 1] == " " || str[idx2 + 1].nil?
      str[idx1..idx2] = reverse(str[idx1..idx2])
      idx2 += 2
      idx1 = idx2
    end
    idx2 += 1
  end
  str
end

# helper method to reverse a string
def reverse(string)
  i = 0
  while i < string.length/2
    string[i], string[-(i+1)] = string[-(i+1)], string[i]
    i += 1
  end
  string
end

p reverse_words('cats in hats problem')
p reverse_words('parking is easy')


# return number of zero of n!

# brute force
def n_zeros(n)
  result = factorial(n)
  count = 0
  while true
    if result%10 == 0
      count += 1
      result = result/10
    else
      break
    end
  end
  count
end

def factorial(n)
  return 1 if n == 1
  n * factorial(n - 1)
end
#
# def n_zeros_op(n)
#   count = 0
#   i = 0
#   while i < n
#     j = i
#
#     while true
#       if j % 5 == 0 && j != 1
#         count += 1
#         j = j / 5
#         p i
#         p j
#         sleep 0.5
#       else
#         break
#       end
#     end
#
#     i += 5
#   end
#   count
# end
#
# p factorial(50)
# p n_zeros(50)
# p n_zeros_op(50)

# can two team line up, height of people designated by number in arr
# nlogn soln
def two_teams(arr1, arr2)
  arr1 = arr1.sort
  arr2 = arr2.sort

  #check which teams should be in the front/back
  if arr1[-1] > arr2[-1]
    front = arr2
    back = arr1
  else
    front = arr1
    back = arr2
  end

  while !front.empty? && !back.empty?
    if front[-1] < back[-1]
      front.pop
      back.pop
    else
      return false
    end
  end
  true
end

# o(n)
# def two_teams(arr1, arr2)
#
# end

p two_teams([1,2,3], [2,3,4]) # true
p two_teams([0,7], [8,1]) # true
p two_teams([4,3,1], [5,3,0]) # false


# O(n) soln for celebrity in party, given as a 2D array - as people who knew each other
def celebrity_in_party(arr)
  row = 0
  el = 1
  while el < arr.length
    if arr[row][el] == true
      row = el
    end
    el += 1
  end
  return 'celebrity is: ' + row.to_s
end

arr1 = [ [true, true, true, true],
        [true, true, true, true],
        [true, true, true, true],
        [false, false, false, true]]

        arr2 = [ [true, false, false, true],
                [false, true, false, true],
                [true, false, true, true],
                [false, false, false, true]]

                arr3 = [ [true, true, false, false],
                        [false, true, false, false],
                        [false, true, true, false],
                        [false, true, false, true]]

                        arr4 = [ [true, true, true, false],
                                [false, true, true, false],
                                [false, false, true, false],
                                [false, true, true, true]]

                                arr5 = [ [true, false, false, false],
                                        [true, true, true, false],
                                        [true, false, true, false],
                                        [true, true, true, true]]

# p celebrity_in_party(arr1) # 3
# p celebrity_in_party(arr2) # 3
# p celebrity_in_party(arr3) # 1
# p celebrity_in_party(arr4) # 2
# p celebrity_in_party(arr5) # 0



def single_unicode(n)
  "█▉▊▋▓▩▦▤▧▨◉▣◈▒░$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. "[n]
end


def frog_cross_river(d,leap,arr)
  river = Array.new(d+1, '~')
  location = 0

  arr.each_with_index do |pos, index|
    river[pos] = '$'

    i = 1
    while i <= leap
      if river[location + i] == "$"
        location = location + i
        return index if location + leap >= d
        i = 0
      end
      i += 1
    end

   end
   return false
end

# p frog_cross_river(10, 3, [6, 2, 1, 1, 3, 6, 8, 4, 1, 5, 9]) #6
# p frog_cross_river(7, 3, [1, 3, 2, 4, 1, 1, 5, 9]) #3


def uniq_common_num (a1, a2)
  hash = {}
  a1.each do |el|
    hash[el] = 0
  end
  a2.each do |el|
    hash[el] += 1 if hash[el]
  end
  return hash.select {|k, v| v > 0}.keys
end

# p uniq_common_num([1,2,4,4,1], [1,4,1,1])

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
