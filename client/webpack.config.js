const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  devServer: {
    historyApiFallback: true
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/client.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
