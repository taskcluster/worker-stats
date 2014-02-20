define(['./list'], function($__0) {
  "use strict";
  var __moduleName = "../../../../static/src/view/queue_list";
  var ListView = ($__0).default;
  var $__default = (function($__super) {
    var QueueList = function QueueList() {
      $traceurRuntime.defaultSuperCall(this, QueueList.prototype, arguments);
    };
    return ($traceurRuntime.createClass)(QueueList, {populateItem: function(element, item) {
        element.querySelector('.name').textContent = item.name;
        element.querySelector('.size').textContent = item.size;
      }}, {}, $__super);
  }(ListView));
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=queue_list.map
