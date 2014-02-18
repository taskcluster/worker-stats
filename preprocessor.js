var path = require('path');
var fs = require('fs');

var traceurSourceMap = function(args, config) {
  config = config || {};
  return function(content, file, done) {
    var split = file.path.split('.');
    split.pop();
    var sourceMap =
      JSON.parse(fs.readFileSync(split.join('.') + '.map', 'utf8'));
    file.sourceMap = sourceMap;
    done(content);
  };
};

traceurSourceMap.$inject = ['args', 'config'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:traceurSourceMap': ['factory', traceurSourceMap]
};
