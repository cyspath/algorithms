
# Merge Sort O(nlogn)
def merge_sort(arr)
  return arr if arr.length <= 1
  left = arr[0...arr.length/2]
  right = arr[arr.length/2.. -1]
  merge(merge_sort(left), merge_sort(right))
end

def merge(left, right)
  result = []
  while !left.empty? && !right.empty?
    if left[0] < right[0]
      result.push(left.shift)
    else
      result.push(right.shift)
    end
  end
  result.concat(left).concat(right)
end

# p merge_sort([2, 4, 8, 6, 3, 10, 9, 1, 7, 5])

# Quick Sort O(nlogn)

def quick_sort(arr)
  return arr if arr.length <= 1
  pivot = arr[0]
  left = []
  right = []
  idx = 1
  while idx < arr.length
    if arr[idx] < pivot
      left.push(arr[idx])
    else
      right.push(arr[idx])
    end
    idx += 1
  end
  quick_sort(left).concat([pivot]).concat(quick_sort(right))
end

# p quick_sort([2, 4, 8, 6, 3, 10, 9, 1, 7, 5])

# bubble Sort O(n^2)

def bubble_sort(arr)
  while true
    swapped = false
    i = 0
    while i < arr.length - 1
      if arr[i] > arr[i + 1]
        arr[i], arr[i + 1] = arr[i + 1], arr[i]
        swapped = true
      end
      i += 1
    end
    break if swapped == false
  end
  arr
end

# p bubble_sort([2, 4, 8, 6, 3, 10, 9, 1, 7, 5])

# Counting Sort O(n + k) k is the maximum

def counting_sort(arr, min, max)
  hash = {}
  (min..max).to_a.each { |n| hash[n] = 0 }
  arr.each { |num| hash[num] += 1 }
  result = []
  hash.each do |k, v|
    v.times do
      result.push(k)
    end
  end
  result
end

# class Array
#   def counting_sort #with array instead of hash
#     min, max = minmax
#     count = Array.new(max - min + 1, 0)
#     each {|number| count[number - min] += 1}
#     (min..max).each_with_object([]) {|i, ary| ary.concat([i] * count[i - min])}
#   end
# end
#
# p counting_sort([5,4,3,6,7,8,4,6,5], 3, 8)
