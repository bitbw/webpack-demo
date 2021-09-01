/**
 * /*
 *   使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
 *     当你运行 webpack 时，默认查找 webpack.config.js 配置文件
 *     需求：需要运行 webpack.dll.js 文件
 *       --> webpack --config webpack.dll.js
 *
 * @format
 */
// 清理上次的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的 vendor --> MyDll.[name].js  name=vendor
    // ['react',''react-dom'] --> 要打包的库是react  跟包名一致react
    vendor: ['react', 'react-dom'],
  },
  output: {
    // 生成文件名
    filename: '[name].dll.js',
    path: resolve(__dirname, 'dll'),
    // 打包的库里面向外暴露出去的内容叫什么名字（全局变量名） 需要和 webpack.DllPlugin 中的 name 抱持一致
    library: '[name]_[fullhash]_library',
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 打包生成一个 manifest.json --> 提供和react映射 manifest.json中映射library名称
    new webpack.DllPlugin({
      name: '[name]_[fullhash]_library', // 映射库的暴露的内容名称 不用管叫什么 打包后的代码会使用 咱们构建前的代码还是该怎么使就怎么使
      path: resolve(__dirname, 'dll/manifest.json'), // 输出文件路径
    }),
  ],
  mode: 'production',
};
