/*
  tip: webpack 5 需要使用 npm i webpack-dev-server@4.0.0-beta.0
  但是目前4.0.0-beta.0还不完善 文档没有更新 热模块重载不好使
  # 开发环境配置
    HMR: hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块） 
      极大提升构建速度
      
      - 样式文件：可以使用HMR功能：因为style-loader内部实现了~
      - js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
      - html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
        解决：修改entry入口，将html文件引入
      
      ## 各大框架的 loader 内部支持了 HMR 
      - React Hot Loader: 实时调整 react 组件。
      - Vue Loader: 此 loader 支持 vue 组件的 HMR，提供开箱即用体验。
      - Elm Hot webpack Loader: 支持 Elm 编程语言的 HMR。
      - Angular HMR: 没有必要使用 loader！直接修改 NgModule 主文件就够了，
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js','./src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // loader的配置
      {
        // 处理less资源
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块化
          esModule: false,
          outputPath: 'imgs'
        }
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    // plugins的配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true,
    compress: true,
    port: 3000,
    open: true,
  }
};
