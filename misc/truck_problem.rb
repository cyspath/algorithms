# Given a fleet of 50 trucks, each with a full fuel tank and a range of 100 miles,
# how far can you deliver a payload? You can transfer the payload from truck to truck,
# and you can transfer fuel from truck to truck. Assume all the payload will fit in one truck.

def truckin(trucks, mileage)
  distance = 0
  while trucks >= 1
    distance += (mileage.to_f / trucks)
    trucks -= 1
  end
  distance
end

p truckin(50, 100) #449.9
