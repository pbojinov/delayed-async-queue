'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Third-Party Code
window._daq = window._daq || [];
// _daq.push([() => {
//   console.log('hi there queue, thanks for running me!');
// }]); // test iife
_daq.push(['regularFunctionName', 'do-something']); // test regular function
// _daq.push(['App.namespacedfunction', 'some-something-else', 'more data']); // test namespaced function

/**
 * Delayed Async Queue
 */

var DelayedAsyncQueue = function () {
  function DelayedAsyncQueue() {
    var queue = arguments.length <= 0 || arguments[0] === undefined ? window._daq || [] : arguments[0];
    var intervalTimer = arguments.length <= 1 || arguments[1] === undefined ? 2000 : arguments[1];

    _classCallCheck(this, DelayedAsyncQueue);

    // overridable settings
    this.queue = queue;
    this.intervalTimer = intervalTimer;

    // constants
    this.queueInterval = null;
    this.isProcessing = false;
  }

  // @private


  _createClass(DelayedAsyncQueue, [{
    key: '_processQueue',
    value: function _processQueue() {
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

  }, {
    key: '_apply',
    value: function _apply() {
      var func = undefined;
      var parameterArray = undefined;
      for (var i = 0; i < arguments.length; i += 1) {
        parameterArray = arguments[i];
        func = parameterArray.shift();
        //   console.log(func);
        //   console.log(parameterArray);
        // console.log('typeof func', typeof func)
        if (typeof func === 'string') {
          this._executeFunctionByName(func, window, parameterArray);
        } else if (typeof func === 'function') {
          func.apply(parameterArray);
        }
      }
    }

    // @private
    // http://stackoverflow.com/a/359910/907388
    // functionName, context, [args]

  }, {
    key: '_executeFunctionByName',
    value: function _executeFunctionByName(functionName, context) {
      var args = [].slice.call(arguments).splice(2);
      var namespaces = functionName.split('.');
      var func = namespaces.pop();
      for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
      }
      // throwing an error here
      //  Cannot read property 'apply' of undefined
      debugger;
      return context[func].apply(this, args);
    }

    ////////////////////////////
    // Start and Stop queue code
    ////////////////////////////

    // @public

  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      this.queueInterval = window.setInterval(function () {
        if (!_this.isProcessing) {
          _this._processQueue();
        }
      }, this.intervalTimer);
    }

    // @public

  }, {
    key: 'stop',
    value: function stop(interval) {
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

  }]);

  return DelayedAsyncQueue;
}();

////////////////////////////
/// Sample public api that will be called by the queue
////////////////////////////


var App = App || {};
App.namespacedfunction = function () {
  // this function is being called directly but through function queue
  var args = [].slice.call(arguments[0]);
  name = args[0];
  data = args[1];
  console.log('running: ', name);
  console.log('with data: ', data);
};
function regularFunctionName() {
  // this function is being called directly but through function queue
  var args = [].slice.call(arguments[0]);
  name = args[0];
  data = args[1];
  console.log('running experiment: ', name);
  console.log('with data: ', data);
}

// import DelayedAsyncQueue from 'delayedasyncqueue';
// let queue = new DelayedAsyncQueue(queue = window._daq);
// queue.start();

exports.default = DelayedAsyncQueue;

