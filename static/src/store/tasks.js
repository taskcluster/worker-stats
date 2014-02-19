/*jshint esnext: true */

var URLS = {
  azureAuth: '/azure',
  createTask: '/task/aws-docker'
};

module AzureTable from '../../vendor/azure_table';
module superagent from '../../vendor/superagent';

export default class TasksStore {
  constructor(host) {
    // overridable urls for task store.
    this.urls = Object.assign({}, URLS);
    this.host = host;
    this.azure = new AzureTable({
      signUrl: this.path(URLS.azureAuth)
    });
  }

  // return a path on the server
  path(path) {
    return this.host + path;
  }

  /**
  POST a task to the server.

  @param {Object} task to submit to the server.
  @return Promise
  */
  createTask(task) {
    return new Promise((accept, reject) => {
      var url = this.path(this.urls.createTask);
      var req = superagent.post(url).send(task);
      req.end((err, response) => {
        if (!response.ok) {
          var err = new Error('could not create task');
          err.response = response;
          reject(err);
          return;
        }
        accept(response.body);
      });
    });
  }

  refreshTask(task) {
    return this.azure.buildQuery({
      '$top': 1,
      '$filter': "(PartitionKey eq '" + task.PartitionKey + "') and " +
                 "(RowKey eq '" + task.RowKey + "')"

    }).then((values) => {
      return values[0];
    });
  }

  refreshTaskUntil(task, field, interval=1000, timeout=30000) {
    timeout = Date.now() + timeout;

    return new Promise((accept, reject) => {
      var refresh = () => {
        if (Date.now() > timeout) {
          return reject(new Error('timeout during refresh'));
        }

        this.refreshTask(task).then((task) => {
          if (task[field]) return accept(task);
          setTimeout(refresh, interval);
        }).catch(reject);
      };

      refresh();
    });
  }

  listTasks(limit=20) {
    return this.azure.buildQuery({
      '$top': limit,
    });
  }
}
