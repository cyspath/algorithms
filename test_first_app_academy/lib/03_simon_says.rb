def echo(str)
	str
end

def shout(str)
	str.upcase
end

def repeat(str,n=2)
	i=2
	result=str
	while i<=n
		result+=" #{str}"
	i+=1
	end
	return result
end

def start_of_word(str,n)
	str[0..n-1]
end

def first_word(str)
	str.split(" ")[0]
end

def titleize(str)

	def cap(word)
		list=["a","an","but","and","the","or","for","so","nor","yet","over","to"]
		if list.include?(word)==true
			return false
		end
		return true
	end
	
	arr=str.split(" ")
	idx=0
	while idx<arr.length
		if cap(arr[idx])==true
			arr[idx]=arr[idx].capitalize
		end
		idx+=1
	end
	str=arr.join(" ")
	str[0]=str[0].upcase
	return str
end
	
	