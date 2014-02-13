var URL = require('url');
var util = require('util');
var uuid = require('uuid');

var STAT_URL_FORMAT = '/stats/%s/%s/%s';

var Request = {

  /**
  Build the task request from the queue name a uuid and task.
  */
  create: function(url, queue, task) {
    var id = uuid.v4();
    var result = { id: id, task: task };

    result.start = URL.resolve(
      url,
      util.format(STAT_URL_FORMAT, queue, id, 'start')
    );

    result.stop = URL.resolve(
      url,
      util.format(STAT_URL_FORMAT, queue, id, 'stop')
    );

    return result;
  }
};

module.exports = Request;
