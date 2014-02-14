suite('create task', function() {
  var superagent = require('superagent-promise');
  var table = require('../test/table')();
  var URL = require('url');
  var uuid = require('uuid');
  var app = require('../api');
  var request = require('supertest');
  var IronMQ = require('ironmq-promise');
  var ironQueue;

  // generate a unique queue name
  var queue;
  setup(function() {
    queue = uuid.v4();
    ironQueue = new IronMQ({
      queue_name: queue
    });
  });

  teardown(function() {
    return ironQueue.del_queue().catch(function() {
      // ignore errors when deleting queue
    });
  });

  suite('valid task', function() {
    var task = { image: 'ubuntu', command: ['ls'] };
    var responseBody;

    setup(function(done) {
      return request(app).
        post('/task/' + queue).
        send(task).
        expect(201).
        expect('Content-Type', /application\/json/).
        end(function(err, result) {
          if (err) return done(err);
          responseBody = result.res.body;
          done();
        });
    });

    test('item on azure', function() {
      return table.queryEntity(
        process.env.WORKER_STATS_AZURE_TABLE,
        responseBody.PartitionKey,
        responseBody.RowKey,
        {}
      ).then(function(value) {
        assert.ok(typeof value.taskUrl === 'string', 'has a task');
        return superagent('GET', value.taskUrl).end();
      }).then(function(res) {
        assert.deepEqual(res.body, task);
      });
    });

    test('message on ironmq', function() {
      return ironQueue.get({ n: 1 }).then(
        function(message) {
          assert.equal(message.id, responseBody.ironMessageId);
          var body = JSON.parse(message.body);
          assert.deepEqual(body.task, task);
        }
      );
    });
  });
});
