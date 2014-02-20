define(['./list'], function($__0) {
  "use strict";
  var __moduleName = "../../../../static/src/view/task_list";
  var ListView = ($__0).default;
  var $__default = (function($__super) {
    var TaskList = function TaskList() {
      $traceurRuntime.defaultSuperCall(this, TaskList.prototype, arguments);
    };
    return ($traceurRuntime.createClass)(TaskList, {populateItem: function(element, task) {
        var link = element.querySelector('a');
        link.href = ("log.html?RowKey=" + task.RowKey + "&PartitionKey=" + task.PartitionKey);
        link.textContent = task.taskUrl;
      }}, {}, $__super);
  }(ListView));
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=task_list.map
