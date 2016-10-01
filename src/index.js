import {isDefined, isFunction, setDefaults} from './core/helpers';
import HttpClient from './core/http';
import Interfaces from './interfaces';
import Interface from './interfaces/base';

export const Build = {
    Version: '2.0.0-alpha.2',
    Date: '2016-10-01'
};

export const RefreshAt = 7 * 24 * 60 * 60;  // Refresh token one week before expiry
export const RefreshDisableAt = -28 * 24 * 60 * 60;  // Disable refresh attempts after four weeks

// Validate environment
if(!isDefined(fetch)) {
    console.error('"fetch" is not available, include whatwg-fetch to support this environment');
}

if(!isDefined(Promise)) {
    console.error('"Promise" is not available, include babel-polyfill to support this environment');
}

export class Client {
    constructor(key, secret, options) {
        options = setDefaults(options, {
            application: {
                name: 'trakt.js',
                version: Build.Version,
                date: Build.Date
            },

            debug: false,

            session: null,
            sessionKey: null,
            onSessionRefreshed: null
        });

        // Application keys
        this.key = key || null;
        this.secret = secret || null;

        // Session
        this.session = null;

        if(isDefined(options.session)) {
            this.session = options.session;
        } else if(isDefined(options.sessionKey)) {
            this.session = {key: options.sessionKey};
        }

        // Callbacks
        this.onSessionRefreshed = options.onSessionRefreshed;

        // Public variables
        this.application = options.application;
        this.build = Build;
        this.debug = options.debug;

        this.http = null;

        // Private variables
        this._initialized = false;
        this._interfaces = {};
        this._refreshing = Promise.resolve();

        // Initialize client
        this.initialize();
    }

    initialize() {
        if(this._initialized) {
            return;
        }

        // Construct http client
        this.http = new HttpClient(this);

        // Construct interfaces
        this._interfaces = this._constructInterfaces(Interfaces);

        // Mark client as initialized
        this._initialized = true;
    }

    get siteUrl() {
        var fragments = this.http.baseUrl.split('://'),
            names = fragments[1].split('.');

        // Remove first name ('api' or 'api-v2launch')
        names.shift();

        return [fragments[0], names.join('.')].join('://');
    }

    // region Interfaces

    get users() {
        return this._interfaces['users'];
    }

    get oauth() {
        return this._interfaces['oauth'];
    }

    get scrobble() {
        return this._interfaces['scrobble'];
    }

    get search() {
        return this._interfaces['search'];
    }

    // endregion

    // region Public methods

    getSession(options) {
        options = setDefaults(options, {
            refresh: true
        });

        return this._refreshing.then(() => {
            var session = this.session;

            if(!isDefined(session)) {
                return Promise.reject(new Error('No session available'));
            }

            if(isFunction(session)) {
                session = session();
            }

            // Resolve session
            return Promise.resolve(session).then((session) => {
                if(!isDefined(session)) {
                    return Promise.reject(new Error('No session available'));
                }

                if(!isDefined(session.created_at) || !isDefined(session.expires_in)) {
                    console.warn('Missing session expiry properties, unable to determine session validity');
                }

                // Calculate seconds to/since session expire time
                let rem = Math.round((session.created_at + session.expires_in) - (Date.now() / 1000));

                if(rem > RefreshAt) {
                    // Ensure the "onSessionRefreshed" callback has been defined
                    if(!isDefined(this.onSessionRefreshed)) {
                        console.warn(
                            'onSessionRefreshed callback hasn\'t been implemented, session will expire in %d second(s)',
                            Math.round(rem)
                        );
                    }
                } else {
                    if(rem < RefreshDisableAt) {
                        // Session has expired, and no `onSessionRefreshed` callback has been defined
                        return Promise.reject(new Error(
                            'Session expired ' + Math.round(Math.abs(rem)) + ' second(s) ago'
                        ));
                    }

                    if(!isDefined(this.onSessionRefreshed)) {
                        if(rem < 0) {
                            // Session has expired
                            return Promise.reject(new Error(
                                'Session expired ' + Math.round(Math.abs(rem)) + ' second(s) ago'
                            ));
                        }

                        console.warn('onSessionRefreshed callback hasn\'t been implemented, unable to refresh session');
                        return session;
                    }

                    if(rem < 0) {
                        // Session has expired, and no `onSessionRefreshed` callback has been defined
                        console.warn('Session expired ' + Math.round(Math.abs(rem)) + ' second(s) ago');
                    }

                    if(!options.refresh) {
                        console.warn('Token refresh has been disabled');
                        return session;
                    }

                    // Refresh authentication token
                    this._refreshing = this._refreshSession(session);

                    // Wait for token to refresh, then try retrieve the session again
                    return this._refreshing.then(() => {
                        return this.getSession({
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

    _constructInterfaces(interfaces) {
        var result = {};
        var value;

        Object.keys(interfaces).forEach((key) => {
            value = interfaces[key];

            if(value.prototype instanceof Interface) {
                result[key] = new value(this);  // eslint-disable-line new-cap
            } else {
                result[key] = this._constructInterfaces(value);
            }
        });

        return result;
    }

    _refreshSession(session) {
        if(!isDefined(session) || !isDefined(session.refresh_token)) {
            // Unable to refresh session
            return Promise.reject(new Error(
                'Unable to refresh session, no "refresh_token" property is available'
            ));
        }

        if(!isDefined(session.redirect_uri)) {
            console.warn('Session has no "redirect_uri" property, defaulting to "urn:ietf:wg:oauth:2.0:oob"');
        }

        if(!isDefined(this.onSessionRefreshed)) {
            return Promise.reject(new Error(
                'Unable to refresh session, onSessionRefreshed callback hasn\'t been implemented'
            ));
        }

        // Refresh session
        return this.oauth.refresh(session.refresh_token, session.redirect_uri).then((session) => {
            if(!isDefined(this.onSessionRefreshed)) {
                return;
            }

            // Fire "onSessionRefreshed" callback
            this.onSessionRefreshed(session);
        }, (error) => {
            console.error('Unable to refresh session:', error.stack);
        });
    }

    // endregion
}
