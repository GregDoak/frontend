const helpers = require('./helpers');
var commonConfig = require('./webpack.common.js');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

// Webpack Plugins
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

module.exports = function (options) {
  return webpackMerge(commonConfig(options), {

    devtool: 'source-map',

    module: {
      rules: [

        // copy those assets to output
        {
          "test": /\.(eot|svg)$/,
          "loader": "file-loader?name=assets/[name].[hash:20].[ext]"
        },
        {
          "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
          "loader": "url-loader?name=assets/[name].[hash:20].[ext]&limit=8192"
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [helpers.root('src', 'styles')]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [helpers.root('src', 'styles')]
        },

        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack'
        },
        {
          test: /\.js$/,
          loader: '@angular-devkit/build-optimizer/webpack-loader',
          options: {
            sourceMap: false
          }
        }

      ]
    },

    plugins: [
      new ProgressPlugin(),

      new AngularCompilerPlugin({
        mainPath: "./src/main.ts",
        tsConfigPath: "./tsconfig.app.json"
      }),

      // Inject script and link tags into html files
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunksSortMode: function (a, b) {
          var order = ["polyfills", "vendor", "main"];
          return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
        }
      }),

      new PurifyPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new UglifyJsPlugin({
        sourceMap: true,
        beautify: false,
        output: {
          comments: false
        },
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false,
          pure_getters: true,
          passes: 3
        }
      })

    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },

    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunkModules: false,
      modules: true,
      maxModules: 0,
      reasons: false,
      warnings: true,
      version: false,
      assets: true,
      chunks: false,
      children: false
    }
  });
};
