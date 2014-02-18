/*jshint esnext: true */

var AUTH_URL = '/azure';

module AzureTable from '../../vendor/azure_table';
module superagent from '../../vendor/superagent';

export class TasksStore {
  constructor() {
    this.azure = new AzureTable({
      signUrl: AUTH_URL
    });
  }

  /**
  POST a task to the server.

  @param {Object} task to submit to the server.
  @return Promise
  */
  createTask(task) {
    return new Promise((accept, reject) => {
      var req = superagent.post('/task/aws-docker').send(task);
      req.end((err, response) => {
        if (!response.ok) {
          reject(new Error('could not create task'));
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

  refreshTaskUntil(task, field, timeout) {
    timeout = timeout || 1000;

    return new Promise((accept, reject) => {
      var refresh = () => {
        this.refreshTask(task).then((task) => {
          if (task[field]) return accept(task);
          setTimeout(refresh, timeout);
        }).catch(reject);
      };

      refresh();
    });
  }
}
