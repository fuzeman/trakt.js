"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = exports.RefreshDisableAt = exports.RefreshAt = exports.Build = void 0;

var _helpers = require("./core/helpers");

var _http = _interopRequireDefault(require("./core/http"));

var _interfaces = _interopRequireDefault(require("./interfaces"));

var _base = _interopRequireDefault(require("./interfaces/base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Build = {
  Version: '2.0.0-alpha.2',
  Date: '2016-10-01'
};
exports.Build = Build;
var RefreshAt = 7 * 24 * 60 * 60; // Refresh token one week before expiry

exports.RefreshAt = RefreshAt;
var RefreshDisableAt = -28 * 24 * 60 * 60; // Disable refresh attempts after four weeks
// Validate environment

exports.RefreshDisableAt = RefreshDisableAt;

if (!(0, _helpers.isDefined)(fetch)) {
  console.error('"fetch" is not available, include whatwg-fetch to support this environment');
}

if (!(0, _helpers.isDefined)(Promise)) {
  console.error('"Promise" is not available, include babel-polyfill to support this environment');
}

var Client =
/*#__PURE__*/
function () {
  function Client(key, secret, options) {
    _classCallCheck(this, Client);

    options = (0, _helpers.setDefaults)(options, {
      application: {
        name: 'trakt.js',
        version: Build.Version,
        date: Build.Date
      },
      debug: false,
      session: null,
      sessionKey: null,
      onSessionRefreshed: null
    }); // Application keys

    this.key = key || null;
    this.secret = secret || null; // Session

    this.session = null;

    if ((0, _helpers.isDefined)(options.session)) {
      this.session = options.session;
    } else if ((0, _helpers.isDefined)(options.sessionKey)) {
      this.session = {
        key: options.sessionKey
      };
    } // Callbacks


    this.onSessionRefreshed = options.onSessionRefreshed; // Public variables

    this.application = options.application;
    this.build = Build;
    this.debug = options.debug;
    this.http = null; // Private variables

    this._initialized = false;
    this._interfaces = {};
    this._refreshing = Promise.resolve(); // Initialize client

    this.initialize();
  }

  _createClass(Client, [{
    key: "initialize",
    value: function initialize() {
      if (this._initialized) {
        return;
      } // Construct http client


      this.http = new _http.default(this); // Construct interfaces

      this._interfaces = this._constructInterfaces(_interfaces.default); // Mark client as initialized

      this._initialized = true;
    }
  }, {
    key: "getSession",
    // endregion
    // region Public methods
    value: function getSession(options) {
      var _this = this;

      options = (0, _helpers.setDefaults)(options, {
        refresh: true
      });
      return this._refreshing.then(function () {
        var session = _this.session;

        if (!(0, _helpers.isDefined)(session)) {
          return Promise.reject(new Error('No session available'));
        }

        if ((0, _helpers.isFunction)(session)) {
          session = session();
        } // Resolve session


        return Promise.resolve(session).then(function (session) {
          if (!(0, _helpers.isDefined)(session)) {
            return Promise.reject(new Error('No session available'));
          }

          if (!(0, _helpers.isDefined)(session.created_at) || !(0, _helpers.isDefined)(session.expires_in)) {
            console.warn('Missing session expiry properties, unable to determine session validity');
          } // Calculate seconds to/since session expire time


          var rem = Math.round(session.created_at + session.expires_in - Date.now() / 1000);

          if (rem > RefreshAt) {
            // Ensure the "onSessionRefreshed" callback has been defined
            if (!(0, _helpers.isDefined)(_this.onSessionRefreshed)) {
              console.warn('onSessionRefreshed callback hasn\'t been implemented, session will expire in %d second(s)', Math.round(rem));
            }
          } else {
            if (rem < RefreshDisableAt) {
              // Session has expired, and no `onSessionRefreshed` callback has been defined
              return Promise.reject(new Error('Session expired ' + Math.round(Math.abs(rem)) + ' second(s) ago'));
            }

            if (!(0, _helpers.isDefined)(_this.onSessionRefreshed)) {
              if (rem < 0) {
                // Session has expired
                return Promise.reject(new Error('Session expired ' + Math.round(Math.abs(rem)) + ' second(s) ago'));
              }

              console.warn('onSessionRefreshed callback hasn\'t been implemented, unable to refresh session');
              return session;
            }

            if (rem < 0) {
              // Session has expired, and no `onSessionRefreshed` callback has been defined
              console.warn('Session expired ' + Math.round(Math.abs(rem)) + ' second(s) ago');
            }

            if (!options.refresh) {
              console.warn('Token refresh has been disabled');
              return session;
            } // Refresh authentication token


            _this._refreshing = _this._refreshSession(session); // Wait for token to refresh, then try retrieve the session again

            return _this._refreshing.then(function () {
              return _this.getSession({
                refresh: false
              });
            });
          } // Return current session


          return session;
        });
      });
    } // endregion
    // region Private methods

  }, {
    key: "_constructInterfaces",
    value: function _constructInterfaces(interfaces) {
      var _this2 = this;

      var result = {};
      var value;
      Object.keys(interfaces).forEach(function (key) {
        value = interfaces[key];

        if (value.prototype instanceof _base.default) {
          result[key] = new value(_this2); // eslint-disable-line new-cap
        } else {
          result[key] = _this2._constructInterfaces(value);
        }
      });
      return result;
    }
  }, {
    key: "_refreshSession",
    value: function _refreshSession(session) {
      var _this3 = this;

      if (!(0, _helpers.isDefined)(session) || !(0, _helpers.isDefined)(session.refresh_token)) {
        // Unable to refresh session
        return Promise.reject(new Error('Unable to refresh session, no "refresh_token" property is available'));
      }

      if (!(0, _helpers.isDefined)(session.redirect_uri)) {
        console.warn('Session has no "redirect_uri" property, defaulting to "urn:ietf:wg:oauth:2.0:oob"');
      }

      if (!(0, _helpers.isDefined)(this.onSessionRefreshed)) {
        return Promise.reject(new Error('Unable to refresh session, onSessionRefreshed callback hasn\'t been implemented'));
      } // Refresh session


      return this.oauth.refresh(session.refresh_token, session.redirect_uri).then(function (session) {
        if (!(0, _helpers.isDefined)(_this3.onSessionRefreshed)) {
          return;
        } // Fire "onSessionRefreshed" callback


        _this3.onSessionRefreshed(session);
      }, function (error) {
        console.error('Unable to refresh session:', error.stack);
      });
    } // endregion

  }, {
    key: "siteUrl",
    get: function get() {
      var fragments = this.http.baseUrl.split('://'),
          names = fragments[1].split('.'); // Remove first name ('api' or 'api-v2launch')

      names.shift();
      return [fragments[0], names.join('.')].join('://');
    } // region Interfaces

  }, {
    key: "users",
    get: function get() {
      return this._interfaces['users'];
    }
  }, {
    key: "oauth",
    get: function get() {
      return this._interfaces['oauth'];
    }
  }, {
    key: "scrobble",
    get: function get() {
      return this._interfaces['scrobble'];
    }
  }, {
    key: "search",
    get: function get() {
      return this._interfaces['search'];
    }
  }]);

  return Client;
}();

exports.Client = Client;
//# sourceMappingURL=index.js.map
