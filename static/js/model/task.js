define([], function() {
  "use strict";
  var __moduleName = "../../../../static/src/model/task";
  var $__default = (function() {
    var TaskModel = function TaskModel() {
      var options = arguments[0] !== (void 0) ? arguments[0]: {};
      this.image = 'ubuntu';
      this.command = [];
      Object.assign(this, options);
    };
    return ($traceurRuntime.createClass)(TaskModel, {}, {bashTask: function(image, command) {
        return new TaskModel({
          image: image,
          command: ['/bin/bash', '-c'].concat(command.split(' '))
        });
      }});
  }());
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=task.map
