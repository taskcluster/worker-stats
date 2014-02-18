$traceurRuntime.ModuleStore.registerModule("../../src/store/log", function() {
  "use strict";
  var __moduleName = "../../src/store/log";
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
$traceurRuntime.ModuleStore.registerModule("../../src/store/log_test", function() {
  "use strict";
  var __moduleName = "../../src/store/log_test";
  var Log = $traceurRuntime.getModuleImpl("../../src/store/log").Log;
  suite('store/log', function() {
    var url = 'http://taskclusterlog.blob.core.windows.net/taskclusterlogs/08890cb0-dac7-46b9-ad09-28cfd3a65f27';
    test('fetch an entire log', function(done) {
      var log = new Log(url);
      var content = '';
      log.ondata = function(value) {
        content += value;
      };
      log.onerror = done;
      log.onend = (function() {
        assert.ok(log.complete);
        assert.ok(content.length, 'has contents');
        assert.ok(log.offset >= content.length, 'offset is >= then length');
        done();
      });
    });
  });
  return {};
});
System.get("../../src/store/log_test" + '');

//# sourceMappingURL=log_test.map
