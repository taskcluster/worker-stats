define(['../../vendor/term'], function($__0) {
  "use strict";
  var __moduleName = "../../../../static/src/view/task_log";
  var Terminal = $__0;
  var SELECTORS = {log: '.log-terminal'};
  var $__default = (function() {
    var TaskLogView = function TaskLogView(element) {
      this.log = element.querySelector(SELECTORS.log);
    };
    return ($traceurRuntime.createClass)(TaskLogView, {pipe: function(log) {
        var term = new Terminal({
          cursorHidden: true,
          cursorBlink: false
        });
        term.open(this.log);
        log.ondata = (function(value) {
          return term.write(value);
        });
      }}, {});
  }());
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=task_log.map
