var azureSAS = require('azure-sas');

var MINUTE = 1000 * 60;

/**
Generate the table authentication details for azure.
*/
function azure(req, res) {
  var table = res.app.get('table');
  var signed = {};
  var query = azureSAS.table({
    resource: table.toLowerCase(),
    signedexpiry: new Date(Date.now() + MINUTE * 60),
    signedpermissions: 'raud'
  });

  signed.query = query;
  signed.table = table;
  signed.host = 'https://' + process.env.AZURE_STORAGE_ACCOUNT + '.';
  signed.host += 'table.core.windows.net';

  // sign the resource and return it
  res.send(200, signed);
}

module.exports = azure;
