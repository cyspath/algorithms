class Node
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

def create_tree(node)
  letters = ('a'..'z').to_a
  current_nodes = [node]
  p current_nodes.map(&:val)

  j = 1 # letter index
  while j < letters.length
    new_nodes = []
    current_nodes.each_with_index do |node, idx|
      break if j >= letters.length
      node.left = Node.new(letters[j])
      j += 1
      new_nodes.push(node.left)

      break if j >= letters.length
      node.right = Node.new(letters[j])
      j += 1
      new_nodes.push(node.right)
    end
    current_nodes = new_nodes
    p current_nodes.map(&:val)
  end
end

root = Node.new('a')
p create_tree(root)
