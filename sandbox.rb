# def  compress( str)
#     result = ""
#     table = {}
#     current = nil
#
#     i = 0
#     while i < str.length
#       if str[i] != current && !table[str[i]].nil?
#         letter = str[i - 1]
#         result += letter
#         result += table[letter] if table[letter] > 1
#         table[letter] = nil
#       end
#
#       if table[str[i]]
#         table[str[i]] += 1
#       else
#         table[str[i]] = 1
#       end
#       current = str[i]
#
#       i += 1
#     end
#     result
# end

def  compress( str)
    result = ""
    table = {}
    i = 0
    while i < str.length
        table[str[i]] ? table[str[i]] += 1 : table[str[i]] = 1
        if str[i] != str[i - 1]
            result += str[i - 1] if table[str[i - 1]]
            result += table[str[i - 1]].to_s if table[str[i - 1]] && table[str[i - 1]] != 1
        end
        i += 1
    end
    result += str[i - 1] if table[str[i - 1]]
    result += table[str[i - 1]].to_s if table[str[i - 1]] && table[str[i - 1]] != 1
    result
end

p compress('aaabaaaaccaaaaba')
