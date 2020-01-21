// using forward and backward method to generate a best buying arrays for both
// O(n) O(n)
// second buy must be made after first stock been sold
// page 49
function buyAndSellStockTwice(prices) {
    if (!prices) return 0;

    var min = undefined, profits1 = [], runningProfit = 0;
    prices.forEach(function(price) {
        if (min === undefined) min = price;
        var profit = price - min;
        if (profit > runningProfit) runningProfit = profit;
        profits1.push(runningProfit);
        if (price < min) min = price;
    });

    var max = undefined, profits2 = [], runningProfit = 0;
    for (var j = prices.length - 1; j >= 0; j--) {
        if (max === undefined) max = prices[j];
        var profit = max - prices[j];
        if (profit > runningProfit) runningProfit = profit;
        profits2.unshift(runningProfit);
        if (prices[j] > max) max = prices[j];
    }

    var maxCombo = 0;
    for (var i = 0; i < prices.length - 1; i++) {
        var sum = profits1[i] + profits2[i + 1];
        if (sum > maxCombo) maxCombo = sum;
    }
    return Math.max(maxCombo, profits2[0], profits1[prices.length - 1]);
}
buyAndSellStockTwice([12,11,13,9,12,8,14,13,15])



//page 50 alterations of numbers, can also be done with median calculation which is O(n), but way below is simplest
// O(n) and O(1)
function rearrange(arr) {
    // if at even index we want this value at this index to be smaller than next (swapping as needed)
    // if at odd index we want this value to be bigger and swap if needed
    for (var i = 0; i < arr.length - 1; i++) {
        var a = arr[i], b = arr[i + 1];
        if (i % 2 === 0) { // this index has smaller number
            if (a > b) {
                [arr[i], arr[i + 1]] = [b, a];
            }
        } else {
            if (b > a) {
                [arr[i], arr[i + 1]] = [b,a];
            }
        }
    }
    return arr;
}
rearrange([3,1,7,4])



// O(n) O(1) can be obtained by following each idx jump and update visited to negative due to cyclical nature
function applyOrderToArray(arr, order) {
    var i = 0, l = arr[0];

    while (i < order.length) {
        // if the number is negative from visited or if it swaps with itself
        if (order[i] < 0 || order[i] === i) {
            i++;
            l = arr[i]; // reset from letter since a new i is choosen by incrementing
            continue;
        }

        var toIdx = Math.abs(order[i]);

        // place current i letter to new idx location
        var temp = arr[toIdx];
        arr[toIdx] = l;
        l = temp;


        order[i] = -toIdx - 1; // -1 extra is to prevent -0, it becomes -1
        i = toIdx;

    }
    return arr;
}
applyOrderToArray([0,1,2,3,4,5,6], [4,1,2,0,3,6,5])


// next permutation of a permutation O(n)
function nextPermutation(arr) {
    if (arr.length <= 1) return []; // no more permutation

    // first we need to find the idx of element that needs to be swapped back
    // this is the first time a decrease is found
    var valSoFar, swapIdx;
    for (var i = arr.length - 1; i >= 0; i--) {
        if (valSoFar === undefined) {
            valSoFar = arr[i];
        } else {
            if (arr[i] > valSoFar) {
                valSoFar = arr[i];
            } else {
                swapIdx = i;
                break;
            }
        }
    }

    if (swapIdx === undefined) return []; // whole sequence is decreasing, thus no more next permutation

    // iterate through all elements to right of swap index from right to left, finding the next largest num and swap it with num at swap index
    for (var i = arr.length - 1; i > swapIdx; i--) {
        if (arr[i] > arr[swapIdx]) {
            [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
            break;
        }
    }

    for (var i = swapIdx + 1; i < arr.length; i++) {
        if (revIdx <= i) break;
        var revIdx = arr.length - (i - swapIdx);
        var temp = arr[i];
        arr[i] = arr[revIdx];
        arr[revIdx] = temp;
    }
    return arr;
}
nextPermutation([3,6,1,0,3,2]);


// https://leetcode.com/problems/minimum-window-substring/ O(n)
var minWindow = function(s, t) { 
    var tArr = t.split('');
    var targetCount = tArr.reduce(function(ac, el) {
        ac[el] === undefined ? ac[el] = 1 : ac[el] += 1;
        return ac;
    }, {});
    
    var windowCount = tArr.reduce(function(ac, el) {
        ac[el] = 0;
        return ac;
    }, {});
    
    var k = Object.keys(targetCount).length, c = 0;
    
    var ansL = -1, ansR = -1;
    
    var r = 0;
    
    for (var l = 0; l < s.length; l++) {
        while (r < s.length && c < k) {
            if (windowCount[s[r]] !== undefined) {
                windowCount[s[r]]++;
                if (windowCount[s[r]] === targetCount[s[r]]) c++;
            }
            r++;
        }
        
        if (c === k) {
            if (ansL === -1 || r - l < ansR - ansL) {
                ansL = l;
                ansR = r;
            }
        }
        
        if (windowCount[s[l]]) {
            windowCount[s[l]]--;
            if (windowCount[s[l]] === targetCount[s[l]] - 1) c--;
        }
    }
    
    return ansL === -1 ? '' : s.slice(ansL, ansR);
    
};

var lengthOfLongestSubstringKDistinct = function(s, k) {
    var windowCount = s.split('').reduce(function(ac, el) {
        ac[el] = 0;
        return ac;
    }, {});
    
    var c = 0;
    var r = 0;
    var ans = 0;
    
    for (var l = 0; l < s.length; l++) {
        while (r < s.length && c <= k) {
            windowCount[s[r]]++;
            if (windowCount[s[r]] === 1) c++;
            r++;
            
            if (c <= k) {
                if (r - l > ans) ans = r - l;
            }
        }
        
        windowCount[s[l]]--;
        if (windowCount[s[l]] === 0) c--;
    }
    
    return ans;
};


// hard O(n), using Heap
https://leetcode.com/problems/trapping-rain-water-ii/
const trapRainWater = function (heights) {
    // if small unable to trap water
    if (heights.length <= 2 || heights[0].length <= 2) return 0;

    // change each int to object to hold more info
    for (r = 0; r < heights.length; r++) {
        for (c = 0; c < heights[r].length; c++) {
            heights[r][c] = { val: heights[r][c], r: r, c: c, water: 0, visited: false }
        }
    }
    
    var minHeap = new BinaryHeap((x) => x.val);
    
    // add all boundry squares to min heap
    heights[0].forEach((h) => minHeap.push(h));
    for (r = 1; r < heights.length - 1; r++) {
        minHeap.push(heights[r][0]);
        minHeap.push(heights[r][heights[r].length - 1])
    }
    heights[heights.length - 1].forEach((h) => minHeap.push(h));
    
    // mark them as visited
    minHeap.content.forEach((h) => h.visited = true);
    
    var max = 0;
    var waterSum = 0;
    // start pop from lowest, keep track the max, max can ONLY increase
    while (minHeap.size() > 0) {
        var sq = minHeap.pop();
        
        if (sq.val > max) {
            max = sq.val
        }
        
        var coors = [[sq.r - 1, sq.c], [sq.r, sq.c + 1], [sq.r + 1, sq.c], [sq.r, sq.c - 1]];
        for (i = 0; i < coors.length; i++) {
            var coor = coors[i];
            if (!heights[coor[0]] || !heights[coor[0]][coor[1]] || heights[coor[0]][coor[1]].visited) { // if out of bounds or visited continue
                continue;
            }
            
            var newSq = heights[coor[0]][coor[1]];
            newSq.visited = true;
            if (max > newSq.val) {
                newSq.water = max - newSq.val;
                waterSum += max - newSq.val;
            }
            minHeap.push(newSq);
        }
    }
    return waterSum;
}

// hard o(n), using Stack and some brains
// https://leetcode.com/problems/largest-rectangle-in-histogram/
const largestRectangleArea = function (height) {
    var arr = height.map((h, i) => {
        return { val: h, idx: i };
    });
    
    var leftStack = []; // to keep track of increasing height, used to find first idx that is smaller
    leftStack.push({ val: -1, idx: - 1 }) // the index is used to get distance/length of rect, val is -1 because it just needs to be smaller than 0
    
    for (i = 0; i < arr.length; i++) {
        while (leftStack[leftStack.length - 1].val >= arr[i].val) {
            leftStack.pop();
        }
        // the one on top of stack will be first smaller height, which means for max h rect from this index will have left most edge at top of stack's idx
        var firstSmaller = leftStack[leftStack.length - 1];
        arr[i].leftDistance = i - firstSmaller.idx - 1;
        leftStack.push(arr[i]);
    }
    
    var rightStack = [];
    rightStack.push({ val: -1, idx: arr.length });
    
    for (i = arr.length - 1; i >= 0; i--) {
        while (rightStack[rightStack.length - 1].val >= arr[i].val) {
            rightStack.pop();
        }
        var firstSmaller = rightStack[rightStack.length - 1];
        arr[i].rightDistance = firstSmaller.idx - i - 1;
        rightStack.push(arr[i]);
    }
    
    // now every item in array will have left and right distance of a rectangle with its val as height
    var maxArea = 0;
    for (i = 0; i < arr.length; i++) {
        var area = (arr[i].leftDistance + arr[i].rightDistance + 1) * (arr[i].val); // length x height for max recentangle that can be formed at this i
        if (area > maxArea) maxArea = area;
    }
    
    return maxArea;
}

// O(n) use stack for hierachy and compare
// https://leetcode.com/problems/maximum-binary-tree/submissions/
const maxTree = function (A) {
    var stack = [];
    var lastNodePopped = null;
    
    for (i = 0; i < A.length; i++) {
        var node = new TreeNode(A[i]);
        
        if (stack.length === 0) {
            stack.push(node);
        } else if (node.val < stack[stack.length - 1].val) {
            stack[stack.length - 1].right = node;
            stack.push(node);
        } else {
            while (node.val > stack[stack.length - 1].val) {
                lastNodePopped = stack.pop();
                if (stack.length == 0) break;
            }
            node.left = lastNodePopped;
            if (stack.length !== 0) {
                stack[stack.length - 1].right = node;
            }
            stack.push(node);
        }
    }
    
    while (stack.length > 0) {
        lastNodePopped = stack.pop();
    }
    return lastNodePopped;
}


// O(nlogl) , using binary search
// https://www.lintcode.com/problem/wood-cut
/**
 * @param L: Given n pieces of wood with length L[i]
 * @param k: An integer
 * @return: The maximum length of the small pieces
 */
const woodCut = function (L, k) {
    
    var getK = function(s) {
        return L.reduce(function(ac, l) {
            return ac + Math.floor(l / s);
        }, 0);
    }
    
    var recurse = function (min, max) {
        if (min > max) return 0;
        
        var mid = Math.floor((max - min) / 2) + min;
        
        var newK = getK(mid);
        
        if (newK < k) { // s too long
            return recurse(min, mid - 1);
        } else {
            var rightChild = recurse(mid + 1, max);
            if (!rightChild) return mid;
            return rightChild;
        }
    }
    
    var longestL = L.reduce(function(ac, l) {
        if (l > ac) {
            ac = l;
        }
        return ac;
    }, 0);
    
    var s = recurse(1, longestL);
    return s;
}


// https://www.lintcode.com/problem/copy-books
// binary search, cute implementation, O(nlogp) where n is length of pages array and p is max page number of a book
/**
 * @param pages: an array of integers
 * @param k: An integer
 * @return: an integer
 */
const copyBooks = function (pages, k) { // optimal time is somewhere between min and max time required
    var min = minTime(pages), max = maxTime(pages), time, newK, optimalTime;
    
    while (min <= max) {
        time = Math.floor((max - min) / 2) + min;
        newK = numberCopierNeeded(time, pages);

        if (newK > k) { // time given is too short so more k workers have to work in parallel
            min = time + 1;
        } else { // time given is enough, we record current best, then keep trying by decreasing max time allowed
            optimalTime = time;
            max = time - 1; 
        }
    }
    return optimalTime;
}

function minTime (pages) { // least time possible, each person has to do a book and that book has most pages
    return pages.reduce(function(ac, p) {
        return p > ac ? p : ac;
    }, 0);
}

function maxTime (pages) { // amount of time takes one person to do everything
    return pages.reduce(function(ac, p) {
        return ac + p;
    }, 0)
}

function numberCopierNeeded (time, pages) { // O(n) where n is length of pages array
    var k = 0;
    var runningSum = time;
    for (i = 0; i < pages.length; i++) {
        var p = pages[i];
        
        if (runningSum + p <= time) {
            runningSum += p; // current person can copy this book too
        } else {
            runningSum = p;
            k++; // need new person to start copying books
        }
    }
    return k;
}


// nlogn, using binary search
// https://leetcode.com/problems/find-the-duplicate-number/submissions/
/**
 * @param nums: an array containing n + 1 integers which is between 1 and n
 * @return: the duplicate one
 */
const findDuplicate = function (nums) {
    var i = 1; j = nums.length - 1;
    
    while (true) {
        var n = Math.floor((j - i) / 2) + i;
        var less = 0, c = 0, more = 0;
        
        nums.forEach(function(num) {
            if (num < n) less++;
            if (num === n) c++;
            if (num > n) more++;
        });
        
        if (c > 1) return n;
        
        if (less > n - 1) { // amount of lesser are more than should so dup will be in there
            j = n - 1;
        } else { // amount of more must be over
            i = n + 1;
        }
        
    }
}

// Binary (times)log(n*minT)
// https://www.lintcode.com/problem/copy-books-ii/
const copyBooksII = function (n, times) {
    if (!times.length) return 0;
    
    workers = times.sort((a,b) => a - b);
    
    var max = workers[0] * n;
    var min = 1;
    
    while (min < max) {

        var mid = Math.floor((max - min) / 2) + min;
        
        if (canComplete(n, workers, mid)) {
            max = mid;
        } else {
            min = mid + 1;
        }
    }
    return min;
}

function canComplete (n, workers, time) {
    var t = time;
    var i = 0;
    while (i < workers.length) {
        if (n === 0) {
            return true;
        }
        var w = workers[i];
        
        if (t - w < 0) {
            // new worker required
            i += 1;
            t = time;
        } else if (w > time) {
            return false;
        } else if (t - w >= 0) {
            t = t - w;
            n -= 1;
        }
    }
    return false;
}

// binary https://www.lintcode.com/problem/maximum-average-subarray-ii/description?_from=ladder&&fromId=106
public double maxAverage(int[] nums, int k) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    int n = nums.length;
    double min = Integer.MAX_VALUE;
    double max = Integer.MIN_VALUE;
    for (int i = 0; i < n; i++) {
        min = Math.min(nums[i], min);
        max = Math.max(nums[i], max);
    }
    
    double start = min;
    double end = max;
    double midAvg = max;
    while (end - start > 1e-5) {
        midAvg = start + (end - start) / 2.0;
        if (check(nums, k, midAvg)) {
            start = midAvg;
        } else {
            end = midAvg;
        }
    }
    return midAvg;
}

/**
    Return true, if there is a window with size >= k,
    such that the average sum will >= given midAvg.
 */
private boolean check(int[] nums, int k, double midAvg) {
    double preSum = 0;
    double sum = 0;
    double minPreSum = 0;
    for (int i = 0; i < k; i++) {
        sum += nums[i] - midAvg;
    }
    if (sum >= 0) {
        return true;
    }
    for (int i = k; i < nums.length; i++) {
        sum += nums[i] - midAvg;
        preSum += nums[i - k] - midAvg;
        minPreSum = Math.min(preSum, minPreSum);
        if (sum >= minPreSum) {
            return true;
        }
    }
    return false;
}


// QUEUE o(n)
// https://www.lintcode.com/problem/sliding-window-maximum
const maxSlidingWindow = function (nums, k) {
    if (!nums.length) return [];
        
    var queue = [];
    for (i = 0; i < k; i++) {
        queue = enqueue(queue, i, nums[i]);
    }
    
    var result = [];
    for (i = k - 1; i < nums.length; i++) {
        result.push(queue[0].val);
        
        queue = dequeue(queue, i - (k - 1));
        queue = enqueue(queue, i + 1, nums[i + 1])
    }
    
    return result;
}

function dequeue (queue, i) {
    if (queue.length === 0) return;
    while (queue.length !== 0 && queue[0].i <= i) {
        queue.shift();
    }
    return queue;
}

function enqueue (queue, i, val) {
    var newQueue = [];
    while (queue.length !== 0) {
        if (queue[0].val > val) {
            newQueue.push(queue.shift());
        } else {
            queue.shift();
        }
    }
    newQueue.push({ i: i, val: val });
    return newQueue;
}