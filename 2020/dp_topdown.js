// https://leetcode.com/problems/decode-ways/
// Input: "12"
// Output: 2
// Explanation: It could be decoded as "AB" (1 2) or "L" (12).
// O(n) O(n)
// f(n) = f(n - 1) if s[n] !== 0 plus f(n - 1) if s[n-1] and s[n] combination is >= 10 and <= 26
var numDecodings = function(s) {
    var hash = {};
    var arr = s.split('').map((e) => Number(e));
    var recurse = function(i) {
        if (hash[i]) return hash[i];
        if (i < 0) return 1;
        if (i === 0) {
            var result = arr[i] === 0 ? 0 : 1;
            return hash[i] = result;
        }
        var way1 = arr[i] !== 0 ? recurse(i - 1) : 0;
        var way2 = 0;
        if ((arr[i - 1] === 1) || (arr[i - 1] === 2 && arr[i] <= 6)) way2 = recurse(i - 2);
        return hash[i] = way1 + way2;
    }
    return recurse(s.length - 1);
}
// numDecodings('1210')

//=============================================================================================

// https://leetcode.com/problems/interleaving-string/
// Find if a string is interleaved of two other strings | DP-33
// Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.

// Input: s1 = "aa bc c", s2 = "dbbc a", s3 = "aa dbbc bc a c"
// Output: true

// Input: s1 = "aa b cc", s2 = "dbb ca", s3 = "aa dbb baccc"
// Output: false

var isInterleave = function(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) return false;
    
    const memo = {};
    
    const recurse = function (i,j,k) {
        if (!memo[i]) memo[i] = {};
        if (!memo[i][j]) memo[i][j] = {};
        if (memo[i][j][k] !== undefined) return memo[i][j][k];
        
        if (k > s3.length) return true;
        
        let one = false, two = false;
        if (s1[i] === s3[k]) {
            one = recurse(i + 1, j, k + 1);
        }
        if (s2[j] === s3[k]) {
            two = recurse(i, j + 1, k + 1);
        }
        return memo[i][j][k] = one || two;
    }
    return recurse(0,0,0);
};
// console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));

//=============================================================================================