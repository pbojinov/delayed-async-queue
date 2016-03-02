
// Third-Party Code
window._daq = window._daq || [];
_daq.push([() => {
  console.log('hi there queue, thanks for running me!');
}]); // test iife
// _daq.push(['regularFunctionName', 'do-something']); // test regular function
// _teq.push(['App.namespacedfunction', 'some-something-else', 'more data']); // test namespaced function


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
      this.isProcessing = true;
      for (var i = 0; i < this.queue.length; i++) {
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
    let func = null;
    let parameterArray = null;
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
  _executeFunctionByName(functionName, context) {
    let args = [].slice.call(arguments).splice(2);
    let namespaces = functionName.split('.');
    let func = namespaces.pop();
    for (let i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(this, args);
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

// import DelayedAsyncQueue from 'delayedasyncqueue';
let queue = new DelayedAsyncQueue(queue = window._daq);
queue.start();

////////////////////////////
/// Sample public api that will be called by the queue
////////////////////////////
var App = App || {};
App.namespacedfunction = function() {
  // this function is being called directly but through function queue
  var args = [].slice.call(arguments[0]);
  name = args[0];
  data = args[1];
  console.log('running: ', name);
  console.log('with data: ', data);
}
function regularFunctionName() {
  // this function is being called directly but through function queue
  var args = [].slice.call(arguments[0]);
  name = args[0];
  data = args[1];
  console.log('running experiment: ', name);
  console.log('with data: ', data);
}
