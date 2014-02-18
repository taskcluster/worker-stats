define(['./log', '../../vendor/chai'], function($__0,$__1) {
  "use strict";
  var __moduleName = "../../../../static/src/store/log_test";
  var Log = ($__0).Log;
  var assert = ($__1).assert;
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

//# sourceMappingURL=log_test.map
