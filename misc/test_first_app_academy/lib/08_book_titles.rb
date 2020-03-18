
class Book
  # TODO: your code goes here!
	
	def title=(str)
		arr=str.split(" ")
		dontcap=["a","an","and","the","in","of"]
		idx=0
		while idx<arr.length
			if dontcap.include?(arr[idx])==false
				arr[idx]=arr[idx].capitalize
			end
			idx+=1
		end
		
		str=arr.join(" ")
		str[0]=str[0].upcase
		
		@title= str

	end
	
	def title
		@title
	end
	
end
