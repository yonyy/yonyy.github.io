const path = require('path');
module.exports = {
  entry: './react/src/index.js',
  output: {
    path: path.resolve(__dirname, 'react', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
