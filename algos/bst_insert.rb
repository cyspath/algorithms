class Node
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

def create_tree
  letters = ('a'..'z').to_a
  current_nodes = []
  p letters
  node = Node.new(letters[0]) if current_nodes.empty?

  j = 1 # letter index
  while true
    new_nodes = []
    current_nodes.each_with_index do |node, idx|
      node.left = Node.new(letters[j])
      j += 1
      node.right = Node.new(letters[j])
      j += 1
      new_nodes.push(node.left)
      new_nodes.push(node.right)
    end
    binding.pry
    current_nodes = new_nodes
    p current_nodes
    break if j >= letters.length
  end
end

p create_tree
