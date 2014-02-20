/*jshint esnext: true */

/** glue for building the task */
import CreatedTasksList from './view/created_tasks';
import TasksStore from './store/tasks';
import TaskModel from './model/task';
import TaskView from './view/create_task';

var createdListView = new CreatedTasksList(document.querySelector(
  '#created-tasks'
));

var store = new TasksStore();
var createView = new TaskView(document.querySelector('#create-task'));

createView.onsubmit = (json) => {
  var task = new TaskModel({
    image: json.image,
    command: [json.command]
  });

  store.createTask(json.queue, task).then((task) => {
    createdListView.add(task);
  }).catch((err) => {
    console.error('Could not create task', err);
  });
};
