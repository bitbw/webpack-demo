/** @format */

module.exports = {
  loder3: {
    type: 'object', // options 类型
    properties: {
      name: {
        type: 'string',
        description: '名称～', // 描述
      },
      test: {
        type: 'number',
        description: 'tset',
      },
    },
    additionalProperties: true, // 可以添加更多key
  },
  babel: {
    type: 'object', // options 类型
    properties: {
      presets: {
        type: 'array',
      },
    },
    additionalProperties: true, // 可以添加更多key
  },
};
