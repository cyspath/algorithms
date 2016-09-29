function coinChange(coins, total) {
  if (total === 0) { return 1 }
  if (total < 0 || coins.length === 0) { return 0 }
  return coinChange(coins.slice(0,coins.length - 1), total) + coinChange(coins, total - coins[coins.length - 1])
}


console.log(coinChange([2,3,5], 8));

//   0 1 2 3 4 5 6 7 8
// 2 1 0 1 0 1 0 1 0 1
// 3 1 0 1 1 1 1 2 1 2
// 5 1 0 1 1 1 1 2 2 3
