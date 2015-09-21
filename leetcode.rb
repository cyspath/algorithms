# You are climbing a stair case. It takes n steps to reach to the top.
#
# Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 # lets try c(1) = 1, c(2) = 2, c(3) = 3, c(4) = 5, c(5) = 11111, 2111, 1211, 1121, 1112, 221, 212, 122 = 8... fib!
 def climb_stairs(n)
     climb_helper(n).last
 end

 def climb_helper(n)
   return [1] if n == 1
   return [1,2] if n == 2
   result = helper(n - 1)
   result.<<(result[-1] + result[-2])
 end

# p climb_stairs(6)

# Implement the following operations of a queue using stacks.
#
# push(x) -- Push element x to the back of queue.
# pop() -- Removes the element from in front of queue.
# peek() -- Get the front element.
# empty() -- Return whether the queue is empty.

class Queue
    # Initialize your data structure here.
    def initialize
        @stack = []
    end

    # @param {Integer} x
    # @return {void}
    def push(x)
        @stack.push(x)
    end

    # @return {void}
    def pop
        @stack.shift
    end

    # @return {Integer}
    def peek
        @stack[0]
    end

    # @return {Boolean}
    def empty
        @stack.length == 0
    end
end

# Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.
#
# You may assume that the array is non-empty and the majority element always exist in the array.

def majority_element(nums)
    hash = {}
    nums.each do |n|
        if !hash[n]
            hash[n] = 1
        else
            hash[n] += 1
        end
    end
    hash.select { |k, v| v > (nums.length / 2) }.keys[0]
end

# Given a column title as appear in an Excel sheet, return its corresponding column number.
#
# For example:
#
#     A -> 1
#     B -> 2
#     C -> 3
#     ...
#     Z -> 26
#     AA -> 27
#     AB -> 28


def title_to_number(s)
    dic = {}
    n = 1
    ('A'..'Z').to_a.each do |letter|
        dic[letter] = n
        n += 1
    end
    # AA = (1*26^1) + (1*26^0)
    # BCD = (2*26^2) + (3*26^1) + (4*26^0)

    s = s.reverse
    i = 0
    sum = 0
    while i < s.length
        multiplier = 1
        i.times { multiplier *= 26 }

        sum += dic[s[i]] * multiplier
        i += 1
    end
    sum

end

# Given an array of integers, find if the array contains any duplicates. Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

def contains_duplicate(nums)
    # nums != nums.uniq
    hash = {}
    nums.each do |n|
        return true if hash[n]
        hash[n] = true
    end
    false
end

# Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.
#
# According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow a node to be a descendant of itself).”
#
#         _______6______
#        /              \
#     ___2__          ___8__
#    /      \        /      \
#    0      _4       7       9
#          /  \
#          3   5
# For example, the lowest common ancestor (LCA) of nodes 2 and 8 is 6. Another example is LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

def lowest_common_ancestor(root, p, q)
    return root if p.val == root.val || q.val == root.val
    p,q = q,p if q.val < p.val
    return root if p.val <= root.val && q.val > root.val

    if q.val < root.val
        lowest_common_ancestor(root.left, p, q)
    else
        lowest_common_ancestor(root.right, p, q)
    end
end

# Write a function that takes an unsigned integer and returns the number of ’1' bits it has (also known as the Hamming weight).
#
# For example, the 32-bit integer ’11' has binary representation 00000000000000000000000000001011, so the function should return 3.

def hamming_weight(n)
    a = []
    while n != 0
        a.unshift(n%2)
        n /= 2
    end
    a.count(1)
end


# Invert a binary tree.
#
#      4
#    /   \
#   2     7
#  / \   / \
# 1   3 6   9
# to
#      4
#    /   \
#   7     2
#  / \   / \
# 9   6 3   1
# Trivia:
# This problem was inspired by this original tweet by Max Howell:
# Google: 90% of our engineers use the software you wrote (Homebrew), but you can’t invert a binary tree on a whiteboard so fuck off.

# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val)
#         @val = val
#         @left, @right = nil, nil
#     end
# end

# @param {TreeNode} root
# @return {TreeNode}
def invert_tree(root)
    return if root.nil?
    root.left, root.right = root.right, root.left
    invert_tree(root.left)
    invert_tree(root.right)
    return root
end

# Given a binary tree, find its maximum depth.
#
# The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

def max_depth(root)
  return 0 if root.nil?

  return 1 + [max_depth(root.left), max_depth(root.right)].max
end

# Given two binary trees, write a function to check if they are equal or not.
#
# Two binary trees are considered equal if they are structurally identical and the nodes have the same value.

def is_same_tree(p, q)
    return true if p.nil? && q.nil?
    return false if p.nil? || q.nil?
    return false if p.val != q.val

    is_same_tree(p.left, q.left) && is_same_tree(p.right, q.right)
end

# Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.
#
# Supposed the linked list is 1 -> 2 -> 3 -> 4 and you are given the third node with value 3, the linked list should become 1 -> 2 -> 4 after calling your function.

def delete_node(node)
    if node.next != nil
        node.val = node.next.val
        node.next = node.next.next
    end
end

# Given two strings s and t, write a function to determine if t is an anagram of s.
#
# For example,
# s = "anagram", t = "nagaram", return true.
# s = "rat", t = "car", return false.
#
# Note:
# You may assume the string contains only lowercase alphabets.

def is_anagram(s, t)
  s.split('').sort == t.split('').sort
end


# Given a roman numeral, convert it to an integer.
#
# Input is guaranteed to be within the range from 1 to 3999.

def roman_to_int(s)
    # I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1,000
    i = 0
    num = 0
    while i < s.length
        if s[i] == 'M'
            num += 1000
            i += 1
            next
        end

        #100- 900
        if s[i] == 'C' && s[i + 1] == 'M'
            num += 900
            i += 2
            next
        end

        if s[i] == 'C' && s[i + 1] == 'D'
            num += 400
            i += 2
            next
        end

        if s[i] == 'D'
            num += 500
            i += 1
            next
        end

        if s[i] == 'C'
            num += 100
            i += 1
            next
        end

        #10 - 90
        if s[i] == 'X' && s[i + 1] == 'C'
            num += 90
            i += 2
            next
        end

        if s[i] == 'X' && s[i + 1] == 'L'
            num += 40
            i += 2
            next
        end

        if s[i] == 'X'
            num += 10
            i += 1
            next
        end

        if s[i] == 'L'
            num += 50
            i += 1
            next
        end

        #1 - 9
        if s[i] == 'I' && s[i + 1] == 'X'
            num += 9
            i += 2
            next
        end

        if s[i] == 'I' && s[i + 1] == 'V'
            num += 4
            i += 2
            next
        end

        if s[i] == 'I'
            num += 1
            i += 1
            next
        end

        if s[i] == 'V'
            num += 5
            i += 1
            next
        end
    end
    num
end

# p roman_to_int("MMMCMXXVII") #3927

# Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
# You must do this in-place without making a copy of the array.
# For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].

def move_zeroes(nums)
  count = nums.count(0)
  nums.delete(0)
  count.times { nums.push(0) }
  nums
end

# p move_zeroes([0, 1, 0, 3, 12])

# Evaluate the value of an arithmetic expression in Reverse Polish Notation.
#
# Valid operators are +, -, *, /. Each operand may be an integer or another expression.
#
# Some examples:
#   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
#   ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6

def eval_rpn(tokens)
  keys = { '+' => :+, '-' => :-, '*' => :*, '/' => :/ }

  while true
    idx = 0
    while idx < tokens.length
      if keys[tokens[idx]]
        n1 = tokens[idx - 2].to_i
        n2 = tokens[idx - 1].to_i
        result = n1.send(keys[tokens[idx]], n2)
        3.times { tokens.delete_at(idx - 2) }
        tokens.insert(idx -2, result)
        break
      end
      idx += 1
    end

    break if tokens.length <= 1
  end
  tokens.first
end

# Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.
#
# For example:
#
# Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return it.

def add_digits(num)
    return num if num < 10
    add_digits(num/10 + num%10)
end