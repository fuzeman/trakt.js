import {isDefined} from '../core/helpers';
import Interface from './base';

export default class OAuthInterface extends Interface {
    authorizeUrl(redirectUri, state) {
        if(!isDefined(this._client.key)) {
            throw new Error('Missing required client "key" parameter');
        }

        return this._client.siteUrl + 'oauth/authorize?' + this.http.encodeParameters({
            'client_id': this._client.key,

            'response_type': 'code',
            'redirect_uri': isDefined(redirectUri) ? redirectUri : 'urn:ietf:wg:oauth:2.0:oob',
            'state': state
        });
    }

    exchange(code, redirectUri, options) {
        if(!isDefined(this._client.key)) {
            throw new Error('Missing required client "key" parameter');
        }

        if(!isDefined(this._client.secret)) {
            throw new Error('Missing required client "secret" parameter');
        }

        if(!isDefined(code)) {
            throw new Error('Invalid value provided for the "code" parameter');
        }

        if(!isDefined(redirectUri)) {
            redirectUri = 'urn:ietf:wg:oauth:2.0:oob';
        }

        return this.http.post('oauth/token', {
            ...options,
            body: {
                'client_id': this._client.key,
                'client_secret': this._client.secret,

                'code': code,
                'redirect_uri': redirectUri,
                'grant_type': 'authorization_code'
            }
        }).then((session) => {
            if(!isDefined(session)) {
                return session;
            }

            session['redirect_uri'] = redirectUri;
            return session;
        });
    }

    refresh(refreshToken, redirectUri, options) {
        if(!isDefined(this._client.key)) {
            throw new Error('Missing required client "key" parameter');
        }

        if(!isDefined(this._client.secret)) {
            throw new Error('Missing required client "secret" parameter');
        }

        if(!isDefined(refreshToken)) {
            throw new Error('Invalid value provided for the "code" parameter');
        }

        return this.http.post('oauth/token', {
            ...options,
            body: {
                'client_id': this._client.key,
                'client_secret': this._client.secret,

                'refresh_token': refreshToken,
                'redirect_uri': isDefined(redirectUri) ? redirectUri : 'urn:ietf:wg:oauth:2.0:oob',
                'grant_type': 'refresh_token'
            }
        });
    }
}
