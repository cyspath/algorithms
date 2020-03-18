def translate(str)

	def latin(word)
	
		if word==word.capitalize
			cap=true
		else
			cap=false
		end
		
		word=word.downcase.split("")
		vowels=["a","e","i","o","u"]
		idx=0
		while true
			if vowels.include?(word[idx])==true
				break
			end
			
			if word[0]=="q" && word[1]=="u"
				word.shift
				word.shift
				word.push("q")
				word.push("u")
			end
			
			if vowels.include?(word[idx])==false
				letter=word.shift
				word.push(letter)
			end
		end
		
		word=word.join("")
		word=word+"ay"
		
		if cap==true
			word=word.capitalize
		end
		
		return word
	end
	
	str=str.split(" ")
	idx=0
	while idx<str.length
		str[idx]=latin(str[idx])
		idx+=1
	end
	
	return str.join(" ")
end

