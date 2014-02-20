suite('GET /queues/', function() {
  var app = require('../api');
  var request = require('supertest');
  var IronMQ = require('ironmq-promise');
  var mq = new IronMQ({ queue_name: 'myqueue' });

  teardown(function() {
    return mq.del_queue().catch(function() {
      // ignore errors when deleting queue
    });
  });

  setup(function(done) {
    request(app).
      post('/task/myqueue').
      send({ image: 'ubuntu', command: ['ls'] }).
      expect(201).
      end(done);
  });

  suite('successfully list queues', function() {
    var responseBody;
    setup(function(done) {
      request(app).
        get('/queues').
        expect(200).
        end(function(err, result) {
          if (err) return done(err);
          responseBody = result.res.body;
          done();
        });
    });

    test('response body', function() {
      var queueByName = {};
      responseBody.forEach(function(queue) {
        queueByName[queue.name] = queue;
      });
      assert.ok(queueByName.myqueue, 'has queues');
      console.log(queueByName);
    });
  });
});

