const { webpack } = require('webpack');

const config = require('../config/webpack.config.js');

const compiler = webpack(config);

compiler.run();
