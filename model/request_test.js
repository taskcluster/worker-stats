suite('models/request', function() {
  var URL = require('url');
  var subject = require('./request');
  var util = require('util');

  test('#create', function() {
    var url = 'http://xfoo.com/';
    var queue = 'xfoo';
    var task = { woot: true };

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
      result.claim,
      URL.resolve(url, prefix + 'start')
    );

    assert.equal(
      result.finish,
      URL.resolve(url, prefix + 'end')
    );

    assert.deepEqual(result.task, task);
  });
});
