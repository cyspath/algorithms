# Sequence search in 2D array

# Given a 2d array A, and a sequence of numbers S, find if it exists in the array. You are allowed to traverse only up, down, left and right from each cell.
#
# Example
#
# A: 1 2 3 4
#    5 6 7 8
#
# S: 1 2 6 7, Result: true
# S: 1 2 3 5, Result: false
# Solution
#
# Use recursion to test if a particular sequence exists starting from each cell in the matrix
# For use an index variable to track where in the sequence we are and how much of the string is left to be compared
# Use a cache to speed up computations, cache would store all the failed indices that we've tried in the past recursions

def sequence_search(matrix)

end
