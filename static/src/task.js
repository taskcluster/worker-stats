/*jshint esnext: true */

/** glue for building the task */
import TasksStore from './store/tasks';
import Log from './store/log';
import TaskLogView from './view/task_log';
import parseQS from './util/querystring_parse';

class TaskController {
  constructor(logView) {
    this.taskStore = new TasksStore();
    this.logView = logView;
    this.task = null;
  }

  renderLog() {
    var log = new Log(this.task.log);
    this.logView.pipe(log);
  }

  update() {
    var task = parseQS(document.location.search);
    // attempt to find the task
    return this.taskStore.refreshTaskUntil(task, 'log').then((task) => {
      this.task = task;
      console.log(task);
      this.renderLog();
    }).catch(() => {
      console.error('Could not fetch task from query string', task);
    });
  }
}

var controller = new TaskController(
  new TaskLogView(document.querySelector('#log'))
);

controller.update();
