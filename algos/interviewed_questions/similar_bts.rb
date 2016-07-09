# two binary trees are considered similar if the val of corresponding nodes are the same,
# and also they are the same if childrens are swapped.
#
# given root nodes of two binary trees, check if they are similar or not
#
# for example:
#
# similar trees:
#
#     a         a
#   /   \     /   \
#  b     c   c     b
#
#
#    a         a
#  /   \     /   \
# b     c   b     c
#
#         a              a
#       /   \          /   \
#      b     b        b     b
#     / \   / \      / \   / \
#    c  d  e   f    f   e d   c
