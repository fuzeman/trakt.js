define(['../_', 'when'], function(_, when) {
    function OAuthInterface(_) {
        this._ = _;
    }

    OAuthInterface.prototype.authorizeUrl = function(redirect_uri, state) {
        var parameters = this._.cleanParameters({
            response_type: 'code',
            client_id: this._.client.id,

            redirect_uri: typeof redirect_uri !== 'undefined' ? redirect_uri : 'urn:ietf:wg:oauth:2.0:oob',
            state: state
        });

        if(parameters.client_id == null) {
            console.error('missing client "id" parameter');
            return null;
        }

        if(parameters.redirect_uri == null) {
            console.error('invalid "redirect_uri" parameter provided');
            return null;
        }

        return this._.getSiteUrl() + '/oauth/authorize?' + this._.toQueryString(parameters);
    };

    OAuthInterface.prototype.token = function(code, redirect_uri, grant_type) {
        var request = this._.cleanParameters({
            client_id: this._.client.id,
            client_secret: this._.client.secret,

            code: code,
            redirect_uri: typeof redirect_uri !== 'undefined' ? redirect_uri : 'urn:ietf:wg:oauth:2.0:oob',
            grant_type: typeof grant_type !== 'undefined' ? grant_type : 'authorization_code'
        });

        if(request.client_id == null || request.client_secret == null) {
            return when.reject('missing client "id" or "secret" parameter');
        }

        if(request.code == null || request.redirect_uri == null || request.grant_type == null) {
            return when.reject('invalid "code", "redirect_uri" or "grant_type" parameter provided');
        }

        return this._.post('oauth/token', {
            input: request,
            inputType: 'json',

            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    _.register('oauth', OAuthInterface);
});