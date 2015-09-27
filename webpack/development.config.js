var path = require('path');
var webpack = require('webpack');

var babelSettings = {
  stage: 0,
  plugins: ['react-transform'],
  extra: {
    'react-transform': {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }/*, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      }*/]
      // redbox-react is breaking the line numbers :-(
    }
  }
};

module.exports = {
  name: 'client',
  devtool: 'inline-source-map',
  context: path.join(__dirname, '..'),
  entry: [
    'webpack-hot-middleware/client',
    './app'
  ],
  output: {
    path: path.join(__dirname, '..', 'meteor', 'react-build-generated', 'client'),
    filename: 'main.js',
    publicPath: '/assets/'
  },
  externals: {
    'react': 'React'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.css', '.scss']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /(node_modules|bower_components)/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8192'},
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: 'file'}
    ]
  }
};
