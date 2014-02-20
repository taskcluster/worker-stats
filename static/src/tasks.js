/* jshint esnext: true */
import TaskList from './view/task_list';
import TaskStore from './store/tasks';

var store = new TaskStore();
var view = new TaskList(document.querySelector('#tasks', 30));

store.listTasks(999).then((list) => {
  console.log(list);
  view.setList(list);
  view.update();
}).catch((err) => {
  console.error('Error rendering list', err.message);
  console.error(err.stack)
});
