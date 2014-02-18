$traceurRuntime.ModuleStore.registerModule("../src/store/log", function() {
  "use strict";
  var __moduleName = "../src/store/log";
  var COMPLETE_HEADER = 'x-ms-meta-complete';
  function req(method, url) {
    return superagent(method, url).set('x-ms-version', '2013-08-15');
  }
  function getReq(logger) {
    var current = req('GET', logger.url);
    if (logger.etag) current.set('If-None-Match', logger.etag);
    if (logger.offset) current.set('Range', 'bytes=' + logger.offset + '-');
    return current;
  }
  function headReq(logger) {
    var current = req('HEAD', logger.url);
    if (logger.etag) current.set('If-None-Match', logger.etag);
    return current;
  }
  function logIsComplete(req) {
    return req.headers['x-ms-meta-complete'];
  }
  var Log = function Log(url) {
    var interval = arguments[1] !== (void 0) ? arguments[1]: 1000;
    this.url = url;
    this.offset = 0;
    this.complete = false;
    this.etag = null;
    this.interval = interval;
    this.aborted = false;
    this.onerror = function() {};
    this.ondata = function() {};
    this.onend = function() {};
    this._read();
  };
  ($traceurRuntime.createClass)(Log, {
    _waitForEtagChange: function() {
      var $__0 = this;
      headReq(this).end((function(err, res) {
        if (res.ok) {
          if ($__0.etag && logIsComplete(res)) return $__0._complete();
          return $__0._read();
        }
        setTimeout($__0._waitForEtagChange.bind($__0), $__0.interval);
      }));
    },
    _complete: function() {
      if (!this.complete) {
        this.complete = true;
        this.onend();
      }
    },
    _read: function() {
      var $__0 = this;
      var req = getReq(this);
      var progress;
      req.end((function(err, res) {
        if (err) {
          $__0.aborted = true;
          return $__0.onerror(err);
        }
        if (!res.ok) {
          return setTimeout($__0._waitForEtagChange.bind($__0), $__0.interval);
        }
        $__0.ondata(res.text);
        $__0.etag = res.header.etag;
        if (progress) $__0.offset += progress.total || 0;
        if (logIsComplete(res)) $__0._complete();
        if (!$__0.complete) $__0._waitForEtagChange();
      }));
      req.xhr.addEventListener('progress', (function(status) {
        progress = status;
      }));
    }
  }, {});
  return {get Log() {
      return Log;
    }};
});
$traceurRuntime.ModuleStore.registerModule("../src/store/tasks", function() {
  "use strict";
  var __moduleName = "../src/store/tasks";
  var AUTH_URL = '/azure';
  var TasksStore = function TasksStore() {
    this.azure = new AzureTable({signUrl: AUTH_URL});
  };
  ($traceurRuntime.createClass)(TasksStore, {
    createTask: function(task) {
      return new Promise((function(accept, reject) {
        var req = superagent.post('/task/aws-docker').send(task);
        req.end((function(err, response) {
          console.log(response);
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
  return {get TasksStore() {
      return TasksStore;
    }};
});
$traceurRuntime.ModuleStore.registerModule("../src/view/create_task", function() {
  "use strict";
  var __moduleName = "../src/view/create_task";
  function parseForm(form) {
    var object = {};
    var elements = form.querySelectorAll('[name]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      object[el.getAttribute('name')] = el.value;
    }
    return object;
  }
  var TaskView = function TaskView(element) {
    this.element = element;
    console.log(this.element, '<<<!');
    var form = element.querySelector('form');
    form.onsubmit = function(e) {
      e.preventDefault();
      var object = parseForm(form);
      this.onsubmit(object);
    }.bind(this);
  };
  ($traceurRuntime.createClass)(TaskView, {onsubmit: function() {}}, {});
  return {get TaskView() {
      return TaskView;
    }};
});
$traceurRuntime.ModuleStore.registerModule("../src/create_task", function() {
  "use strict";
  var __moduleName = "../src/create_task";
  var TasksStore = $traceurRuntime.getModuleImpl("../src/store/tasks").TasksStore;
  var TaskView = $traceurRuntime.getModuleImpl("../src/view/create_task").TaskView;
  var Log = $traceurRuntime.getModuleImpl("../src/store/log").Log;
  var view = new TaskView(document.querySelector('#create-task'));
  var store = new TasksStore();
  view.onsubmit = (function(json) {
    store.createTask(json).then((function(result) {
      return store.refreshTaskUntil(result, 'log');
    })).then((function(task) {
      var reader = new Log(task.log);
      reader.ondata = (function(value) {
        console.log(value);
      });
      reader.onend = (function() {
        console.log('done');
      });
    })). catch ((function(err) {
      console.error('Could not create task', err);
    }));
  });
  return {};
});
System.get("../src/create_task" + '');

//# sourceMappingURL=create_task.map
