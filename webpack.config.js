const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;
const HtmlwebpackPlugin = require('html-webpack-plugin');


const libraryName = 'react-d3-tree-editor';
const plugins = [];
const rules = [{
    test: /(\.jsx|\.js)$/,
    loader: 'babel-loader',
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader'],
  }
];
let outputFile;
let outputDirectory;
let entry;

switch (env) {
  case 'production':
    outputFile = 'index.min.js';
    outputDirectory = '/lib';
    entry = `${__dirname}/src/index.js`;
    break;
  case 'build-demo':
    outputFile = 'bundle.js';
    outputDirectory = '/docs';
    entry = `${__dirname}/dev/index.js`;
    rules.push({
      test: /\.html$/,
      use: ['html-webpack-plugin']
    })
    // plugins.push(new HtmlwebpackPlugin({
    //   template: 'dev/index.html'
    // }));
    break;
}


const config = {
  entry,
  devtool: 'source-map',
  output: {
    path: `${__dirname}${outputDirectory}`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    'clone',
    'd3',
    'react',
    'react-dom'
  ],
  module: {
    rules
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js', '.css'],
  },
  plugins,
};

module.exports = config;