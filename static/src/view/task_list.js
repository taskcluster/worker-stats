/* jshint esnext: true */

import ListView from './list';

export default class TaskList extends ListView {
  populateItem(element, task) {
    var link = element.querySelector('a');
    link.href =
      `log.html?RowKey=${task.RowKey}&PartitionKey=${task.PartitionKey}`;
    link.textContent = task.taskUrl;
  }
}
