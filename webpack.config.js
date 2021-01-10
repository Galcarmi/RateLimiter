var path = require("path");
var webpack = require('webpack');

module.exports = {
    node: { fs: 'empty' },
    entry: "./src/index.js",
    output: {
        publicPath: "/js/",
        path: path.join(__dirname, "/dist"),
        filename: "index.js"
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};