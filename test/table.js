var TableQuery = require('azure').TableQuery;
var Promise = require('promise');

/**
Utility to delete the table after the test.
*/
module.exports = function tableService() {
  // teardown the azure table
  var table = process.env.WORKER_STATS_AZURE_TABLE;
  var service = require('../azure_table')();

  teardown(function() {
    var query = TableQuery.select('PartitionKey', 'RowKey').from(table);
    query.top(100);

    //return service.
    return service.queryEntities(query, {}).then(
      function(items) {
        var promises = items.map(function(value) {
          // build the delete
          return service.deleteEntity(
            table,
            value,
            {}
          );
        });

        return Promise.all(promises);
      }
    );
  });

  return service;
};
