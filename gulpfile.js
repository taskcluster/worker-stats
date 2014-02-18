var gulp = require('gulp');
var exec = require('child_process').exec;
var path = require('path');
var glob = require('glob');
var es = require('event-stream');
var Promise = require('promise');

function traceur(options, files) {
  var optStr = '';
  for (var key in options) {
    optStr += '--' + key;
    if (options[key]) optStr += '=' + options[key];
    optStr += ' ';
  }

  var BIN = __dirname + '/node_modules/.bin/traceur';
  return new Promise(function(accept, reject) {
    var cmd = BIN + ' ' + optStr + files.join(' ');
    var cwd = __dirname + '/' + STATIC_SRC;
    exec(cmd, { cwd: cwd }, function(err, stdout) {
      if (err) return reject(err);
      return accept();
    });
  });
}

var STATIC = 'static/';
var STATIC_SRC = STATIC + 'src/';
var STATIC_DEST = STATIC + 'js/';

var paths = {
  scripts: 'static/src/*.js',
  tests: 'static/src/**/*_test.js',
  js: 'static/src/**/*.js'
};

var scripts = [];
var tests = [];
var watch = [];

// XXX: traceur has some bugs which make it hard to build streams
//      so its hacked in a major way to experiment with it.
function es6ify(group, src) {
  var name = src.replace(STATIC_SRC, '');
  var task = path.join(STATIC_DEST, name);

  // track dependencies
  group.push(task);

  // keep track of which files need what watch calls.
  watch.push({ src: src, task: task });

  gulp.task(task, function() {
    return traceur(
      {
        out: __dirname + '/' + task,
        modules: true,
        sourcemap: ''
      },
      [name]
    );
  });
}

/** add main .js files */
glob.sync(paths.scripts).forEach(es6ify.bind(this, scripts));
glob.sync(paths.tests).forEach(es6ify.bind(this, tests));

gulp.task('scripts', scripts);
gulp.task('tests', tests);

gulp.task('scripts', scripts);

gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts', 'tests']);
});

gulp.task('default', ['scripts', 'tests', 'watch']);
