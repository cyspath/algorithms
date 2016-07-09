// find if a string is a palindrome by removing only 1 letter

// # aaab     3
// # baa`     0
// # aaa      true
// # acdaa    false

function checkPali(str) {
  for (var i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true
}

function removePali(str) {
  var checkInner = false, index;
  for (var i = 0; i < str.length / 2; i++) {

    if (str[i] !== str[str.length - 1 - i]) {
      if (checkInner === true) {
        return false;
      } else {
        checkInner = true;
        index = str.length - 1 - i;
        var left = checkPali(str.slice(i, str.length - i - 1));
        if (left === false) {
          index = i;
          var right = checkPali(str.slice(i + 1, str.length - i));
          if (right === false) {
            return false
          }
        }
        return index;
      }

    }

  }
  return true;
}

console.log(removePali('aadbbaa'));
