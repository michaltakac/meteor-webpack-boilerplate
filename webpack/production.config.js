var path = require('path');
var webpack = require('webpack');

var babelSettings = {
  stage: 0
};

module.exports = [
  {
    name: 'client',
    devtool: 'inline-source-map',
    context: path.join(__dirname, '..'),
    entry: './app',
    output: {
      path: path.join(__dirname, '..', 'meteor', 'react-build-generated', 'client'),
      filename: 'main.js',
      publicPath: '/assets/'
    },
    externals: {
      'react': 'React'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
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
  },

  {
    name: 'server',
    devtool: 'inline-source-map',
    context: path.join(__dirname, '..'),
    entry: './app',
    output: {
      path: path.join(__dirname, '..', 'meteor', 'react-build-generated', 'server'),
      filename: 'main.js',
      publicPath: '/assets/'
    },
    externals: {
      'react': 'React'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
    resolve: {
      extensions: ['', '.jsx', '.js', '.json', '.css', '.scss']
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /(node_modules|bower_components)/ },
        { test: /\.css$/, loader: 'style-collector!css' },
        { test: /\.scss$/, loader: 'style-collector!css!sass' },
        { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8192'},
        { test: /\.(svg|ttf|woff2?)(\?.*)?$/, loader: 'file'}
      ]
    }
  }
];
