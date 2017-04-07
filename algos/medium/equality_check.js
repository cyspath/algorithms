function eql(a, b) {
  if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      if (a.length != b.length) {
        return false;
      }
      for (var i = 0; i < a.length; i++) {
        if (eql(a[i], b[i]) === false) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } else if (typeof(a) === "object") {
    if (Array.isArray(b)) {
      return false;
    } else if (typeof(b) === "object") {
      if (Object.keys(a).length != Object.keys(b).length) {
        return false;
      }
      for (var key in a) {
        if (eql(a[key], b[key]) === false) {
          return false;
        }
      }
      return true;
    } else {
      return false
    }
  } else {
    return a === b ? true : false;
  }
}

console.log(eql({ foo: [2, { bar: {}}]}, { foo: [2, { bar: {}}]}));
console.log(eql({ foo: 1 }, { foo: '1' }));
console.log(eql({ b: { c: { d: { e: 'potato' } } }, foo: 1 }, { foo: 1, b: { c: { d: { e: 'potato' } } } }));
// true
// false
// true
