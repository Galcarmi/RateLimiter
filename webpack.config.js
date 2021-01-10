var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  target:"node",
  output: {
    publicPath: "/js/",
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    libraryTarget:"umd",
    globalObject:"this",
    umdNamedDefine:true
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          
        },
      },
    ],
  },
};
