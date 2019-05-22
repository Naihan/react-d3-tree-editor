const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;
const libraryName = 'react-d3-tree-editor';

const plugins = [];
let outputFile;


if (env === 'build') {
  outputFile = 'index.min.js'
} else {
  outputFile = 'index.js'
}

const config = {
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    'clone',
    'd3',
    'react'
  ],
  module: {
    rules: [{
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ],
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js', '.css'],
  },
  plugins,
};

module.exports = config;