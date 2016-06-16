function toJSON(str) {
  if (str[0] === '[') {
    return toArr(str);
  } else if (str[0] === '{') {
    return toObj(str);
  } else {
    return toPrimitive(str);
  }
}

function toArr(str) {
  var result = [];
  var current = "";

  var objStack = [];
  var arrStack = [];
  for (var i = 1; i < str.length; i++) {
    for (var j = i; j < str.length; j++) {
      if (arrStack.length === 0 && objStack.length === 0 && (str[j] === "]" || str[j] === ",")) {
        break;
      }
      if (str[j] === "[") {
        arrStack.push(str[j]);
      } else if (str[j] === "{") {
        objStack.push(str[j]);
      } else if (str[j] === "]") {
        arrStack.pop();
      } else if (str[j] === "}") {
        objStack.pop();
      }
      current += str[j];
    }
    i += current.length;
    result.push(toJSON(current));
    current = "";
  }
  return result
}

function toObj(str) {
  var result = {};
  var key = "", keyStart = false;
  var valStr = "";

  for (var i = 1; i < str.length; i ++) {
    if (str[i] === '"') {
      keyStart = !keyStart;
    } else if (keyStart === true) {
      key += str[i];
    } else if (str[i] === ":") {
      var objStack = [];
      var arrStack = [];
      for (var j = i + 1; j < str.length; j++) {
        if (arrStack.length === 0 && objStack.length === 0 && (str[j] === "}" || str[j] === ",")) {
          break;
        }
        if (str[j] === "[") {
          arrStack.push(str[j]);
        } else if (str[j] === "{") {
          objStack.push(str[j]);
        } else if (str[j] === "]") {
          arrStack.pop();
        } else if (str[j] === "}") {
          objStack.pop();
        }
        valStr += str[j];
      }
      result[key] = toJSON(valStr);
      i += valStr.length;
      key = "";
      valStr = "";
    }
  }
  return result;
}

function toPrimitive(str) {
  if (str[0] == '"') {
    return str.slice(1,str.length - 1);
  } else if (str === "undefined") {
    return undefined;
  } else if (str === "null") {
    return null;
  } else if (str === "true") {
    return true;
  } else if (str === "false") {
    return false;
  } else {
    return parseInt(str);
  }
}

console.log(toJSON('{"a":1,"bob":[{"inner":"obj"},["inner","array"],3],"cat":{"name":"currie"}}'));
