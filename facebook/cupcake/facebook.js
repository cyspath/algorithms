var intersection = function(nums1, nums2) {
    if (nums1.length > nums2) {
        nums1, nums2 = nums2, nums1;
    }
    var hash = {};
    nums1.forEach(function(el) {
        hash[el] = true;
    });
    var result = [];
    nums2.forEach(function(el) {
        if (hash[el]) {
            result.push(el);
            hash[el] = false;
        }
    })
    return result;
};

console.log(intersection([4,9,5],[9,4,9,8,4]));
// O(n + m) and O()

var isMonotonic = function(A) {
    var increasing = true;
    var decreasing = true;
    for(var i = 1; i < A.length; i++) {
        if (A[i] < A[i-1]) {
            increasing = false;
        }
        if (A[i] > A[i-1]) {
            decreasing = false;
        }
    }
    return increasing || decreasing;
};

console.log(isMonotonic([6,5,4,4])); // O(n)

var isAlienSorted = function(words, order) {
    var dict = {};
    for (var i = 0; i < order.length; i++) {
        dict[order[i]] = i;
    }

    var inOrder = function(a, b) {
        var i = 0;
        while (true) {
            var aLetter = a[i];
            var bLetter = b[i];
            // console.log(aLetter, bLetter)
            if (!aLetter && !bLetter) {
                return true;
            } else if (!aLetter) {
                return true;
            } else if (!bLetter) {
                return false;
            } else if (dict[aLetter] > dict[bLetter]) {
                return false;
            } else if (dict[aLetter] < dict[bLetter]) {
                return true;
            }
            i++;
        }
    }
    
    for(var i = 1; i < words.length; i++) {
        if (!inOrder(words[i - 1], words[i])) {
            return false;
        }
    }
    return true;
};

// O(number of letters from all words), space O(1) BECAUSE EVEN THO WE HAD A DICTIONARY IT IS ONLY 26 MAX!!!!! THUS O(1)
console.log(isAlienSorted(["word","world","row"], "worldabcefghijkmnpqstuvxyz"));
console.log(isAlienSorted(["hello","leetcode"],"hlabcdefgijkmnopqrstuvwxyz"))

var intersect = function(nums1, nums2) {
    if (nums1.length < nums2.length) {
        nums1, nums2 = nums2, nums1;
    }

    var dict = nums1.reduce(function(accum, el) {
        if (accum[el]) {
            accum[el]++;
        } else {
            accum[el] = 1;
        }
        return accum;
    }, {});

    var result = [];
    nums2.forEach(function(n) {
        var count = dict[n];
        if (count > 0) {
            result.push(n);
            dict[n]--;
        }
    })

    return result;
};

console.log(intersect([1,2,2,1],[2,2]))

var diameterOfBinaryTree = function(root) {
    var max = 0;
    var recurse = function(node) {
        if (!node) return 0;
        var leftLength = recurse(node.left);
        var rightLength = recurse(node.right);

        var sum = leftLength + rightLength;
        if (sum > max) max = sum;
        return Math.max(leftLength, rightLength) + 1;
    }

    recurse(root);
    return max;
};
// O(n)

var addStrings = function(num1, num2) {
    var result = '';
    var carry = 0;
    var a = num1.split('').reverse();
    var b = num2.split('').reverse();

    var i = 0;
    while (a[i] || b[i]) {
        var aDigit = a[i] ? Number(a[i]) : 0;
        var bDigit = b[i] ? Number(b[i]) : 0;
        var sum = aDigit + bDigit + carry;

        if (sum >= 10) {
            carry = 1;
        } else {
            carry = 0;
        }

        result += sum % 10;
        i++;
    }
    if (carry === 1) result += '1';
    return result.split('').reverse().join('');
};

console.log(addStrings('618', '827'));

var addBinary = function(a, b) {
    var a = a.split('').reverse();
    var b = b.split('').reverse();
    var i = 0;
    var result = '';
    var carry = 0;

    while (a[i] || b[i]) {
        var aN = a[i] ? Number(a[i]) : 0;
        var bN = b[i] ? Number(b[i]) : 0;
        
        var sum = aN + bN + carry;
        result += sum % 2;

        carry = Math.floor(sum / 2);
        i++;
    }

    if (carry) result += carry;
    return result.split('').reverse().join('');
};

console.log(addBinary("1010", "1011")) // "10101"

var merge = function(nums1, m, nums2, n) { // nums1 has enough space
    var i = m - 1;
    var j = nums1.length - 1;
    while (i >= 0) {
        nums1[j] = nums1[i];
        i--;
        j--;
    }

    j = j + 1; // new starting of nums 1;
    k = 0;

    // console.log(nums1, j, k);
    var currentIdx = 0;

    while (j < nums1.length || k < nums2.length) {
        if (nums1[j] === undefined) {
            nums1[currentIdx] = nums2[k];
            k++;
        } else if (nums2[k] === undefined) {
            nums1[currentIdx] = nums1[j];
            j++;
        } else if (nums1[j] > nums2[k]) {
            nums1[currentIdx] = nums2[k];
            k++
        } else {
            nums1[currentIdx] = nums1[j];
            j++;
        }
        currentIdx++;
    }

    return nums1;

};

// console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3))
console.log(merge([-1,0,0,3,3,3,0,0,0], 6, [1,2,2], 3))

var validPalindrome = function(s) {

    var deleteLeftOnlyIsPalidrome = function (s) {
        var i = 0;
        var j = s.length - 1;
        var delCount = 0;

        while (i <= j) {
            if (delCount > 1) {
              return false;
            }
    
            if (s[i] !== s[j]) {
                delCount++;
                i++;
            } else {
                i++;
                j--;
            }
        }
        return true;
    }

    return deleteLeftOnlyIsPalidrome(s.split('')) || deleteLeftOnlyIsPalidrome(s.split('').reverse());
};

console.log(validPalindrome("abca"))

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'.split('').reduce(function(accum, el) {
    accum[el] = true;
    return accum;
}, {});

var isPalindrome = function(s) {
    var i = 0;
    var j = s.length - 1;
    while (i <= j) {
        if (!letters[s[i]]) {
            i++;
        } else if (!letters[s[j]]) {
            j--;
        } else if (s[i].toLowerCase() === s[j].toLowerCase()) {
            i++;
            j--;
        } else {
            return false;
        }
    }
    return true;
};


var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        var recurse = function (a, b) {
            // console.log(a,b);
            if (a > b) return false;
            var mid = Math.floor((b - a) / 2) + a;

            if (isBadVersion(mid)) {
                // either this or left
                var left = recurse(a, mid - 1);
                if (left === false) {
                    return mid;
                } else {
                    return left;
                }
            } else {
                return recurse(mid + 1, b)
            }
        }
        return recurse(1, n);
    };
};

console.log(solution(function(n) {
    return n === 3 ? true : false;
})(5));


var intervalIntersection = function(A, B) {
    var getIntersection = function (a,b) {
        if (b[0] > a[1]) {
            return null;
        } else if (b[1] <= a[1]) {
            return [b[0], b[1]];
        } else if (b[1] > a[1]) {
            return [b[0], a[1]];
        }
    }
    var i = 0;
    var j = 0;
    
    var result = [];
    
    while (i < A.length && j < B.length) {
        // console.log(A[i], B[j])
        if (A[i][0] <= B[j][0]) {
            var intersect = getIntersection(A[i], B[j]);
        } else {
            var intersect = getIntersection(B[j], A[i]);
        }
        if (intersect) {
            result.push(intersect);
        }
        
        if (A[i][1] > B[j][1]) {
            j++;
        } else {
            i++;
        }
    }
    return result;
};

console.log(intervalIntersection([[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]))

var mergeSort = function(arr, compare = null) {
    if (arr.length <= 1) {
        return arr;
    }
    var midIdx = Math.floor(arr.length / 2);
    var left = arr.slice(0, midIdx);
    var right = arr.slice(midIdx);
    return mergeSortJoin(mergeSort(left, compare), mergeSort(right, compare), compare);
}

function mergeSortJoin(a, b, compare) {
    var result = [];
    var i = 0, j = 0;
    while (i < a.length && j < b.length) {
        if (compare) {
            condition = compare(a[i], b[j]);
        } else {
            condition = a[i] < b[j];
        }
        if (condition) {
            result.push(a[i]);
            i++;
        } else {
            result.push(b[j]);
            j++;
        }
    }
    var result = result.concat(a.slice(i)).concat(b.slice(j));
    // console.log(a, b, result);
    return result;
}

// console.log(mergeSort([1,3,4,5,6,2,8,10,9]))


var kClosest = function(points, K) {
    var compare = function(arr1, arr2) {
        var h1 = Math.pow(arr1[0], 2) + Math.pow(arr1[1], 2);
        var h2 = Math.pow(arr2[0], 2) + Math.pow(arr2[1], 2);
        // console.log(h1, h2)
        return h1 < h2;
    }
    var sortedPoints = mergeSort(points, compare);
    return sortedPoints.slice(0, K);
};

// Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].
// O(n) time, O(1) space not counting result, no division
var productExceptSelf = function(nums) {
    var reverseProduct = Array(nums.length);
    for (var i = nums.length - 1; i >= 0; i--) {
        if (i == nums.length - 1) {
            reverseProduct[i] = nums[i];
        } else {
            reverseProduct[i] = nums[i] * reverseProduct[i + 1];
        }
    }
    for(var i = 0; i < nums.length; i++) {
        if (i === 0) {
            continue;
        }
        nums[i] = nums[i] * nums[i - 1];
    }
    for(var i = 0; i < reverseProduct.length; i++) {
        if (i === 0) {
            reverseProduct[i] = reverseProduct[i + 1];
        } else if (i === reverseProduct.length - 1) {
            reverseProduct[i] = nums[nums.length - 2];
        } else {
            reverseProduct[i] = nums[i - 1] * reverseProduct[i + 1];
        }
    }
    return reverseProduct;
};


var treeToDoublyList = function(root) {
    if (!root) return null

    var first, last;
    
    var recurse = function (node) {
        if (!node.left) {
            first = first || node;
            var leftBound = node;
        } else {
            var left = recurse(node.left);
            var leftBound = left[0];
            left[1].right = node;
            node.left = left[1];
        }

        if (!node.right) {
            last = node;
            var rightBound = node; 
        } else {
            var right = recurse(node.right);
            var rightBound = right[1];
            right[0].left = node;
            node.right = right[0];
        }
        return [leftBound, rightBound];
    };

    var bounds = recurse(root);
    // console.log(root);
    first.left = last;
    last.right = first;
    return first;
};

// {"$id":"1","val":4,
//     "left":{"$id":"2","val":2,
//         "left":{"$id":"4","val":1,"left":null,"right":null},
//         "right":{"$id":"5","val":3,"left":null,"right":null}
//     },
//     "right":{"$id":"3","val":5,"left":null,"right":null}
// }
treeToDoublyList({"$id":"1","val":4,"left":{"$id":"2","val":2,"left":{"$id":"4","val":1,"left":null,"right":null},"right":{"$id":"5","val":3,"left":null,"right":null}},"right":{"$id":"3","val":5,"left":null,"right":null}})

var longestArithSeqLength = function(A) {

    
};

// We are given a binary tree (with root node root), a target node, and an integer value K.

// Return a list of the values of all nodes that have a distance K from the target node.  The answer can be returned in any order.
// O(n);
var distanceK = function(root, target, K) {
    var result = [];

    var getChildren = function(node, n) {
        if (!node) return;
        if (n === K) {
            result.push(node.val);
            return;
        }
        if (n < 0) {
            return;
        }
        getChildren(node.left, n + 1);
        getChildren(node.right, n + 1);
    } 
    getChildren(target, 0);

    var getParent = function(node) {
        if (!node) return;
        if (node.val === target.val) {
            return 1;
        }

        var left = getParent(node.left);
        if (left) {
            if (left === K) {
                result.push(node.val);
            } else {
                // search right for remainder of k
                getChildren(node.right, left + 1);
            }
        }

        var right = getParent(node.right);
        if (right) {
            if (right === K) {
                result.push(node.val);
            } else {
                // search left for remainder of K
                getChildren(node.left, right + 1);
            }
        }

        // pass up a number if there is a left or right
        if (left) {
            return left + 1;
        } else if (right) {
            return right + 1;
        } else {
            return;
        }

    }

    getParent(root);

    return result;
};


var findKthLargest = function(nums, k) {
    var hash = {};
    nums.forEach(function(n) {
        if (hash[n]) {
            hash[n]++;
        } else {
            hash[n] = 1;
        }
    })

    var list = new Array(nums.length + 1).fill(0);
    for (var key in hash) {
        list[key] = key;
    }
    // console.log(list,hash);
    var idx = list.length - 1;
    while (idx >= 0) {
        var current = list[idx];
        // console.log(current, k);
        if (current === 0) {
            idx--;
            continue;
        }

        if (hash[current] > 0) {
            if (k === 1) return current;
            k--;
            hash[current]--;
        } else {
            idx--;
        }

    }
};
console.log(findKthLargest([3,2,3,1,2,4,5,5,6],4))
var findKthLargest = function(nums, k) {
    var arr = nums.sort(function(a,b) { return a - b }).reverse();
    // console.log(arr);
    return arr[k - 1];
};
findKthLargest([3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6], 2)

var rightSideView = function(root) {
    if (!root) return [];
    // traverse horizontally
    var parent = [root], current = [];

    var result = [];

    while (parent.length !== 0) {
        result.push((parent[parent.length - 1]).val); // insert last one to result, which is the one can be seen from right

        parent.forEach(function(node) {

            if (node.left) {
                current.push(node.left);
            }
            if (node.right) {
                current.push(node.right);
            }
        });

        parent = current;
        current = [];
    }

    return result;
};

var isCompleteTree = function(root) {
    if (!root) return true;

    var parent = [root], current = [];

    var missingNode = false;

    while (parent.length !== 0) {
        for (var i = 0; i < parent.length; i++) {
            if (!parent[i].left) {
                missingNode = true;
            } else {
                if (missingNode) return false;
                current.push(parent[i].left);
            }
            if (!parent[i].right) {
                missingNode = true;
            } else {
                if (missingNode) return false;
                current.push(parent[i].right);
            }
        }
        parent = current;
        current = [];
    }
    return true;
};


// O(nlog(n))
var leastInterval = function(tasks, n) {
    var hash = {};

    tasks.forEach(function(t) {
        if (hash[t]) {
            hash[t]++;
        } else {
            hash[t] = 1;
        }
    })
    
    var list = [];
    for (var t in hash) {
        list.push({ val: t, count: hash[t] });
    }

    sortedList = list.sort(function(a,b) {
        return b.count - a.count;
    })

    // instantiate grid
    
    
    return length;
};
// O(n)
leastInterval(["A","A","A","B","B","B"], 2)
leastInterval(["A","A","A","A","B","C"], 2)


// Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

// Example 1:

// Input: [[0, 30],[5, 10],[15, 20]]
// Output: 2
// Example 2:

// Input: [[7,10],[2,4]]
// Output: 1
var minMeetingRooms = function(intervals) {
    var list = intervals.sort(function(a,b) {
        return a[0] - b[0];
    })

    var count = 0;
    var length = list.length;
    var n = 0;

    var result = [];
    while (length > 0) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] && list[i][0] >= n) {
                result.push(list[i]);
                n = list[i][1];
                list[i] = null;
                length--;
            }
        }
        count++;
        n = 0;
    }

    // console.log(result);
    return count;
};
// O(nlogn + n^2)
// minMeetingRooms([[0, 30],[5, 10],[15, 20]])
minMeetingRooms([[1,5],[2,6],[2,3],[5,7],[8,9],[8,10],[6,7],[5,9]])

var accountsMerge = function(accounts) {
    var result = [];

    while (accounts.length > 0) {
        var current = accounts[0];
        var accounts = accounts.slice(1);
        var emails = current.slice(1).reduce(function(accum, el) {
            accum[el] = true;
        }, {});

        for (var i = 0; i < accounts.length; i++) {
            for (var j = 1; j < accounts[i].length - 2; j++) {
                var email = accounts[i][j];
                if (emails[email]) {
                    // merge
                    current
                }
            }
        }
    }
};


var verticalOrder = function(root) {
    if (!root) return [];

    root.n = 0;
    var hash = {};
    
    var parent = [root], children = [];
    while (parent.length) {
        parent.forEach(function(node) {
            if (hash[node.n]) {
                hash[node.n].push(node.val);
            } else {
                hash[node.n] = [node.val];
            }
            
            if (node.left) {
                node.left.n = node.n - 1;
                children.push(node.left);
            }
            if (node.right) {
                node.right.n = node.n + 1;
                children.push(node.right);
            }
        });
        parent = children;
        children = [];
    }
    
     var positions = Object.keys(hash);
    var sorted = positions.sort(function(a,b) {
       return a - b;
    });
        
    var result = [];
    sorted.forEach(function(pos) {
        result.push(hash[pos]);
       })
        
    return result;
};

var canPartition = function(nums) {
    var sum = nums.reduce(function(accum, n) {
        return accum + n;
    }, 0);
    
    if (sum % 2 !== 0) {
        return false;
    }

    var half = sum /2;
    
    
    var grid = Array(nums.length + 1).fill().map(function(e) {
        return Array(half + 1).fill(0);
    });

    var coor;
    
    for (var r = 1; r < nums.length + 1; r++) {
        for (var c = 1; c < half + 1; c++) {
            var y = nums[r - 1];
            var top = grid[r - 1][c];

            if (c >= y) {
                grid[r][c] = Math.max(top, (y + grid[r - 1][c - y]));
            } else {
                grid[r][c] = top;
            }
            if (grid[r][c] === half && !coor) {
                coor = [r,c];
            }
        }
    }

    if (!coor) return false;

    var resultA = [];
// console.log(grid)
    var [r,c] = coor;

    while (c > 0 && r > 0) {
        if (grid[r - 1][c] === grid[r][c]) {
            r--;
            continue;
        }

        var y = nums[r - 1];
        resultA.push(y);
        r--;
        c = c - y;
    }

    var hash = resultA.reduce(function(accum, n) {
        if (accum[n]) {
            accum[n] += 1;
        } else {
            accum[n] = 1;
        }
        return accum;
    }, {});

    var resultB = [];
    nums.forEach(function(n) {
        if (hash[n] && hash[n] > 0) {
            // has n
            hash[n] -= 1;
        } else {
            resultB.push(n);
        }
    })
    return [resultA, resultB];
};

// canPartition([2,3,1,5,2,1]);
canPartition([1,2,5]);

// Given a collection of intervals, merge all overlapping intervals.
var mergeIntervals = function(arr) {
    arr = arr.sort(function(a,b) { // O(nlogn)
        return a[0] - b[0];
    })

    var result = [];

    for (var i = 0; i < arr.length; i++) {
        if (!result.length) {
            result.push(arr[i]);
            continue;
        }

        if (result[result.length - 1][1] >= arr[i][0]) {
            var last = result.pop();
            result.push([last[0], Math.max(last[1], arr[i][1])]);
        } else {
            result.push(arr[i])
        }
    }

    return result;
}
// O(n), O(n)
mergeIntervals([[1,3], [8,10], [2,7], [5,6], [13,14]])

var permutation = function (str) {
    var recurse = function (accum, str) {
        if (!str.length) return [accum];

        var result = [];
        for (var i = 0; i < str.length; i++) {
            var child = recurse(accum + str[i], str.slice(0, i) + str.slice(i + 1));
            result = result.concat(child);
        }
        return result;
    }

    return recurse('', str);
}
permutation('abcd'); // O(n!)

// Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.
// Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.
// The order of output does not matter.
// Example 1:
// Input:
// s: "cbaebabacd" p: "abc"
// Output:
// [0, 6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".

var findAllAnagramsInAString = function(s, p) {
    if (p.length > s.length) return [];
    p = p.split('').sort().join('');
    s = s.split('');

    var result = [];

    var i = 0, j = i + p.length - 1;
    while (j < s.length) {
        var sortedStr = s.slice(i, j + 1).sort().join('');
        // console.log(sortedStr);
        if (sortedStr === p) {
            result.push(i);
        }
        i++;
        j++;
    }

    return result;
}
findAllAnagramsInAString("cbaebabacd", "abc") // O(plogp * s)

// dp wacky workout
var wackyWorkout = function (n) {
    var hash = { 0: 1, 1: 2 };
    var recurse = function(n) {
       if (hash[n]) return hash[n];
       var result = recurse(n - 1) + recurse(n - 2);
       hash[n] = result;
       return result;
    }

    return recurse(n);
}
wackyWorkout(3)


var longestIncreasingSubsequence = function (arr) {
    var grid = Array(arr.length + 1).fill().map(function(row) {
        return Array(arr.length).fill(0);
    });

    console.log(grid);

    for (var r = 0; r < arr.length + 1; r++) {
        for (var c = 0; c < arr.length; c++) {
            if (r === 0) {
                grid[r][c] = 1; // it will take current number as only length
                continue;
            }

            var above = grid[r - 1][c];
            // debugger
            if (r - 1 >= c) {
                grid[r][c] = above; // if current (left) is not after so far checked, use so far checked (above count)
            } else if (arr[c] <= arr[r - 1]) {
                grid[r][c] = above;
            } else {
                grid[r][c] = Math.max(above, grid[r][r - 1] + 1);
            }
        }
    }

    return grid[arr.length][arr.length - 1];
}
longestIncreasingSubsequence([6,0,8,2,4,12])

var waysToDecode = function(str) {
    var isValid = function (s) {
        if (s.length === 1) {
            return true ? Number(s) !== 0 : false;
        } else {
           return true ? Number(s) <= 26 : false;
        }
    }

    var recurse = function (s) {
        if (s.length === 0) return 1;
        if (s.length === 1 && s === '0' ) return 0;
        if (s.length === 1 && s !== '0' ) return 1;

        var lastTwo = s.slice(s.length - 2, s.length);
        var lastOne = s.slice(s.length - 1, s.length);
        
        var sum = 0;
        if (isValid(lastTwo)) {
            console.log(lastTwo, true)
            sum += recurse(s.slice(0, s.length - 2));
        }
        if (isValid(lastOne)) {
            console.log(lastOne, true)
            sum += recurse(s.slice(0, s.length - 1))
        }
        return sum;
    }
    return recurse(str);
}
waysToDecode('1221') // 5

// Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.
// O(logn) must
var searchRange = function(nums, target) {
    var left = -1, right = -1;

    var recurse = function(nums, target, i) {
        // debugger
        if (nums.length === 0) return;
        var midIdx = Math.floor(nums.length / 2);
        var mid = nums[midIdx];
        var actualMidIdx = i + midIdx;

        if (mid > target) {
            // everything is at left;
            recurse(nums.slice(0, midIdx), target, i);
        } else if (mid < target) {
            // everything is at right
            recurse(nums.slice(midIdx + 1), target, i + midIdx + 1);
        } else {
            // mid is target
            if (left == - 1 || actualMidIdx < left) {
                left = actualMidIdx;
            }

            if (right < actualMidIdx) {
                right = actualMidIdx;
            }
            recurse(nums.slice(0, midIdx), target, i);
            recurse(nums.slice(midIdx + 1), target, i + midIdx + 1);
        }
    }
    recurse(nums, target, 0);

    return [left, right];
};

// searchRange([5,7,7,8,8,10], 8);
// searchRange([5,7,7,8,8,10], 6);
searchRange([1,2,2,3,4,4,4], 4);

// O(nlogn)
var nextPermutation = function(nums) {
    var hash = {};
    // find the index of the first digit that is greater than current
    var i = nums.length - 1;
    var left = null, right = null;
    
    while (i >= 0) {
        // since this is max 9 times, it wont count towards big O
        for (var j = nums[i]; j <= 8; j++) {
            if (hash[j + 1]) {
                left = nums.slice(0, i).concat([j + 1]);
                right = nums.slice(i + 1).concat([nums[i]]);
                var deleteIndex = right.indexOf(j + 1);
                right = right.slice(0, deleteIndex).concat(right.slice(deleteIndex + 1));
                break;
            }
        }
        if (left || right) {
            break;
        }
        hash[nums[i]] = true;
        i--;
    }

    if (!left || ! right) {
        // nothing can be replaced, first digit is largest, we need to just sort it
        return nums.sort(function(a,b) {
            return a - b;
        });
    }

    // for ther remaining numbers sort then in acending
    right = right.sort(function(a,b) {
        return a - b;
    });

    // join left and right
    var result = left.concat(right);
    console.log(result)
    return result;
};

nextPermutation([1,2,3]);

// @@ cool problem
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.
var trap = function(height) {
   var max = 0;
   var forward = Array(height.length).fill(0);
   var backward = Array(height.length).fill(0);

    for (var i = 0; i < height.length; i++) {
        if (height[i] > max) {
            max = height[i];
        } else if (height[i] < max) {
            forward[i] = max - height[i];
        }
    }
    max = 0;
    for (var i = height.length - 1; i >= 0; i--) {
        if (height[i] > max) {
            max = height[i];
        } else if (height[i] < max) {
            backward[i] = max - height[i];
        }
    }

    var sum = 0;
    for (var k = 0; k < forward.length; k++) {
        sum += Math.min(forward[k], backward[k]);
    }

    return sum;
};
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))

// O(maxN * n)


// @@@
// Given a string, find the length of the longest substring T that contains at most k distinct characters.

// Example 1:

// Input: s = "eceba", k = 2
// Output: 3
// Explanation: T is "ece" which its length is 3.
// use dp, cross s with s, keep track of longest that has k
var lengthOfLongestSubstringKDistinct = function(s, k) {
    var longest = '';

    var grid = Array(s.length).fill().map(function(row) {
        return Array(s.length).fill(0);
    });

    var hashs = Array(s.length).fill().map(function(row) {
        return {};
    });

    for (var r = 0; r < s.length; r++) {
        for (var c = 0; c < s.length; c++) {
            if (r === 0) {
                hashs[c][s[c]] = true;
                grid[r][c] = 1;
            } else if (r <= c) {
                grid[r][c] = grid[r - 1][c];
            } else {
                // magic happens here
                if (hashs[c][s[r]]) {
                    grid[r][c] = grid[r - 1][c];
                } else {
                    hashs[c][s[r]] = true;
                    grid[r][c] = grid[r - 1][c] + 1;
                }
            }

            if (grid[r][c] === k && r - c + 1 > longest.length) {
                longest = s.slice(c, r + 1);
            }
        }
    }

    return longest;
};


lengthOfLongestSubstringKDistinct("eceba", 2)

var addOperators = function(num, target) {

    var breakIntoArrays = function(str) {
        if (str.length === 0) {
            return [[]];
        }
        var result = [];

        for (var i = 0; i < str.length; i++) {
            var strNum = str.slice(0, i + 1);
            if (strNum.length > 1 && strNum[0] === '0') {
                continue;
            }

            var child = breakIntoArrays(str.slice(i + 1));
            var child = child.map(function(el) {
                return [Number(strNum)].concat(el);
            })

            result = result.concat(child);
        }
        return result;
    }

    var numbersList = breakIntoArrays(num);

    console.log(numbersList);

    var calculate = function(arr) {
        
    }
    
};

addOperators('105', 5)


// GRAPH QUESTIONS

var findJudge = function(N, trust) {
    if (N === 1 && trust.length === 0) return 1;
   var people = trust.reduce(function(accum, pair) {
       if (!accum[pair[0]]) {
           accum[pair[0]] = [0,0];
       }
       if (!accum[pair[1]]) {
           accum[pair[1]] = [0,0];
       }
       accum[pair[0]] = [
           accum[pair[0]][0] + 1, 
           accum[pair[0]][1]
        ];

        accum[pair[1]] = [
            accum[pair[1]][0],
            accum[pair[1]][1] + 1
        ]

        return accum;
   }, {});

   var judges = [];
   for (var p in people) {
       if (people[p][0] === 0 && people[p][1] === N - 1) {
           judges.push(p);
       }
   }

   return judges.length === 1 ? judges[0] : -1;
};

// https://leetcode.com/problems/flower-planting-with-no-adjacent/
var gardenNoAdj = function(N, paths) {
    var choices = Array(N).fill(null).map(function(el) {
        return {
            1: true,
            2: true,
            3: true,
            4: true
        }
    });

    var hash = {};
    for (var i = 1; i <= N; i++) {
        hash[i] = [];
    }

    paths.forEach(function(pair) {
        var a = pair[0];
        var b = pair[1];
        hash[a].push(b);
        hash[b].push(a);
    });

    console.log(choices);
    console.log(hash);

    var result = [];
    for (var i = 0; i < choices.length; i++) {
        var garden = i + 1;
        var flower;
        for (var f in choices[i]) {
            if (choices[i][f]) { // #
                flower = f;
                break;
            }
        }
        result.push(flower);
        
        hash[garden].forEach(function(otherGarden) {
            choices[otherGarden - 1][flower] = false;
        })
    }

    return result;
};
gardenNoAdj(3, [[1,2],[2,3],[3,1]]);

// https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/

var maxLevelSum = function(root) {
    if (!root) return 0;

    var maxSum = root.val;
    var maxSumLevel = 1;
    var level = 1;
    var current = [root];
    var children = [];

    while (current.length > 0) {
        var sum = current.reduce(function(ac, n) {
            return ac + n.val;
        }, 0);
        if (sum > maxSum) {
            maxSum = sum;
            maxSumLevel = level;
        }

        level++;
        current.forEach(function(n) {
            if (n.left) {
                children.push(n.left);
            }
            if (n.right) {
                children.push(n.right);
            }
        })
        current = children;
        children = [];
    }

    return maxSumLevel;
};


// https://leetcode.com/problems/regions-cut-by-slashes/
var regionsBySlashes = function(grid) {
    // convert each slash into a 3x3 grid
    var map = [];

    for (var r = 0; r < grid.length; r++) {
        row1 = [];
        row2 = [];
        row3 = [];

        c = 0;
        while (c < grid[r].length) {
            if (grid[r][c] === ' ') { // add empty 3x3
                row1 = row1.concat([0,0,0]);
                row2 = row2.concat([0,0,0]);
                row3 = row3.concat([0,0,0]);
            } else if (grid[r][c] === '/') {
                row1 = row1.concat([0,0,1]);
                row2 = row2.concat([0,1,0]);
                row3 = row3.concat([1,0,0]);
            } else {
                row1 = row1.concat([1,0,0]);
                row2 = row2.concat([0,1,0]);
                row3 = row3.concat([0,0,1]);
            }
            c++;
        }
        map.push(row1);
        map.push(row2);
        map.push(row3);
    }
    // console.log(map);

    var recurse = function(r,c) {
        if (map[r] === undefined || map[r][c] !== 0) {
            return;
        }
        // mark current square
        map[r][c] = 2;
        recurse(r + 1, c);
        recurse(r - 1, c);
        recurse(r, c + 1);
        recurse(r, c - 1);
    }

    var islandsCount = 0;
    for (var r = 0; r < map.length; r++) {
        for (var c = 0; c < map[r].length; c++) {
            if (map[r][c] === 0) {
                islandsCount++;
                recurse(r, c); // mark visited;
            }
        }
    }

    return islandsCount;
};

regionsBySlashes([
    "\\/",
    "/\\"
  ])


//   https://leetcode.com/problems/partition-array-for-maximum-sum/

var maxSumAfterPartitioning = function(A, K) {

    var hash = {};

    var recurse = function (i) {
        if (i > A.length - 1) return 0;
        if (hash[i] !== undefined) return hash[i];

        var maxSum = 0;
        var segMax = 0;
        for (var j = 0; j < K && i + j < A.length; j++) {
            if (A[i + j] > segMax) {
                segMax = A[i + j];
            } 
            var segSum = segMax * (j + 1);
            var currentSum = segSum + recurse(i + j + 1);
            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        }
        hash[i] = maxSum;
        return maxSum;
    }

    return recurse(0);
};
maxSumAfterPartitioning([1,15,7,9,2,5,10], 3);


// https://leetcode.com/problems/keys-and-rooms/
var canVisitAllRooms = function(rooms) {

    var visited = {};
    rooms.forEach(function(r, idx) {
        visited[idx] = false;
    })
    // all rooms starts with not visited

    var visitRoom = function(number) {
        if (visited[number]) return;

        visited[number] = true;

        var keys = rooms[number];

        keys.forEach(function(key) {
            visitRoom(key);
        })
    } 
    
    visitRoom(0);

    for (var number in visited) {
        if (visited[number] === false) {
            return false;
        }
     }
     return true; // all rooms visited
};


// https://leetcode.com/problems/count-servers-that-communicate/
var countServers = function(grid) {
    if (!grid.length) return 0;

    // mark horizontal servers that communicate
    for (var r = 0; r < grid.length; r++) {
        var count = 0;
        for (var c = 0; c < grid[r].length; c++) {
            if (count >= 2) break;
            if (grid[r][c] !== 0) { // if there is server then increase count
                count++;
            }
        }
        if (count < 2) continue;
        for (var c = 0; c < grid[r].length; c++) {
            if (grid[r][c] !== 0) {
                grid[r][c] = 2; // mark horizontal communicatiing servers as 2
            }
        }
    }

    // mark vertical servers that communicate
    for (var c = 0; c < grid[0].length; c++) {
        var count = 0;
        for (var r = 0; r < grid.length; r++) {
            if (count >= 2) break;
            if (grid[r][c] !== 0) {
                count++;
            }
        }
        if (count < 2) continue;

        for (var r = 0; r <grid.length; r++) {
            if (grid[r][c] !== 0) {
                grid[r][c] = 2; // mark vertical communicating servers as 2 as well
            }
        }
    }

    var totalCount = 0;
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 2) {
                totalCount++;
            }
        }
    }
    return totalCount;
};

// https://leetcode.com/problems/redundant-connection/
var findRedundantConnection = function(edges) {
    
    var hash = {};
    edges.forEach(function(edge) {
        if (hash[edge[0]]) {
            hash[edge[0]] += 1;
        } else {
            hash[edge[0]] = 1;
        }
        if (hash[edge[1]]) {
            hash[edge[1]] += 1;
        } else {
            hash[edge[1]] = 1;
        }
    });

    for (var i = edges.length - 1; i >= 0; i--) {
        var edge = edges[i];
        if (hash[edge[0]] > 1 && hash[edge[1]] > 1) {
            return edge;
        }
    }
};

// https://leetcode.com/problems/remove-invalid-parentheses/
var removeInvalidParentheses = function(s) {
    
    var recurse = function()
};