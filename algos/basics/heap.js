// 2 methods, insert and remove (either min or max, lets do min here)
// to insert, add and bubble it up

//               insert  	  deleteMin  	  remove  	  findMin
// ordered array	 O(n)	         O(1)	        O(n)	      O(1)
//
//               insert  	  deleteMin  	  remove  	  findMin
// binary heap	 O(log n)	     O(log n)	    O(log n)	    O(1)

// 2*idx + 1 is left, 2*idx + 2 is right...

function MinHeap() {
  this.arr = [];
};

MinHeap.prototype.insert = function(val) {
  this.arr.push(val);
  var valIdx = this.arr.length - 1;
  var parentIdx = Math.floor((valIdx - 1) / 2);

  while (parentIdx >= 0 && val < this.arr[parentIdx]) {
    var temp = this.arr[parentIdx];
    this.arr[parentIdx] = val;
    this.arr[valIdx] = temp;
    valIdx = parentIdx;
    parentIdx = Math.floor((valIdx - 1) / 2);
  }
  console.log(this.arr);
  return val;
}

MinHeap.prototype.pop = function () {
  var result = this.arr[0];
  var lastElement = this.arr.pop();
  if (this.arr.length > 1) {
    this.arr[0] = lastElement;
    this.arr = bubbleDown(this.arr, 0);
  }
  console.log(this.arr);
  return result;
};

function bubbleDown(arr, idx) {
  var leftIdx = idx * 2 + 1;
  var rightIdx = idx * 2 + 2;
  if (leftIdx < arr.length && rightIdx < arr.length) {
    var newIdx = arr[leftIdx] < arr[rightIdx] ? leftIdx : rightIdx;
    if (arr[newIdx] < arr[idx]) {
      var temp = arr[newIdx];
      arr[newIdx] = arr[idx];
      arr[idx] = temp;
      return bubbleDown(arr, newIdx);
    }
  } else if (leftIdx < arr.length) {
    if (arr[leftIdx] < arr[idx]) {
      var temp = arr[leftIdx];
      arr[leftIdx] = arr[idx];
      arr[idx] = temp;
      return bubbleDown(arr, leftIdx);
    }
  }
  return arr;
};

var h = new MinHeap();
