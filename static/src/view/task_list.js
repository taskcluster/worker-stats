/* jshint esnext: true */

export default class TaskListView {
  constructor(element, itemHeight=100) {
    // must be scrollable or really bad things happen
    this.element = element;
    this.itemHeight = itemHeight;
    this.itemsInDOM = [];

    // get the template
    this.itemTemplate = element.querySelector('.task');
    this.itemTemplate.parentNode.removeChild(this.itemTemplate);

    var update = this.update.bind(this);
    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
  }

  setList(list) {
    this.list = list;
    var height = `${this.itemHeight * list.length}px`;
    this.element.style.height = height;
  }

  getScrollPos() {
    return document.documentElement.scrollTop;
    //return this.element.scrollTop;
  }

  getScrollPortHeight() {
    return window.innerHeight;
    //return this.element.clientHeight;
  }

  populateItem(element, task) {
    var link = element.querySelector('a');
    link.href =
      `log.html?RowKey=${task.RowKey}&PartitionKey=${task.PartitionKey}`;
    link.textContent = task.taskUrl;
  }

  renderArea(displayPortMarginMultiplier) {
    var scrollPos = this.getScrollPos();
    var scrollPortHeight = window.innerHeight;
    var itemsInDOM = this.itemsInDOM;
    var itemHeight = this.itemHeight;
    var numberOfItems = this.list.length;
    var template = this.itemTemplate;

    // Determine which items we *need* to have in the DOM. displayPortMargin
    // is somewhat arbitrary. If there is fast async scrolling, increase
    // displayPortMarginMultiplier to make sure more items can be prerendered. If
    // populateItem triggers slow async activity (e.g. image loading or
    // database queries to fill in an item), increase displayPortMarginMultiplier
    // to reduce the likelihood of the user seeing incomplete items.
    var displayPortMargin = displayPortMarginMultiplier * scrollPortHeight;
    var startDiff =
      Math.floor((scrollPos - displayPortMargin) / itemHeight);
    var startIndex = Math.max(0, startDiff);

    var endDiff = Math.ceil(
      (scrollPos + scrollPortHeight + displayPortMargin) / itemHeight
    );
    var endIndex = Math.min(numberOfItems, endDiff);

    // indices of items which are eligible for recycling
    var recyclableItems = [];
    for (var i in itemsInDOM) {
      if (i < startIndex || i >= endIndex) {
        recyclableItems.push(i);
      }
    }
    // Put the items that are furthest away from the displayport at the end of
    // the array.
    function distanceFromDisplayPort(i) {
      return i < startIndex ? startIndex - 1 - i : i - endIndex;
    }
    recyclableItems.sort(function (a,b) {
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
      item.style.top = `${i * itemHeight}px`;
      itemsInDOM[i] = item;
    }
  }

  update() {
    // Synchronously generate all the items that are immediately or nearly visible
    this.renderArea(1);
    // Asynchronously generate the other items for the displayport
    setTimeout(() => this.renderArea(4));
  }
}
