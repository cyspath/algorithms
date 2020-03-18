# Cats with Hats
# You have 100 cats. You have arranged all your cats in a line. Initially, none of your cats have any hats. You take 100 rounds walking around the cats, always starting with the first cat. Every time you stop at a cat, you put a hat on it if it doesn't have one, and you take its hat off if it has one on.
# The first round, you stop at every cat. The second round, you only stop at every 2nd cat (#2, #4, #6, #8, etc.). The third round, you only stop at every 3rd cat (#3, #6, #9, #12, etc.). You continue this process until the 100th round (i.e. you only visit the 100th cat).
# Write a program that prints which cats have hats at the end.

def cats_with_hats
  cats = {}
  (1..100).each { |n| cats[n] = false }
  (1..100).each do |step|
    cats.keys.each do |key|
      cats[key] = !cats[key] if key % step == 0
    end
  end
  cats.select { |k,v| v == true }.keys
end

p cats_with_hats


# MY OLD SOLUTION Feb 23
################CATS WITH HATS######################
cats=[*1..100]
#cats in an array
i=2
#first walk, every cat got a hat, we will start at round 2

while i<=100

    selectedcat=[*1..100].select do |x|
        x%i==0
    end
	# selectedcat contains the cats visited during round i

	hatcatvisited = (cats&selectedcat)
	nohatcatvisited = selectedcat-hatcatvisited
	cats = (cats) - (hatcatvisited) + (nohatcatvisited)
    # remove hatcat visited again, add on visited nohatcat

    i+=1
end

puts "#{cats.sort}"
# cats => [1,4,9,16,25,36,49,64,81,100]
########################################################

#STOCK PICKER
# choose best two days to buy and then sell the stock, to make max profit

def stock_picker(arr)
  return nil if arr.length < 2
  min = arr[0]
  profit = nil
  buy = nil
  sell = nil
  arr.each_with_index do |price, day|
    if min.nil?
      min = price
      buy = day
      next
    end
    if profit.nil?
      profit = price - min
      sell = day
      next
    end
    if price < min
      min = price
      buy = day
      next
    end
    if price - min > profit
      profit = price - min
      sell = day
    end
  end
  [buy, sell]
end

p stock_picker([5,3,1,4,6,3,7,2,1]) # [2, 6]
