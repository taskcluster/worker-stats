define([], function() {
  "use strict";
  var __moduleName = "../../../../static/src/view/queue_list";
  var $__default = (function() {
    var QueueList = function QueueList(element) {
      this.element = element;
      var template = element.querySelector('template.item');
      template.parentNode.removeChild(template);
      this.itemTemplate = template.content.querySelector('.queue');
      console.log(this.itemTemplate);
    };
    return ($traceurRuntime.createClass)(QueueList, {
      populateItem: function(element, item) {
        element.querySelector('.name').textContent = item.name;
        element.querySelector('.size').textContent = item.size;
      },
      setList: function(list) {
        var $__0 = this;
        this.list = list;
        this.element.innerHTML = '';
        list.forEach((function(queue) {
          var item = $__0.itemTemplate.cloneNode(true);
          $__0.element.appendChild(item);
          $__0.populateItem(item, queue);
        }));
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

//# sourceMappingURL=queue_list.map
