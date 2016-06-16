function Stack() {
  this.store = [];
}

Stack.prototype.peek = function () {
  return this.store[this.store.length - 1];
};

Stack.prototype.push = function (el) {
  this.store.push(el);
  return el;
}

Stack.prototype.pop = function () {
  return this.store.pop();
}

////////////////////  implement a queue with two stacks  ////////////////////

function myQueue() {
  this.inbox = [];
  this.outbox = [];
}

myQueue.prototype.push = function (el) {
  return this.inbox.push(el);
};

myQueue.prototype.pop = function () {
  if (this.outbox.length === 0) {
    while (this.inbox.length > 0) {
      this.outbox.push(this.inbox.pop())
    }
  }
  return this.outbox.pop();
}

////////////////////  sort a stack  ////////////////////

function sort(arr) {
  var stack = new Stack();
  var store = new Stack();
  for (var i = 0; i < arr.length; i++) {
    if (stack.peek() === undefined || stack.peek() <= arr[i]) {
      stack.push(arr[i]);
    } else {
      while (true) {
        if (stack.peek() > arr[i]) {
          store.push(stack.pop());
        } else {
          break;
        }
      }
      stack.push(arr[i]);
      while (store.peek() !== undefined) {
        stack.push(store.pop());
      }
    }
  }
  return stack.store;
}

// console.log(sort([5,3,2,6,1,4]));

////////////////////    ////////////////////
////////////////////    ////////////////////
////////////////////    ////////////////////
////////////////////    ////////////////////
