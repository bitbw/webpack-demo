module.exports = {
  CopyWebpackPlugin: {
    type: 'object', // options 类型
    properties: {
      to: {
        type: 'string',
      },
      from: {
        type: 'string',
      },
      ignore: {
        type: 'array',
      },
    },
    additionalProperties: false, // 可以添加更多key
  },
};
