describe('ironmq promise', function() {
  var assert = require('assert');
  var IronMq = require('../');

  var subject;
  beforeEach(function() {
    subject = new IronMq({ queue_name: 'xfoo' });
  });

  it('it should conver methods to promises', function() {
    var get = subject.get({ n: 1 });
    assert.ok(get.then);
  });
});
