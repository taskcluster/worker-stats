global.assert = require('assert');
require('mocha-as-promised')();

if (!process.env.URL) {
  process.env.URL = 'http://127.0.0.1:3000/';
}
