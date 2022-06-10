const { webpack } = require('../lib/webpack');

const config = require('../config/webpack.config');

const complier = webpack(config);

complier.run();
