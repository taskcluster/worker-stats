/* jshint esnext: true */
module superagent from '../vendor/superagent';
import View from './view/queue_list';

var view = new View(document.querySelector(
  '.list-view'
));

superagent.get('/queues').end((err, res) => {
  if (err) {
    console.error('Failed to fetch queues', err);
    return;
  }
  view.setList(res.body);
  view.update();
});
