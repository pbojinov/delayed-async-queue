// Some Third-Party Code
window._daq = window._daq || [];
_daq.push([() => {
  console.log('hi there queue, thanks for running me!');
}]); // test iife
// _daq.push(['someCoolFunction', 'do-something']); // test regular function
// _daq.push(['App.mynamespacedfunction', 'some-something-else', 'more data']); // test namespaced function


// A little bit later...your app
// import DelayedAsyncQueue from 'daq';
let queue = new DelayedAsyncQueue(queue = window._daq);
queue.start();

////////////////////////////
/// Sample public api that will be called by the queue
////////////////////////////
var App = App || {};
App.mynamespacedfunction = function() {
  // this function is being called directly but through function queue
  var args = [].slice.call(arguments[0]);
  name = args[0];
  data = args[1];
  console.log('running: ', name);
  console.log('with data: ', data);
}
function someCoolFunction() {
  // this function is being called directly but through function queue
  var args = [].slice.call(arguments[0]);
  name = args[0];
  data = args[1];
  console.log('running experiment: ', name);
  console.log('with data: ', data);
}
