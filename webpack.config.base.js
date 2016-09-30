var path = require('path');


module.exports = {
    devtool: 'source-map',

    entry: [
        'whatwg-fetch',
        __dirname + '/src/index.js'
    ],

    output: {
        filename: 'trakt.js',

        library: 'trakt',
        libraryTarget: 'umd',

        devtoolModuleFilenameTemplate: '[resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]'
    },

    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                include: [
                    path.resolve(__dirname, 'node_modules/lodash-es'),
                    path.resolve(__dirname, 'src')
                ]
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js'],

        alias: {}
    },

    externals: [],
    plugins: []
};
