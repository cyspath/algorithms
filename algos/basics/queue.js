
function Queue() {
  this.store = {};
  this.oldIdx = 1;
  this.newIdx = 1;
};
Queue.prototype.enqueue = function(el) {
  this.store[this.newIdx] = el;
  this.newIdx ++;
  return el;
};
Queue.prototype.dequeue = function () {
  if (this.oldIdx === this.newIdx) {
    return 'queue is empty';
  }
  var result = this.store[this.oldIdx];
  delete this.store[this.oldIdx];
  this.oldIdx ++;
  return result;
};
