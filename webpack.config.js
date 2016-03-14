'use strict';

const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'dep.js'
  },
  module: {
    loaders: [
      {test: /\.jade$/, loader:'file?name=[name].html!jade-html?pretty'}
    ]
  }
};