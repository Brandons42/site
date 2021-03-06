import * as cssnano from 'cssnano';
import * as path from 'path';
import * as webpack from 'webpack';

import * as DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as HtmlWebpackInlineSVGPlugin from 'html-webpack-inline-svg-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as OptimizeJsPlugin from 'optimize-js-plugin';
import * as ResourceHintsWebpackPlugin from 'resource-hints-webpack-plugin';
import * as UgilfyJsPlugin from 'uglifyjs-webpack-plugin';

export const happyThreadPool: object = HappyPack.ThreadPool({ size: 8 });

export const common: object = {
  entry: {
    app: [
      'normalize.css',
      path.resolve(__dirname, 'sass/global/main.sass'),
      path.resolve(__dirname, 'sass/global/temporary.critical.sass'),
      path.resolve(__dirname, 'tsx/App.tsx')
    ]
  },
  module: {
    /*noParse: [
      /react/ //,
      ///react-dom/
    ],*/
    rules: [
      /*{
        enforce: 'pre',
        exclude: /^node_modules$/,
        loader: 'tslint-loader',
        test: /\.tsx?$/
      },*/
      {
        exclude: /^node_modules$/,
        test: /\.tsx?$/,
        use: {
          loader: 'happypack/loader',
          options: {
            id: 'scripts'
          }
        }
      },
      {
        exclude: /^node_modules$/,
        test: /\.pug$/,
        use: [
          'pug-loader',
          'posthtml-loader'
        ]
      },
      {
        test: /\.css$/,
        use: {
          loader: 'happypack/loader',
          options: {
            id: 'css'
          }
        }
      },
    ]
  },
  plugins: [
    new DuplicatePackageCheckerPlugin(),
    new FaviconsWebpackPlugin('./img/temporary-favicon.png'),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: true
    }),
    new HappyPack({
      id: 'css',
      loaders: [
        'style-loader',
        'css-loader'
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,//May need to disable
        removeComments: true
      },
      template: './index.pug'
    }),
    new HtmlWebpackInlineSVGPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      canPrint: false
    }),
    new OptimizeJsPlugin(),
    new ResourceHintsWebpackPlugin(),
    new UgilfyJsPlugin({
      parallel: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    alias: {
      //img: path.resolve(process.cwd(), 'img'),
      //react-dom: path.resolve(process.cwd(), 'node_modules/react-dom/dist/react-dom.min.js'),
      sass: path.resolve(process.cwd(), 'sass/modules')
    },
    extensions: [
      '.js',
      '.json',
      '.sass',
      '.ts',
      '.tsx'
    ]
  }
};
