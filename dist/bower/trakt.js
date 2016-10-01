(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash-amd/object/merge"), require("querystring"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash-amd/object/merge", "querystring"], factory);
	else if(typeof exports === 'object')
		exports["trakt"] = factory(require("lodash-amd/object/merge"), require("querystring"));
	else
		root["trakt"] = factory(root["lodash-amd/object/merge"], root["querystring"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Client = exports.RefreshDisableAt = exports.RefreshAt = exports.Build = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(2);
	
	var _http = __webpack_require__(4);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _interfaces = __webpack_require__(6);
	
	var _interfaces2 = _interopRequireDefault(_interfaces);
	
	var _base = __webpack_require__(8);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Build = exports.Build = {
	    Version: '2.0.0-alpha.2',
	    Date: '2016-10-01'
	};
	
	var RefreshAt = exports.RefreshAt = 7 * 24 * 60 * 60; // Refresh token one week before expiry
	var RefreshDisableAt = exports.RefreshDisableAt = -28 * 24 * 60 * 60; // Disable refresh attempts after four weeks
	
	// Validate environment
	if (!(0, _helpers.isDefined)(fetch)) {
	    console.error('"fetch" is not available, include whatwg-fetch to support this environment');
	}
	
	if (!(0, _helpers.isDefined)(Promise)) {
	    console.error('"Promise" is not available, include babel-polyfill to support this environment');
	}
	
	var Client = exports.Client = function () {
	    function Client(key, secret, options) {
	        _classCallCheck(this, Client);
	
	        options = (0, _helpers.setDefaults)(options, {
	            debug: false,
	
	            onSessionRefreshed: null,
	
	            session: null,
	            sessionKey: null
	        });
	
	        // Application keys
	        this.key = key || null;
	        this.secret = secret || null;
	
	        // Application metadata
	        this.application = {
	            name: 'trakt.js',
	            version: Build.Version,
	            date: Build.Date
	        };
	
	        // Build metadata
	        this.build = Build;
	
	        // Session
	        this.session = null;
	
	        if ((0, _helpers.isDefined)(options.session)) {
	            this.session = options.session;
	        } else if ((0, _helpers.isDefined)(options.sessionKey)) {
	            this.session = { key: options.sessionKey };
	        }
	
	        // Callbacks
	        this.onSessionRefreshed = options.onSessionRefreshed;
	
	        // Public variables
	        this.debug = options.debug;
	        this.http = null;
	
	        // Private variables
	        this._initialized = false;
	        this._interfaces = {};
	        this._refreshing = Promise.resolve();
	
	        // Initialize client
	        this.initialize();
	    }
	
	    _createClass(Client, [{
	        key: 'initialize',
	        value: function initialize() {
	            if (this._initialized) {
	                return;
	            }
	
	            // Construct http client
	            this.http = new _http2.default(this);
	
	            // Construct interfaces
	            this._interfaces = this._constructInterfaces(_interfaces2.default);
	
	            // Mark client as initialized
	            this._initialized = true;
	        }
	    }, {
	        key: 'getSession',
	
	
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
	                }
	
	                // Resolve session
	                return Promise.resolve(session).then(function (session) {
	                    if (!(0, _helpers.isDefined)(session)) {
	                        return Promise.reject(new Error('No session available'));
	                    }
	
	                    if (!(0, _helpers.isDefined)(session.created_at) || !(0, _helpers.isDefined)(session.expires_in)) {
	                        console.warn('Missing session expiry properties, unable to determine session validity');
	                    }
	
	                    // Calculate seconds to/since session expire time
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
	                        }
	
	                        // Refresh authentication token
	                        _this._refreshing = _this._refreshSession(session);
	
	                        // Wait for token to refresh, then try retrieve the session again
	                        return _this._refreshing.then(function () {
	                            return _this.getSession({
	                                refresh: false
	                            });
	                        });
	                    }
	
	                    // Return current session
	                    return session;
	                });
	            });
	        }
	
	        // endregion
	
	        // region Private methods
	
	    }, {
	        key: '_constructInterfaces',
	        value: function _constructInterfaces(interfaces) {
	            var _this2 = this;
	
	            var result = {};
	            var value;
	
	            Object.keys(interfaces).forEach(function (key) {
	                value = interfaces[key];
	
	                if (value.prototype instanceof _base2.default) {
	                    result[key] = new value(_this2); // eslint-disable-line new-cap
	                } else {
	                    result[key] = _this2._constructInterfaces(value);
	                }
	            });
	
	            return result;
	        }
	    }, {
	        key: '_refreshSession',
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
	            }
	
	            // Refresh session
	            return this.oauth.refresh(session.refresh_token, session.redirect_uri).then(function (session) {
	                if (!(0, _helpers.isDefined)(_this3.onSessionRefreshed)) {
	                    return;
	                }
	
	                // Fire "onSessionRefreshed" callback
	                _this3.onSessionRefreshed(session);
	            }, function (error) {
	                console.error('Unable to refresh session:', error.stack);
	            });
	        }
	
	        // endregion
	
	    }, {
	        key: 'siteUrl',
	        get: function get() {
	            var fragments = this.http.baseUrl.split('://'),
	                names = fragments[1].split('.');
	
	            // Remove first name ('api' or 'api-v2launch')
	            names.shift();
	
	            return [fragments[0], names.join('.')].join('://');
	        }
	
	        // region Interfaces
	
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isDefined = isDefined;
	exports.isFunction = isFunction;
	exports.isString = isString;
	exports.setDefaults = setDefaults;
	
	var _merge = __webpack_require__(3);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isDefined(value) {
	    return typeof value !== 'undefined' && value !== null;
	}
	
	function isFunction(value) {
	    return isDefined(value) && {}.toString.call(value) === '[object Function]';
	}
	
	function isString(value) {
	    return isDefined(value) && {}.toString.call(value) === '[object String]';
	}
	
	function setDefaults(value, defaults) {
	    if (!isDefined(value)) {
	        return defaults;
	    }
	
	    return (0, _merge2.default)({}, defaults, value);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(2);
	
	var _merge = __webpack_require__(3);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _querystring = __webpack_require__(5);
	
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
	            var _this = this;
	
	            options = (0, _merge2.default)({
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
	            }
	
	            // Set request headers
	            options.headers['trakt-api-key'] = this._client.key;
	            options.headers['trakt-api-version'] = 2;
	
	            // Authentication
	            if (options.authenticated) {
	                if (!(0, _helpers.isDefined)(options.session)) {
	                    // Retrieve current client session
	                    return this._client.getSession().then(function (session) {
	                        if (!(0, _helpers.isDefined)(session)) {
	                            // Invalid session returned
	                            return Promise.reject(new Error('Authentication required, but an invalid session was returned'));
	                        }
	
	                        // Fire request with `session`
	                        return _this.request(method, path, _extends({}, options, {
	                            session: session
	                        }));
	                    }, function (error) {
	                        // No session available
	                        return Promise.reject(new Error('Authentication required, but no session is available (error: ' + error.message + ')'));
	                    });
	                }
	
	                // Validate session
	                if (!(0, _helpers.isDefined)(options.session.access_token)) {
	                    return Promise.reject(new Error('Invalid session provided, expected an object with the "access_token" property'));
	                }
	
	                // Set authorization header
	                options.headers['Authorization'] = 'Bearer ' + options.session.access_token;
	            }
	
	            // Application metadata
	            if (!(0, _helpers.isDefined)(options.application)) {
	                options.application = {
	                    name: 'trakt.js',
	                    version: this._client.build.version,
	                    date: this._client.build.date
	                };
	            }
	
	            // Application parameters
	            if (options.includeAppParameters === true) {
	                // Validate request method
	                if (method !== 'POST') {
	                    return Promise.reject(new Error('"includeAppParameters" can only be used with POST requests'));
	                }
	
	                // Version
	                if ((0, _helpers.isDefined)(options.application.version)) {
	                    options.body['app_version'] = options.application.version;
	                }
	
	                // Date
	                if ((0, _helpers.isDefined)(options.application.date)) {
	                    options.body['app_date'] = options.application.date;
	                }
	            }
	
	            // User Agent
	            options.headers['User-Agent'] = this._buildUserAgent(options.application);
	
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
	
	            if (this._client.debug) {
	                console.debug('[trakt.js] %s %o (options: %O)', method, path, options);
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
	        key: '_buildUserAgent',
	        value: function _buildUserAgent(application) {
	            var result = '';
	
	            // Add application name (or "Unknown")
	            if ((0, _helpers.isDefined)(application.name)) {
	                result += application.name;
	            } else {
	                result += 'Unknown';
	            }
	
	            // Add fragments (version, date)
	            var fragments = [application.version, application.date].filter(function (fragment) {
	                return (0, _helpers.isDefined)(fragment);
	            });
	
	            if (fragments.length < 1) {
	                return result;
	            }
	
	            return result + ' (' + fragments.join('; ') + ')';
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SearchInterface = exports.ScrobbleInterface = exports.OAuthInterface = exports.UserSettingsInterface = undefined;
	
	var _settings = __webpack_require__(7);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _oauth = __webpack_require__(9);
	
	var _oauth2 = _interopRequireDefault(_oauth);
	
	var _scrobble = __webpack_require__(10);
	
	var _scrobble2 = _interopRequireDefault(_scrobble);
	
	var _search = __webpack_require__(11);
	
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base = __webpack_require__(8);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserSettingsInterface = function (_Interface) {
	    _inherits(UserSettingsInterface, _Interface);
	
	    function UserSettingsInterface() {
	        _classCallCheck(this, UserSettingsInterface);
	
	        return _possibleConstructorReturn(this, (UserSettingsInterface.__proto__ || Object.getPrototypeOf(UserSettingsInterface)).apply(this, arguments));
	    }
	
	    _createClass(UserSettingsInterface, [{
	        key: 'get',
	        value: function get(options) {
	            return this.http.get('users/settings', _extends({}, options, {
	                authenticated: true
	            }));
	        }
	    }]);
	
	    return UserSettingsInterface;
	}(_base2.default);
	
	exports.default = UserSettingsInterface;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Interface = function () {
	    function Interface(client) {
	        _classCallCheck(this, Interface);
	
	        this._client = (0, _helpers.isDefined)(client) ? client : null;
	    }
	
	    _createClass(Interface, [{
	        key: 'http',
	        get: function get() {
	            if (!(0, _helpers.isDefined)(this._client)) {
	                return null;
	            }
	
	            return this._client.http;
	        }
	    }]);
	
	    return Interface;
	}();
	
	exports.default = Interface;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(2);
	
	var _base = __webpack_require__(8);
	
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base = __webpack_require__(8);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ScrobbleInterface = function (_Interface) {
	    _inherits(ScrobbleInterface, _Interface);
	
	    function ScrobbleInterface() {
	        _classCallCheck(this, ScrobbleInterface);
	
	        return _possibleConstructorReturn(this, (ScrobbleInterface.__proto__ || Object.getPrototypeOf(ScrobbleInterface)).apply(this, arguments));
	    }
	
	    _createClass(ScrobbleInterface, [{
	        key: 'start',
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
	        key: 'pause',
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
	        key: 'stop',
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
	}(_base2.default);
	
	exports.default = ScrobbleInterface;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(2);
	
	var _base = __webpack_require__(8);
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=trakt.js.map