var express = require('express');
var app = express();

// this is useless outside of heroku generally
app.set('url', process.env.URL);

// table name to use on azure
app.set('table', process.env.WORKER_STATS_AZURE_TABLE);

// setup table service
app.set('tableService', require('./azure_table')());

// always use the json parser
app.use(express.json());

// initialize the table if it does not exist
var service = app.get('tableService');
var tablePromise = service.createTableIfNotExists(app.get('table'));
var tableResolved = false;

tablePromise = tablePromise.then(function() {
  tableResolved = true;
}).catch(
  function(err) {
    console.error(
      'Erorr creating table on startup', app.get('table')
    );
    console.error(err);
    process.exit(1);
  }
);

app.use(function(req, res, next) {
  if (tableResolved) return next();
  tablePromise.then(next.bind(this, null));
});

function demandQueue(req, res, next) {
  if (!req.params.queue) {
    return res.send(400, { message: ':queue must be passed' });
  }
  next();
}

function demandId(req, res, next) {
  if (!req.params.id) {
    return res.send(400, { message: ':id must be passed' });
  }
  next();
}

/** task routes */
app.post(
  '/task/:queue',
  demandQueue,
  require('./routes/create_task')
);

/** task stats */
app.post(
  '/stats/:queue/:id/start',
  demandQueue,
  demandId,
  require('./routes/stats_start')
);

app.post(
  '/stats/:queue/:id/stop',
  demandQueue,
  demandId,
  require('./routes/stats_stop')
);


module.exports = app;
