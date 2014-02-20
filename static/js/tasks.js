define(['./view/task_list', './store/tasks'], function($__0,$__1) {
  "use strict";
  var __moduleName = "../../../../static/src/tasks";
  var TaskList = ($__0).default;
  var TaskStore = ($__1).default;
  var store = new TaskStore();
  var view = new TaskList(document.querySelector('#tasks', 30));
  store.listTasks(999).then((function(list) {
    console.log(list);
    view.setList(list);
    view.update();
  })). catch ((function(err) {
    console.error('Error rendering list', err.message);
    console.error(err.stack);
  }));
  return {};
});

//# sourceMappingURL=tasks.map
