// function permutation(str) {
//   var arr = str.split("")
//   var list = []
//   recurse(arr, "", list)
//   return list
// }
//
// function recurse(arr, accum, list) {
//   if (arr.length == 0) { list.push(accum) }
//   arr.forEach(function (el, idx) {
//     var newArr = arr.slice()
//     var newAccum = accum + newArr.splice(idx, 1)
//     recurse(newArr, newAccum, list)
//   })
// }
//
// console.log(permutation('abcd'))

//  O(n!)

function perm(str, accum) {
  if (str.length === 0 ) {
    return [accum]
  }
  var result = []
  str.split("").forEach(function (el, idx) {
    result = result.concat(perm(str.slice(0, idx) + str.slice(idx + 1, str.length), accum + el))
  })
  return result
}
console.log(perm('abcd', ""))
