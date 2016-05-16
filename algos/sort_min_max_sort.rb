################################# O(max) sorting with min and max #######################################

# Write a function that takes:
#
# a list of unsorted_scores
# the highest_possible_score in the game
# and returns a sorted list of scores in less than O(nlgn) time.

# MIN MAX SORT O(N) but takes space, its counting sort

def min_max_sort(arr, max)
  scores = Array.new(max + 1, 0)
  arr.each { |n| scores[n] += 1 }
  result = []
  scores.each_with_index do |el, idx|
    el.times do
      result.push(idx)
    end
  end
  result
end

p min_max_sort([3,4,3,2,4,3,5,6,7,5,6,7,1,2,8,9,9], 10)
