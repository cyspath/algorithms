def pond_size(grid)
  result = []
  hash = {}
  i = 0
  while i < grid.length
    j = 0
    while j < grid[i].length
      if hash[[i,j]]
        j += 1
        next
      end
      if grid[i][j] == 0
        hash[[i,j]] = true
        coors = pond(i,j,grid,hash)
        result.push(coors.length)
      end
      j += 1
    end
    i += 1
  end
  result
end

def pond(i,j,grid,hash)
  result = [[i,j]]
  coors = [
    [i-1,j-1],[i-1,j],[i-1,j+1],[i,j-1],[i,j+1],[i+1,j-1],[i+1,j],[i+1,j+1]
  ]
  coors.each do |c|
    next if c[0] < 0 || c[1] < 0
    if grid[c[0]] && grid[c[0]][c[1]] == 0 && !hash[c]
      hash[c] = true
      result = result.concat(pond(c[0],c[1],grid,hash))
    end
  end
  result
end


pond = [
  [0,2,1,0],
  [0,1,0,1],
  [1,1,0,1],
  [0,1,0,1]
]

p pond_size(pond)
