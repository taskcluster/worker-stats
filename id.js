var uuid = require('uuid');
// this code will not exist 100 years from now
var maxValueMS = (new Date(3000, 0, 0)).valueOf();
var fixedLength = String(maxValueMS).length;

function zeroPad(size, value) {
  var pad = '';
  var needed = size - String(value).length;
  if (needed > 0) {
    for (var i = 0; i < needed; i++) pad += '0';
  }
  return pad + value;
}

/**
Generate a (ghetto) lexicographically ordered id (based on the current when generated.
*/
module.exports = function() {
  var id = zeroPad(fixedLength + 10, maxValueMS - Date.now());
  return id + '-' + uuid.v1();
};
