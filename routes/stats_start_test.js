suite('POST /stats/:id/start', function() {
  var URL = require('url');
  var uuid = require('uuid');
  var app = require('../api');
  var request = require('supertest');

  var tableService = require('../test/table')();
  var table = app.get('table');

  // post something to the table
  var id;
  var inserted;
  setup(function() {
    id = uuid.v4();
    return tableService.insertEntity(table, {
      PartitionKey: 'xfoo',
      RowKey: uuid.v4()
    }).then(function(result) {
      inserted = result;
    });
  });

  suite('successful update', function() {
    var responseBody;
    var taskUpdate = { log: 'woot' };
    // issue the request
    setup(function(done) {
      request(app).
        post(
          '/stats/' + inserted.PartitionKey +'/' + inserted.RowKey + '/start'
        ).
        send(taskUpdate).
        expect(200).
        end(function(err, result) {
          if (err) return done(err);
          responseBody = result.res.body;
          done();
        });
    });

    test('after update', function() {
      return tableService.queryEntity(
        table,
        inserted.PartitionKey,
        inserted.RowKey
      ).then(function(value) {
        assert.deepEqual(value.log, taskUpdate.log);
      });
    });
  });
});
