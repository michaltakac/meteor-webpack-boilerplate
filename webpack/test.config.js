var path = require('path');
var webpack = require('webpack');

var babelSettings = {
  stage: 0
};

module.exports = {
  name: 'client',
  devtool: 'inline-source-map',
  context: path.join(__dirname, '..'),
  entry: './react',
  output: {
    path: path.join(__dirname, '..', 'meteor', 'react-build-generated', 'client'),
    filename: 'main.js',
    publicPath: '/assets/'
  },
  plugins: [
  ],
  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.css', '.scss']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /(node_modules|bower_components)/ },
      { test: /\.css$/, loader: 'null' },
      { test: /\.scss$/, loader: 'null' },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8192'},
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: 'file'}
    ]
  }
};
