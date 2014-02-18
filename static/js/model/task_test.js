define(['./task', '../../vendor/chai'], function($__0,$__1) {
  "use strict";
  var __moduleName = "../../../../static/src/model/task_test";
  var TaskModel = ($__0).TaskModel;
  var assert = ($__1).assert;
  suite('task model', function() {
    test('constructor', function() {
      var options = {
        image: 'xfoo',
        command: ['woot']
      };
      var subject = new TaskModel(options);
      assert.deepEqual(subject.command, options.command);
      assert.equal(subject.image, options.image);
    });
    test('TaskModel.bashTask', function() {
      var subject = TaskModel.bashTask('ubuntu', 'ls -lah');
      assert.deepEqual(subject.command, ['/bin/bash', '-c', 'ls -lah']);
    });
  });
  return {};
});

//# sourceMappingURL=task_test.map
