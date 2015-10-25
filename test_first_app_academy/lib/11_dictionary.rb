#=begin
class Dictionary
	attr_accessor :entries
	
	def initialize
		@entries={}
	end

	def add(entry)
		if entry.class==String
			@entries[entry]=nil
		else
			entry.each do |key, value|
				@entries[key] = value
			end
		end
	end

	def keywords
		@entries.keys.sort
	end
	
	def include?(entry)
		if @entries.keys.include?(entry)
			true
		else
			false
		end
	end
	
	def find (key)	
		idx=0
		entryexist=false
		while idx<@entries.keys.length
			if @entries.keys[idx][0..key.length-1]==key
				entryexist=true
			end
			idx+=1
		end
		
		if entryexist==false
			{}
		else
			newentry={}
			idx=0
			while idx<@entries.keys.length
				if @entries.keys[idx][0..key.length-1]==key
					newentry[@entries.keys[idx]]=(@entries[@entries.keys[idx]])
				end
				idx+=1
			end
			newentry
		end
	end
	
	def printable
		arr=@entries.sort.map do |key, value|
		"[#{key}] \"#{value}\""
		end
		arr.join("\n")
	end
end
