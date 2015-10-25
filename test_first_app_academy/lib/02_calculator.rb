def add(a,b)
	a+b
end


def subtract(a,b)
	a-b
end


def sum(arr)
	sum=0
	arr.each {|a|sum+=a}
	sum
end


def multiply(arr)
	product=1
	arr.each {|x|product=product*x}
	product
end


def power(a,b)
	a**b
end


def factorial(n)
	if n==0
		return 1
	end
	if n==1
		return 1
	else
		n*factorial(n-1)
	end
end