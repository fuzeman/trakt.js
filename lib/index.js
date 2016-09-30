'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./core/helpers');

var _http = require('./core/http');

var _http2 = _interopRequireDefault(_http);

var _interfaces = require('./interfaces');

var _interfaces2 = _interopRequireDefault(_interfaces);

var _base = require('./interfaces/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
    function Client(key, secret, options) {
        _classCallCheck(this, Client);

        options = (0, _helpers.isDefined)(options) ? options : {};

        this.key = key || null;
        this.secret = secret || null;

        this.session = null;

        if ((0, _helpers.isDefined)(options.session)) {
            this.session = options.session;
        } else if ((0, _helpers.isDefined)(options.sessionKey)) {
            this.session = { key: options.sessionKey };
        }

        // Construct http client
        this.http = new _http2.default(this);

        // Construct interfaces
        this._interfaces = this._constructInterfaces(_interfaces2.default);
    }

    _createClass(Client, [{
        key: 'getSessionKey',
        value: function getSessionKey() {
            if (!(0, _helpers.isDefined)(this.session) || !(0, _helpers.isDefined)(this.session.key)) {
                return null;
            }

            return this.session.key;
        }
    }, {
        key: '_constructInterfaces',
        value: function _constructInterfaces(interfaces) {
            var _this = this;

            var result = {};
            var value;

            Object.keys(interfaces).forEach(function (key) {
                value = interfaces[key];

                if (value.prototype instanceof _base2.default) {
                    result[key] = new value(_this); // eslint-disable-line new-cap
                } else {
                    result[key] = _this._constructInterfaces(value);
                }
            });

            return result;
        }
    }, {
        key: 'siteUrl',
        get: function get() {
            var fragments = this.http.baseUrl.split('://'),
                names = fragments[1].split('.');

            // Remove first name ('api' or 'api-v2launch')
            names.shift();

            return [fragments[0], names.join('.')].join('://');
        }
    }, {
        key: 'users',
        get: function get() {
            return this._interfaces['users'];
        }
    }, {
        key: 'oauth',
        get: function get() {
            return this._interfaces['oauth'];
        }
    }, {
        key: 'scrobble',
        get: function get() {
            return this._interfaces['scrobble'];
        }
    }, {
        key: 'search',
        get: function get() {
            return this._interfaces['search'];
        }
    }]);

    return Client;
}();
//# sourceMappingURL=index.js.map
