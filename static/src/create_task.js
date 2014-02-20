/*jshint esnext: true */

/** glue for building the task */
module Terminal from '../vendor/term';
import TasksStore from 'store/tasks';
import Log from 'store/log';
import TaskModel from 'model/task';
import {TaskView} from 'view/create_task';

var view = new TaskView(document.querySelector('#create-task'));
var store = new TasksStore();
var term = new Terminal({
  colors: Terminal.colors,
  cols: 100,
  rows: 30,
  screenKeys: true
});

term.open(document.body);

view.onsubmit = (json) => {
  var task = new TaskModel({
    image: json.image,
    command: [json.command]
  });

  store.createTask(json.queue, task).then((result) => {
    return store.refreshTaskUntil(result, 'log');
  }).then((task) => {
    var reader = new Log(task.log);
    reader.ondata = (value) => {
      term.write(value);
    };

    reader.onend = () => {
      console.log('done');
    };
  }).catch((err) => {
    console.error('Could not create task', err);
  });
};
