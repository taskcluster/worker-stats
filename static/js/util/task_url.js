define([], function() {
  "use strict";
  var __moduleName = "../../../../static/src/util/task_url";
  var Urls = {task: function(model) {
      console.log(model);
      return ("task.html?PartitionKey=" + model.PartitionKey + "&RowKey=" + model.RowKey);
    }};
  var $__default = Urls;
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=task_url.map
