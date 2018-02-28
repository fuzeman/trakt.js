"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UserSettingsInterface", {
  enumerable: true,
  get: function get() {
    return _settings.default;
  }
});
Object.defineProperty(exports, "OAuthInterface", {
  enumerable: true,
  get: function get() {
    return _oauth.default;
  }
});
Object.defineProperty(exports, "ScrobbleInterface", {
  enumerable: true,
  get: function get() {
    return _scrobble.default;
  }
});
Object.defineProperty(exports, "SearchInterface", {
  enumerable: true,
  get: function get() {
    return _search.default;
  }
});
exports.default = void 0;

var _settings = _interopRequireDefault(require("./users/settings"));

var _oauth = _interopRequireDefault(require("./oauth"));

var _scrobble = _interopRequireDefault(require("./scrobble"));

var _search = _interopRequireDefault(require("./search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  users: {
    settings: _settings.default
  },
  oauth: _oauth.default,
  scrobble: _scrobble.default,
  search: _search.default
};
exports.default = _default;
//# sourceMappingURL=index.js.map
