(function(window) {
  console.log(window);
  var log = new LogStore(
    'http://taskclusterlog.blob.core.windows.net/taskclusterlogs/017343ba-6fd2-49ce-8aaf-226d6c7d84d2'
  );

  log.ondata = function(value) {
    console.log(value);
  };
}(this));
