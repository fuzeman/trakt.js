import {isDefined} from './core/helpers';
import HttpClient from './core/http';
import Interfaces from './interfaces';
import Interface from './interfaces/base';

export class Client {
    constructor(key, secret, options) {
        options = isDefined(options) ? options : {};

        this.key = key || null;
        this.secret = secret || null;

        this.session = null;

        if(isDefined(options.session)) {
            this.session = options.session;
        } else if(isDefined(options.sessionKey)) {
            this.session = {key: options.sessionKey};
        }

        // Construct http client
        this.http = new HttpClient(this);

        // Construct interfaces
        this._interfaces = this._constructInterfaces(Interfaces);
    }

    get siteUrl() {
        var fragments = this.http.baseUrl.split('://'),
            names = fragments[1].split('.');

        // Remove first name ('api' or 'api-v2launch')
        names.shift();

        return [fragments[0], names.join('.')].join('://');
    }

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

    getSessionKey() {
        if(!isDefined(this.session) || !isDefined(this.session.key)) {
            return null;
        }

        return this.session.key;
    }

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
}
