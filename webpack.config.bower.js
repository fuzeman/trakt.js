var merge = require('merge');

var base = require('./webpack.config.base');

module.exports = merge.recursive(true, base, {
    output: {
        path: __dirname + '/build/bower'
    },

    externals: [
        {'lodash-amd/merge': 'lodash-amd/object/merge'},
        /^[a-z\-0-9\/]+$/
    ]
});
