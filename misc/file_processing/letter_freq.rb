def freq(file)
  content = File.readlines(file, 'r')
  content.map { |line| line.chomp! }
  content = content.join("")

  table = {}
  ('a'..'z').to_a.each { |letter| table[letter] = 0 }

  i = 0
  while i < content.length
    letter = content[i].downcase
    table[letter] += 1 if table[letter]
    i += 1
  end

  table
end

def write(str)
  File.open("log.txt", "w+") { |f| f.write(str) }
end

write(freq('sample_file.txt'))
