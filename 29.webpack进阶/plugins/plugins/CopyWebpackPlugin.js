const { validate } = require('schema-utils');
const schema = require('./schema').CopyWebpackPlugin;
const globby = require('globby');
const path = require('path');
const { readFile } = require('fs').promises;
const { RawSource } = require('webpack').sources;

class CopyWebpackPlugin {
  constructor(options) {
    console.log(
      'Bowen ~ file: CopyWebpackPlugin.js ~ line 10 ~ CopyWebpackPlugin ~ constructor ~ options',
      options,
    );
    this.options = options;
    validate(schema, options);
    this.compiler = null;
    this.compilation = null;
  }

  apply(compiler) {
    // compiler  初始化 compilation
    this.compiler = compiler;
    compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
      this.compilation = compilation;
      // 为 compilation 创建额外 asset
      compilation.hooks.additionalAssets.tapPromise(
        'CopyWebpackPlugin',
        this.hanleCopy.bind(this),
      );
    });
  }
  async hanleCopy() {
    debugger;
    let { from, ignore, to = '.' } = this.options;
    console.log('Bowen: CopyWebpackPlugin -> hanleCopy -> from', from);
    console.log(
      'Bowen ~ file: CopyWebpackPlugin.js ~ line 35 ~ CopyWebpackPlugin ~ hanleCopy ~ to',
      to,
    );
    const context = this.compiler.options.context; // process.cwd()
    console.log(
      'Bowen ~ file: CopyWebpackPlugin.js ~ line 30 ~ CopyWebpackPlugin ~ hanleCopy ~ process.cwd()',
      process.cwd(),
    );
    console.log(
      'Bowen ~ file: CopyWebpackPlugin.js ~ line 29 ~ CopyWebpackPlugin ~ hanleCopy ~ context',
      context,
    );
    // 判断是 from 否为绝对路径
    from = path.isAbsolute(from) ? from : path.resolve(process.cwd(), from);
    // window 下有路径问题
    from = from.replace(/\\/g, '/');
    // 1. 获取 from 文件列表
    let files = await globby(from, {
      ignore,
    });
    console.log('Bowen: CopyWebpackPlugin -> hanleCopy -> files', files);
    for (const file of files) {
      // 2. 读取文件
      let filename = path.join(to, path.basename(file));
      let buf = await readFile(file);
      // 3. 写入文件
      let source = new RawSource(buf);
      this.compilation.emitAsset(filename, source);
    }
  }
}

module.exports = CopyWebpackPlugin;
