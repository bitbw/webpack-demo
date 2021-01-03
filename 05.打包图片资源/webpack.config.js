const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bunle.js",
    path: resolve(__dirname, "dist"),
    publicPath: '', // webpack5 中html中导入image需要设置publicPath
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      // 解析图标 将小图标直接转base64 url-loader 依赖 file-loader 需要一起下载
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 小于8kb的以base64位插入 data:image/jpeg;base64,/9j
              // 大于8kb的以改为hash值为名称的原文件插入 
              limit: 8 * 1024,
              esModule: false,
            }
          }
        ]
      },
      {
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        test: /\.html$/,
        use: "html-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
