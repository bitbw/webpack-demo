const fs = require('fs').promises;
const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const { transformFromAstAsync } = require('@babel/core');

const parse = {
  async parseAst(filePath) {
    // ./src/index.js 默认在 node 执行目录下找到
    const entryContent = await fs.readFile(filePath, 'utf-8');

    // 解析 ast
    const ast = babelParser.parse(entryContent, {
      sourceType: 'module', // 解析文件的模块化方案是 ES Module
    });

    return ast;
  },
  async getDeps(filePath, ast) {
    // 获取路口路径
    const entryPath = path.dirname(filePath);

    // 定义依赖容器
    const deps = {};

    traverse(ast, {
      // 内部会遍历ast中program.body，判断里面语句类型
      // 如果 type：ImportDeclaration 就会触发当前函数
      ImportDeclaration(specifiers, source) {
        // node 是语法对象
        const node = specifiers.node;
        // node.source.value 就是 `import add from './add.js';`  中的 `'./add.js'`
        const relativePath = node.source.value;
        // 拼为绝对路径 node执行目录/src/add.js
        const absolutePath = path.resolve(entryPath, relativePath);
        // 收集依赖
        deps[relativePath] = absolutePath;
      },
    });

    return deps;
  },
  async transform(ast) {
    // 将 ast 转化为浏览器可识别的代码
    /* 
    "use strict";

    var _add = _interopRequireDefault(require("./add.js"));

    var _count = _interopRequireDefault(require("./count.js"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    console.log((0, _add.default)(1, 2));
    console.log((0, _count.default)(3, 1));
    
    */
    const { code } = await transformFromAstAsync(ast, null, {
      presets: ['@babel/preset-env'],
    });
    return code;
  },
};

module.exports = parse;
