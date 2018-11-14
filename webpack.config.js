 var path = require('path');
 var webpack = require('webpack');
 var HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     mode: 'development',
     entry: ['./src/index.js'],
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.bundle.js'
     },
     plugins: [new HtmlWebpackPlugin({
         template: './src/template.html',
         inject: false
     })],
     module: {
        rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
            test: /.*[.](svg|png|jpg|mp3|ogg|m4a|wav)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        limit: 30000,
                        name: '[path][name].[ext]'
                    }
                }
            ]
        }
      ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
