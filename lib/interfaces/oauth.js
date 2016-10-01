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

var OAuthInterface = function (_Interface) {
    _inherits(OAuthInterface, _Interface);

    function OAuthInterface() {
        _classCallCheck(this, OAuthInterface);

        return _possibleConstructorReturn(this, (OAuthInterface.__proto__ || Object.getPrototypeOf(OAuthInterface)).apply(this, arguments));
    }

    _createClass(OAuthInterface, [{
        key: 'authorizeUrl',
        value: function authorizeUrl(redirectUri, state) {
            if (!(0, _helpers.isDefined)(this._client.key)) {
                throw new Error('Missing required client "key" parameter');
            }

            return this._client.siteUrl + 'oauth/authorize?' + this.http.encodeParameters({
                'client_id': this._client.key,

                'response_type': 'code',
                'redirect_uri': (0, _helpers.isDefined)(redirectUri) ? redirectUri : 'urn:ietf:wg:oauth:2.0:oob',
                'state': state
            });
        }
    }, {
        key: 'exchange',
        value: function exchange(code, redirectUri, options) {
            if (!(0, _helpers.isDefined)(this._client.key)) {
                throw new Error('Missing required client "key" parameter');
            }

            if (!(0, _helpers.isDefined)(this._client.secret)) {
                throw new Error('Missing required client "secret" parameter');
            }

            if (!(0, _helpers.isDefined)(code)) {
                throw new Error('Invalid value provided for the "code" parameter');
            }

            if (!(0, _helpers.isDefined)(redirectUri)) {
                redirectUri = 'urn:ietf:wg:oauth:2.0:oob';
            }

            return this.http.post('oauth/token', _extends({}, options, {
                body: {
                    'client_id': this._client.key,
                    'client_secret': this._client.secret,

                    'code': code,
                    'redirect_uri': redirectUri,
                    'grant_type': 'authorization_code'
                }
            })).then(function (session) {
                if (!(0, _helpers.isDefined)(session)) {
                    return session;
                }

                session['redirect_uri'] = redirectUri;
                return session;
            });
        }
    }, {
        key: 'refresh',
        value: function refresh(refreshToken, redirectUri, options) {
            if (!(0, _helpers.isDefined)(this._client.key)) {
                throw new Error('Missing required client "key" parameter');
            }

            if (!(0, _helpers.isDefined)(this._client.secret)) {
                throw new Error('Missing required client "secret" parameter');
            }

            if (!(0, _helpers.isDefined)(refreshToken)) {
                throw new Error('Invalid value provided for the "code" parameter');
            }

            return this.http.post('oauth/token', _extends({}, options, {
                body: {
                    'client_id': this._client.key,
                    'client_secret': this._client.secret,

                    'refresh_token': refreshToken,
                    'redirect_uri': (0, _helpers.isDefined)(redirectUri) ? redirectUri : 'urn:ietf:wg:oauth:2.0:oob',
                    'grant_type': 'refresh_token'
                }
            }));
        }
    }]);

    return OAuthInterface;
}(_base2.default);

exports.default = OAuthInterface;
module.exports = exports['default'];
//# sourceMappingURL=oauth.js.map
