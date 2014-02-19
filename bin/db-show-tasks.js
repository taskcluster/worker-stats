var tables = require('../azure_table')();
var AsciiTable = require('cli-table');
var TableQuery = require('azure').TableQuery;

module.exports = function(cmd) {
  var tableName = process.env.WORKER_STATS_AZURE_TABLE;
  var fields = ['PartitionKey', 'RowKey', 'submitted'];
  var asciiTable = new AsciiTable({
    head: fields
  });

  // list the top 10 items.
  var query = TableQuery.select(fields.join(', '))
                        .from(tableName)
                        .top(cmd.number);

  function pushItem(item) {
    item = fields.map(function(field) {
      if (field === 'submitted') return item[field].toLocaleString();
      return item[field] || '';
    });

    asciiTable.push(item);
  }

  tables.queryEntities(query, {}).then(function(items) {
    items.forEach(pushItem);
    console.log(asciiTable.toString());
  }).catch(function(err) {
    console.error(err.stack);
    process.exit(1);
  });
};
