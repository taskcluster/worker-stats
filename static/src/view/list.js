/* jshint esnext: true */

var Selectors = {
  content: '.content',
  template: 'template'
};

export default class ListView {

  constructor(listElement) {
    // reset internal state
    this.resetState();

    // must be scrollable or really bad things happen
    this.listElement = listElement;
    this.contentElement = listElement.querySelector(Selectors.content);

    var template = listElement.querySelector(Selectors.template);
    template.parentNode.removeChild(template);

    // cache the height of the list element
    this._getScrollPortHeight =
      this.listElement.getBoundingClientRect().height;

    // get the template item
    this.itemTemplate = template.content.firstElementChild;

    // update as we scroll through the list
    listElement.addEventListener('scroll', this.update.bind(this));

  }

  populateItem() {
    throw new Error('implement populate item');
  }

  resetState() {
    if (this.contentElement) {
      this.contentElement.innerHTML = '';
    }
    this.itemsInDOM = [];
  }

  setList(list) {
    this.resetState();
    this.list = list;

    // figure out the first items height
    var itemNode = this.itemTemplate.cloneNode(true);
    this.contentElement.appendChild(itemNode);
    this.populateItem(itemNode, list[0]);
    this.itemsInDOM[0] = itemNode;
    this.itemHeight = itemNode.getBoundingClientRect().height;

    var height = `${this.itemHeight * list.length}px`;
    this.contentElement.style.height = height;
  }

  getScrollPos() {
    return this.listElement.scrollTop;
  }

  getScrollPortHeight() {
    return this._getScrollPortHeight;
  }

  renderArea(displayPortMarginMultiplier) {
    var scrollPos = this.getScrollPos();
    var scrollPortHeight = this.getScrollPortHeight();
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
        this.contentElement.appendChild(item);
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
