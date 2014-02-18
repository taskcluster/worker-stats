/*jshint esnext:true */

/**
Parse the values out of the form.

@return {Object} convert a form into json values.
*/
function parseForm(form) {
  var object = {};
  var elements =
    form.querySelectorAll('[name]');

  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    object[el.getAttribute('name')] = el.value;
  }

  return object;
}


export class TaskView {
  /**
  Task view for submitting tasks.

  @param {Element} element which is the root of the view.
  */
  constructor(element) {
    this.element = element;

    var form = element.querySelector('form');
    form.onsubmit = function(e) {
      e.preventDefault();
      var object = parseForm(form);
      this.onsubmit(object);
    }.bind(this);
  }

  onsubmit() {}
}
