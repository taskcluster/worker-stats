define(['../vendor/term', 'store/tasks', 'store/log', 'model/task', 'view/create_task'], function($__0,$__1,$__2,$__3,$__4) {
  "use strict";
  var __moduleName = "../../../../static/src/create_task";
  var Terminal = $__0;
  var TasksStore = ($__1).default;
  var Log = ($__2).default;
  var TaskModel = ($__3).default;
  var TaskView = ($__4).TaskView;
  var view = new TaskView(document.querySelector('#create-task'));
  var store = new TasksStore();
  var term = new Terminal({
    colors: Terminal.colors,
    cols: 100,
    rows: 30,
    screenKeys: true
  });
  term.open(document.body);
  view.onsubmit = (function(json) {
    var task = new TaskModel({
      image: json.image,
      command: json.command
    });
    store.createTask(json.queue, task).then((function(result) {
      return store.refreshTaskUntil(result, 'log');
    })).then((function(task) {
      var reader = new Log(task.log);
      reader.ondata = (function(value) {
        term.write(value);
      });
      reader.onend = (function() {
        console.log('done');
      });
    })). catch ((function(err) {
      console.error('Could not create task', err);
    }));
  });
  return {};
});

//# sourceMappingURL=create_task.map
