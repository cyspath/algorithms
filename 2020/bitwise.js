// NOTES
// 2 & 2 = 2
// 4 & 2 = 0, 8 & 2 = 0

// https://www.geeksforgeeks.org/find-two-non-repeating-elements-in-an-array-of-repeating-elements/
// Find the two non-repeating elements in an array of repeating elements
// Asked by SG
// Given an array in which all numbers except two are repeated once. (i.e. we have 2n+2 numbers and n numbers are occurring twice and remaining two have occurred once). Find those two numbers in the most efficient way.

// one way is sorting (O(nlogn)) other way is XOR (O(n)) if we dont want to use space
// function xor(a,b) {
//     return (a || b) && !(a && b);
// }
// 2^3 = 10 xor 11 is 01 = 1
// 3^3 = 11 xor 11 is 00 = 0
// 3^4 = 11 xor 100 is 111 = 7 (4 + 2 + 1)

// 2^4^7^9^2^4 = 14 (1110) => which also means... 7^9 = 14 because other double cancels out to 0

// TO GET position from right that is set bit... use: n & ~(n-1)

const findTwoNonRepeatingElementsInRepeatingElementArray = function(arr) {
    const xorAll = arr.reduce((ac, num) => {
        return ac ^ num;
    }); // xor bit op of all elements

    const pos_set_bit = xorAll & ~(xorAll - 1); // 1 for 1,3,5,7. 2 for 2, 6. 4 for 4. 8 for 8

    let x = 0, y = 0; // divide into two groups
    arr.forEach((num) => {
        if (num & pos_set_bit) { // if number AND position is not 0
            x = x ^ num;
        } else {
            y = y ^ num;
        }
    })
    return [x, y];
}
console.log(findTwoNonRepeatingElementsInRepeatingElementArray([2,4,7,9,2,4])) // 7,9