


# Evaluate the value of an arithmetic expression in Reverse Polish Notation.
#
# Valid operators are +, -, *, /. Each operand may be an integer or another expression.
#
# Some examples:
#   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
#   ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6

def eval_rpn(tokens)
  keys = { '+' => :+, '-' => :-, '*' => :*, '/' => :/ }

  while true
    idx = 0
    while idx < tokens.length
      if keys[tokens[idx]]
        n1 = tokens[idx - 2].to_i
        n2 = tokens[idx - 1].to_i
        result = n1.send(keys[tokens[idx]], n2)
        3.times { tokens.delete_at(idx - 2) }
        tokens.insert(idx -2, result)
        idx = 0
        break
      end
      idx += 1
    end

    break if tokens.length <= 2
  end
  tokens.first
end
# p eval_rpn(["4", "13", "5", "/", "+"] )

# Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.
#
# For example:
#
# Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return it.

def add_digits(num)
    return num if num < 10
    add_digits(num/10 + num%10)
end
