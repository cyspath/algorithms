with Michael Shick

internationalization i18n
dog d1g

"dog" []
dog, dig d1g

dog, [dog] true
dog, [dog, dug] false
dog, [dig] false
dog, [] true

def in_dict(word, arr)
	return false if word.empty?
	new_word = internationalize(word)
	arr.each do |el|
		if internationalize(el) == new_word && word != el
			return false
		end
	end
	true
end

def internationalize(word)
	word[0] + (word.length - 2) + word[-1]
end

i18n
house
5
1o1s1 ==== house

def pattern_matching(str, arr)
	pattern_arr = convert_pattern_to_arr(str)
	arr.each do |el|
		return true if match(pattern_arr, el)
	end
	false
end

def match(pattern, str)
	idx = 0 # str idx

	pattern.each do |el|
		if el.class != String
			idx += el
			next
		end
		return false if el != str[idx]
		idx += 1
	end
	return false if idx != str.length
	true
end

def convert_pattern_to_arr(str) “abc” "a1"
	letters = (a..z).to_a
	result = []

	current_num = “”

	i = 0
	while i < str.length
		if letters.include?(str[i])
			result.push(current_num.to_i) unless current_num.empty?
			current_num = “”
			result.push str[i]
		else
			current_num += str[i]
		end
		i += 1
	end
result.push(current_num.to_i) unless current_num.empty?

	result
end
