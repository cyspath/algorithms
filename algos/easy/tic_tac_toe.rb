class Game
  attr_accessor :grid
  def initialize
    @grid = gen_grid
  end

  def gen_grid
    grid = Array.new(3)
    grid.map! { |e| Array.new(3, " ")}
  end

  def run
    pegs = ["#", "O"]
    turn = 1
    while true
      print_grid
      sleep 1
      if turn % 2 != 0
        peg = pegs[0]
        other_peg = pegs[1]
      else
        peg = pegs[1]
        other_peg = pegs[0]
      end

      winning_loc = check_winning(peg)
      block_loc = check_winning(other_peg)

      if winning_loc
        @grid[winning_loc[0]][winning_loc[1]] = peg
        print_grid
        p peg + " has won!"
        return
      elsif block_loc
        @grid[block_loc[0]][block_loc[1]] = peg
      else
        place_random(peg)
      end

      turn += 1
      if turn > 9
        print_grid
        p "Tie!"
        return
      end
    end

  end

  def place(peg)
    winning_loc = check_winning(peg)
    if winning_loc
      @grid[winning_loc[0]][winning_loc[1]] = peg
    else
      place_random(peg)
    end
  end

  def check_winning(peg)
    results = [
      return_winning_loc([[0,0],[0,1],[0,2]], peg),
      return_winning_loc([[1,0],[1,1],[1,2]], peg),
      return_winning_loc([[2,0],[2,1],[2,2]], peg),
      return_winning_loc([[0,0],[1,0],[2,0]], peg),
      return_winning_loc([[0,1],[1,1],[2,1]], peg),
      return_winning_loc([[0,2],[1,2],[2,2]], peg),
      return_winning_loc([[0,0],[1,1],[2,2]], peg),
      return_winning_loc([[0,2],[1,1],[2,0]], peg)
    ]
    loc = nil
    results.each do |x|
      loc = x if x
    end
    loc
  end

  def return_winning_loc(arr, peg)
    loc = nil
    count = 0
    arr.each do |c|
      if @grid[c[0]][c[1]] == " "
        loc = c
      elsif @grid[c[0]][c[1]] == peg
        count += 1
      end
    end
    if count == 2 && loc
      loc
    else
      nil
    end
  end


  def place_random(peg)
    loc = rand_loc
    @grid[loc[0]][loc[1]] = peg
  end

  def list_empty_coors
    result = []
    i = 0
    while i < @grid.length
      j = 0
      while j < @grid[i].length
        result.push([i,j]) if @grid[i][j] == " "
        j += 1
      end
      i += 1
    end
    result
  end

  def rand_loc
    coors = list_empty_coors
    coors[rand(coors.length)]
  end

  def print_grid
    p @grid[0].join " | "
    p @grid[1].join " | "
    p @grid[2].join " | "
    puts " "
  end

end

g = Game.new
g.run
