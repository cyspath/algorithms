// https://www.geeksforgeeks.org/Google-topics-interview-preparation/

// Find all triplets with zero sum
// Given an array of distinct elements. The task is to find triplets in array whose sum is zero.

// Examples :

// Input : arr[] = {0, -1, 2, -3, 1}
// Output : 0 -1 1
//          2 -3 1

// Input : arr[] = {1, -2, 1, 0, 5}
// Output : 1 -2  1

// O(n^2) -> caution same sum with different coors may exist
function triplesWithZeroSum (arr) {
    const store = {};
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const sum = arr[i] + arr[j]
            if (store[sum]) { // store all coors with this sum
                store[sum].push([i,j]);
            } else {
                store[sum] = [[i,j]];
            }
        }
    }
    const result = [];
    for (let k = 0; k < arr.length; k++) {
        const diff = 0 - arr[k];
        if (store[diff]) {
            store[diff].forEach((c) => {
                if (c[1] < k) {
                    result.push([
                        arr[c[0]],
                        arr[c[1]],
                        arr[k]
                    ]);
                }
            })
        }
    }
    return result;
}
// console.log(triplesWithZeroSum([0, -1, 2, -3, 1]))
// console.log(triplesWithZeroSum([1, -2, 1, 0, 5]))

//=============================================================================================

// Generate all binary strings from given pattern
// Given a string containing of ‘0’, ‘1’ and ‘?’ wildcard characters, generate all binary strings that can be formed by replacing each wildcard character by ‘0’ or ‘1’.
// Example :

// Input str = "1??0?101"
// Output: 
        // 10000101
        // 10001101
        // 10100101
        // 10101101
        // 11000101
        // 11001101
        // 11100101
        // 11101101

// O(2^n) for time and space
function generateBinaryStringsFromPattern (str) {
    const recurse = function (i) {
        if (i === -1) return [''];
        let result = [];
        const child = recurse(i - 1);
        if (str[i] === '?') {
            child.forEach((s) => result.push(s + '0'));
            child.forEach((s) => result.push(s + '1'));
        } else {
            child.forEach((s) => result.push(s + str[i]));
        }
        console.log(result)
        return result;
    }
    return recurse(str.length - 1);
}
// console.log(generateBinaryStringsFromPattern("1??0?101"))

//=============================================================================================


// Count of strings that can be formed using a, b and c under given constraints
// Given a length n, count the number of strings of length n that can be made using ‘a’, ‘b’ and ‘c’ with at-most one ‘b’ and two ‘c’s allowed.

// Examples :

// Input : n = 3 
// Output : 19 
// Below strings follow given constraints:
// aaa aab aac aba abc aca acb acc baa
// bac bca bcc caa cab cac cba cbc cca ccb 

// Input  : n = 4
// Output : 39

// O(3^n) soln <- BAD SOLUTION
// function stringABCPermutationWithCondition_BAD (n) {
//     let count = 0;
//     let o = 0;
//     const recurse = function (i, bCount, cCount) {
//         o++;

//         if (i > n) return count ++;

//         recurse(i + 1, bCount, cCount);
//         if (bCount < 1) {
//             recurse(i + 1, bCount + 1, cCount);
//         }
//         if (cCount < 2) {
//             recurse(i + 1, bCount, cCount + 1);
//         }
//     } 
//     recurse(1, 0, 0);
//     console.log(o)
//     return count;
// }

// O(n) with memorization
function stringABCPermutationWithCondition (n) {
    const hash = {};
    // let o = 0;
    const recurse = function (n, bCount, cCount) {
        if (hash[n] && hash[n][bCount] && hash[n][bCount][cCount] !== undefined) {
            return hash[n][bCount][cCount];
        }
        // o++;

        if (bCount < 0) return 0;
        if (cCount < 0) return 0;
        if (n === 0) return 1;

        let res = 0;
        res = recurse(n - 1, bCount, cCount);
        res += recurse(n - 1, bCount - 1, cCount);
        res += recurse(n - 1, bCount, cCount - 1);

        if (!hash[n]) hash[n] = {};
        if (!hash[n][bCount]) hash[n][bCount] = {}
        hash[n][bCount][cCount] = res;
        return res;
    }
    const result = recurse(n, 1, 2);
    // console.log(o);
    return result;
}
// console.log(stringABCPermutationWithCondition(3))
// console.log(stringABCPermutationWithCondition(4000)) O(n) = 43993 times, result = 32000006001

//=============================================================================================

// Find largest word in dictionary by deleting some characters of given string
// Giving a dictionary and a string ‘str’, find the longest string in dictionary which can be formed by deleting some characters of the given ‘str’.

// Examples:

// Input : dict = {"ale": true, "apple": true, "monkey": true, "plea": true}   
//         str = "abpcplea"  
// Output : apple 

// Input  : dict = {"pintu": true, "geeksfor": true, "geeksgeeks": true, " forgeek": true} 
//          str = "geeksforgeeks"
// Output : geeksgeeks

// O(str.length + countofcharactersindict)
const findLargestWordInDictionaryByDeletingCharacters = function (dict, str) {
    const getCountArray = function (word) { // O(word.length)
        let arr = Array(26).fill(0);
        for (let i = 0; i < word.length; i++) {
            const arrIdx = word[i].charCodeAt() - 97;
            arr[arrIdx] += 1;
        }
        return arr;
    }

    const strArr = getCountArray(str);

    const wordInDict = function (word) {
        const wordArr = getCountArray(word); // O(word.length)
        for (let i = 0; i < strArr.length; i++) { // this is always 26 times, so O(1)
            if (wordArr[i] > strArr[i]) {
                return false;
            }
        }
        return true;
    }
    
    let longest = '';

    for (let word in dict) {
        if (word.length > str.length) continue;
        if (word.length > longest.length && wordInDict(word)) {
            longest = word;
        }
    }
    return longest;
}
// console.log(findLargestWordInDictionaryByDeletingCharacters({"ale": true, "apple": true, "monkey": true, "plea": true}, "abpcplea"))

// console.log(findLargestWordInDictionaryByDeletingCharacters({"pintu": true, "geeksfor": true, "geeksgeeks": true, " forgeek": true} , 'geeksforgeeks'))

//=============================================================================================

// Find subarray with given sum | Set 1 (Nonnegative Numbers)
// Given an unsorted array of nonnegative integers, find a continuous subarray which adds to a given number.
// Examples :

// Input: arr[] = {1, 4, 20, 3, 10, 5}, sum = 33
// Ouptut: Sum found between indexes 2 and 4

// Input: arr[] = {1, 4, 0, 0, 3, 10, 5, 2}, sum = 7
// Ouptut: Sum found between indexes 1 and 4

// Input: arr[] = {1, 4}, sum = 0
// Output: No subarray found

// O(n) sliding window
const findSubarrayWithGivenSumSet1 = function (arr, target) {
    let i = 0, j = -1;
    let currentSum;
    while (i < arr.length) {
        if (i > j) {
            currentSum = undefined;
        }
        if (currentSum === target) {
            return [i,j];
        } else if (currentSum === undefined) {
            j++;
            currentSum = arr[j];
        } else if (currentSum < target) {
            j++;
            currentSum += arr[j];
        } else if (currentSum > target) {
            currentSum -= arr[i];
            i++;
        }
    }
    return false;
}
// console.log(findSubarrayWithGivenSumSet1([1, 4, 20, 3, 10, 5], 33)) // 2,4
// console.log(findSubarrayWithGivenSumSet1([1, 4, 0, 0, 3, 10, 5, 2], 7)) // 1,4
// console.log(findSubarrayWithGivenSumSet1([1, 4], 0)) // f


//=============================================================================================

// Find the longest substring with k unique characters in a given string
// Given a string you need to print longest possible substring that has exactly M unique characters. If there are more than one substring of longest possible length, then print any one of them.
// Examples:

// "aabbcc", k = 1
// Max substring can be any one from {"aa" , "bb" , "cc"}.

// "aabbcc", k = 2
// Max substring can be any one from {"aabb" , "bbcc"}.

// "adabbcc", k = 2

// "aabbcc", k = 3
// There are substrings with exactly 3 unique characters
// {"aabbcc" , "abbcc" , "aabbc" , "abbc" }
// Max is "aabbcc" with length 6.

// "aaabbb", k = 3
// There are only two unique characters, thus show error message. 

// O(n) sliding window
const longestSubstringWithKUniqueCharacters = function(str, k) {
    if (str.length === 0 || str.length < k) return false;

    let i = 0, j = 0;
    let range;
    const hash = {};
    hash[str[j]] = 1;
    let c = 1;

    while (i < str.length) {
        while (c <= k && j < str.length) {
            if (c === k) {
                if (!range || j - i > range[1] - range[0]) {
                    range = [i,j];
                }
            }

            j++;
            if (!hash[str[j]]) {
                hash[str[j]] = 1;
                c++;
            } else {
                hash[str[j]] += 1;
            }
        }
        hash[str[i]] -= 1;
        if (!hash[str[i]]) {
            c--;
        }
        i++;
    }
    
    return str.slice(range[0], range[1] + 1);
}
// console.log(longestSubstringWithKUniqueCharacters('adabbcc', 2))
// console.log(longestSubstringWithKUniqueCharacters('aabbcc', 1))
// console.log(longestSubstringWithKUniqueCharacters('aabbcc', 3))

//=============================================================================================

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
// console.log(findTwoNonRepeatingElementsInRepeatingElementArray([2,4,7,9,2,4])) // 7,9

//=============================================================================================

// // https://www.geeksforgeeks.org/meta-strings-check-two-strings-can-become-swap-one-string/
// Meta Strings (Check if two strings can become same after a swap in one string)
// Given two strings, the task is to check whether these strings are meta strings or not. Meta strings are the strings which can be made equal by exactly one swap in any of the strings. Equal string are not considered here as Meta strings.

// Examples:

// Input : str1 = "geeks" 
//         str2 = "keegs"
// Output : Yes
// By just swapping 'k' and 'g' in any of string, 
// both will become same.

// Input : str1 = "rsting"
//         str2 = "string
// Output : No

// Input :  str1 = "Converse"
//          str2 = "Conserve"
// true

// O(n) find 2 coors and see swapping those 2 would yield other string
const metaStrings = function(a,b) {
    if (a.length !== b.length) return false;

    const diffCoors = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) diffCoors.push(i);
    }

    if (diffCoors.length !== 2) return false;
    if (a[diffCoors[0]] !== b[diffCoors[1]] || a[diffCoors[1] !== b[diffCoors[0]]]) return false;
    return true;
}
// console.log(metaStrings('geeks', 'keegs'));
// console.log(metaStrings('rsting', 'string'));
// console.log(metaStrings('Converse', 'Conserve'));

//=============================================================================================

// Print all Jumping Numbers smaller than or equal to a given value
// A number is called as a Jumping Number if all adjacent digits in it differ by 1. The difference between ‘9’ and ‘0’ is not considered as 1.
// All single digit numbers are considered as Jumping Numbers. For example 7, 8987 and 4343456 are Jumping numbers but 796 and 89098 are not.

// Given a positive number x, print all Jumping Numbers smaller than or equal to x. The numbers can be printed in any order.

// Input: x = 20
// Output:  0 1 2 3 4 5 6 7 8 9 10 12

// Input: x = 105
// Output:  0 1 2 3 4 5 6 7 8 9 10 12
//          21 23 32 34 43 45 54 56 65
//          67 76 78 87 89 98 101

// Note: Order of output doesn't matter, 
// i.e. numbers can be printed in any order

// first approach could be checking if a number is junmping number and iterate from 0 to X for O(x)
// O(k) where k is number of jumping number smaller than n
const jumpingNumbers = function(x) {
    if (x >= 0) console.log(0);

    const base = [1,2,3,4,5,6,7,8,9];
    const recurse = function (n) {
        if (n > x) return;
        if (n <= x) console.log(n);
        const d = n % 10;
        if (d === 0) {
            recurse(n * 10 + 1);
        } else if (d === 9) {
            recurse(n * 10 + 8);
        } else {
            recurse(n * 10 + d - 1);
            recurse(n * 10 + d + 1);
        }
    }

    base.forEach((n) => recurse(n));
}
// jumpingNumbers(155);

//=============================================================================================

// Sum of all the numbers that are formed from root to leaf paths
// Given a binary tree, where every node value is a Digit from 1-9 .Find the sum of all the numbers which are formed from root to leaf paths.
// For example consider the following Binary Tree.

//              6
//           /      \
//         3          5
//      /   \          \
//     2     5          4  
//         /   \
//        7     4
// There are 4 leaves, hence 4 root to leaf paths:
// Path                    Number
// 6->3->2                   632
// 6->3->5->7               6357
// 6->3->5->4               6354
// 6->5>4                    654   
// Answer = 632 + 6357 + 6354 + 654 = 13997 

// O(n) where n is number of nodes in the tree
const sumNumbersFromRootToLeafPath = function (root) {
    const paths = [];
    const recurse = function(node, val) {
        const newVal = val * 10 + node.val;
        if (!node.left && !node.right) {
            return paths.push(newVal); // leaf node
        }

        if (node.left) {
            recurse(node.left, newVal);
        }
        if (node.right) {
            recurse(node.right, newVal);
        }
    }
    recurse(root, 0);
    return paths.reduce((ac, n) => ac + n);
}
// let tree = {
//     val:6, 
//     left: { 
//         val: 3, 
//         left: { val: 2 },
//         right: { val: 5, left: { val: 7 }, right: { val: 4 } }
//     },
//     right: {
//         val: 5,
//         right: { val: 4 }
//     }
// }
// console.log(sumNumbersFromRootToLeafPath(tree)) //13997


//=============================================================================================

// The Celebrity Problem - https://leetcode.com/problems/find-the-celebrity/submissions/
// In a party of N people, only one person is known to everyone. Such a person may be present in the party, if yes, (s)he doesn’t know anyone in the party. We can only ask questions like “does A know B? “. Find the stranger (celebrity) in minimum number of questions.

// We can describe the problem input as an array of numbers/characters representing persons in the party. We also have a hypothetical function HaveAcquaintance(A, B) which returns true if A knows B, false otherwise. How can we solve the problem.

// O(n) iterate forward and backwards, then combine the non celebs to determine if celeb exist
// const celebrityProblem = function (n) {
//     // look forward
//     const notCelebHash = {};
//     for (let i = 0; i < n; i++) {
//         if (notCelebHash[i] === true) continue;

//         for (let j = i + 1; j < n; j++) {
//             if (knows(i,j)) {
//                 notCelebHash[i] = true;
//                 break;
//             } else {
//                 notCelebHash[j] = true;
//             }
//         }
//     }
    
    
//     // look backward again, needed
//     const notCelebHash2 = {};
//     for (let i = n - 1; i >= 0; i--) {
//         if (notCelebHash2[i] === true) continue;
        
//         for (let j = i - 1; j >= 0; j--) {
//             if (knows(i,j)) {
//                 notCelebHash2[i] = true;
//                 break;
//             } else {
//                 notCelebHash2[j] = true;
//             }
//         }
//     }
    
//     const notCelebHashFinal = Object.assign(notCelebHash, notCelebHash2);
//     const notCelebs = Object.keys(notCelebHashFinal);

//     if (notCelebs.length !== n - 1) {
//         return -1;
//     }
    
//     for (let k = 0; k < n; k++) {
//         if (notCelebHashFinal[k] === undefined) return k;
//     }
// }
const celebrityProblem = function (n) {
    let celeb = 0;
    for (let i = 0; i < n; i++) if (knows(celeb, i)) celeb = i; // if candidate knows current person, then current person could be celeb
    for (let i = celeb - 1; i >= 0; i--) if (knows(celeb, i)) return -1; // if candidate knows anyone before him then he is not celeb
    for (let i = 0; i < n; i++) if (!knows(i, celeb)) return -1; // if not everyone know celeb then return no celeb
    return celeb;
}
//=============================================================================================

// Unbounded Knapsack (Repetition of items allowed) - https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/
// Given a knapsack weight W and a set of n items with certain value vali and weight wti, we need to calculate minimum amount that could make up this quantity exactly. This is different from classical Knapsack problem, here we are allowed to use unlimited number of instances of an item.

// example: 
// Max capactiy 6
// item weight = [1, 3, 4];
// item values = [1, 2, 5];
// result should be 1x2 + 1x5 = 7

// O(capacity x w) DP bottom up
const unboundedKnapsack = function (capacity, w, v) {
    let row = Array(capacity + 1).fill(0); // [0,0,0,0,0,0,0]

    for (let r = 0; r < w.length; r++) {
        let newRow = row.slice();
        for (let c = 0; c <= capacity; c++) {
            if (c >= w[r]) { // if less than current val no need to change
                const newVal = v[r] + newRow[c - w[r]]; // new potential value is using current item one more time + max gained with left over capacity upto using this item
                newRow[c] = Math.max(newVal, newRow[c]);
            }
        }
        row = newRow;
    }
    return row[row.length - 1];
}
// console.log(unboundedKnapsack(6, [1, 3, 4], [1, 2, 5])) // 7
// console.log(unboundedKnapsack(6, [3, 4], [2, 5])) // 5
// console.log(unboundedKnapsack(6, [3, 4], [3, 5])) // 6

