class Array
	
	def sum
		if self==[]
			0
		else
			sum=0
			self.each {|x| sum+=x}
			sum
		end
	end

	def square
		self.map {|x| x*x}
	end

	def square!
		self.map! {|x| x=x*x}
	end

end
	
	
