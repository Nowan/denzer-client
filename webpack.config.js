const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODULE_PATH = {
    PIXI: path.join(__dirname, 'node_modules', 'pixi.js'),
    PIXI_TILEMAP: path.join(__dirname, 'node_modules', 'pixi-tilemap'),
    SOCKET_IO: path.join(__dirname, 'node_modules', 'socket.io-client')
}

module.exports = {
    mode: 'development',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            { from:'./src/assets', to: 'assets' } 
        ]),
        new MiniCssExtractPlugin({
            filename: "app.bundle.css"
        })
    ],
    module: {
       rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                          "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: { 
                            include: path.resolve(__dirname, "src/styles")
                        }
                    }
                ]
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
                include: [
                    MODULE_PATH.PIXI, 
                    MODULE_PATH.SOCKET_IO
                ],
                loader: 'transform-loader?brfs'
            }
       ],
    },
    resolve: {
        alias: {
          'pixi.js': MODULE_PATH.PIXI,
          'pixi-tilemap': MODULE_PATH.PIXI_TILEMAP,
          'socket.io': MODULE_PATH.SOCKET_IO
        }
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
