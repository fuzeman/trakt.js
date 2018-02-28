import merge from 'lodash-amd/merge';
import querystring from 'querystring';

import {isDefined} from './helpers';


export default class HttpClient {
    constructor(client, baseUrl) {
        this._client = client;
        this._baseUrl = baseUrl || 'https://api.trakt.tv/';
    }

    get baseUrl() {
        return this._baseUrl;
    }

    get(path, options) {
        return this.request('GET', path, options);
    }

    post(path, options) {
        return this.request('POST', path, options);
    }

    request(method, path, options) {
        options = merge({
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

        if(!isDefined(options.application)) {
            options.application = this._client.application;
        }

        // Set request headers
        options.headers['trakt-api-key'] = this._client.key;
        options.headers['trakt-api-version'] = 2;

        // Authentication
        if(options.authenticated) {
            if(!isDefined(options.session)) {
                // Retrieve current client session
                return this._client.getSession().then((session) => {
                    if(!isDefined(session)) {
                        // Invalid session returned
                        return Promise.reject(new Error(
                            'Authentication required, but an invalid session was returned'
                        ));
                    }

                    // Fire request with `session`
                    return this.request(method, path, {
                        ...options,
                        session: session
                    });
                }, (error) => {
                    // No session available
                    return Promise.reject(new Error(
                        'Authentication required, but no session is available (error: ' + error.message + ')'
                    ));
                });
            }

            // Validate session
            if(!isDefined(options.session.access_token)) {
                return Promise.reject(new Error(
                    'Invalid session provided, expected an object with the "access_token" property'
                ));
            }

            // Set authorization header
            options.headers['Authorization'] = 'Bearer ' + options.session.access_token;
        }

        // Application metadata
        if(!isDefined(options.application)) {
            options.application = {
                name: 'trakt.js',
                version: this._client.build.version,
                date: this._client.build.date
            };
        }

        // Application parameters
        if(options.includeAppParameters === true) {
            // Validate request method
            if(method !== 'POST') {
                return Promise.reject(new Error(
                    '"includeAppParameters" can only be used with POST requests'
                ));
            }

            // Version
            if(isDefined(options.application.version)) {
                options.body['app_version'] = options.application.version;
            }

            // Date
            if(isDefined(options.application.date)) {
                options.body['app_date'] = options.application.date;
            }
        }

        // User Agent
        options.headers['User-Agent'] = this._buildUserAgent(options.application);

        // Process body
        if(isDefined(options.body)) {
            // Encode body as `bodyType`
            if(options.bodyType === 'json') {
                options.body = JSON.stringify(options.body);
                options.headers['Content-Type'] = 'application/json';
            } else {
                throw new Error('Invalid "bodyType" provided: "' + options.bodyType + '"');
            }
        }

        if(this._client.debug) {
            console.debug('[trakt.js] %s %o (options: %O)', method, path, options);
        }

        // Send request
        return fetch(this._baseUrl + path + '?' + this.encodeParameters(options.params), {
            method: method,
            headers: options.headers,
            body: options.body
        }).then(function(response) {
            // TODO check status code
            return response.json();
        });
    }

    encodeParameters(parameters) {
        // Remove undefined parameters
        Object.keys(parameters).forEach((key) => {
            if(typeof parameters[key] === 'undefined') {
                delete parameters[key];
            }
        });

        // Encode parameters to string
        return querystring.encode(parameters);
    }

    _buildUserAgent(application) {
        let result = '';

        // Add application name (or "Unknown")
        if(isDefined(application.name)) {
            result += application.name;
        } else {
            result += 'Unknown';
        }

        // Add fragments (version, date)
        let fragments = [
            application.version,
            application.date
        ].filter((fragment) => {
            return isDefined(fragment);
        });

        if(fragments.length < 1) {
            return result;
        }

        return result + ' (' + fragments.join('; ') + ')';
    }
}
