const path = require('path');

module.exports = {
  entry: './script.js', // Entry file of your Node.js project
  target: 'web', // Specify the target environment as Node.js
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module:{
    rules:[{
        loader: 'babel-loader',
        test: '/\.(js|jsx)$/',
        exclude: /node_modules/
    }]
    }
};