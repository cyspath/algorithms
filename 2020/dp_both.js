// https://leetcode.com/problems/edit-distance/
// Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.

// You have the following 3 operations permitted on a word:

// Insert a character
// Delete a character
// Replace a character

// Input: word1 = "horse", word2 = "ros"
// Output: 3

// both topdown and bottomup are O(MN) time and O(MN) space, both solution are shown
var minDistance = function(word1, word2) {
    const dp = [];
    for (let n = 0; n <= word1.length; n++) {
        dp.push(Array(word2.length + 1).fill(0));
    }
    
    for (let r = 0; r < dp.length; r++) {
        for (let c = 0; c < dp[0].length; c++) {
            if (r === 0) {
                dp[r][c] = c;
            } else if (c === 0) {
                dp[r][c] = r;
            } else {
                if (word1[r - 1] === word2[c - 1]) { // letters match, continue
                    dp[r][c] = dp[r - 1][c - 1];
                } else { // add 1 step for 3 choices
                    dp[r][c] = 1 + Math.min (
                        dp[r - 1][c],
                        dp[r][c - 1],
                        dp[r - 1][c - 1] // swap
                    )
                }
            }
        } 
    }
    return dp[dp.length - 1][dp[0].length - 1];
};

// TOPDOWN WITH MEMO
var minDistance = function(word1, word2) {
    const memo = {};
    const recurse = function (i,j) {
        if (!memo[i]) memo[i] = {};
        if (memo[i][j]) return memo[i][j];
        
        if (i >= word1.length) return word2.length - j;
        if (j >= word2.length) return word1.length - i;
        
        let result;
        if (word1[i] === word2[j]) {
            result = recurse(i + 1, j + 1)
        } else {
            result = 1 + Math.min(
                recurse(i + 1, j),
                recurse(i, j + 1),
                recurse(i + 1, j + 1) //swap
            )
        }
        return memo[i][j] = result;
    }
    return recurse(0,0);
};

//=============================================================================================

// Word Break Problem | DP-32
// Given an input string and a dictionary of words, find out if the input string can be segmented into a space-separated sequence of dictionary words. See following examples for more details.
// This is a famous Google interview question, also being asked by many other companies now a days.

// { i, like, sam, sung, samsung, mobile, ice, cream, icecream, man, go, mango}
// Input:  ilikesamsung
// Output: Yes
// The string can be segmented as "i like samsung" or "i like sam sung".

// dp soln, both ways should be O(n^2) time O(n) space
// although arguably O(n^3) due to substring's complexity is O(n), so solution is O(n^3)
const wordBreak1 = function(s, wordDict) {
    const dic = new Set(wordDict);
    
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (dic.has(s.slice(j, i + 1)) && dp[j] === true) {
                dp[i + 1] = true;
            }
        }
    }

    return dp[s.length];
}
// recursion with memo
const wordBreak2 = function(s, wordDict) {
    const dic = new Set(wordDict);
    const memo = {};
    
    const recurse = function(w, i) {
        if (!memo[i]) memo[i] = {};
        if (memo[i][w] != undefined) return memo[i][w];  

        if (i >= s.length) return w === '' ? true : false;
        
        const newWord = w + s[i];
        
        if (dic.has(newWord)) return memo[i][w] = recurse('', i + 1) || recurse(newWord, i + 1);
        return memo[i][w] = recurse(newWord, i + 1);
    }
    return recurse('', 0);
};

//=============================================================================================

//=============================================================================================

//=============================================================================================

//=============================================================================================

//=============================================================================================

//=============================================================================================

//=============================================================================================

//=============================================================================================

//=============================================================================================
