(function(window) {

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

  /**
  Task view for submitting tasks.

  @param {Element} element which is the root of the view.
  */
  function Task(element) {
    this.element = element;

    var form = element.querySelector('form');
    form.onsubmit = function(e) {
      e.preventDefault();
      var object = parseForm(form);
      this.onsubmit(object);
    }.bind(this);
  }

  Task.prototype = {
    /**
    @param {Object} form data.
    */
    onsubmit: function(form) {}
  };

  window.Task = Task;
}(this));
