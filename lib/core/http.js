'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

var _merge = require('lodash-amd/merge');

var _merge2 = _interopRequireDefault(_merge);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpClient = function () {
    function HttpClient(client, baseUrl) {
        _classCallCheck(this, HttpClient);

        this._client = client;
        this._baseUrl = baseUrl || 'https://api.trakt.tv/';
    }

    _createClass(HttpClient, [{
        key: 'get',
        value: function get(path, options) {
            return this.request('GET', path, options);
        }
    }, {
        key: 'post',
        value: function post(path, options) {
            return this.request('POST', path, options);
        }
    }, {
        key: 'request',
        value: function request(method, path, options) {
            options = (0, _merge2.default)({
                headers: {},
                params: {},

                body: null,
                bodyType: 'json',

                authenticated: false,
                sessionKey: this._client.getSessionKey()
            }, options || {});

            // Set request headers
            options.headers['trakt-api-key'] = this._client.key;
            options.headers['trakt-api-version'] = 2;

            if (options.authenticated) {
                // Add session key
                if (!(0, _helpers.isDefined)(options.sessionKey)) {
                    throw new Error('Missing required "sessionKey" parameter');
                }

                options.headers['Authorization'] = 'Bearer ' + this._client.session.access_token;
            }

            // Process body
            if ((0, _helpers.isDefined)(options.body)) {
                // Encode body as `bodyType`
                if (options.bodyType === 'json') {
                    options.body = JSON.stringify(options.body);
                    options.headers['Content-Type'] = 'application/json';
                } else {
                    throw new Error('Invalid "bodyType" provided: "' + options.bodyType + '"');
                }
            }

            // Send request
            return fetch(this._baseUrl + path + '?' + this.encodeParameters(options.params), {
                method: method,
                headers: options.headers,
                body: options.body
            }).then(function (response) {
                // TODO check status code
                return response.json();
            });
        }
    }, {
        key: 'encodeParameters',
        value: function encodeParameters(parameters) {
            // Remove undefined parameters
            Object.keys(parameters).forEach(function (key) {
                if (typeof parameters[key] === 'undefined') {
                    delete parameters[key];
                }
            });

            // Encode parameters to string
            return _querystring2.default.encode(parameters);
        }
    }, {
        key: 'baseUrl',
        get: function get() {
            return this._baseUrl;
        }
    }]);

    return HttpClient;
}();

exports.default = HttpClient;
module.exports = exports['default'];
//# sourceMappingURL=http.js.map
