var IronMQ = require('ironmq-promise');
var Promise = require('promise');
var URL = require('url');
var Task = require('../model/task');
var Request = require('../model/request');
var uuid = require('uuid');

function createTask(req, res) {
  var queueName = req.params.queue;

  // services for creating the task & its metrics
  var url = req.app.get('url');
  var table = req.app.get('tableService');
  var bucket = req.app.get('s3Bucket');
  var tableName = req.app.get('table');
  var taskUrl = req.params.taskUrl;

  var queue = new IronMQ({ queue_name: queueName });

  var request = Request.create(
    url,
    queueName,
    req.body
  );

  var json = JSON.stringify(request);

  // post a message on the queue and get its id
  queue.post({ body: json }).then(
    function(messageId) {
      var task = Task.create(
        request.id,
        queueName,
        messageId,
        taskUrl
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
