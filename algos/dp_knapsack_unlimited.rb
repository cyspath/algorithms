# Knapsack problem
# Given a set of object weight and values, and total capacity of the sack, find the most optimal combination of the objects to fill the sack to max possible value
#
# Solution O(k*n)
#
# Start with objects less than weight 1
# Iterate to get to the next level, i.e. objects with weight 2 by using the result from 1
# For every capacity from 0 to max capacity, try every cake which is less than current capacity and see if we can get a better value including this cake in the optimal set

def knapsack(k, cakes) # where arr is a 2d array where first item is weight second item is value
  capacities = (0..k).to_a
  cakes.unshift([0, 0]) # add 0 weight cake of 0 value to list

  grid = Array.new(cakes.length).map { |el| Array.new(capacities.length, 0)}

  grid.each_with_index do |row, i|
    next if i == 0
    row.each_with_index do |el, j|
      next if j == 0
      current_item_weight = cakes[i][0]
      if current_item_weight > capacities[j]
        grid[i][j] = grid[i - 1][j]
      else
        # compare (current cake value + max value with current cake but subtract current cake weight) with (max value without current cake at i - 1)
        val_with_current = grid[i][j - current_item_weight] + cakes[i][1]
        grid[i][j] = [val_with_current, grid[i - 1][j]].max
      end
    end
  end

end

p knapsack(6, [[2,10], [3,20], [5,30]]) # 40
p knapsack(50, [[10,60], [20,100], [30,120]]) # 300


##########

def max_duffel_bag_value(cake_values, capacity)
  capacities = (0..capacity).to_a
  cakes = cake_values.unshift([0,0])

  grid = Array.new(cakes.length).map { |row| Array.new(capacities.length, nil) }

  i = 0
  while i < cakes.length
    j = 0
    while j < capacities.length
      if i == 0 || j == 0
        grid[i][j] = 0
      elsif capacities[j] < cakes[i][0]
        grid[i][j] = grid[i - 1][j]
      else
        remainder = capacities[j] - cakes[i][0]
        value_above = grid[i - 1][j]
        value_current = cakes[i][1] + grid[i][remainder]
        grid[i][j] = [value_current, value_above].max
      end

      j += 1
    end
    i += 1
  end
  grid[i - 1][j - 1]
end

# p max_duffel_bag_value([[1,15], [2,90], [4,160]], 6)
