suite('azure', function() {
  var uuid = require('uuid');

  var app = require('../api');
  var request = require('supertest');
  var tableService = require('../test/table')();
  var table = app.get('table');

  suite('successful update', function() {
    var responseBody;
    // issue the request
    setup(function(done) {
      request(app).
        post('/azure').
        expect(200).
        end(function(err, result) {
          if (err) return done(err);
          responseBody = result.res.body;
          done();
        });
    });

    test('azure table credentials', function() {
      assert.equal(responseBody.table, app.get('table'));
    });
  });
});
