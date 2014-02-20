/* jshint esnext: true */
import Urls from '../util/task_url';

export default class CreatedTasksView {
  constructor(element) {
    this.contentElement = element.querySelector('.content');

    var template = element.querySelector('template');
    template.parentNode.removeChild(template);
    this.template = template.content.firstElementChild;
  }

  populateItem(node, task) {
    var submitted = new Date(task.submitted);

    node.querySelector('.submitted').textContent =
      submitted.toLocaleString();

    var link = node.querySelector('.taskLink');
    link.href = Urls.task(task);
  }

  add(model) {
    var node = this.template.cloneNode(true);
    this.contentElement.appendChild(node);
    this.populateItem(node, model);
  }
}
