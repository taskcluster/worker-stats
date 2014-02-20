/* jshint esnext: true */
export default class QueueList {
  constructor(element) {
    this.element = element;

    var template = element.querySelector('template.item');
    template.parentNode.removeChild(template);

    this.itemTemplate = template.content.querySelector('.queue');
    console.log(this.itemTemplate);
  }

  populateItem(element, item) {
    element.querySelector('.name').textContent = item.name;
    element.querySelector('.size').textContent = item.size;
  }

  setList(list) {
    this.list = list;
    // clear the list
    this.element.innerHTML = '';

    // set the items
    list.forEach((queue) => {
      var item = this.itemTemplate.cloneNode(true);
      this.element.appendChild(item);

      this.populateItem(item, queue);
    });
  }
}
