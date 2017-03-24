const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  devServer: {
    proxy: [{
      context: ['/api/**', '/socket.io/**'],
      target: 'http://localhost:3000',
      secure: false
    }]
  },
  entry: './src/client.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader'
    },{
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }]
  }
}
