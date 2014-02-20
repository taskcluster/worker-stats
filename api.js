var aws = require('aws-sdk-promise');
var S3 = aws.S3;

var express = require('express');
var app = express();

// this is useless outside of heroku generally
app.set('url', process.env.URL);

// table name to use on azure
app.set('table', process.env.WORKER_STATS_AZURE_TABLE);

// setup table service
app.set('tableService', require('./azure_table')());

// s3 service
app.set('s3', new S3({
  region: process.env.AWS_REGION || 'us-west-2'
}));

app.set('s3Bucket', process.env.AWS_BUCKET || 'taskcluster-tasks');

// always use the json parser
app.use(express.json());

// serve assets from static
app.use(express.directory('static'));
app.use(express.static('static'));

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

/** azure */
app.post('/azure', require('./routes/azure'));

/* queues */
app.get('/queues', require('./routes/queues'));

/** task routes */
app.post(
  '/task/:queue',
  demandQueue,
  require('./middleware/use_url_or_upload'),
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
