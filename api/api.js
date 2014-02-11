var express = require('express');
var app = express();

// always use the json parser
app.use(express.json());

/** task routes */
app.post('/task/:queue', require('./routes/create_task'));

/** task stats */
app.post('/stats/start');
app.post('/stats/stop');

// this is useless outside of heroku generally
app.set('url', process.env.URL);

module.exports = app;
