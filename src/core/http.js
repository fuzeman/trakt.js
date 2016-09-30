import {isDefined} from './helpers';

import merge from 'lodash-amd/merge';
import querystring from 'querystring';

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

            body: null,
            bodyType: 'json',

            authenticated: false,
            sessionKey: this._client.getSessionKey()
        }, options || {});

        // Set request headers
        options.headers['trakt-api-key'] = this._client.key;
        options.headers['trakt-api-version'] = 2;

        if(options.authenticated) {
            // Add session key
            if(!isDefined(options.sessionKey)) {
                throw new Error('Missing required "sessionKey" parameter');
            }

            options.headers['Authorization'] = 'Bearer ' + this._client.session.access_token;
        }

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
}
