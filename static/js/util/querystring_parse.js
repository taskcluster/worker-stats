define([], function() {
  "use strict";
  var __moduleName = "../../../../static/src/util/querystring_parse";
  var $__default = function parseQueryString(str) {
    if ('string' != typeof str) return {};
    str = str.trim();
    if ('' == str) return {};
    if ('?' == str.charAt(0)) str = str.slice(1);
    var obj = {};
    var pairs = str.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var parts = pairs[i].split('=');
      obj[parts[0]] = null == parts[1] ? '': decodeURIComponent(parts[1]);
    }
    return obj;
  };
  return {
    get default() {
      return $__default;
    },
    __transpiledModule: true
  };
});

//# sourceMappingURL=querystring_parse.map
