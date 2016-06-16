
function toStr(element) {
  if (Array.isArray(element)) {
    return arrToStr(element);
  } else if (typeof element === 'object' && element !== null) {
    return objToStr(element);
  } else {
    return primitiveToStr(element);
  }
}

function objToStr(obj) {
  var result = "{";
  for (var key in obj) {
    result += primitiveToStr(key);
    result += ":";
    result += toStr(obj[key]);
    result += ",";
  }
  if (Object.keys(obj).length > 0) {
    result = result.slice(0, result.length - 1);
  }
  return result + "}";
}

function arrToStr(arr) {
  var result = "[";
  for (var i = 0; i < arr.length; i++) {
    result += toStr(arr[i]);
    if (i < arr.length - 1) {
      result += ",";
    }
  }
  return result + "]";
}

function primitiveToStr(p) {
  if (typeof(p) === "string") {
    return '"' + p + '"';
  } else {
    return p.toString();
  }
}

var test = {
  a: 1,
  b: 2,
  c: ["dog", { e: 3, f: 4, g: "cat"}, "zebra"],
  d: true
}
console.log(toStr(test));
