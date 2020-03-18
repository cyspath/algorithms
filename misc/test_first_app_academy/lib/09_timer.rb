class Timer
	attr_accessor :seconds
	def format(time)
		if time<10
			"0#{time}"
		else
			time.to_s
		end
	end
	
	def seconds
		0
	end
	
	def time_string
		h=@seconds/(60*60)
		m=(@seconds%(60*60))/60
		s=@seconds%60
		format(h)+":"+format(m)+":"+format(s)
	end
end

