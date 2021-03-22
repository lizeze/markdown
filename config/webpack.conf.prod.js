const merge = require('webpack-merge');
const common = require('./webpack.config.js');
let devConfig = {
    mode: "production"
};
module.exports = merge.merge(common, devConfig);