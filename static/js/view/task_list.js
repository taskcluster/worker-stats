define([], function() {
  "use strict";
  var __moduleName = "../../../../static/src/view/task_list";
  var $__default = (function() {
    var TaskListView = function TaskListView(element) {
      var itemHeight = arguments[1] !== (void 0) ? arguments[1]: 100;
      this.element = element;
      this.itemHeight = itemHeight;
      this.itemsInDOM = [];
      this.itemTemplate = element.querySelector('.task');
      this.itemTemplate.parentNode.removeChild(this.itemTemplate);
      var update = this.update.bind(this);
      window.addEventListener('scroll', update);
      window.addEventListener('resize', update);
    };
    return ($traceurRuntime.createClass)(TaskListView, {
      setList: function(list) {
        this.list = list;
        var height = (this.itemHeight * list.length + "px");
        this.element.style.height = height;
      },
      getScrollPos: function() {
        return document.documentElement.scrollTop;
      },
      getScrollPortHeight: function() {
        return window.innerHeight;
      },
      populateItem: function(element, task) {
        var link = element.querySelector('a');
        link.href = ("log.html?RowKey=" + task.RowKey + "&PartitionKey=" + task.PartitionKey);
        link.textContent = task.taskUrl;
      },
      renderArea: function(displayPortMarginMultiplier) {
        var scrollPos = this.getScrollPos();
        var scrollPortHeight = window.innerHeight;
        var itemsInDOM = this.itemsInDOM;
        var itemHeight = this.itemHeight;
        var numberOfItems = this.list.length;
        var template = this.itemTemplate;
        var displayPortMargin = displayPortMarginMultiplier * scrollPortHeight;
        var startDiff = Math.floor((scrollPos - displayPortMargin) / itemHeight);
        var startIndex = Math.max(0, startDiff);
        var endDiff = Math.ceil((scrollPos + scrollPortHeight + displayPortMargin) / itemHeight);
        var endIndex = Math.min(numberOfItems, endDiff);
        var recyclableItems = [];
        for (var i in itemsInDOM) {
          if (i < startIndex || i >= endIndex) {
            recyclableItems.push(i);
          }
        }
        function distanceFromDisplayPort(i) {
          return i < startIndex ? startIndex - 1 - i: i - endIndex;
        }
        recyclableItems.sort(function(a, b) {
          return distanceFromDisplayPort(a) - distanceFromDisplayPort(b);
        });
        for (var i = startIndex; i < endIndex; ++i) {
          if (itemsInDOM[i]) {
            continue;
          }
          var item;
          if (recyclableItems.length > 0) {
            var recycleIndex = recyclableItems.pop();
            item = itemsInDOM[recycleIndex];
            delete itemsInDOM[recycleIndex];
          } else {
            item = template.cloneNode(true);
            this.element.appendChild(item);
          }
          this.populateItem(item, this.list[i]);
          item.style.top = (i * itemHeight + "px");
          itemsInDOM[i] = item;
        }
      },
      update: function() {
        var $__0 = this;
        this.renderArea(1);
        setTimeout((function() {
          return $__0.renderArea(4);
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

//# sourceMappingURL=task_list.map
