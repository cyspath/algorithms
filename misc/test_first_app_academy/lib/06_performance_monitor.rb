def measure(i=1)
starttime=Time.now

i.times do
	yield if block_given?
end

return (Time.now-starttime) / (i)
end
