// 1. heavy pills in one bottle of 1.1 gram, where rest are 1.0 grams, 20 bottles - one measurement exactly

// 2. basketball, at what making a shot's probability would be worth for: one shot to make hoop vs. make at least two of three shots

// 3. ants on triangle, chance to collide

// 4. jugs of water, 3L and 5L jug to make 4 L

// 5. blue eyed ppl and normal eyed people live on island and blue eyed people have to leave in the morning for pickup,
//    no one knows their own eye color but can see all others eye color (answer: c days for c number of blue eyed people)

// 6. apocalypse, all families need to have child til 1 girl, then stop. whats the boy girl ratio? (answer 50%)

// 7. egg drop

// 8. 100 lockers, open and close, cats in the hat (3 vs 4 unique factors)

// 9. poison, 1000 bottles, 1 poisoned. you have 10 test strips, can be used as many times/as many drops as possible, 1 drop
//    will turn it black, you can run test once a day, and takes 7 day to get resuls. (answer good soluion 28 days, then, 10 days if reuse, then 7 days if use binary representation)

function toBinary(n) {
  var result = "";
  while (n >= 1) {
    result = (n % 2).toString() + result;
    n = Math.floor(n / 2);
  }
  return result;
}

function binaryToInt(str) {
  var arr = str.split("").reverse();

  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "1") {
      sum += Math.pow(2, i);
    }
  }
  return sum;
}
