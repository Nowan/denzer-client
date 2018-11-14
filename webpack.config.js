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
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            },
            { 
                test: /\.json$/, 
                include: path.join(__dirname, 'node_modules', 'pixi.js'),
                loader: 'json'
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
            },
            {
                test: path.join(__dirname, 'node_modules', 'pixi.js'),
                loader: 'expose-loader?pixi' 
            }
       ]
    },
    resolve: {
        alias: {
          'pixi': path.join(__dirname, 'node_modules', 'pixi.js'),
        }
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
