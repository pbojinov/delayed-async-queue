/**
 * Delayed Async Queue
 * ----------------------
 * Author: Petar Bojinov (petarbojinov@gmail.com)
 * License: MIT
 */

class DelayedAsyncQueue {

  constructor(queue = window._daq || [], intervalTimer = 2000) {
    // overridable settings
    // ---------------------
    // the queue to process on
    this.queue = queue;
    // how often to run through items in the queue
    this.intervalTimer = intervalTimer;

    // constants
    // ---------------------
    // used to stop the queue by clearing the interval
    this.queueInterval = null;
    // internal state to determine when to proces
    this.isProcessing = false;
  }

  ////////////////////////////
  // Private Functions
  ////////////////////////////

  // @private
  _processQueue() {
    console.log('queue with length: ', this.queue.length);
    if (this.queue.length > 0) {
      this.isProcessing = true;
      for (let i = 0; i < this.queue.length; i++) {
        if (this.queue[i]) {
          // send off item to get processed
          this._apply(this.queue[i]);
        }
      }
      this.queue.length = 0; // empty queue
      this.isProcessing = false;
    }
  }

  // @private
  _apply() {
    let func;
    let parameterArray;
    for (let i = 0; i < arguments.length; i += 1) {
      parameterArray = arguments[i];
      func = parameterArray.shift();
      //   console.log(func);
      //   console.log(parameterArray);
      // console.log('typeof func', typeof func)
      if (typeof func === 'string') {
        this._executeFunctionByName(func, window, parameterArray)
      } else if (typeof func === 'function') {
        func.apply(parameterArray);
      }
    }
  }

  // @private
  // http://stackoverflow.com/a/359910/907388
  // functionName, context, [args]
  _executeFunctionByName(functionName, context) {
    let args = [].slice.call(arguments).splice(2);
    let namespaces = functionName.split('.');
    let func = namespaces.pop();
    for (let i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    // throwing an error here for named functions
    // Cannot read property 'apply' of undefined
    debugger;
    return context[func].apply(this, args);
  }

  ////////////////////////////
  // Public Functions
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

  // TODO - create setters so we can use the getters
  // ---------------------
  // get length() {
  //   return this.queue.length;
  // }
  //
  // get intervalTimer() {
  //   return this.intervalTimer;
  // }
  //
  // get isProcessing() {
  //   return this.isProcessing;
  // }

}

export default DelayedAsyncQueue;
