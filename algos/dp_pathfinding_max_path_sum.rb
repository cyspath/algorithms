# Fishing trip
# Given a 2d array filled with numbers indicating fish, plan a trip from 0,0 cell to n-1,m-1 cell maximizing the number of fish picked along the way.
#
# Solution
#
# The key concept here is: for cell x,y pick max(fish(x,y-1), fish(x-1,y))
# Do this in a DP way storing the intermediate values in a matrix until we reach the last n-1,m-1 cell
