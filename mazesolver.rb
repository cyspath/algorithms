class Mazesolver
  attr_reader :maze, :pos, :closelist

  def initialize(content)
    @maze = content
    @pos = {}
    @closelist = {}
  end

  def run
    find_startpos #prints @startpos and returns [idx1,idx2]
    find_endpos
    sleep 1
    add_startpos_to_pos
    expand # expands out and reaches the endpos
    traceback # traceback by accessing parents, and change map markers to show path
  end

  def expand
    current = nil
    while current != @endpos
      current = find_pos_min
      neighbors(current)

      @closelist[current] = @pos[current]
      @pos.delete(current)
      puts nil
    end
  end

  def traceback
    path = [@endpos]
    parent = nil
    while parent != @startpos
      parent = @closelist[path[-1]][0]
      path << parent
    end
    trace(path)
  end

  def trace(path)
    sleep 0.5
    idx = -2
    while idx >= -(path.length) + 1
      @maze[path[idx][0]][path[idx][1]] = "X"
      sleep 0.2
      system("clear")
      puts "Shortest distance to reach \"E\" is #{@closelist[@endpos][1]}."
      display
      idx -= 1

    end
  end

  def display
    @maze.each { |row| puts row.join(" ") }
    puts nil
  end


  def find_pos_min
    min = nil
    min_key = nil
    @pos.each do |key, value|
      if min == nil
        min = value[2]
        min_key = key
      end
      if value[2] < min
        min = value[2]
        min_key = key
      end
    end
    #puts "min value in @pos is #{min_key}, with f value of #{min}."
    return min_key
  end

  def neighbors(pos) #finds 8 pos and selects proper pos (not obstacle)

    d10 = []
    d14 = []

    uu = [pos[0] - 1, pos[1]]
    rr = [pos[0], pos[1] + 1]
    dd = [pos[0] + 1, pos[1]]
    ll = [pos[0], pos[1] - 1]

    d10 << uu << rr << dd << ll

    ur = [pos[0] - 1, pos[1] + 1]
    dr = [pos[0] + 1, pos[1] + 1]
    dl = [pos[0] + 1, pos[1] - 1]
    ul = [pos[0] - 1 , pos[1] - 1]

    d14 << ur << dr << dl << ul

    d10.select! { |dir| @maze[dir[0]][dir[1]] != "*" && !@closelist.include?(dir) }
    d14.select! { |dir| @maze[dir[0]][dir[1]] != "*" && !@closelist.include?(dir) }

    #puts neighbors corrdinates as keys into @pos, which will return [parent, g_value, f_value]
    d10.each do |dir|
      if @pos.keys.include?(dir) && @pos[dir][2] < (@pos[pos][1] + 10 + calc_h_value(dir))
        #do nothing
      else
        @pos[dir] = [pos]
        @pos[dir] << (@pos[pos][1] + 10)
        @pos[dir] << (@pos[dir][1] + calc_h_value(dir))
      end
    end
    d14.each do |dir|
      if @pos.keys.include?(dir) && @pos[dir][2] < (@pos[pos][1] + 14 + calc_h_value(dir))
        #do nothing
      else
        @pos[dir] = [pos]
        @pos[dir] << (@pos[pos][1] + 14)
        @pos[dir] << (@pos[dir][1] + calc_h_value(dir))
      end
    end
  end


  def calc_h_value(pos)
    row_diff = (@endpos[0] - pos[0]).abs
    col_diff = (@endpos[1] - pos[1]).abs
    h = (row_diff - col_diff).abs * 10 + (([row_diff,col_diff].min) * 14) #does diagonal x]
    return h
  end

  private #############################

  def find_startpos
    @startpos = nil
    @maze.each_with_index do |row, idx1|
      row.each_with_index do |col, idx2|
        @startpos = [idx1,idx2] if @maze[idx1][idx2] == "S"
      end
    end
    if @startpos != nil
      puts "Start position found... it is #{@startpos}."
      return @startpos
    else
      puts "Error. No start location(\"S\") found."
    end
  end

  def find_endpos
    @endpos = nil
    @maze.each_with_index do |row, idx1|
      row.each_with_index do |col, idx2|
        @endpos = [idx1,idx2] if @maze[idx1][idx2] == "E"
      end
    end
    if @endpos != nil
      puts "End position found... it is #{@endpos}."
      return @endpos
    else
      puts "Error. No end location(\"E\") found."
    end
  end

  def add_startpos_to_pos
    @pos[@startpos] = [@startpos, 0, calc_h_value(@startpos)]
  end


end

#p ARGV

content = []
File.readlines(ARGV[0]).each do |line|
  content << line.chomp.split("")
end
#p content

m = Mazesolver.new(content)
m.run

# ruby mazesolver.rb maze.txt

# A* algorithm pathing finding video (besure to not reuse/reopen squares in @closelist)
# https://www.youtube.com/watch?v=-L-WgKMFuhE
