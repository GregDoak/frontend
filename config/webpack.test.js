const helpers = require('./helpers');
var commonConfig = require('./webpack.common.js');
var webpackMerge = require('webpack-merge');
var path = require('path');

module.exports = function (options) {
  return webpackMerge(commonConfig(options), {

    devtool: 'inline-source-map',

    output: {},
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader?inlineSourceMap=true&sourceMap=false', 'angular2-template-loader'],
          exclude: [/\.(e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
        },
        {
          test: /\.ts$/,
          enforce: 'post',
          include: path.resolve('src'),
          use: 'istanbul-instrumenter-loader',
          exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
        },
        {test: /\.ts$/, enforce: 'pre', use: 'tslint-loader'},
        {
          test: /\.scss$/,
          loader: ['raw-loader', 'sass-loader'],
          exclude: [helpers.root('src/index.html')]
        }
      ]
    }
  });
};

