/*jshint esnext:true */
module superagent from '../../vendor/superagent';

var COMPLETE_HEADER = 'x-ms-meta-complete';

function req(method, url) {
  return superagent(method, url).
            set('x-ms-version', '2013-08-15');
}

function getReq(logger) {
  // sadly we need to cache bust because azure won't send over the complete
  // header if the browser tries to avoid making this request by including
  // etags.
  var current = req('GET', `${logger.url}?nocache=${Date.now()}`);

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

export default class Log {
  constructor(url, interval=1000) {
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
  }

  _waitForEtagChange() {
    headReq(this).end((err, res) => {
      if (res.ok) {
        // must have made at least one get is complete
        if (this.etag && logIsComplete(res)) return this._complete();
        return this._read();
      }

      // otherwise wait for new content
      setTimeout(this._waitForEtagChange.bind(this), this.interval);
    });
  }

  _complete() {
    if (!this.complete) {
      this.complete = true;
      this.onend();
    }
  }

  _read() {
    var req = getReq(this);
    var progress;

    req.end((err, res) => {
      if (err) {
        this.aborted = true;
        return this.onerror(err);
      }

      // if the get request was not okay check for new data after the interval.
      if (!res.ok) {
        return setTimeout(
          this._waitForEtagChange.bind(this),
          this.interval
        );
      }

      this.ondata(res.text);
      this.etag = res.header.etag;

      if (progress) this.offset += progress.total || 0;
      if (logIsComplete(res)) this._complete();
      if (!this.complete) this._waitForEtagChange();
    });

    // keep track of the last status event to get the binary offset of the log.
    req.xhr.addEventListener('progress', (status) => {
      progress = status;
    });
  }
}
