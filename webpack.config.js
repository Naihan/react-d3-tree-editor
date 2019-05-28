const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;



const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");



const libraryName = 'react-d3-tree-editor';
let outputFile;
let outputDirectory;
let entry;
let externals = [];
const plugins = [];
const rules = [];
const optimization = {};


if (env == 'production') {
  outputFile = 'index.min.js';
  outputDirectory = '/lib';
  entry = `${__dirname}/src/index.js`;
  externals = [
    'clone',
    'd3',
    'react',
    'react-dom'
  ];
  rules.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader'],
  });
  rules.push({
    test: /(\.jsx|\.js)$/,
    loader: 'babel-loader',
    exclude: /(node_modules|bower_components)/,
  });
}



if (env == 'build-demo' || env == undefined) {

  outputFile = 'bundle.js';
  outputDirectory = '/docs';
  entry = ['@babel/polyfill', './dev/index.js'];
  optimization.minimizer = [new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ];
  entry = ['@babel/polyfill', './dev/index.js'];


  rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  });
  rules.push({
    test: /\.html$/,
    use: ['html-loader']
  });
  rules.push({
    test: /\.(png|gif)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'img/',
        publicPath: 'img/'
      }
    }]
  });
  rules.push({
    test: /\.css$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      "css-loader"
    ]
  });


  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new HtmlWebpackPlugin({
    template: 'dev/index.html'
  }));
  plugins.push(new MiniCssExtractPlugin({
    filename: "bundle.css"
  }));
}


const config = {
  devtool: 'source-map',
  optimization,
  entry,
  module: {
    rules,
  },
  output: {
    path: `${__dirname}${outputDirectory}`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  externals,

  plugins,
  devServer: {
    contentBase: './dev-server',
    hot: true,
    host: '0.0.0.0'
  }
};

console.log(JSON.stringify(config))

module.exports = config;