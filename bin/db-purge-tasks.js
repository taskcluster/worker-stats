var tables = require('../azure_table')();
var TableQuery = require('azure').TableQuery;
var Promise = require('promise');

module.exports = function(cmd) {
  var tableName = process.env.WORKER_STATS_AZURE_TABLE;
  var query = TableQuery.select('PartitionKey, RowKey').from(tableName);

  var promises;

  tables.queryEntities(query, {}).then(function(items) {
    console.log(items.length, 'items in table');
    promises = items.map(function(item) {
      //console.log('delete');
      return tables.deleteEntity(tableName, {
        PartitionKey: item.PartitionKey,
        RowKey: item.RowKey
      });
    });

    return Promise.all(promises);
  }).catch(function(err) {
    console.error(err.stack);
    process.exit(1);
  });

};

