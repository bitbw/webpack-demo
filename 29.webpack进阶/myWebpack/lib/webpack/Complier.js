/* # Webpack 执行流程

1. 初始化 Compiler：webpack(config) 得到 Compiler 对象
2. 开始编译：调用 Compiler 对象 run 方法开始执行编译
3. 确定入口：根据配置中的 entry 找出所有的入口文件。
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译，再找出该模块依赖的模块，递归直到所有模块被加载进来
5. 完成模块编译： 在经过第 4 步使用 Loader 编译完所有模块后，得到了每个模块被编译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表。（注意：这步是可以修改输出内容的最后机会）
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统 */

const parse = require('./parse');
const fs = require('fs').promises;
const path = require('path');
const { transformAsync } = require('@babel/core');
class Complier {
  constructor(options) {
    this.options = options;
    this.modules = [];
  }
  async run() {
    // parse
    // 找到入口文件 读取解析为 ast
    const { entry: filePath } = this.options;
    // 递归添加到 modules
    await this.deepBuild(filePath);
    // 生成依赖图 对象
    this.depsGraph = {};
    this.modules.forEach((fileModule) => {
      this.depsGraph[fileModule.filePath] = fileModule;
    });
    // 生成文件
    this.generate(this.depsGraph);
  }

  //  递归添加到 modules
  async deepBuild(filePath) {
    const fileModule = await this.build(filePath);
    this.modules.push(fileModule);
    const { deps } = fileModule;
    for (const key of Object.keys(deps)) {
      const absolutePath = deps[key];
      // 递归传入绝对路径
      await this.deepBuild(absolutePath);
    }
  }
  // 接收文件路径 返回 deps, code,  filePath
  async build(filePath) {
    // 获取 ast
    const ast = await parse.parseAst(filePath);
    // 获取依赖
    const deps = await parse.getDeps(filePath, ast);
    // 获取 code
    const code = await parse.transform(ast);

    return {
      deps,
      code,
      filePath,
    };
  }
  async generate(depsGraph) {
    let bundle = `
(function (depsGraph) {
    // 这个作为上级作用域的  require  主要作用执行 code
    function require(absolutePath) {
    // 这个作为 code 中的 require 函数
    function loacalRequire(relativePath) {
        //  code 中的 require 执行时传入的是相对路径 ，找到对应父文件的依赖中对应的绝对路径
        let childAbsolutePath = depsGraph[absolutePath].deps[relativePath];
        //   执行code 将 exports 暴露出去
        return require(childAbsolutePath);
    }
    // 定义暴露对象（将来我们模块要暴露的内容）
    let exports = {};
    // 使用自调用函数形成作用域
    (function (require, exports, code) {
        // 作用域内的   require 是外面传进来的  loacalRequire
        // 执行code   var _add = _interopRequireDefault(require("./add.js")); require -> loacalRequire
        // code 内部会将 需要暴露的对象放到 exports 上 , 在导入的地方使用 require 进行导入
        eval(code);
    })(loacalRequire, exports, depsGraph[absolutePath].code);
    // 暴露对象 
    console.log("exports",exports)
    return exports
    }
    // 传入入口路径
    require('${this.options.entry}');
})(${JSON.stringify(depsGraph)});
    `;
    // 打包优化
    const { code } = await transformAsync(bundle, {
      // sourceMap
      sourceMaps: "both",
      sourceFileName: 'main.map.js',
      sourceRoot: './',
      // 去注释
      comments: false,
      // 去空格
      // compact: true,
      minified: true,
    });
    bundle = code;
    // 生成文件
    const { output } = this.options;
    try {
      await fs.writeFile(path.resolve(output.path, output.filename), bundle);
    } catch (error) {
      console.log('没有对应文件夹 进行创建');
      await fs.mkdir(path.resolve(output.path), {
        recursive: true,
      });
      await fs.writeFile(path.resolve(output.path, output.filename), bundle);
    }
  }
}

module.exports = Complier;
