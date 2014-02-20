define(['./store/tasks', './store/log', './view/task_log', './util/querystring_parse'], function($__0,$__1,$__2,$__3) {
  "use strict";
  var __moduleName = "../../../../static/src/log";
  var TasksStore = ($__0).default;
  var Log = ($__1).default;
  var TaskLogView = ($__2).default;
  var parseQS = ($__3).default;
  var TaskController = function TaskController(logView) {
    this.taskStore = new TasksStore();
    this.logView = logView;
    this.task = null;
  };
  ($traceurRuntime.createClass)(TaskController, {
    renderLog: function() {
      var log = new Log(this.task.log);
      this.logView.pipe(log);
    },
    update: function() {
      var $__4 = this;
      var task = parseQS(document.location.search);
      return this.taskStore.refreshTaskUntil(task, 'log').then((function(task) {
        $__4.task = task;
        console.log(task);
        $__4.renderLog();
      })). catch ((function() {
        console.error('Could not fetch task from query string', task);
      }));
    }
  }, {});
  var controller = new TaskController(new TaskLogView(document.querySelector('#log')));
  controller.update();
  return {};
});

//# sourceMappingURL=log.map
