import merge from 'lodash-amd/merge';


export function isDefined(value) {
    return typeof value !== 'undefined' && value !== null;
}

export function isFunction(value) {
    return isDefined(value) && ({}).toString.call(value) === '[object Function]';
}

export function isString(value) {
    return isDefined(value) && ({}).toString.call(value) === '[object String]';
}

export function setDefaults(value, defaults) {
    if(!isDefined(value)) {
        return defaults;
    }

    return merge({}, defaults, value);
}
