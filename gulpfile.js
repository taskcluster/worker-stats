var gulp = require('gulp');
var exec = require('child_process').exec;
var path = require('path');
var glob = require('glob');
var es = require('event-stream');
var Promise = require('promise');

/**
Temp hack until I add source maps to a gulp stream plugin
(and my traceur fixes land).
*/
function traceur(options) {
  var optStr = '';
  for (var key in options) {
    optStr += '--' + key;
    if (options[key]) optStr += '=' + options[key];
    optStr += ' ';
  }

  var BIN = __dirname + '/node_modules/.bin/traceur';
  return new Promise(function(accept, reject) {
    var cmd = BIN + ' ' + optStr;
    console.log(cmd);
    exec(cmd, function(err, stdout) {
      if (err) return reject(err);
      return accept();
    });
  });
}

var STATIC = 'static/';
var STATIC_SRC = STATIC + 'src/';
var STATIC_DEST = STATIC + 'js/';

var paths = {
  js: 'static/src/**/*.js'
};

gulp.task('scripts', function() {
  return traceur({
    modules: 'amd',
    dir: 'static/src/ static/js/',
    sourcemap: ''
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
