/** @format */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [],
  },
  plugins: [
    // HtmlWebpackPlugin 会自动在output目录下生成index.html
    // 并自动引入打包好的 bundle.js
    new HtmlWebpackPlugin({
      // 以./src/index.html 为模板 生成最后打包好的html
      template: './src/index.html',
    }),
  ],
};
