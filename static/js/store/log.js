define(['../../vendor/superagent'], function($__0) {
  "use strict";
  var __moduleName = "../../../../static/src/store/log";
  var superagent = $__0;
  var COMPLETE_HEADER = 'x-ms-meta-complete';
  function req(method, url) {
    return superagent(method, url).set('x-ms-version', '2013-08-15');
  }
  function getReq(logger) {
    var current = req('GET', (logger.url + "?nocache=" + Date.now()));
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
  var $__default = (function() {
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
    return ($traceurRuntime.createClass)(Log, {
      _waitForEtagChange: function() {
        var $__1 = this;
        headReq(this).end((function(err, res) {
          if (res.ok) {
            if ($__1.etag && logIsComplete(res)) return $__1._complete();
            return $__1._read();
          }
          setTimeout($__1._waitForEtagChange.bind($__1), $__1.interval);
        }));
      },
      _complete: function() {
        if (!this.complete) {
          this.complete = true;
          this.onend();
        }
      },
      _read: function() {
        var $__1 = this;
        var req = getReq(this);
        var progress;
        req.end((function(err, res) {
          if (err) {
            $__1.aborted = true;
            return $__1.onerror(err);
          }
          if (!res.ok) {
            return setTimeout($__1._waitForEtagChange.bind($__1), $__1.interval);
          }
          $__1.ondata(res.text);
          $__1.etag = res.header.etag;
          if (progress) $__1.offset += progress.total || 0;
          if (logIsComplete(res)) $__1._complete();
          if (!$__1.complete) $__1._waitForEtagChange();
        }));
        req.xhr.addEventListener('progress', (function(status) {
          progress = status;
        }));
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

//# sourceMappingURL=log.map
