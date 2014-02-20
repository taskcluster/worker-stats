define([], function() {
  "use strict";
  var __moduleName = "../../../../static/src/view/create_task";
  function parseForm(form) {
    var object = {};
    var elements = form.querySelectorAll('[name]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      object[el.getAttribute('name')] = el.value;
    }
    return object;
  }
  var $__default = (function() {
    var TaskView = function TaskView(element) {
      this.element = element;
      var form = element.querySelector('form');
      form.onsubmit = function(e) {
        e.preventDefault();
        var object = parseForm(form);
        this.onsubmit(object);
      }.bind(this);
    };
    return ($traceurRuntime.createClass)(TaskView, {onsubmit: function() {}}, {});
  }());
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=create_task.map
