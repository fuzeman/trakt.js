(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("whatwg-fetch"), require("lodash-amd/merge"), require("querystring"));
	else if(typeof define === 'function' && define.amd)
		define(["whatwg-fetch", "lodash-amd/merge", "querystring"], factory);
	else if(typeof exports === 'object')
		exports["trakt"] = factory(require("whatwg-fetch"), require("lodash-amd/merge"), require("querystring"));
	else
		root["trakt"] = factory(root["whatwg-fetch"], root["lodash-amd/merge"], root["querystring"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Client = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _http = __webpack_require__(4);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _interfaces = __webpack_require__(7);
	
	var _interfaces2 = _interopRequireDefault(_interfaces);
	
	var _base = __webpack_require__(9);
	
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isDefined = isDefined;
	function isDefined(value) {
	    return typeof value !== 'undefined' && value !== null;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _merge = __webpack_require__(5);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _querystring = __webpack_require__(6);
	
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SearchInterface = exports.ScrobbleInterface = exports.OAuthInterface = exports.UserSettingsInterface = undefined;
	
	var _settings = __webpack_require__(8);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _oauth = __webpack_require__(10);
	
	var _oauth2 = _interopRequireDefault(_oauth);
	
	var _scrobble = __webpack_require__(11);
	
	var _scrobble2 = _interopRequireDefault(_scrobble);
	
	var _search = __webpack_require__(12);
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base = __webpack_require__(9);
	
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
	            return this.http.get('users/settings', options);
	        }
	    }]);
	
	    return UserSettingsInterface;
	}(_base2.default);
	
	exports.default = UserSettingsInterface;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _base = __webpack_require__(9);
	
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
	        key: 'token',
	        value: function token(code, redirectUri, grantType) {
	            if (!(0, _helpers.isDefined)(this._client.key)) {
	                throw new Error('Missing required client "key" parameter');
	            }
	
	            if (!(0, _helpers.isDefined)(this._client.secret)) {
	                throw new Error('Missing required client "secret" parameter');
	            }
	
	            if (!(0, _helpers.isDefined)(code)) {
	                throw new Error('Invalid value provided for the "code" parameter');
	            }
	
	            return this.http.post('oauth/token', {
	                body: {
	                    'client_id': this._client.key,
	                    'client_secret': this._client.secret,
	
	                    'code': code,
	                    'redirect_uri': (0, _helpers.isDefined)(redirectUri) ? redirectUri : 'urn:ietf:wg:oauth:2.0:oob',
	                    'grant_type': (0, _helpers.isDefined)(grantType) ? grantType : 'authorization_code'
	                }
	            });
	        }
	    }]);
	
	    return OAuthInterface;
	}(_base2.default);
	
	exports.default = OAuthInterface;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base = __webpack_require__(9);
	
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
	        value: function start(data) {
	            return this.http.post('scrobble/start', {
	                body: data
	            });
	        }
	    }, {
	        key: 'pause',
	        value: function pause(data) {
	            return this.http.post('scrobble/pause', {
	                body: data
	            });
	        }
	    }, {
	        key: 'stop',
	        value: function stop(data) {
	            return this.http.post('scrobble/stop', {
	                body: data
	            });
	        }
	    }]);
	
	    return ScrobbleInterface;
	}(_base2.default);
	
	exports.default = ScrobbleInterface;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _base = __webpack_require__(9);
	
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
	        value: function lookup(type, id) {
	            if (!(0, _helpers.isDefined)(type)) {
	                throw new Error('Invalid value provided for the "type" parameter');
	            }
	
	            if (!(0, _helpers.isDefined)(id)) {
	                throw new Error('Invalid value provided for the "id" parameter');
	            }
	
	            return this.http.get('search', {
	                params: {
	                    'id_type': type,
	                    'id': id
	                }
	            });
	        }
	    }, {
	        key: 'query',
	        value: function query(_query, type, year) {
	            if (!(0, _helpers.isDefined)(_query)) {
	                throw new Error('Invalid value provided for the "query" parameter');
	            }
	
	            return this.http.get('search', {
	                params: {
	                    'query': _query,
	                    'type': type,
	                    'year': year
	                }
	            });
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