var uuid = require('uuid');
var URL = require('url');

/**
If the task body is a json object upload it to s3 otherwise treat it as a url.
*/
function useUrlOrUpload(req, res, next) {
  if (!(typeof req.body === 'object')) {
    return next();
  }

  // upload the asset then continue to the next layer
  var s3 = req.app.get('s3');
  var bucket = req.app.get('s3Bucket');
  var id = uuid.v4();

  var base = URL.format(s3.endpoint);
  var url = URL.resolve(base, '/' + bucket + '/' + id);

  s3.putObject({
    ContentType: 'application/json',
    Bucket: bucket,
    Key: id,
    Body: new Buffer(JSON.stringify(req.body))
  }).promise().then(
    function accept(value) {
      req.params.taskUrl = url;
      next();
    },
    next
  );
}

module.exports = useUrlOrUpload;
