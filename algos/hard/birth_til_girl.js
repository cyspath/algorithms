// giving birth until get a girl, what is the over all population ratio

// should be approaching 50-50... below is not the right Answer

function chanceGirl() {
  var p = 1;
  var result = 0;
  while (p < 10) {
    result += Math.pow(0.5, p);
    p ++;
  }
  return result;
}

console.log(chanceGirl());
