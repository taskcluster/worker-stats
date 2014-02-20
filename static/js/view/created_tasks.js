define(['../util/task_url'], function($__0) {
  "use strict";
  var __moduleName = "../../../../static/src/view/created_tasks";
  var Urls = ($__0).default;
  var $__default = (function() {
    var CreatedTasksView = function CreatedTasksView(element) {
      this.contentElement = element.querySelector('.content');
      var template = element.querySelector('template');
      template.parentNode.removeChild(template);
      this.template = template.content.firstElementChild;
    };
    return ($traceurRuntime.createClass)(CreatedTasksView, {
      populateItem: function(node, task) {
        var submitted = new Date(task.submitted);
        node.querySelector('.submitted').textContent = submitted.toLocaleString();
        var link = node.querySelector('.taskLink');
        link.href = Urls.task(task);
      },
      add: function(model) {
        var node = this.template.cloneNode(true);
        this.contentElement.appendChild(node);
        this.populateItem(node, model);
      }
    }, {});
  }());
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=created_tasks.map
