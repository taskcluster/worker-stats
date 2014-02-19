define(['./tasks', '../model/task', '../test_config', '../../vendor/chai'], function($__0,$__1,$__2,$__3) {
  "use strict";
  var __moduleName = "../../../../static/src/store/tasks_test";
  var TasksStore = ($__0).default;
  var TaskModel = ($__1).default;
  var config = ($__2).default;
  var assert = ($__3).assert;
  suite('store tasks', function() {
    this.timeout('10s');
    var subject;
    setup((function() {
      subject = new TasksStore(config.host);
    }));
    test('#createTask', (function() {
      var task = TaskModel.bashTask('ubuntu', 'ls');
      return subject.createTask(config.queue, task).then((function(value) {
        assert.ok(value.taskUrl);
      }));
    }));
    suite('#refreshTask', function() {
      var task = TaskModel.bashTask('ubuntu', 'ls');
      var azureTask;
      setup(function() {
        return subject.createTask(config.queue, task).then((function(result) {
          return azureTask = result;
        }));
      });
      test('refresh result', function() {
        return subject.refreshTask(azureTask).then((function(result) {
          assert.equal(result.PartitionKey, azureTask.PartitionKey);
          assert.equal(result.RowKey, azureTask.RowKey);
        }));
      });
    });
    suite('#refreshTaskUntil', function() {
      var task = TaskModel.bashTask('ubuntu', 'ls');
      var azureTask;
      setup(function() {
        return subject.createTask(config.queue, task).then((function(result) {
          return azureTask = result;
        }));
      });
      test('successful refresh', function() {
        return subject.refreshTaskUntil(azureTask, 'RowKey').then((function(result) {
          assert.equal(result.PartitionKey, azureTask.PartitionKey);
          assert.equal(result.RowKey, azureTask.RowKey);
        }));
      });
      test('timeout during refresh', function() {
        return subject.refreshTaskUntil(azureTask, 'xfoo', 1, 10).then((function() {
          throw new Error('expected timeout got success');
        }), (function(err) {
          assert.ok(err);
          assert.include(err.message, 'timeout');
        }));
      });
    });
    suite('#listTasks', function() {
      var task = TaskModel.bashTask('ubuntu', 'ls');
      var azureTask;
      setup(function() {
        return subject.createTask(config.queue, task).then((function(result) {
          return azureTask = result;
        }));
      });
      test('list tasks', function() {
        return subject.listTasks(1).then((function(tasks) {
          assert.equal(tasks.length, 1);
          var task = tasks[0];
          assert.equal(task.RowKey, azureTask.RowKey);
          assert.equal(task.PartitionKey, azureTask.PartitionKey);
        }));
      });
    });
  });
  return {};
});

//# sourceMappingURL=tasks_test.map
