/** @format */
// tabpable 提供一系列创建钩子和调用钩子的方法  （发布者订阅者模式）
const tapable = require('tapable');

const {
  // 同步执行 串行
  SyncHook,
  // 同步执行 串行 遇到返回值 退出执行
  SyncBailHook,
  // 异步并行 并行行1个钩子出错 不影响其他钩子触发
  AsyncParallelHook,
  // 异步串行 串行1个钩子出错 后面的钩子就不再触发
  AsyncSeriesHook,
} = tapable;

class HookTest {
  constructor() {
    this.hooks = {
      // hooks 的容器
      go: new SyncHook(['arg1', 'arg2']), // 参数数组的长度 是 回调函数的所能接受参数的长度
      asyncGo: new AsyncParallelHook(['arg1']),
    };
  }

  //  向容器里添加对应的钩子函数 （添加订阅者）
  tap() {
    // tap  在 go （SyncHook）容器（相当于一个map） 添加键值--- key -> synchook1, value -> 回调函数
    this.hooks.go.tap('synchook1', (...args) => {
      console.log('synchook1 触发了 args:', args);
      return 123;
    });
    this.hooks.go.tap('synchook2', (...args) => {
      console.log('synchook2 触发了 args:', args);
    });
    // tapAsync 添加一个异步执行的函数  函数内部接受一个 callback , callback 调用代表 函数执行完毕
    this.hooks.asyncGo.tapAsync('asynchook1', (...args) => {
      let callback = args[args.length - 1];
      setTimeout(() => {
        console.log('asynchook1 回调异步 触发了 arg1:', args[0]);
        // 异步函数执行完毕 callback 第一参数 是错误
        callback(null, 'asynchook1');
      }, 3000);
    });
    // tapPromise 添加一个异步执行的函数 函数返回一个 promise
    this.hooks.asyncGo.tapPromise('asynchook2', (arg1) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('asynchook2  Promise 异步 触发了 arg1:', arg1);
          // 异步函数执行完毕
          resolve('asynchook2');
        }, 1000);
      });
    });
  }
  //   触发所有钩子中的函数 （发布订阅）
  call() {
    this.hooks.go.call('这是同步钩子调用的参数');
    // 最后一个传入的参数 就是回调函数 callback
    // 当所有 钩子都执行完了,(或有一个出错误时) 就会触发这个 函数
    this.hooks.asyncGo.callAsync('这是异步钩子调用的参数', function (err, res) {
      // 代表所有leave容器中的函数触发完了，才触发
      console.log('异步钩子 end~~~');
    });
  }
}

const test = new HookTest();

test.tap();
test.call();
// 29.webpack进阶/plugins/tapable/tapableUseTest.js

