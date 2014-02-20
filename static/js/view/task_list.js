define(['./list', '../util/task_url'], function($__0,$__1) {
  "use strict";
  var __moduleName = "../../../../static/src/view/task_list";
  var ListView = ($__0).default;
  var Urls = ($__1).default;
  var $__default = (function($__super) {
    var TaskList = function TaskList() {
      $traceurRuntime.defaultSuperCall(this, TaskList.prototype, arguments);
    };
    return ($traceurRuntime.createClass)(TaskList, {populateItem: function(element, task) {
        var link = element.querySelector('a');
        link.href = Urls.task(task);
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
