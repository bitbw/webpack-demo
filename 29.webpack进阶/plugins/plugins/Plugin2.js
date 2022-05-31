/** @format */
//  Compiler 模块是 webpack 的主要引擎，它通过 CLI 或者 Node API 传递的所有选项创建出一个 compilation 实例。
// 理解 ： webpack 打包过程中会创建一个 Compiler ，  Compiler 的各个生命周期会创建不同的 compilation 实例
// Compiler下一个生命周期会基于上一个生命周期的 compilation 创建新的 compilation
// compilation 是对实际资源的操作对象
const fs = require('fs');
const path = require('path');
const util = require('util');
// 基于 promise 的 readFile
const readFile = util.promisify(fs.readFile);
const webpack = require('webpack');
//  RawSource 接受一个 buf | str  返回  sources 对象
const { RawSource } = webpack.sources;
// Source 类型
// declare class Source {
// 	constructor();
// 	size(): number;
// 	map(options?: MapOptions): Object;
// 	sourceAndMap(options?: MapOptions): { source: string | Buffer; map: Object };
// 	updateHash(hash: Hash): void;
// 	source(): string | Buffer;
// 	buffer(): Buffer;
// }
class Plugin2 {
  apply(compiler) {
    // thisCompilation extends SyncHook   thisCompilation 相当于 vue 的 created ,compilation 刚刚初始化
    compiler.hooks.thisCompilation.tap('Plugin2', (compilation) => {
      console.log('=========thisCompilation');
      // additionalAssets extends AsyncSeriesHook 为 compilation 创建额外 asset
      compilation.hooks.additionalAssets.tapPromise('Plugin2', async () => {
        console.log('============additionalAssets');
        // compilation.assets 所有输出的资源集合 键值对 { key : 文件名 ,value :sources 对象 }
        let content = 'hello a.txt ';
        // 模拟 Source 类型
        let sources = {
          size() {
            return content.length;
          },
          source() {
            return content;
          },
        };
        // 第一中添加资源的方式 直接 key = value
        compilation.assets['a.txt'] = sources;
        let buf = await readFile(path.resolve(__dirname, '../assets/b.txt'));
        // RawSource 将 buf 转化为 Source
        sources = new RawSource(buf);
        // 第二种添加资源的方式 使用 emitAsset 方法
        compilation.emitAsset('b.txt', sources);
      });
    });
  }
}

module.exports = Plugin2;
