const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// process.env.NODE_ENV = "development";
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/bundle.js",
    path: resolve(__dirname, "dist")
  },
  // 生产环境下会自动压缩js代码 和 html代码
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          rootMode: "upward",
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // 当webpack的默认mode值为'production' 自动设置 minify: true 
      // // 压缩html代码
      // minify: {
      //   // 移除空格
      //   collapseWhitespace: true,
      //   // 移除注释
      //   removeComments: true
      // }
    }),
    new CleanWebpackPlugin()
  ]
};
