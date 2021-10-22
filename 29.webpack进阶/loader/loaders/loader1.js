/** @format */

module.exports = function (content, map, meta) {
  console.log('loader111');
  const res = `${content} console.log('loader111');`;
  // callback 接收 error ,content, map, meta
  this.callback(null, content, map, meta);
  // return res;
};

module.exports.pitch = function () {
  console.log('pitch111');
};
