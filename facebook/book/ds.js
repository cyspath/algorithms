class Stack {
  constructor() {
    this.store = {};
    this.n = 0;
  }
  push(el) {
    this.n += 1;
    this.store[this.n] = el;
    return el;
  }
  pop() {
    if (this.isEmpty()) {
      return;
    }
    var el = this.store[this.n];
    delete(this.store[this.n]);
    this.n -= 1;
    return el;
  }
  peek() {
    return this.store[this.n];
  }
  isEmpty() {
    return this.n === 0;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(el) {
    var newNode = new LinkedListNode(el);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return el;
  }
  remove() {
    if (!this.head) {
      return;
    } else {
      var node = this.head;
      this.head = node.next;
      node.next = null;
      if (!this.head) {
        this.tail = null;
      }
      return node.val;
    }
  }
  isEmpty() {
    return !this.head && !this.tail;
  }
}

class LinkedListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
  showValues() {
    let values = [];
    let node = this;
    while (node.next) {
      values.push(node.val);
      node = node.next;
    }
    values.push(node.val);
    return values.join(' -> ')
  }
}
