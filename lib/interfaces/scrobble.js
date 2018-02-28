"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrobbleInterface =
/*#__PURE__*/
function (_Interface) {
  _inherits(ScrobbleInterface, _Interface);

  function ScrobbleInterface() {
    _classCallCheck(this, ScrobbleInterface);

    return _possibleConstructorReturn(this, (ScrobbleInterface.__proto__ || Object.getPrototypeOf(ScrobbleInterface)).apply(this, arguments));
  }

  _createClass(ScrobbleInterface, [{
    key: "start",
    value: function start(item, progress, options) {
      return this.http.post('scrobble/start', _extends({}, options, {
        authenticated: true,
        includeAppParameters: true,
        body: _extends({}, item, {
          progress: progress
        })
      }));
    }
  }, {
    key: "pause",
    value: function pause(item, progress, options) {
      return this.http.post('scrobble/pause', _extends({}, options, {
        authenticated: true,
        includeAppParameters: true,
        body: _extends({}, item, {
          progress: progress
        })
      }));
    }
  }, {
    key: "stop",
    value: function stop(item, progress, options) {
      return this.http.post('scrobble/stop', _extends({}, options, {
        authenticated: true,
        includeAppParameters: true,
        body: _extends({}, item, {
          progress: progress
        })
      }));
    }
  }]);

  return ScrobbleInterface;
}(_base.default);

exports.default = ScrobbleInterface;
module.exports = exports["default"];
//# sourceMappingURL=scrobble.js.map
