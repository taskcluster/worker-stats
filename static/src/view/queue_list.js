/* jshint esnext: true */

import ListView from './list';

export default class QueueList extends ListView {
  populateItem(element, item) {
    element.querySelector('.name').textContent = item.name;
    element.querySelector('.size').textContent = item.size;
  }
}
