/** @format */

// const Plugin1 = require('./plugins/Plugin1');
// const Plugin2 = require('./plugins/Plugin2');
const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin');
module.exports = {
  mode: 'development', // production
  plugins: [
    // new Plugin1()
    // new Plugin2()
    new CopyWebpackPlugin({
      to: '.',
      from: 'public',
      ignore: ['index.html'],
    }),
  ],
};
