def xml_parser(file)
  content = File.readlines(file).map { |line| line.chomp! }
  content.drop(1)
end

p xml_parser("note.xml")
