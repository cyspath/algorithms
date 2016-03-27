####################################################################################################

class Node
  attr_accessor :val, :left, :right
  def initialize(val)
    @val = val
    @left, @right = nil, nil
  end
end

root = Node.new(5)
root.left = Node.new(2)
root.left.left = Node.new(1)
root.left.right = Node.new(4)
root.left.right.left = Node.new(3)
root.left.right.left.left = Node.new(2.5)
root.left.right.left.left.right = Node.new(3)


root.right = Node.new(7)
root.right.left = Node.new(6)
root.right.right = Node.new(9)
root.right.right.left = Node.new(8)
root.right.right.right = Node.new(10)
root.right.right.right.right = Node.new(11)

#           5
#       /       \
#     2           7
#   /   \       /   \
# 1       4    6     9
#       /          /   \
#     3           8     10
#   /                    \
# 2.5                     11
#  \
#   3


# Calculate the number of nodes in an full binary tree?
def count_node_btree(node)
  h = 0
  count = 1
  while true
    if node.left
      h += 1
      count += 2**h
      node = node.left
    else
      break
    end
  end
  count
end



####################################################################################################

# Given a string, find the longest substring T that contains m distinct characters. (need O(n) solution)

# hint: think of... window frame
def longest_uniq_substr(str, m)
  current_letters = {}
  longest_str = ""
  current = []

  i = 0
  while i < str.length

    if !current_letters[str[i]] && current_letters.keys.length == m
      while true
        if current_letters[current[0]] == 1
          current_letters.delete(current[0])
          current.shift
          break
        else
          current_letters[current[0]] -= 1
          current.shift
        end
      end
      current_letters[str[i]] = 1

    elsif !current_letters[str[i]]
      current_letters[str[i]] = 1
    else
      current_letters[str[i]] += 1
    end

    current.push(str[i])
    if current.length > longest_str.length
      longest_str = current.join("")
    end

    i += 1
  end
  longest_str
end

# longest_uniq_substr('abbiaacccdde', 3)
# => "aacccdd"

####################################################################################################


# 1.Binary search
# 2. find the first repeated element in the array
# 3. what is the time complexity of the code i wrote
# 4. what can u do to improve the time complexity
# 5. what is the space complexity for the program i wrote

def bsearch_arr(arr, n)
  left = arr.take(arr.length/2)
  right = arr.drop(arr.length/2 + 1)
  mid = arr[arr.length/2]
  mid_pt = arr.length/2

  if mid < n
    mid_pt + 1 + bsearch_arr(right, n)
  elsif mid > n
    bsearch_arr(left, n)
  else
    if left.length >= 1 && arr[mid_pt - 1] == mid
      bsearch_arr(left, n)
    else
      mid_pt
    end
  end


end

# p bsearch_arr([1,2,2,3,3,4,4,5], 3)

####################################################################################################

# Given a set of ranges for eg., (1,3), (2,4), (6,7) return only the non-overlapping set of ranges (which in this case should return only (6,7)).

def non_overlapping_range(arr)
  result = []

  return arr if arr.length == 1

  i = 0
  while i < arr.length
    current = arr[i]

    if i == 0 && current[1] < arr[i + 1][0]
      result.push(current)
    elsif i == arr.length - 1 && current[0] > arr[i - 1][1]
      result.push(current)
      break
    elsif i != arr.length - 1 && current[1] < arr[i + 1][0] && current[0] > arr[i - 1][1]
      result.push(current)
    end

    i += 1
  end
  result
end

# p non_overlapping_range([[1,3], [2,4], [6,7]])


####################################################################################################

def arr_fib(n)
  return [1] if n == 1
  return [1,1] if n == 2
  result = arr_fib(n-1)
  result.push(result[-1] + result[-2])
end

def fib(n)
  return 1 if n <= 2
  result = fib(n - 1) + fib(n - 2)
end

####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
####################################################################################################
