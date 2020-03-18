// O(n) where n is max possible time
// const overlappingIntervals = function(arr) {
//     const s = {};
//     let max = 0;
//     arr.forEach((el) => { // set hash with start to end, and where if same start the end is the highest
//         if (!s[el[0]]) {
//             s[el[0]] = el[1];
//         } else {
//             s[el[0]] = Math.max(el[1], s[el[0]]);
//         }
//         max = Math.max(max, el[1]);
//     })

//     const r = [];
//     let i = null, j = null;
//     for (let t = 0; t <= max; t++) {
//         if (i === null && s[t] !== undefined) {
//             i = t;
//             j = s[t];
//         } else if (s[t] !== undefined) { // already have a interval, update end time
//             j = Math.max(j, s[t]);
//         } else if (i != null && t >= j) {
//             r.push([i,j]);
//             i = null;
//             j = null;
//         } 
//     }
//     return r;
// }

// O(nlogn)
const overlappingIntervals = function(arr) {
    arr = arr.sort((a,b) => a[0] - b[0]);
    const r = [];
    let interval = null;

    for (let i = 0; i < arr.length; i++) {
        const s = arr[i][0];
        const e = arr[i][1];
        if (!interval) {
            interval = [s,e];
        } else if (s <= interval[1]) { // extend
            interval[1] = Math.max(interval[1], e);
        } else if (s > interval[1]) {
            r.push(interval);
            interval = [s,e];
        }
    }
    if (interval) r.push(interval);
    return r;
}
// console.log(overlappingIntervals([[1,3], [2,4], [5,7], [6,8]]));