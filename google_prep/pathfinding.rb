
# 10x9
maze = [
  ["#","#","#","#","#","#","#","#","#","#"],
  ["#"," "," "," ","#"," "," "," "," ","#"],
  ["#"," "," "," ","#"," "," "," "," ","#"],
  ["#"," ","#"," ","#"," ","#","#"," ","#"],
  ["#"," ","#"," ","#"," ","#"," "," ","#"],
  ["#"," ","#"," "," "," ","#"," ","#","#"],
  ["#"," ","#"," "," "," ","#"," ","T","#"],
  ["#","S","#"," "," ","#","#"," "," ","#"],
  ["#","#","#","#","#","#","#","#","#","#"]
]
# s = [7,1]
# e = [6,8]

class Node
  attr_accessor :parent, :dg, :g, :h, :f, :val, :coor
  def initialize(val,dg,self_coor,target_coor)
    @val = val
    @coor = self_coor
    @dg = dg
    @h = find_h(target_coor)
    @g = find_g(dg)
    @f = @h + @g
  end

  def find_g(dg)
    if parent
      parent.dg + dg
    else
      dg
    end
  end

  def find_h(target_coor)
    ((target_coor[0] - @coor[0]).abs + (target_coor[1] - @coor[1]).abs) * 10
  end

  def distance(parent)
    return 10 if @coor[0] == parent.coor[0] || @coor[1] == parent.coor[1]
    14
  end
end

def mazerunner(maze, x, y, end_x, end_y)
  open = []
  closed = []

  # add start node to open list
  node = Node.new(maze[x][y], 0, [x,y], [end_x, end_y])
  maze[x][y] = node
  open.push(node)

  while true
    # find current which has lowest f cost, remove from open and add it to closed
    current = nil
    open.each do |node|
      current = node if current.nil?
      current = node if node.f < current.f
    end
    closed.push(open.delete(current))

    # if current is target node get out of loop
    break if current.val == "T"

    # for each neighbor of current, if neight is not walkable or is in closed arr, skip
    # if new path g to neight is shorter or neighbor not in open, set f, set parent to current, add to open if not in open
    neighbors = neighbors(maze, current, end_x, end_y)
    neighbors.each do |node|
      if node.val == "#" || closed.include?(node)
        next
      end
      if open.include?(node) == false || current.g + node.distance(current) < node.g
        node.parent = current
        node.g = current.g + node.distance(current)
        node.f = node.g + node.h
        open.push(node) if open.include?(node) == false
      end
    end

  end

  path = []
  while current.parent.nil? == false
    path.unshift(current.parent.coor)
    current = current.parent
  end

  path.each do |coor|
    maze[coor[0]][coor[1]] = "*"
    print_maze(maze)
    sleep 0.5
  end

end

def print_maze(maze)
  maze.each do |row|
    puts
    row.each do |el|
      if el.class != String
        print (el.val + " ")
      else
        print el + " "
      end
    end
  end
end

def neighbors(maze, current, end_x, end_y)
  arr = []
  x = current.coor[0]
  y = current.coor[1]
  arr.<< maze[x - 1][y - 1] = Node.new(maze[x - 1][y - 1], 14, [x - 1, y - 1], [end_x, end_y]) if maze[x - 1][y - 1].class != Node
  arr.<< maze[x][y - 1] = Node.new(maze[x][y - 1], 10, [x, y - 1], [end_x, end_y]) if maze[x][y - 1].class != Node
  arr.<< maze[x + 1][y - 1] = Node.new(maze[x + 1][y - 1], 14, [x + 1, y - 1], [end_x, end_y]) if maze[x + 1][y - 1].class != Node
  arr.<< maze[x - 1][y] = Node.new(maze[x - 1][y], 10, [x - 1, y], [end_x, end_y]) if maze[x - 1][y].class != Node
  arr.<< maze[x + 1][y] = Node.new(maze[x + 1][y], 10, [x + 1, y], [end_x, end_y]) if maze[x + 1][y].class != Node
  arr.<< maze[x - 1][y + 1] = Node.new(maze[x - 1][y + 1], 14, [x - 1, y + 1], [end_x, end_y]) if maze[x - 1][y + 1].class != Node
  arr.<< maze[x][y + 1] = Node.new(maze[x][y + 1], 10, [x, y + 1], [end_x, end_y]) if maze[x][y + 1].class != Node
  arr.<< maze[x + 1][y + 1] = Node.new(maze[x + 1][y + 1], 14, [x + 1, y + 1], [end_x, end_y]) if maze[x + 1][y + 1].class != Node
  arr
end

mazerunner(maze, 7, 1, 6, 8)
