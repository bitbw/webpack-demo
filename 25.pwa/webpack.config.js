/**
 * /*
 *   PWA: 渐进式网络开发应用程序(离线可访问)
 *     workbox --> workbox-webpack-plugin
 *
 * @format
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理上次的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 提取css文件为单独资源
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// eslint
const ESLintPlugin = require('eslint-webpack-plugin');
// pwa
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// 生成 PWA 的 manifest 文件
const WebpackPwaManifest = require('webpack-pwa-manifest');
// 公共样式 loader
const styleCommonLodar = [
  {
    loader: MiniCssExtractPlugin.loader,
    // 单独设置 相对与css文件的公共路径
    options: {
      publicPath: '../',
    },
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              // Options
            },
          ],
          // 或者 require("postcss-preset-env")()
        ],
      },
    },
  },
];
// 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'dist'),
    // 相当于与 index.html 文件的公共路径
    publicPath: './',
  },
  mode: 'production',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: styleCommonLodar,
          },
          {
            test: /\.less$/,
            use: [...styleCommonLodar, 'less-loader'],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
              rootMode: 'upward', // 需要配置 rootMode: "upward" 意思是向上查找 找到 babel.config.[json | js]
            },
          },
          // 处理图片资源
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              // 关闭es6模块化
              // esModule: false,
              outputPath: 'assets/img',
            },
          },
          // 处理html中img资源
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          // 处理其他资源
          {
            exclude: /\.(html|js|css|less|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'assets/font',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件~
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
    // 生成清单文件 manifest.json  的目的是将Web应用程序安装到设备的主屏幕 谷歌上会提示下载图标
    // https://developer.mozilla.org/zh-CN/docs/Web/Manifest
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      // can be null, use-credentials or anonymous
      crossorigin: 'use-credentials',
      icons: [
        {
          src: resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
        {
          src: resolve('src/assets/icon.png'),
          size: '1024x1024', // you can also use the specifications pattern
        },
        {
          src: resolve('src/assets/icon.png'),
          size: '1024x1024',
          purpose: 'maskable',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    //  单独css文件, 对输出的css文件进行重命名
    new MiniCssExtractPlugin({
      filename: 'css/index.[contenthash:10].css',
    }),
    new CleanWebpackPlugin(),
    // eslint
    // 当前工作目录下添加 .eslintignore 文件用于排除文件
    new ESLintPlugin({
      // 格式化
      fix: true,
    }),
  ],
  optimization: {
    // 压缩
    minimize: true,
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
    ],
    // 代码块 切割
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'source-map',
};
