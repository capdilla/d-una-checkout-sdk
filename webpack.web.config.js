const webpackConfig = require('./webpack.config');

module.exports = {
  ...webpackConfig,
  target: 'web'
};
