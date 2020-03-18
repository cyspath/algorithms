
class Temperature
	def initialize (hash={})
		if hash.include?(:f)
			@temp=(hash[:f]-32)*5.0/9
		end
		if hash.include?(:c)
			@temp=hash[:c]
		end
	end
	
	def in_fahrenheit
		f=(@temp*9.0)/5.0+32
	end
	
	def in_celsius
		@temp
	end
	
	def Temperature.from_celsius(t)
		Temperature.new(:c => t)
	end
	
	def Temperature.from_fahrenheit(t)
		Temperature.new(:f =>  t)
	end
	
	def ctof(c)
		c*9.0/5+32
	end
	
	def ftoc(f)
		(f-32)*5.0/9
	end
end


class Celsius < Temperature
	def initialize(t)
		@temp=t
	end
end

class Fahrenheit < Temperature
	def initialize(t)
		@temp=(t-32)*5.0/9
	end
end
