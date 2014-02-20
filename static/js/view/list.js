define([], function() {
  "use strict";
  var __moduleName = "../../../../static/src/view/list";
  var Selectors = {
    content: '.content',
    template: 'template'
  };
  var $__default = (function() {
    var ListView = function ListView(listElement) {
      this.resetState();
      this.listElement = listElement;
      this.contentElement = listElement.querySelector(Selectors.content);
      var template = listElement.querySelector(Selectors.template);
      template.parentNode.removeChild(template);
      this._getScrollPortHeight = this.listElement.getBoundingClientRect().height;
      this.itemTemplate = template.content.firstElementChild;
      listElement.addEventListener('scroll', this.update.bind(this));
    };
    return ($traceurRuntime.createClass)(ListView, {
      populateItem: function() {
        throw new Error('implement populate item');
      },
      resetState: function() {
        if (this.contentElement) {
          this.contentElement.innerHTML = '';
        }
        this.itemsInDOM = [];
      },
      setList: function(list) {
        this.resetState();
        this.list = list;
        var itemNode = this.itemTemplate.cloneNode(true);
        this.contentElement.appendChild(itemNode);
        this.populateItem(itemNode, list[0]);
        this.itemsInDOM[0] = itemNode;
        this.itemHeight = itemNode.getBoundingClientRect().height;
        var height = (this.itemHeight * list.length + "px");
        this.contentElement.style.height = height;
      },
      getScrollPos: function() {
        return this.listElement.scrollTop;
      },
      getScrollPortHeight: function() {
        return this._getScrollPortHeight;
      },
      renderArea: function(displayPortMarginMultiplier) {
        var scrollPos = this.getScrollPos();
        var scrollPortHeight = this.getScrollPortHeight();
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
            this.contentElement.appendChild(item);
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

//# sourceMappingURL=list.map
