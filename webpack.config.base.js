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
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],

                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],

                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                'add-module-exports'
                            ],
                            presets: [
                                '@babel/env'
                            ]
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        modules: [
            path.resolve('./node_modules')
        ]
    }
};
