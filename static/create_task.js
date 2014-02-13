/** glue for building the task */

(function(window) {
  var task = new Task(document.querySelector('#create-task'));

  /**
  POST a task to the server.

  @param {Object} task to submit to the server.
  @return Promise
  */
  function createTask(task) {
    return new Promise(function(accept, reject) {
      var req = superagent.post('/task/aws-docker').send(task);
      req.end(function createdTask(err, response) {
        console.log(response);
        if (!response.ok) {
          reject(new Error('could not create task'));
          return;
        }
        accept(response.body);
      });
    });
  }

  task.onsubmit = function(json) {
    createTask(json);
  };
}(this));
