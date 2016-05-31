# class Node
#     attr_accessor :val, :left, :right
#     def initialize(val)
#         @val = val
#         @left, @right = nil, nil
#     end
# end
#
# root = Node.new(5)
# root.left = Node.new(2)
# root.left.left = Node.new(1)
# root.left.right = Node.new(4)
# root.left.right.left = Node.new(3)
# root.left.right.left.left = Node.new(2.5)
# root.left.right.left.left.right = Node.new(3)
#
#
# root.right = Node.new(7)
# root.right.left = Node.new(6)
# root.right.right = Node.new(9)
# root.right.right.left = Node.new(8)
# root.right.right.right = Node.new(10)
# root.right.right.right.right = Node.new(11)
#
# #           5
# #       /       \
# #     2           7
# #   /   \       /   \
# # 1       4    6     9
# #       /          /   \
# #     3           8     10
# #   /                    \
# # 2.5                     11
# #  \
# #   3
#
# ################ PREORDER TREE #################
# pre_root = Node.new(1)
# pre_root.left = Node.new(2)
# pre_root.right = Node.new(6)
# pre_root.left.left = Node.new(3)
# pre_root.left.right = Node.new(4)
# pre_root.left.right.left = Node.new(5)
# pre_root.right.right = Node.new(7)
#
# #           1
# #       /       \
# #     2           6
# #   /   \          \
# # 3      4          7
# #       /
# #      5
# #
#
# ################ POSTORDER TREE #################
#
# post_root = Node.new(7)
# post_root.left = Node.new(4)
# post_root.right = Node.new(6)
# post_root.left.left = Node.new(1)
# post_root.left.right = Node.new(3)
# post_root.left.right.left = Node.new(2)
# post_root.right.right = Node.new(5)
#
# #           7
# #       /       \
# #     4           6
# #   /   \          \
# # 1      3          5
# #       /
# #      2
# #
#
# ################ INORDER TREE #################
#
# in_root = Node.new(5)
# in_root.left = Node.new(2)
# in_root.right = Node.new(6)
# in_root.left.left = Node.new(1)
# in_root.left.right = Node.new(4)
# in_root.left.right.left = Node.new(3)
# in_root.right.right = Node.new(7)
#
# #           5
# #       /       \
# #     2           6
# #   /   \          \
# # 1      4          7
# #       /
# #      3
# #
#
# rev_in_root = Node.new(5)
# rev_in_root.left = Node.new(6)
# rev_in_root.right = Node.new(2)
# rev_in_root.right.left = Node.new(4)
# rev_in_root.right.right = Node.new(1)
# rev_in_root.right.left.right = Node.new(3)
# rev_in_root.left.left = Node.new(7)
#
# #           5
# #       /       \
# #     6           2
# #   /           /  \
# # 7            4    1
# #               \
# #               3
#
#
# def preorder(node, arr)
#   return if node.nil?
#   arr.push node.val
#   preorder(node.left, arr)
#   preorder(node.right, arr)
# end
#
# def postorder(node, arr)
#   return if node.nil?
#   postorder(node.left, arr)
#   postorder(node.right, arr)
#   $postorder.push node.val
# end
#
# def inorder(node, arr)
#   return if node.nil?
#   inorder(node.left, arr)
#   arr.push node.val
#   inorder(node.right, arr)
# end
#
# $preorder = []
# $postorder = []
# $inorder = []
# $rev_inorder = []
#
# preorder(pre_root, $preorder)
# p $preorder
#
# postorder(post_root, $postorder)
# p $postorder
#
# inorder(in_root, $inorder)
# inorder(rev_in_root, $rev_inorder)
#
# p $inorder
# p $rev_inorder

i = 1
while i < 10000000
  if i % 9 == 0 && i % 7 == 0 && i % 5 == 4 && i % 8 == 1 && i % 6 == 3 && i % 4 == 1 && i % 3 == 0
    p i
    break
  end
  i += 1
end
