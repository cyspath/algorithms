// what is the probability of making a specific shot
// where as... winning by making 1 shot vs winning by making at least 2/3 shots

// the chance to make it at least two of three is the probability of...
// make only 1 + make only 2 + make only 3 + make all 3

// xxo + xox + oxx+ xxx

function twoOfThree(makeChance) {
  var missChance = 1 - makeChance;
  return (makeChance * makeChance * missChance) * 3 + Math.pow(makeChance, 3)
}


console.log(twoOfThree(0.3)); // 0.352
console.log(twoOfThree(0.5)); // 0.5
console.log(twoOfThree(0.7)); // 0.7839

// for 50% or lower, play 1 shot
// for 50% or higher, play two of three
