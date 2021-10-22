/** @format */

const path = require('path');
module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: ['loader1', 'loader2', 'loader3'],
        // pitch111
        // pitch222
        // pitch333
        // loader333
        // loader222
        // loader111
        // use: [
        // 'loader1',
        // 'loader2',
        // {
        //   loader: 'loader3',
        //   options: {
        //     test: 1,
        //     name: "jack",
        //     age:64
        //   },
        // },
        // ],
        loader: 'babelLoader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
};
