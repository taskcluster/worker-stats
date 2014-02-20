define(['../vendor/superagent', './view/queue_list'], function($__0,$__1) {
  "use strict";
  var __moduleName = "../../../../static/src/queues";
  var superagent = $__0;
  var View = ($__1).default;
  var view = new View(document.querySelector('#queues'));
  superagent.get('/queues').end((function(err, res) {
    if (err) {
      console.error('Failed to fetch queues', err);
      return;
    }
    view.setList(res.body);
  }));
  return {};
});

//# sourceMappingURL=queues.map
