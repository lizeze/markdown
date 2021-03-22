const merge = require('webpack-merge');
const common = require('./webpack.config.js');
let devConfig = {
    mode: "development",
    devtool: 'source-map',
};
module.exports = merge.merge(common, devConfig);