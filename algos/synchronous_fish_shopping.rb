# HACKERRANK 20

# The first line contains 3 space-separated integers: n (the number of shopping centers), m (the number of roads), and k (the number of types of fish sold in Bitville), respectively.
#
# each line i denotes first the number of types of fish it sells, and followed by the fish type it self
#
# each line j of m roads comes next, where first and second are cities and third is time to travel between
#
# Print the minimum amount of time it will take for the cats to collectively purchase all k fish and meet up at shopping center n.


# N,M,K,
# i(arr)
# j(arr)
#
# Sample Input
# 5 5 5
# 1 1
# 1 2
# 1 3
# 1 4
# 1 5
# 1 2 10
# 1 3 10
# 2 4 10
# 3 5 10
# 4 5 10
#
# Sample Output 30
#
# Each road connectes 2 distinct shopping centers (i.e., no road connects a shopping center to itself).
# Each pair of shopping centers is directly connected by no more than 1 road.
# It is possible to get to any shopping center from any other shopping center.
# Each type of fish is always sold by at least one fishmonger.
#
# explanation:
# Big Cat can choose the following route: 1 2 4 5, and buy fish at all of the shopping centers on his way.
# Little Cat can choose the following route: 1 3 5, and buy fish from the fishmonger at the 3 shopping center only.
