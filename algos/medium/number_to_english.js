var numbersToWords = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};

var numbersToPlace = {
  10: 'ten',
  100: 'hundred',
  1000: 'thousand',
  1000000: 'million',
  1000000000: 'billion',
  1000000000000: 'trillion',
  1000000000000000: 'quadrillion',
  1000000000000000000: 'quintillion',
};

function numName(n) {
  var result = [];
  var arr = splitNum(n);
  var tails = getTails(arr.length);
  for (var i = 0; i < arr.length; i++) {
    result.push(nameThree(arr[i]));
    result.push(tails[i]);
  }
  return result.join(" ");
}

function getTails(length) {
  var result = [];
  for (var key in numbersToPlace) {
    if (key < 1000) {
      continue;
    }
    length -= 1;
    if (length > 0) {
      result.push(numbersToPlace[key]);
    }
  }
  result.reverse().push("");
  return result;
}

function splitNum(n) {
  var result = [];
  while (n > 0) {
    result.push(Math.floor(n%1000))
    n = Math.floor(n/1000)
  }
  return result.reverse();
}

function nameThree(n) {
  var arr = splitThree(n);
  var result = [];
  if (arr[0] !== 0) {
    result.push(numbersToWords[arr[0]] + " hundred");
  }
  result.push(nameTwo(arr));
  return result.join(" ");
}

function splitThree(n) {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(n%10);
    n = Math.floor(n/10);
  }
  return arr.reverse();
}

function nameTwo(arr) {
  if (arr[0] === 0 && arr[1] === 0 && arr[2] === 0) {
    return "";
  } else if (arr[1] === 0 && arr[2] === 0) {
    return numbersToWords[0];
  } else if (arr[1] > 0 && arr[2] === 0) {
    return numbersToWords[arr[1] * 10];
  } else if (arr[1] > 1) {
    return numbersToWords[arr[1] * 10] + "-" + numbersToWords[arr[2]];
  } else if (arr[1] > 0) {
    return numbersToWords[arr[1] * 10 + arr[2]];
  } else {
    return numbersToWords[arr[2]];
  }
}

console.log(numName(12345678911));
