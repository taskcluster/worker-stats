var uuid = require('uuid');

global.assert = require('assert');
require('mocha-as-promised')();

/** local environment setup */

process.env.URL =
  process.env.URL || 'http://127.0.0.1:3000/';

process.env.WORKER_STATS_AZURE_TABLE =
  process.env.WORKER_STATS_AZURE_TABLE || 'taskClusterWorkerStatsTest';
