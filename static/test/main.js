var tests = [
  // amd setup files
  '/base/static/vendor/mocha-as-promised.js'
];

for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    console.log(file);
    if (/_test\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

(function(requirejs) {

// horrible hack so this works better with traceur
var createPatchedLoad = function(originalLoadFn) {
  return function(context, moduleName, url) {
    var ext = url.split('.').pop();
    if (ext !== 'js') url += '.js';
    return originalLoadFn.call(this, context, moduleName, url);
  };
};

// patch require.js
requirejs.load = createPatchedLoad(requirejs.load);

})(window.requirejs);


requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/src',

  nodeIdCompat: true,

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
