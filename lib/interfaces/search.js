'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('../core/helpers');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchInterface = function (_Interface) {
    _inherits(SearchInterface, _Interface);

    function SearchInterface() {
        _classCallCheck(this, SearchInterface);

        return _possibleConstructorReturn(this, (SearchInterface.__proto__ || Object.getPrototypeOf(SearchInterface)).apply(this, arguments));
    }

    _createClass(SearchInterface, [{
        key: 'lookup',
        value: function lookup(type, id, options) {
            if (!(0, _helpers.isDefined)(type)) {
                throw new Error('Invalid value provided for the "type" parameter');
            }

            if (!(0, _helpers.isDefined)(id)) {
                throw new Error('Invalid value provided for the "id" parameter');
            }

            return this.http.get('search', _extends({}, options, {
                params: {
                    'id_type': type,
                    'id': id
                }
            }));
        }
    }, {
        key: 'query',
        value: function query(_query, type, year, options) {
            if (!(0, _helpers.isDefined)(_query)) {
                throw new Error('Invalid value provided for the "query" parameter');
            }

            return this.http.get('search', _extends({}, options, {
                params: {
                    'query': _query,
                    'type': type,
                    'year': year
                }
            }));
        }
    }]);

    return SearchInterface;
}(_base2.default);

exports.default = SearchInterface;
module.exports = exports['default'];
//# sourceMappingURL=search.js.map
