# Delayed Async Queue

> This is an alpha work in progress. It's used in production at the moment but this is an attempt to make it its own stand-alone library. Use at your own risk...for now.

## Getting Started

```
npm install daq
```

This is indented to be used in the browser, not on the server, since the nature of the problem it tries to solve is allow third party code to trigger things in your client-side app later, when it loads.

## Examples

``` javascript
// [Third-Party Code]
// 3rd party code (such as A/B testing tool) pushes stuff in the queue to be executed later when the page is loaded
// Note: the window scope of the third-party script should match the window scope your app is executing in
//       otherwise the queue (window._daq) will be empty or undefined.
window._daq = window._daq || [];
_daq.push([() => {
  console.log('hi there queue, thanks for running me!');
}]);

// [Your App Code]
// Run the queue in your app
import DelayedAsyncQueue from 'daq';
const queue = new DelayedAsyncQueue(queue = window._daq); // pass in the queue from above
queue.start();

// ...
// you'll see the following in console after a second or two
// > hi there queue, thanks for running me!

// done processing everything? stop the queue
queue.stop();
```

## Notes

The current setup only supports executing anonymous functions at the moment. The next step is to allow named functions and namespaced functions, such as:

```
_daq.push(['someCoolFunction', 'do-something']); // test named function
_daq.push(['App.mynamespacedfunction', 'some-something-else', 'more data']); // test namespaced function
```
