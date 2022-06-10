const Complier = require('./Complier');

const webpack = (config) => {
  const complier = new Complier(config);
  return complier;
};

module.exports = {
  webpack,
};
