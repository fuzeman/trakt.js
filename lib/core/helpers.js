'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isDefined = isDefined;
exports.isFunction = isFunction;
exports.isString = isString;
exports.setDefaults = setDefaults;

var _merge = require('lodash-amd/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDefined(value) {
    return typeof value !== 'undefined' && value !== null;
}

function isFunction(value) {
    return isDefined(value) && {}.toString.call(value) === '[object Function]';
}

function isString(value) {
    return isDefined(value) && {}.toString.call(value) === '[object String]';
}

function setDefaults(value, defaults) {
    if (!isDefined(value)) {
        return defaults;
    }

    return (0, _merge2.default)({}, defaults, value);
}
//# sourceMappingURL=helpers.js.map
