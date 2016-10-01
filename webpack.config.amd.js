import Base from './webpack.config.base';

export default {
    ...Base,

    output: {
        ...Base.output,
        path: __dirname + '/build/amd'
    },

    externals: [
        /^[a-z\-0-9\/]+$/,
        ...Base.externals
    ]
};
