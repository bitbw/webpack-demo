
/*
  tree shaking：去除无用代码
    前提：1. 必须使用ES6模块化  2. 开启production环境
    作用: 减少代码体积

    在package.json中配置 
      "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
        问题：可能会把css / @babel/polyfill （副作用）文件干掉
      "sideEffects": ["*.css", "*.less"]
*/
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清理上次的打包文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 提取css文件为单独资源
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// eslint
const ESLintPlugin = require("eslint-webpack-plugin");
// 公共样式 loader
const styleCommonLodar = [
  {
    loader: MiniCssExtractPlugin.loader,
    // 单独设置 相对与css文件的公共路径
    options: {
      publicPath: "../"
    }
  },
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          [
            "postcss-preset-env",
            {
              // Options
            }
          ]
          // 或者 require("postcss-preset-env")()
        ]
      }
    }
  }
];
// 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/bundle.[contenthash:10].js",
    path: resolve(__dirname, "dist"),
    // 相当于与 index.html 文件的公共路径
    publicPath: "./"
  },
  mode: "production",
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: styleCommonLodar
          },
          {
            test: /\.less$/,
            use: [...styleCommonLodar, "less-loader"]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
              rootMode: "upward" // 需要配置 rootMode: "upward" 意思是向上查找 找到 babel.config.[json | js]
            }
          },
          // 处理图片资源
          {
            test: /\.(jpg|png|gif)$/,
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              name: "[hash:10].[ext]",
              // 关闭es6模块化
              // esModule: false,
              outputPath: "assets/img"
            }
          },
          // 处理html中img资源
          {
            test: /\.html$/,
            loader: "html-loader"
          },
          // 处理其他资源
          {
            exclude: /\.(html|js|css|less|jpg|png|gif)/,
            loader: "file-loader",
            options: {
              name: "[hash:10].[ext]",
              outputPath: "assets/font"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    //  单独css文件, 对输出的css文件进行重命名
    new MiniCssExtractPlugin({
      filename: "css/index.[contenthash:10].css"
    }),
    new CleanWebpackPlugin(),
    // eslint
    // 当前工作目录下添加 .eslintignore 文件用于排除文件
    new ESLintPlugin({
      // 格式化
      fix: true
    })
  ],
  optimization: {
    // 压缩
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      `...`,
      // 压缩css
      new CssMinimizerPlugin()
    ],
    // 代码块 切割
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'source-map'
};
