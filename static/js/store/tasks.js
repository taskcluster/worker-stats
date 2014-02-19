define(['../../vendor/azure_table', '../../vendor/superagent'], function($__0,$__1) {
  "use strict";
  var __moduleName = "../../../../static/src/store/tasks";
  var URLS = {
    azureAuth: '/azure',
    createTask: '/task/aws-docker'
  };
  var AzureTable = $__0;
  var superagent = $__1;
  var $__default = (function() {
    var TasksStore = function TasksStore(host) {
      this.urls = Object.assign({}, URLS);
      this.host = host;
      this.azure = new AzureTable({signUrl: this.path(URLS.azureAuth)});
    };
    return ($traceurRuntime.createClass)(TasksStore, {
      path: function(path) {
        return this.host + path;
      },
      createTask: function(task) {
        var $__2 = this;
        return new Promise((function(accept, reject) {
          var url = $__2.path($__2.urls.createTask);
          var req = superagent.post(url).send(task);
          req.end((function(err, response) {
            if (!response.ok) {
              var err = new Error('could not create task');
              err.response = response;
              reject(err);
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
      refreshTaskUntil: function(task, field) {
        var interval = arguments[2] !== (void 0) ? arguments[2]: 1000;
        var timeout = arguments[3] !== (void 0) ? arguments[3]: 30000;
        var $__2 = this;
        timeout = Date.now() + timeout;
        return new Promise((function(accept, reject) {
          var refresh = (function() {
            if (Date.now() > timeout) {
              return reject(new Error('timeout during refresh'));
            }
            $__2.refreshTask(task).then((function(task) {
              if (task[field]) return accept(task);
              setTimeout(refresh, interval);
            })). catch (reject);
          });
          refresh();
        }));
      },
      listTasks: function() {
        var limit = arguments[0] !== (void 0) ? arguments[0]: 20;
        return this.azure.buildQuery({'$top': limit});
      }
    }, {});
  }());
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=tasks.map
