class Node
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

root = Node.new(5)
root.left = Node.new(2)
root.left.left = Node.new(1)
root.left.right = Node.new(4)
root.left.right.left = Node.new(3)
root.left.right.left.left = Node.new(2.5)
root.left.right.left.left.right = Node.new(3)


root.right = Node.new(7)
root.right.left = Node.new(6)
root.right.right = Node.new(9)
root.right.right.left = Node.new(8)
root.right.right.right = Node.new(10)
root.right.right.right.right = Node.new(11)

#           5
#       /       \
#     2           7
#   /   \       /   \
# 1       4    6     9
#       /          /   \
#     3           8     10
#   /                    \
# 2.5                     11
#  \
#   3

def print_in_order(node)
  print_in_order(node.left) if node.left
  p node.val
  print_in_order(node.right) if node.right
end

def print_pre_order(node)
  p node.val
  print_pre_order(node.left) if node.left
  print_pre_order(node.right) if node.right
end

###########################################

class FileOrDir
  attr_accessor :name, :type, :children
  def initialize(name, type, children)
    @name = name
    @type = type
    @children = children
  end

  def file?
    @type == 'file'
  end
end

photos = FileOrDir.new('photos', 'dir', [FileOrDir.new('image_1.jpg', 'file', []), FileOrDir.new('image_2.jpg', 'file', [])])
desktop = FileOrDir.new('desktop', 'dir', [photos, FileOrDir.new('resume.txt', 'file', [])])
win32 = FileOrDir.new('win32', 'dir', [FileOrDir.new('win32_a.txt', 'file', []), FileOrDir.new('win32_b.txt', 'file', []), FileOrDir.new('win32_c.txt', 'file', [])])
c = FileOrDir.new('C', 'dir', [desktop, win32])

def print_file_system(node, str)
  if node.file?
    return p str + "/" + node.name
  end
  node.children.each do |n|
    print_file_system(n, str + "/" + node.name)
  end
end

###########################################
