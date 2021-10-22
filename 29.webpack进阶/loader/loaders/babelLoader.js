/** @format */

const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const bable = require('@babel/core');
const promisify = require('./promisify');
const schema = require('./schema').babel;
// callback -> promise
const transform = promisify(bable.transform);
module.exports = function (content, map, meta) {
  console.log('babelLoader');
  // 获取传来的options
  const options = getOptions(this);
  console.log('options', options);
  // 验证 options
  validate(schema, options, {
    // 自己起名
    name: 'babel Loader',
  });
  const callback = this.async();
  // 使用babel编译代码
  transform(content, options)
    .then((data) => {
      const { code, map } = data;
      console.log('Bowen: data', data);
      callback(null, code, map, meta);
    })
    .catch((e) => callback(e));
};

module.exports.pitch = function () {
  console.log('pitch333');
};
