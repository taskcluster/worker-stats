var Task = require('../model/task');

/**
Handles incoming metrics for a single task.
*/
function statsStart(req, res) {
  var app = res.app;
  var id = req.params.id;
  var queue = req.params.queue;

  var table = app.get('table');
  var tableService = app.get('tableService');
  var entity = Task.update(queue, id, req.body);

  return tableService.mergeEntity(
    table,
    entity
  ).then(function(result) {
    res.send(200, result);
  }).catch(function(err) {
    console.error('could not add start stats');
    console.error(err.stack);
    return res.send(500);
  });
}

module.exports = statsStart;
