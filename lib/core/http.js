"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge = _interopRequireDefault(require("lodash-amd/merge"));

var _querystring = _interopRequireDefault(require("querystring"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HttpClient =
/*#__PURE__*/
function () {
  function HttpClient(client, baseUrl) {
    _classCallCheck(this, HttpClient);

    this._client = client;
    this._baseUrl = baseUrl || 'https://api.trakt.tv/';
  }

  _createClass(HttpClient, [{
    key: "get",
    value: function get(path, options) {
      return this.request('GET', path, options);
    }
  }, {
    key: "post",
    value: function post(path, options) {
      return this.request('POST', path, options);
    }
  }, {
    key: "request",
    value: function request(method, path, options) {
      var _this = this;

      options = (0, _merge.default)({
        headers: {},
        params: {},
        // Body
        body: null,
        bodyType: 'json',
        // Authentication
        authenticated: false,
        session: null,
        // Application
        application: null,
        includeAppParameters: false
      }, options || {});

      if (!(0, _helpers.isDefined)(options.application)) {
        options.application = this._client.application;
      } // Set request headers


      options.headers['trakt-api-key'] = this._client.key;
      options.headers['trakt-api-version'] = 2; // Authentication

      if (options.authenticated) {
        if (!(0, _helpers.isDefined)(options.session)) {
          // Retrieve current client session
          return this._client.getSession().then(function (session) {
            if (!(0, _helpers.isDefined)(session)) {
              // Invalid session returned
              return Promise.reject(new Error('Authentication required, but an invalid session was returned'));
            } // Fire request with `session`


            return _this.request(method, path, _extends({}, options, {
              session: session
            }));
          }, function (error) {
            // No session available
            return Promise.reject(new Error('Authentication required, but no session is available (error: ' + error.message + ')'));
          });
        } // Validate session


        if (!(0, _helpers.isDefined)(options.session.access_token)) {
          return Promise.reject(new Error('Invalid session provided, expected an object with the "access_token" property'));
        } // Set authorization header


        options.headers['Authorization'] = 'Bearer ' + options.session.access_token;
      } // Application metadata


      if (!(0, _helpers.isDefined)(options.application)) {
        options.application = {
          name: 'trakt.js',
          version: this._client.build.version,
          date: this._client.build.date
        };
      } // Application parameters


      if (options.includeAppParameters === true) {
        // Validate request method
        if (method !== 'POST') {
          return Promise.reject(new Error('"includeAppParameters" can only be used with POST requests'));
        } // Version


        if ((0, _helpers.isDefined)(options.application.version)) {
          options.body['app_version'] = options.application.version;
        } // Date


        if ((0, _helpers.isDefined)(options.application.date)) {
          options.body['app_date'] = options.application.date;
        }
      } // User Agent


      options.headers['User-Agent'] = this._buildUserAgent(options.application); // Process body

      if ((0, _helpers.isDefined)(options.body)) {
        // Encode body as `bodyType`
        if (options.bodyType === 'json') {
          options.body = JSON.stringify(options.body);
          options.headers['Content-Type'] = 'application/json';
        } else {
          throw new Error('Invalid "bodyType" provided: "' + options.bodyType + '"');
        }
      }

      if (this._client.debug) {
        console.debug('[trakt.js] %s %o (options: %O)', method, path, options);
      } // Send request


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
    key: "encodeParameters",
    value: function encodeParameters(parameters) {
      // Remove undefined parameters
      Object.keys(parameters).forEach(function (key) {
        if (typeof parameters[key] === 'undefined') {
          delete parameters[key];
        }
      }); // Encode parameters to string

      return _querystring.default.encode(parameters);
    }
  }, {
    key: "_buildUserAgent",
    value: function _buildUserAgent(application) {
      var result = ''; // Add application name (or "Unknown")

      if ((0, _helpers.isDefined)(application.name)) {
        result += application.name;
      } else {
        result += 'Unknown';
      } // Add fragments (version, date)


      var fragments = [application.version, application.date].filter(function (fragment) {
        return (0, _helpers.isDefined)(fragment);
      });

      if (fragments.length < 1) {
        return result;
      }

      return result + ' (' + fragments.join('; ') + ')';
    }
  }, {
    key: "baseUrl",
    get: function get() {
      return this._baseUrl;
    }
  }]);

  return HttpClient;
}();

exports.default = HttpClient;
module.exports = exports["default"];
//# sourceMappingURL=http.js.map
