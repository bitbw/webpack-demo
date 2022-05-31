/** @format */
//  compiler 钩子体验 
class Plugin1 {
  //  Plugin 添加订阅(tap) 由 webpack 调用 (call)
  apply(compiler) {
    // emit extends AsyncSeriesHook
    compiler.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('emit1 执行了');
        cb();
      }, 1000);
    });
    compiler.hooks.emit.tapPromise('Plugin1', (compilation, cb) => {
      return new Promise((resole, reject) => {
        setTimeout(() => {
          console.log('emit2 执行了');
          resole();
        }, 1000);
      });
    });
  }
}

module.exports = Plugin1;
