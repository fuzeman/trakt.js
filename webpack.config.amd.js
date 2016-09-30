var merge = require('merge');

var base = require('./webpack.config.base');

module.exports = merge.recursive(true, base, {
    output: {
        path: __dirname + '/build/amd'
    },

    externals: [
        /^[a-z\-0-9\/]+$/
    ]
});