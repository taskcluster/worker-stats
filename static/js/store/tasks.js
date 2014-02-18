define(['../../vendor/azure_table', '../../vendor/superagent'], function($__0,$__1) {
  "use strict";
  var __moduleName = "../../../../static/src/store/tasks";
  var AUTH_URL = '/azure';
  var AzureTable = $__0;
  var superagent = $__1;
  var TasksStore = function TasksStore() {
    this.azure = new AzureTable({signUrl: AUTH_URL});
  };
  ($traceurRuntime.createClass)(TasksStore, {
    createTask: function(task) {
      return new Promise((function(accept, reject) {
        var req = superagent.post('/task/aws-docker').send(task);
        req.end((function(err, response) {
          if (!response.ok) {
            reject(new Error('could not create task'));
            return;
          }
          accept(response.body);
        }));
      }));
    },
    refreshTask: function(task) {
      return this.azure.buildQuery({
        '$top': 1,
        '$filter': "(PartitionKey eq '" + task.PartitionKey + "') and " + "(RowKey eq '" + task.RowKey + "')"
      }).then((function(values) {
        return values[0];
      }));
    },
    refreshTaskUntil: function(task, field, timeout) {
      var $__2 = this;
      timeout = timeout || 1000;
      return new Promise((function(accept, reject) {
        var refresh = (function() {
          $__2.refreshTask(task).then((function(task) {
            if (task[field]) return accept(task);
            setTimeout(refresh, timeout);
          })). catch (reject);
        });
        refresh();
      }));
    }
  }, {});
  return {
    get TasksStore() {
      return TasksStore;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=tasks.map
