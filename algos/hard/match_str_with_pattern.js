function match(str, p, a, b) {
  if (p.length === 0 && str.length === 0) { // done matching
    return true;
  }

  for (var i = 0; i < str.length; i++) {

    if (p[0] === 'a') {
      var newA = str.slice(0, i + 1);
      if (a === undefined || newA === a) {
        var result = match(str.slice(i + 1), p.slice(1), newA, b);
      }
    } else if (p[0] === 'b') {
      var newB = str.slice(0, i + 1);
      if (b === undefined || newB === b) {
        var result = match(str.slice(i + 1), p.slice(1), a, newB);
      }
    }

    if (result === true) {
      return true
    }

  }
  return false;
}

// true
console.log(match('catcatgocatgo', 'aabab'));
console.log(match('catcatgocatgo', 'bbaba'));
console.log(match('catcatgocatgo', 'a'));
console.log(match('catcatgocatgo', 'ab'));
console.log(match('catcatgocatgo', 'b'));

// false
console.log(match('catcatgocatgo', 'aba'));
console.log(match('catcatgocatgo', 'aabaa'));
