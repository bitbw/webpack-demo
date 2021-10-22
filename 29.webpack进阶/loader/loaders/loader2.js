/** @format */

module.exports = function (content, map, meta) {
  console.log('loader222');
  const res = `${content} console.log('loader222');`;
  let callback = this.async();
  setTimeout(() => {
    callback(null, res);
  }, 1000);
};

module.exports.pitch = function () {
  console.log('pitch222');
};
