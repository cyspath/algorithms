class RPNCalculator
	attr_accessor :calculator

	def initialize
		@calculator=[]
	end

	def push(n)
		@calculator.<<n
	end

	def plus
		if @calculator.length>=2
			sum=@calculator.pop+@calculator.pop
			@calculator.<<sum
		else
			raise "calculator is empty"
		end
	end

	def minus
		if @calculator.length>=2
			diff=(@calculator[-2])-(@calculator[-1])
			2.times do
				@calculator.pop
			end
			@calculator.<<diff
		else
			raise "calculator is empty"
		end
	end

	def times
		if @calculator.length>=2
			prod=@calculator.pop*@calculator.pop
			@calculator.<<prod
		else
			raise "calculator is empty"
		end
	end

	def divide
		if @calculator.length>=2
			quot=(@calculator[-2].to_f)/@calculator[-1]
			2.times do
				@calculator.pop
			end
			@calculator.<<quot
		else
			raise "calculator is empty"
		end
	end

	def value
		@calculator[-1]
	end

	def tokens(str)
		t=str.split(" ")
		t=t.map do |a|
			if a=="*"||a=="+"||a=="-" ||a=="/"
				a.to_sym
			else
				a.to_i
			end
		end
		t
	end
	
	def evaluate(t)
		arr=tokens(t)
		idx=0
		while arr.length!=1
			if arr[idx]==:+
				sum=arr[idx-1]+arr[idx-2]
				arr.delete_at(idx)
				arr.delete_at(idx-1)
				arr.delete_at(idx-2)
				arr.insert(idx-2,sum)
				idx=0
			end
			if arr[idx]==:*
				prod=arr[idx-1]*arr[idx-2]
				arr.delete_at(idx)
				arr.delete_at(idx-1)
				arr.delete_at(idx-2)
				arr.insert(idx-2,prod)
				idx=0
			end
			if arr[idx]==:-
				diff=arr[idx-2]-arr[idx-1]
				arr.delete_at(idx)
				arr.delete_at(idx-1)
				arr.delete_at(idx-2)
				arr.insert(idx-2, diff)
				idx=0
			end
			if arr[idx]==:/
				quot=(arr[idx-2].to_f)/(arr[idx-1])
				arr.delete_at(idx)
				arr.delete_at(idx-1)
				arr.delete_at(idx-2)
				arr.insert(idx-2,quot)
				idx=0
			end
			idx+=1
		end
		arr[0]
	end
end
