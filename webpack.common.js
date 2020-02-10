const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.tsx', './src/styles/application/index.scss']
  },
  output: {
    path: path.resolve(__dirname, 'assets')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        to: '',
        toType: 'dir'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
            }
          }, {
            loader: 'extract-loader'
          }, {
            loader: 'css-loader?-url'
          }, {
            loader: 'postcss-loader'
          }, {
            loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
          }
        ]
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 5000,
            outputPath: 'fonts',
            name: '[name].[ext]',
          }
        },
        include: function (input) {
          // only process modules with this loader
          // if they live under a 'fonts' or 'pficon' directory
          return input.indexOf('fonts') > -1 || input.indexOf('pficon') > -1;
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              outputPath: 'images',
              name: '[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              outputPath: '/',
              name: '[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              outputPath: 'svgs',
              name: '[name].[ext]',
            }
          }
        ],
        include: input => input.indexOf('background-filter.svg') > -1
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        },
        include: function (input) {
          // only process SVG modules with this loader if they live under a 'bgimages' directory
          // this is primarily useful when applying a CSS background using an SVG
          return input.indexOf('bgimages') > -1;
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader',
          options: {}
        },
        include: function (input) {
          // only process SVG modules with this loader when they don't live under a 'bgimages',
          // 'fonts', or 'pficon' directory, those are handled with other loaders
          return (input.indexOf('bgimages') === -1) &&
            (input.indexOf('fonts') === -1) &&
            (input.indexOf('background-filter') === -1) &&
            (input.indexOf('pficon') === -1);
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json')
      })
    ]
  },
};
