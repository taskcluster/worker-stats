/* jshint esnext: true */
module Terminal from '../../vendor/term';

var SELECTORS = {
  log: '.log-terminal'
};

/**
This class is basically a big wrapper around Terminal which probably is a bad
thing.
*/
export default class TaskLogView {

  constructor(element) {
    this.log = element.querySelector(SELECTORS.log);
  }

  pipe(log) {
    var term = new Terminal({
      cursorHidden: true,
      cursorBlink: false
    });
    term.open(this.log);
    log.ondata = (value) => term.write(value);
  }
}
