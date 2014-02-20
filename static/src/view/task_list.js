/* jshint esnext: true */

import ListView from './list';
import Urls from '../util/task_url';

export default class TaskList extends ListView {
  populateItem(element, task) {
    var link = element.querySelector('a');
    link.href = Urls.task(task);
    link.textContent = task.taskUrl;
  }
}
