const helpers = require('./helpers');
const webpack = require('webpack');

// Webpack Plugins
const autoprefixer = require('autoprefixer');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = function (options) {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  config.entry = {
    'polyfills': './src/polyfills.ts',
    'main': ['./src/main.ts']
  };

  config.output = {
    path: helpers.root('dist'),
    filename: 'js/[name].[chunkhash].bundle.js',
    chunkFilename: 'js/[id].[chunkhash].chunk.js'
  };

  config.optimization = {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true,
  };

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

      /*
      * to string and sass loader support for *.scss files (from Angular components)
      * Returns compiled css content as string
      */
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader'
        }],
        exclude: [helpers.root('src', 'styles')]
      },

      // support for .html as raw text
      {test: /\.html$/, use: 'raw-loader', exclude: helpers.root('src', 'assets')},
      {
        test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        use: 'file-loader'
      },
      /* Loader for font awesome.
       */
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [

    new CheckerPlugin(),

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
      'API_HOST': JSON.stringify(options.API_HOST),
      'API_URL': JSON.stringify(options.API_URL),
      'ENV': JSON.stringify(options.ENV),
      'process.env': {
        'API_HOST': JSON.stringify(options.API_HOST),
        'API_URL': JSON.stringify(options.API_URL),
        'ENV': JSON.stringify(options.ENV)
      }
    }),

    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      Popper: ['popper.js', 'default'],
      "Tether": 'tether',
      "window.Tether": "tether"
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
