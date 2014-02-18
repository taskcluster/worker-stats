define([], function() {
  "use strict";
  var __moduleName = "../../../../static/src/model/task";
  var TaskModel = function TaskModel() {
    var options = arguments[0] !== (void 0) ? arguments[0]: {};
    this.image = 'ubuntu';
    this.command = [];
    Object.assign(this, options);
  };
  var $TaskModel = TaskModel;
  ($traceurRuntime.createClass)(TaskModel, {}, {bashTask: function(image, command) {
      return new $TaskModel({
        image: image,
        command: ['/bin/bash', '-c', command]
      });
    }});
  return {
    get TaskModel() {
      return TaskModel;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=task.map
