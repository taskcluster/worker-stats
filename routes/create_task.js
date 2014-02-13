var IronMQ = require('ironmq-promise');
var Promise = require('promise');
var URL = require('url');
var Task = require('../model/task');
var Request = require('../model/request');
var uuid = require('uuid');

function createTask(req, res) {
  var queueName = req.params.queue;

  if (!queueName) {
    console.error('Invalid resource request use task/:queue form');
    return res.send(404, {
      error: 'use /task/:queue form'
    });
  }

  // unique request id that will be assigned for this task.
  var id = uuid.v4();

  // services for creating the task & its metrics
  var url = req.app.get('url');
  var table = req.app.get('tableService');
  var tableName = req.app.get('table');

  var queue = new IronMQ({ queue_name: queueName });
  var request = Request.create(
    url,
    queue,
    req.body
  );

  var json = JSON.stringify(request);

  // post a message on the queue and get its id
  queue.post({ body: json }).then(
    function(messageId) {
      var task = Task.create(
        id,
        queueName,
        messageId,
        request.task
      );

      console.log('inserting task', task);
      // create a record in azure recording this task
      return table.insertEntity(tableName, task);
    }
  ).then(
    function(result) {
      res.send(201, result);
    }
  ).catch(function(err) {
    console.error(err.stack);
    res.send(500, { error: 'Unknown error' });
  });
}

module.exports = createTask;
