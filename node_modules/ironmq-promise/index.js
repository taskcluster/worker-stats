var ProxyPromise = require('proxied-promise-object');
var Promise = require('promise');
var IronMQ = require('iron_mq');

module.exports = function ironmq(options) {
  var instance = new IronMQ.Client(options);
  return new ProxyPromise(Promise, instance);
};
