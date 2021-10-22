/** @format */

const util = require('util');
const fs = require('fs');
const path = require('path');
/**
 * @description:  同 util.promisify promisify 接收一个 最后一个参数是回调函数的函数 , 将其转化为 promise 形式
 * @param {*} fn
 * @return {*}
 */
function promisify(fn) {
  return function (...arg) {
    return new Promise((res, rej) => {
      function callback(err, ...arg) {
        if (err) rej(err);
        else res(...arg);
      }
      fn.apply(null, [...arg, callback]);
    });
  };
}

// const read = util.promisify(fs.readFile);
const read = promisify(fs.readFile);
// test
async function readFile(filePath) {
  const file = await read(filePath, 'utf-8').catch((err) =>
    console.log('readFile err', err),
  );
  console.log('Bowen: readFile -> file', file);
  return file;
}
// readFile(path.resolve(__dirname, 'schema.js'));

module.exports = promisify;
