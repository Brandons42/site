const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeJsPlugin = require("optimize-js-plugin");

module.exports = merge(common, {
  module: {
    rules: [
      {
        exclude: /^node_modules$/,
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        exclude: /^node_modules$/,
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:8].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        exclude: /^node_modules$/,
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  }
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].[contenhash:8].css'
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
