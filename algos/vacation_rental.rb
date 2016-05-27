# HACKERRANK 20

# n is number of rental requests
# D is number of days rental is available for
# k number of queries
# arr i denotes a pair of numbers for left and right boundaries of the rental interval
# arr j has minimum number of days the rentals must be rented for single booking

# You must answer K queries, where each query is in the form of some integer d, denoting some minimum number of days that the property must be rented for. For each d, you must go through N  booking requests, processing them in the order in which they were received, and print the total number of days the property will be booked for, considering the given constraint on minimal booking length.

# For each d, print the total number of days that the property would be booked on a new line.


# Sample Input
# 2 5 2
# 3 3
# 1 4
# 1
# 3
#
# Sample Output
# 1
# 4

def booking(days, requests, minium_days)
  minium_days.each do |min|
    hash = {}
    count = 0
    (1..days).to_a.each { |d| hash[d] = false }

    requests.each do |req|
      req_duration = (req[1] - req[0] + 1)
      next if req_duration < min # if rental duration less than min
      req_days = (req[0]..req[1]).to_a
      overlap = false
      req_days.each do |d|
        if hash[d]
          overlap = true
          break
        end
      end
      next if overlap
      req_days.each { |d| hash[d] = true }
      count += req_duration
    end
    puts count
  end
end


p booking(5, [[3,3],[1,4]], [1,3])

# n,d,k = gets.strip.split(' ')
# n = n.to_i
# d = d.to_i
# k = k.to_i
#
# r = []
# n.times { r.push(gets.strip.split(' ').map(&:to_i)) }
#
# m = []
# k.times { m.push(gets.strip.to_i) }
