const helpers = require('./helpers');
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const path = require('path');
const nodeModules = path.join(process.cwd(), 'node_modules');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

module.exports = function (options) {
  return webpackMerge(commonConfig(options), {

    devtool: 'cheap-module-source-map',

    module: {
      rules: [

        // copy those assets to output
        {
          test: /\.(eot|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash:20].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[hash:20].[ext]'
              }
            }
          ]
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
          test: /\.ts$/,
          loaders: ['@ngtools/webpack']
        }
      ]
    },


    plugins: [

      new AngularCompilerPlugin({
        mainPath: "./src/main.ts",
        tsConfigPath: "./tsconfig.app.json",
        skipCodeGeneration: false
      }),


      // Reference: https://webpack.github.io/docs/code-splitting.html
      // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
      new CommonsChunkPlugin({
        name: "vendor",
        minChunks: function (module) {
          return module.resource && module.resource.startsWith(nodeModules)
        },
        chunks: [
          "main"
        ]
      }),

      // Inject script and link tags into html files
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunksSortMode: function (a, b) {
          var order = ["polyfills", "vendor", "main"];
          return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
        }
      })
    ],

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      historyApiFallback: true,
      watchOptions: {aggregateTimeout: 300, poll: 1000},
      open: false,
      overlay: true,
      stats: {
        colors: true,
        hash: true,
        timings: true,
        chuckModules: false,
        modules: true,
        maxModules: 0,
        reasons: false,
        warnings: true,
        version: false,
        assets: false,
        chunks: true,
        children: false
      } // none (or false), errors-only, minimal, normal (or true) and verbose
    },

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
};
