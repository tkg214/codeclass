const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  devServer: {
    proxy: [{
      context: ['/**', '/socket.io/**'],
      target: 'http://localhost:3000',
      secure: false
    }]
  },
  entry: './src/client.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../server/public')
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader'
    },{
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }]
  }
}
