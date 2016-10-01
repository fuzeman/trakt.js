import path from 'path';

export default {
    devtool: 'source-map',

    entry: [
        __dirname + '/src/index.js'
    ],

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

    output: {
        filename: 'trakt.js',

        library: 'trakt',
        libraryTarget: 'umd',

        devtoolModuleFilenameTemplate: '[resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]'
    },

    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js'],

        alias: {}
    },

    externals: [],
    plugins: []
};
