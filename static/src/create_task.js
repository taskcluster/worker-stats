/*jshint esnext: true */

/** glue for building the task */
import {TasksStore} from './store/tasks';
import {TaskView} from './view/create_task';
import {Log} from './store/log';

var view = new TaskView(document.querySelector('#create-task'));
var store = new TasksStore();

view.onsubmit = (json) => {
  store.createTask(json).then((result) => {
    return store.refreshTaskUntil(result, 'log');
  }).then((task) => {
    var reader = new Log(task.log);
    reader.ondata = (value) => {
      console.log(value);
    };

    reader.onend = () => {
      console.log('done');
    };
  }).catch((err) => {
    console.error('Could not create task', err);
  });
};
