const helpers = require('./helpers');
const path = require('path');
const webpack = require('webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');

// Webpack Plugins
const autoprefixer = require('autoprefixer');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = function (options) {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    // only discover files that have those extensions
    extensions: ['.ts', '.js']
  };

  config.module = {
    rules: [

      // Support for *.json files.
      {test: /\.json$/, use: 'json-loader'},

      // Support for CSS as raw text
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src', 'styles')]
      },

      // support for .html as raw text
      {test: /\.html$/, use: 'raw-loader', exclude: helpers.root('src', 'assets')}
    ]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [

    new CheckerPlugin(),

    new CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),

    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: function (module) {
        return module.resource && module.resource.startsWith(nodeModules)
      }
    }),

    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new CopyWebpackPlugin([
        {from: 'src/assets', to: 'assets'}],
      {from: 'src/meta'},
      {
        'ignore': [
          '.gitkeep'
        ],
        'debug': 'warning'
      }),

    new CleanWebpackPlugin(['doc', 'dist', 'coverage'], {root: helpers.root('')}),

    new DefinePlugin({
      'API_URL': JSON.stringify(options.API_URL),
      'ENV': JSON.stringify(options.ENV),
      'process.env': {
        'API_URL': JSON.stringify(options.API_URL),
        'ENV': JSON.stringify(options.ENV)
      }
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        /**
         * Apply the tslint loader as pre/postLoader
         * Reference: https://github.com/wbuchwalter/tslint-loader
         */
        tslint: {
          emitErrors: true,
          failOnHint: false
        },

        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer-core
         * Add vendor prefixes to your css
         */
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    })
  ];

  return config;
};
