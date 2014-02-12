suite('task', function() {
  var subject = require('./task');

  test('create', function() {
    var task = { xfoo: true };
    var result = subject.create(
      1,
      'queue',
      1,
      task
    );

    assert.deepEqual(
      {
        PartitionKey: 'queue',
        RowKey: 1,
        queue: 'queue',
        task: task,
        ironMessageId: 1
      },
      result
    );
  });
});
