var webpack = require('webpack');
var webpackConfig = require('./webpack/test.config');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: false,
    frameworks: ['jasmine'],
    files: ['./tests/tests.webpack.js'],
    preprocessors: {
      './tests/tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  })
};
