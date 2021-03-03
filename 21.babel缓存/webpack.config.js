/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
        问题: 因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样    
      --> 让代码上线运行缓存更好使用
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
              // 缓存文件会放在 node_modules\.cache\babel-loader中
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
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      `...`,
      // 压缩css
      new CssMinimizerPlugin()
    ]
  }
};
