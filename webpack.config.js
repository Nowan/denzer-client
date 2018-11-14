const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MODULE_PATH = {
    PIXI: path.join(__dirname, 'node_modules', 'pixi.js'),
    SOCKET_IO: path.join(__dirname, 'node_modules', 'socket.io-client')
}

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
                include: [
                    MODULE_PATH.PIXI,
                    MODULE_PATH.SOCKET_IO
                ],
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
                test: MODULE_PATH.PIXI,
                loader: 'expose-loader?pixi.js' 
            },
            {
                test: MODULE_PATH.SOCKET_IO,
                loader: 'expose-loader?socket.io' 
            }
       ]
    },
    resolve: {
        alias: {
          'pixi.js': MODULE_PATH.PIXI,
          'socket.io': MODULE_PATH.SOCKET_IO
        }
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
