
.// O(n) O(1)
function dutchFlagPartition(idx, array) {
    var n = array[idx];
    var partition = function (n, array) {
        var i = 0, j = array.length - 1;
        while (i < j) {
            var a = array[i], b = array[j];
            if (a < n) {
                i++;
                continue;
            }
            if (b >= n) {
                j--;
                continue;
            }
            array[i] = b;
            array[j] = a;
            i++;
            j--;
        }
        return array;
    }
    var arr1 = partition(n, array);
    return partition(n + 1, array);    
}
dutchFlagPartition(3, [0,1,2,0,2,1,1])
dutchFlagPartition(2, [0,1,2,0,2,1,1])
dutchFlagPartition(1, [0,1,2,0,2,1,1])

// O(n) O(1)
function plusOne(array) {
    var carry = 1;
    var i = array.length - 1;
    while (i >= 0) {
        var sum = array[i] + carry;
        carry = sum >= 10 ? 1 : 0;
        array[i] = sum % 10; 
        i--;
    }
    if (carry) {
        array.unshift(carry);
    }
    return array;
}
plusOne([1,2,9])

function add(arr1, arr2) {
    var carry = 0;
    var result = [];
    arr1 = arr1.reverse();
    arr2 = arr2.reverse();

    if (arr2.length > arr1.length) {
        [arr2, arr1] = [arr1, arr2];
    }
    // console.log(arr1, arr2)
    for (var i = 0; i < arr1.length; i++) {
        var a = arr1[i], b = arr2[i];
        if (b === undefined) b = 0;
        var sum = a + b + carry;
        
        carry = sum >= 10 ? 1 : 0;
        result.push(sum % 10);
    }
    if (carry) result.push(carry);
    return result.reverse();
}


function multiply(arr1, arr2) {
    // grade school add for each digit of 2nd array multiple by first
    var result = [];
    var negative = (arr1[0] * arr2[0]) < 0;
    arr1[0] = Math.abs(arr1[0]);
    arr2[0] = Math.abs(arr2[0]);

    var multiplyDigitWithZeros = function(array, n, zeroCount) {
        var result = [];
        var carry = 0;
        var i = array.length - 1;
        while (i >= 0) {
            var product = array[i] * n + carry;
            result.unshift(product % 10);
            carry = Math.floor(product / 10);
            i--;
        }
        if (carry) result.unshift(carry);
        
        for (var c = 0; c < zeroCount; c++) {
            result.push(0);
        }
        return result;
    }

    for (var j = arr2.length - 1; j >= 0; j--) {
        var zeroCount = arr2.length - 1 - j;
        var product = multiplyDigitWithZeros(arr1, arr2[j], zeroCount);
        
        result = add(result, product);
    }
    if (negative) result[0] = -result[0];
    return result;
}
multiply([5,7], [-1,2,3]) // -7011

// advancing through array O(n)
function canReachEnd(steps) {
    var maxIdxCanReach = 0;
    
    for (var i = 0; i < steps.length; i++) {
        if (i > maxIdxCanReach) return false;
        var maxStepsFromThisIdx = steps[i] + i; 
        if (maxStepsFromThisIdx > maxIdxCanReach) maxIdxCanReach = maxStepsFromThisIdx;
    }
    return true;
}
canReachEnd([3,3,1,0,2,0,1]) // t
canReachEnd([3,2,0,0,2,0,1]) // f

// delete duplicates using O(n) O(1)
function deleteDuplicates(arr) {
    var seen;
    for (var i = 0; i < arr.length; i++) {
       if (arr[i] === seen) {
           arr[i] = 0;
       } else {
           seen = arr[i];
       }
    }
    console.log(arr) // [2, 3, 5, 0, 7, 11, 0, 0, 13]
    // shift everything forward
    
    var zeroIdx;
    for (var i = 0; i < arr.length; i++) {
        if (zeroIdx === undefined) {
            if (arr[i] === 0) {
                zeroIdx = i;
            }
        } else {
            if (arr[i] !== 0) {
                arr[zeroIdx] = arr[i];
                arr[i] = 0;
                zeroIdx = i;
            }
        }
    }
    return arr;
}
deleteDuplicates([2,3,5,5,7,11,11,11,13])

// basic basic stock question O(n) O(1)
function computeMaxProfit (prices) {
    var min, maxProfit = 0;
    prices.forEach(function(price) {
        if (min === undefined) min = price;
        var profit = price - min;
        if (profit > maxProfit) maxProfit = profit;
        if (price < min) min = price;
    })
    return maxProfit;
}
computeMaxProfit([310,315,275,260,290,230,255,250])

// using forward and backward method to generate a best buying arrays for both
// O(n) O(n)
// second buy must be made after first stock been sold
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