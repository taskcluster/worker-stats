suite('api', function() {
  var subject = require('./api');

  test('.url', function() {
    assert.ok(subject.get('url'), 'sets url');
  });
});
