def fib(n)
  store = {}
  i = 1
  while i <= n
    if i <= 2
      store[i] = 1
    else
      val = store[i - 1] + store[i - 2]
      store[i] = val
    end
    i += 1
  end
  store[n]
end
