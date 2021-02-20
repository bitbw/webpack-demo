const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
// mode 不会自动设置 process.env.NODE_ENV 需要手动处理
process.env.NODE_ENV = "production"  
console.log("Bowen: process.env.NODE_ENV", process.env.NODE_ENV)
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/bundle.js",
    path: resolve(__dirname, "dist")
  },
  mode: "development",
    /*
    语法检查： eslint-loader  eslint
      注意：只检查自己写的源代码，第三方的库是不用检查的
      设置检查规则：
        package.json中eslintConfig中设置~
          "eslintConfig": {
            "extends": "airbnb-base"
          }
        airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
  */
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   options: {
      //     fix: true
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new ESLintPlugin({
      fix: true,
    })
  ]
};
