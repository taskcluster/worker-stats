var azure = require('azure');
var Promise = require('promise');
var PromiseObject = require('proxied-promise-object');

module.exports = function createTableService() {
  var service = azure.createTableService();
  return new PromiseObject(Promise, service);
};
