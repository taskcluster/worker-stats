/* jshint esnext: true */
import TasksStore from './tasks';
import TaskModel from '../model/task';
import config from '../test_config';
import {assert} from '../../vendor/chai';

suite('store tasks', function() {
  this.timeout('10s');

  var subject;
  setup(() => {
    subject = new TasksStore(config.host);
  });

  test('#createTask', () => {
    var task = TaskModel.bashTask('ubuntu', 'ls');
    return subject.createTask(config.queue, task).then((value) => {
      assert.ok(value.taskUrl);
    });
  });

  suite('#refreshTask', function() {
    var task = TaskModel.bashTask('ubuntu', 'ls');
    var azureTask;
    setup(function() {
      return subject.createTask(config.queue, task).then(
        (result) => azureTask = result
      );
    });

    test('refresh result', function() {
      return subject.refreshTask(azureTask).then((result) => {
        assert.equal(result.PartitionKey, azureTask.PartitionKey);
        assert.equal(result.RowKey, azureTask.RowKey);
      });
    });
  });

  suite('#refreshTaskUntil', function() {
    var task = TaskModel.bashTask('ubuntu', 'ls');
    var azureTask;
    setup(function() {
      return subject.createTask(config.queue, task).then(
        (result) => azureTask = result
      );
    });

    test('successful refresh', function() {
      // this should never fail because RowKey is always present
      return subject.refreshTaskUntil(azureTask, 'RowKey').then((result) => {
        assert.equal(result.PartitionKey, azureTask.PartitionKey);
        assert.equal(result.RowKey, azureTask.RowKey);
      });
    });

    test('timeout during refresh', function() {
      return subject.refreshTaskUntil(azureTask, 'xfoo', 1, 10).then(
        () => { throw new Error('expected timeout got success'); },
        (err) => {
          assert.ok(err);
          assert.include(err.message, 'timeout');
        }
      );
    });
  });

  suite('#listTasks', function() {
    var task = TaskModel.bashTask('ubuntu', 'ls');
    var azureTask;
    setup(function() {
      return subject.createTask(config.queue, task).then(
        (result) => azureTask = result
      );
    });

    test('list tasks', function() {
      return subject.listTasks(1).then((tasks) => {
        assert.equal(tasks.length, 1);
        var task = tasks[0];

        assert.equal(task.RowKey, azureTask.RowKey);
        assert.equal(task.PartitionKey, azureTask.PartitionKey);
      });
    });
  });
});
