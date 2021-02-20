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
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          rootMode: "upward",
        },
        // options: {
        //   // 预设：指示babel做怎么样的兼容性处理
        //   presets: [
        //     [
        //       '@babel/preset-env',
        //       {
        //         // 按需加载
        //         useBuiltIns: 'usage',
        //         // 指定core-js版本
        //         corejs: {
        //           version: 3
        //         },
        //         // 指定兼容性做到哪个版本浏览器
        //         targets: {
        //           chrome: '60',
        //           firefox: '60',
        //           ie: '9',
        //           safari: '10',
        //           edge: '17'
        //         }
        //       }
        //     ]
        //   ]
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin()
  ]
};
