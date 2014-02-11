var IronMQ = require('ironmq-promise');
var URL = require('url');

function createTask(req, res) {
  var queueName = req.params.queue;

  if (!queueName) {
    console.error('Invalid resource request use task/:queue form');
    return res.send(404, {
      error: 'use /task/:queue form'
    });
  }

  var url = req.app.get('url');

  var queue = new IronMQ({ queue_name: queueName });
  var request = {
    claim: URL.resolve(url, '/stats/start'),
    finish: URL.resolve(url, '/stats/stop'),
    task: req.body
  };

  var json = JSON.stringify(request);
  queue.post({ body: json }).then(
    function(messageId) {
      // created
      res.send(201, { messageId: messageId });
    }
  ).catch(function(err) {
    console.error(err.stack);
    res.send(500, { error: 'Unknown error' });
  });
}

module.exports = createTask;
