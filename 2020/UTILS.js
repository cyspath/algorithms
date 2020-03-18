var numToEnglishMap = {0: 'Zero',1: 'One', 2: 'Two', 3:'Three', 4:'Four', 5:'Five', 6:'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine',10: 'Ten', 11: 'Eleven',12: 'Twelve',13: 'Thirteen',14: 'Fourteen',15: 'Fifteen',16: 'Sixteen',17: 'Seventeen',18: 'Eighteen',19: 'Nineteen',20: 'Twenty', 30: 'Thirty', 40: 'Forty', 50: 'Fifty', 60: 'Sixty', 70: 'Seventy', 80: 'Eighty',90: 'Ninety'}

// # HEAP (js implementation) - new BinaryHeap((el) => el.value, 'max');
// Insert / delete O(logn), find min/max = O(1)
function BinaryHeap(scoreFunction, heapType = 'min') {
  this.content = [];
  this.minHeap = heapType === 'min';
  this.scoreFunction = scoreFunction;
}
BinaryHeap.prototype = {
  push: function(element) {
    this.content.push(element);
    this.bubbleUp(this.content.length - 1);
  },
  pop: function() {
    var result = this.content[0];
    var end = this.content.pop();
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },
  peek: function() {
      return this.content[0];
  },
  remove: function(node) {
    var length = this.content.length;
    for (var i = 0; i < length; i++) { // To remove a value, we must search through the array to find it.
      if (this.content[i] != node) continue;
      var end = this.content.pop(); // When it is found, the process seen in 'pop' is repeated to fill up the hole.
      if (i == length - 1) break; // If the element we popped was the one we needed to remove, we're done.
      this.content[i] = end;  // Otherwise, we replace the removed element with the popped one, and allow it to float up or sink down as appropriate.
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  },
  size: function() {
    return this.content.length;
  },
  bubbleUp: function(n) {
    var element = this.content[n], score = this.scoreFunction(element);
    while (n > 0) {
      var parentN = Math.floor((n + 1) / 2) - 1,
      parent = this.content[parentN];
      if (this.compEq(score, this.scoreFunction(parent))) {
          break;
      }
      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }
  },
  sinkDown: function(n) {
    var length = this.content.length,
    element = this.content[n],
    elemScore = this.scoreFunction(element);
    while(true) {
      var child2N = (n + 1) * 2, child1N = child2N - 1;
      var swap = null;
      if (child1N < length) {
        var child1 = this.content[child1N],
        child1Score = this.scoreFunction(child1);
        if (this.comp(child1Score, elemScore)) {
            swap = child1N;
        }
      }
      if (child2N < length) {
        var child2 = this.content[child2N],
        child2Score = this.scoreFunction(child2);
        if (this.comp(child2Score, (swap == null ? elemScore : child1Score)))
          swap = child2N;
      }
      if (swap == null) break;
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  },
  compEq: function(a, b) {
      return this.minHeap === true ? a >= b : a <= b;
  },
  comp: function(a,b) {
    return this.minHeap === true ? a < b : a > b;
  }
};

// Union Find Graph, aka Disjoint Set
// O(1) to find root
class UnionFindGraph { // since we are finding id's (0...maxId), creating a id => node hash maybe necessary before this
    constructor(maxId) { 
        this.parent = {}; // idx is id, value is parent's id
        for (let id = 0; id <= maxId; id++) {
            this.parent[id] = id;
        }
    }
    find(id) {
        let rootId = id;
        while (this.parent[rootId] !== rootId) {
            rootId = this.parent[rootId];
        }
        while (id !== rootId) { // compression
            var parentId = this.parent[id];
            this.parent[id] = rootId; // set current id's parentId to rootId
            id = parentId;
        }
        return rootId;
    }
    connect(a,b) {
        rootA = this.find(a);
        rootB = this.find(b);
        if (rootA !== rootB) {
            this.parent[rootA] = rootB;
        }
    }
    connected(a,b) {
        return this.find(a) === this.find(b);
    }
}

// uses: autofill in google search, for prefix checking
// why better than hash? prefix checking is better unless you hash all prefixes
class Trie {
  constructor() {
    this.root = this.createNode();
  }
  createNode() {
    return { children : Array(26).fill(null), word: null };
  }
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      var charIdx = word[i].charCodeAt() - 97;
      if (node.children[charIdx] === null) {
        node.children[charIdx] = this.createNode();
      }
      node = node.children[charIdx];
    }
    node.word = word;
  }
  search(word) {
    node = this.root;
    for (let i = 0; i < word.length; i++) {
      var charIdx = word[i].charCodeAt() - 97;
      if (node.childen[charIdx] === null) {
        return false;
      }
      node = node.children[charIdx];
    }
    return node.word === word ? true : false;
  }
}

module.exports = { 
    numToEnglishMap,
    BinaryHeap, // new BinaryHeap((el) => el.value, 'max');
    UnionFindGraph, // new UnionFindGraph(3), for 0,1,2,3
    Trie, // new Trie()
};
    