"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../core/helpers");

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchInterface =
/*#__PURE__*/
function (_Interface) {
  _inherits(SearchInterface, _Interface);

  function SearchInterface() {
    _classCallCheck(this, SearchInterface);

    return _possibleConstructorReturn(this, (SearchInterface.__proto__ || Object.getPrototypeOf(SearchInterface)).apply(this, arguments));
  }

  _createClass(SearchInterface, [{
    key: "lookup",
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
    key: "query",
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
}(_base.default);

exports.default = SearchInterface;
module.exports = exports["default"];
//# sourceMappingURL=search.js.map
