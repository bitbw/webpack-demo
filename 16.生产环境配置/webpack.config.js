const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/bundle.js",
    path: resolve(__dirname, "dist"),
    // 相当于与 index.html 文件的公共路径
    publicPath: "./"
  },
  mode: "production",
  module: {
    rules: [
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    // 对输出的css文件进行重命名
    new MiniCssExtractPlugin({
      filename: "css/index.css"
    }),
    new CleanWebpackPlugin(),
    // eslint
    new ESLintPlugin({
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
