import Base from './webpack.config.base';

export default {
    ...Base,

    output: {
        ...Base.output,
        path: __dirname + '/build/bower'
    },

    externals: [
        {'lodash-amd/merge': 'lodash-amd/object/merge'},
        /^[a-z\-0-9\/]+$/,
        ...Base.externals
    ]
};
