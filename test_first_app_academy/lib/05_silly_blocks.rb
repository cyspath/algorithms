def reverser

	word = yield

	word=word.split(" ")
	idx=0
	while idx<word.length
		word[idx]=(word[idx]).reverse
		idx+=1
	end
	return word.join(" ")
end

def adder(n=1)
	num=yield
	n+num
end

def repeater(num=1)
	
	num.times do
		yield
	end
end
#notes: learned some new today - yield and how to set up rspec on windows