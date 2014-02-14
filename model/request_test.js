suite('models/request', function() {
  var URL = require('url');
  var subject = require('./request');
  var util = require('util');

  test('#create', function() {
    var url = 'http://xfoo.com/';
    var queue = 'xfoo';
    var task = '/path/to/task';

    var result = subject.create(
      url,
      queue,
      task
    );

    var prefix = util.format(
      '/stats/%s/%s/',
      queue,
      result.id
    );

    assert.equal(
      result.start,
      URL.resolve(url, prefix + 'start')
    );

    assert.equal(
      result.stop,
      URL.resolve(url, prefix + 'stop')
    );

    assert.deepEqual(result.taskUrl, task);
  });
});
