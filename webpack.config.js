'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'dep.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css!postcss-loader'},
      {test: /\.scss$/, loader: `style!css!postcss-loader!sass`},
      {test: /\.jade$/, loader:'file?name=[name].html!jade-html?pretty'},
      {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.woff2$/, loader: 'file?name=[name].[ext]'},
      {test: /\.js$/, exclude: /node_modules/, loader: "babel", query: {presets: ['es2015'], plugins: ['transform-runtime']}}
    ]
  },
  postcss: function() {return [autoprefixer]}
};