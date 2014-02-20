var IronMQ = require('ironmq-promise');
var Promise = require('promise');
var mq = new IronMQ();

/**
List all queues and their workload.
*/
function statsStart(req, res) {
  mq.queues({ per_page: 100 }).then(function(list) {
    var promises = list.map(function(queue) {
      // ick
      var queueObj = new IronMQ({ queue_name: queue.name });
      return queueObj.info();
    });

    return Promise.all(promises);
  }).then(function(items) {
    res.send(200, items);
  }).catch(function(err) {
    console.error(err.stack);
    res.send(500, { msg: 'internal error fetching queues' });
  });
}

module.exports = statsStart;

