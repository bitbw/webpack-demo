/** @format */
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const schema = require('./schema').loder3;
module.exports = function (content, map, meta) {
  console.log('loader333');
  // 获取传来的options
  const options = getOptions(this);
  console.log('options', options);
  // 验证 options
  validate(schema, options, {
    // 自己起名
    name: 'loader333',
  });
  const res = `${content} console.log('loader333');`;
  return res;
};

module.exports.pitch = function () {
  console.log('pitch333');
};
