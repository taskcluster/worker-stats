define(['./view/created_tasks', './store/tasks', './model/task', './view/create_task'], function($__0,$__1,$__2,$__3) {
  "use strict";
  var __moduleName = "../../../../static/src/create_task";
  var CreatedTasksList = ($__0).default;
  var TasksStore = ($__1).default;
  var TaskModel = ($__2).default;
  var TaskView = ($__3).default;
  var createdListView = new CreatedTasksList(document.querySelector('#created-tasks'));
  var store = new TasksStore();
  var createView = new TaskView(document.querySelector('#create-task'));
  createView.onsubmit = (function(json) {
    var task = new TaskModel({
      image: json.image,
      command: [json.command]
    });
    store.createTask(json.queue, task).then((function(task) {
      createdListView.add(task);
    })). catch ((function(err) {
      console.error('Could not create task', err);
    }));
  });
  return {};
});

//# sourceMappingURL=create_task.map
