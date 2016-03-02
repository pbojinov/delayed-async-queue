/**
 * Delayed Async Queue
 */

class DelayedAsyncQueue {
  constructor(queue = [], intervalTimer = 2000) {

    // overridable settings
    this.queue = queue;
    this.intervalTimer = intervalTimer;

    // constants
    this.queueInterval = null;
    this.isProcessing = false;
  }

  // @private
  _processQueue() {
    console.log('queue with length: ', this.queue.length);
    if (this.queue.length > 0) {
      isProcessing = true;
      for (var i = 0; i < this.queue.length; i++) {
        if (this.queue[i]) {
          // send off item to get processed
          // apply(this.queue[i]);
        }
      }
      this.queue.length = 0; // empty queue
      this.isProcessing = false;
    }
  }

  ////////////////////////////
  // Start and Stop queue code
  ////////////////////////////

  // @public
  start() {
    this.queueInterval = window.setInterval(() => {
      if (!this.isProcessing) {
        this._processQueue();
      }
    }, this.intervalTimer);
  }

  // @public
  stop(interval) {
    return window.clearInterval(this.queueInterval);
  }

  get length() {
    return this.queue.length;
  }

  get intervalTimer() {
    return this.intervalTimer;
  }

  get isProcessing() {
    return this.isProcessing;
  }

}

let queue = new DelayedAsyncQueue();
queue.start();
