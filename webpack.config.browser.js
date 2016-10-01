import Base from './webpack.config.base';

export default {
    ...Base,

    output: {
        ...Base.output,
        path: __dirname + '/build/browser'
    }
};
