// karma.conf.js
module.exports = function(config) {
  config.set({
    // at a minimum need requirejs + traceur
    frameworks: ['mocha', 'requirejs', 'traceur'],

    preprocessors: {
      'static/src/**/*.js': ['traceur']
    },

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing ests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],

    proxies: {
      '/app': 'http://127.0.0.1:60023'
    },

    // If browser does not

    files: [
      'static/test/main.js',
      { pattern: 'static/src/**/*.js', included: false },
      { pattern: 'static/vendor/**/*.js', included: false }
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-requirejs',
      'karma-firefox-launcher',
      'karma-traceur-preprocessor'
    ],

    // default configuration, not required
    traceurPreprocessor: {
      // options passed to the traceur-compiler, see traceur --longhelp for list of options
      options: {
        sourceMap: true,
        modules: 'amd'
      },
      // custom filename transformation function
      transformPath: function(path) {
        return path.replace(/\.es6$/, '.js');
      }
    },

    client: {
      captureConsole: true,
      mocha: {
        ui: 'tdd'
      }
    }

  });
};
