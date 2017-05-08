// 
// function solution2(n) {
//     d = new Array(30);
//     l = 0;
//     while (n > 0) {
//         d[l] = n % 2;
//         n = Math.floor(n / 2);
//         l += 1;
//     }
//     d =  d.filter(function(n){ return n != undefined }).reverse();
//     console.log(d);
//     for (p = 1; p <= Math.floor(l/2); ++p) {
//         ok = true;
//         for (i = 0; i < l - p; ++i) {
//             if (d[i] != d[i + p]) {
//                 ok = false;
//                 break;
//             }
//         }
//         if (ok) {
//             return p;
//         }
//     }
//     return -1;
// }
//
// function solution(n) {
//     d = new Array(30);
//     l = 0;
//     while (n > 0) {
//         d[l] = n % 2;
//         n = Math.floor(n / 2);
//         l += 1;
//     }
//     console.log(d, n);
//     for (p = 1; p <= Math.floor(l/2); ++p) {
//         ok = true;
//         for (i = 0; i < l - p; ++i) {
//             if (d[i] != d[i + p]) {
//                 ok = false;
//                 break;
//             }
//         }
//         if (ok) {
//             return p;
//         }
//     }
//     return -1;
// }
//
// console.log(solution(1));
// console.log(solution(8));
// console.log(solution(3435));
// console.log(solution(955));
// console.log(solution(1000000000));


function solution(A) {
    var indexes = findThreeIdx(A);
    if (Math.abs(indexes[0] - indexes[1]) > 1) {
        return A[indexes[0]] + A[indexes[1]];
    } else if (Math.abs(indexes[0] - indexes[2]) > 1) {
        return A[indexes[0]] + A[indexes[2]];
    } else {
        return A[indexes[1]] + A[indexes[2]];
    }
}

function findThreeIdx(A) {
    var idx1, idx2, idx3; // essentially, find 3 smallest elements (indexes) not including the edges

    for (var i = 1; i < A.length - 1; i++) {
        if (!idx1) {
            idx1 = i;
        } else if (A[i] < A[idx1]) {
        idx1 = i
        }
    }

    for (var i = 1; i < A.length - 1; i++) {
        if (!idx2 && idx1 != i) {
            idx2 = i;
        } else if (A[i] < A[idx2] && idx1 != i) {
            idx2 = i
        }
    }

    for (var i = 1; i < A.length - 1; i++) {
        if (!idx3 && idx1 != i && idx2 != i) {
            idx3 = i;
        } else if (A[i] < A[idx3] && idx1 != i && idx2 != i) {
            idx3 = i
        }
    }
    return [idx1, idx2, idx3];
}
console.log(solution([5,2,4,6,3,7]));
console.log(solution([0,1,2,6,0]));
