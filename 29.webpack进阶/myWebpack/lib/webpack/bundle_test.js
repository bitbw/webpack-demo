// 代码形式展示
let depsGraph = {
  './src/index.js': {
    deps: {
      './add.js':
        'C:\\test\\my-webpack\\webpack-demo\\29.webpack进阶\\myWebpack\\src\\add.js',
      './count.js':
        'C:\\test\\my-webpack\\webpack-demo\\29.webpack进阶\\myWebpack\\src\\count.js',
    },
    code: '"use strict";\n\nvar _add = _interopRequireDefault(require("./add.js"));\n\nvar _count = _interopRequireDefault(require("./count.js"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconsole.log((0, _add.default)(1, 2));\nconsole.log((0, _count.default)(3, 1));',
    filePath: './src/index.js',
  },
  'C:\\test\\my-webpack\\webpack-demo\\29.webpack进阶\\myWebpack\\src\\add.js':
    {
      deps: {},
      code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.default = void 0;\n\nfunction add(x, y) {\n  return x + y;\n}\n\nvar _default = add;\nexports.default = _default;',
      filePath:
        'C:\\test\\my-webpack\\webpack-demo\\29.webpack进阶\\myWebpack\\src\\add.js',
    },
  'C:\\test\\my-webpack\\webpack-demo\\29.webpack进阶\\myWebpack\\src\\count.js':
    {
      deps: {},
      code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.default = void 0;\n\nfunction count(x, y) {\n  return x - y;\n}\n\nvar _default = count;\nexports.default = _default;',
      filePath:
        'C:\\test\\my-webpack\\webpack-demo\\29.webpack进阶\\myWebpack\\src\\count.js',
    },
};


(function (depsGraph) {
  // 这个作为上级作用域的  require  主要作用执行 code
  function require(absolutePath) {
    // 这个作为 code 中的 require 函数
    function loacalRequire(relativePath) {
      //  code 中的 require 执行时传入的是相对路径 ，找到对应父文件的依赖中对应的绝对路径
      let childAbsolutePath = depsGraph[absolutePath].deps[relativePath];
      //   执行code
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
    return exports;
  }
  // 传入入口路径
  require('./src/index.js');
})(depsGraph);
