# Fishing trip
# Given a 2d array filled with numbers indicating fish, plan a trip from 0,0 cell to n-1,m-1 cell maximizing the number of fish picked along the way.
#
# Solution
#
# The key concept here is: for cell x,y pick max(fish(x,y-1), fish(x-1,y))
# Do this in a DP way storing the intermediate values in a matrix until we reach the last n-1,m-1 cell

matrix = [
  [2,3,1,4,0],
  [1,1,3,4,1],
  [0,0,6,1,2],
  [1,9,2,0,3]
]
# 21

def most_fish_path(matrix)
  m = matrix.first.length
  n = matrix.length
  grid = Array.new(n).map { |el| Array.new(m, 0) }


  i = 0
  while i < n
    j = 0
    while j < m

      if i == 0 && j == 0
        grid[i][j] = matrix[i][j]
      elsif i == 0
        grid[i][j] = matrix[i][j] + grid[i][j - 1]
      elsif j == 0
        grid[i][j] = matrix[i][j] + grid[i - 1][j]
      else
        grid[i][j] = [grid[i - 1][j], grid[i][j - 1]].max + matrix[i][j]
      end

      j += 1
    end
    i += 1
  end
  print grid
  grid[n - 1][m - 1]
end


def print(grid)
  grid.each { |row| p row }
  puts
end

p most_fish_path(matrix) #21
