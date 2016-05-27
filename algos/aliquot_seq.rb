# a number's aliqut sum is the sum of its factors excluding itself
#
# for example, the aliquot sum of 10 is: 1+2+5 = 8
#
# we can use the aliquot sum to define a special sequence where it begins with the number itself,
# the second number is the first number's aliquot sum, and third is seconds's aliquot sum, etc
#
# first input is the number, second is the length of sequence

def aliquot_seq(n, size)
  result = []
  while result.length < size
    result.push(n)
    n = aliquot_sum(n)
  end
  result
end

def aliquot_sum(n)
  factors = []
  i = 1
  while i <= n / 2
    factors.push(i) if n % i == 0
    i += 1
  end
  factors.inject(0, &:+)
end

p aliquot_seq(10, 4) # 10 8 7 1
p aliquot_seq(7, 4) # 7 1 0 0
