// https://leetcode.com/problems/decode-ways/
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
numDecodings('1210')

