# Given a boolean matrix, where a cell that's false denotes an obstacle, calculate the number of ways we can reach the bottom right cell n-1,m-1 starting at top left 0,0.
# You can only go right or down

# Solution
#
# In classic DP fashion, use a matrix to keep of the number of ways to reach previous step
# In this case to calculate the number of ways to reach cell n,m, just add the number of ways to reach n-1,m and n,m-1 cell.
# Ensure the first row and first col are pre-populated with num ways as 1

t = true
f = false
matrix = [
  [t,t,t,t,t,t],
  [t,f,t,t,t,t],
  [t,t,f,f,t,f],
  [t,t,t,t,t,t]
]

def pathfinding_ways(matrix)
  # generate a grid that keeps track of counts
  m = matrix.first.length
  n = matrix.length
  grid = Array.new(n).map { |el| Array.new(m, 0) }


  i = 0
  while i < n
    j = 0
    while j < m
      if matrix[i][j] == false
        grid[i][j] = 0
      elsif i == 0 || j == 0
        grid[i][j] = 1
      else
        grid[i][j] = grid[i - 1][j] + grid[i][j - 1]
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

p pathfinding_ways(matrix)

#######

def num_ways(matrix)
    n = matrix.first.length
    m = matrix.length
    num_ways = Array.new(m).map { |el| Array.new(n, 0) }

    for i in 0...m do
        for j in 0...n do
            if matrix[i][j] == true # No obstacle
                if i == 0 || j == 0
                  num_ways[i][j] = 1
                else
                  num_ways[i][j] = num_ways[i-1][j] + num_ways[i][j - 1]
                end
                # print num_ways
            end
        end
    end

    return num_ways[m-1][n-1]
end

p num_ways(matrix)
