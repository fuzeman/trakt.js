'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchInterface = exports.ScrobbleInterface = exports.OAuthInterface = exports.UserSettingsInterface = undefined;

var _settings = require('./users/settings');

var _settings2 = _interopRequireDefault(_settings);

var _oauth = require('./oauth');

var _oauth2 = _interopRequireDefault(_oauth);

var _scrobble = require('./scrobble');

var _scrobble2 = _interopRequireDefault(_scrobble);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.UserSettingsInterface = _settings2.default;
exports.OAuthInterface = _oauth2.default;
exports.ScrobbleInterface = _scrobble2.default;
exports.SearchInterface = _search2.default;
exports.default = {
    users: {
        settings: _settings2.default
    },

    oauth: _oauth2.default,
    scrobble: _scrobble2.default,
    search: _search2.default
};
//# sourceMappingURL=index.js.map
