/*jshint esnext:true */
import {Log} from './log';
import {assert} from '../../vendor/chai';

suite('store/log', function() {
  var url = 'http://taskclusterlog.blob.core.windows.net/taskclusterlogs/08890cb0-dac7-46b9-ad09-28cfd3a65f27';

  test('fetch an entire log', function(done) {
    var log = new Log(url);
    var content = '';
    log.ondata = function(value) {
      content += value;
    };

    log.onerror = done;
    log.onend = () => {
      assert.ok(log.complete);
      assert.ok(content.length, 'has contents');
      assert.ok(log.offset >= content.length, 'offset is >= then length');
      done();
    };
  });
});
