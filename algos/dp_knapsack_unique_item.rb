def knapsack_unique_item(k, items)
  items.unshift([0,0])
  k = (0..k).to_a
  grid = Array.new(items.length).map { |el| Array.new(k.length, 0) }

  i = 0
  while i < grid.length
    j = 0
    while j < grid[i].length
      if i == 0 || j == 0
        grid[i][j] = 0
      elsif items[i][0] > k[j]
        grid[i][j] = grid[i - 1][j]
      else
        wo_current = grid[i - 1][j]
        wo_current = grid[i - 1][k[j] - (items[i][0])] + items[i][1]
        grid[i][j] = [wo_current, wo_current].max
      end
      j += 1
    end
    i += 1
  end
  grid.each {|row| p row}
  grid[-1][-1]
end

p knapsack_unique_item(6, [[2,10], [3,20], [5,30]]) # 30
p knapsack_unique_item(50, [[10,60], [20,100], [30,120]]) # 220
