/* jshint esnext: true*/
import {TaskModel} from './task';
import {assert} from '../../vendor/chai';

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
    var subject = TaskModel.bashTask(
      'ubuntu',
      'ls -lah'
    );

    assert.deepEqual(subject.command, ['/bin/bash', '-c', 'ls -lah']);
  });
});
