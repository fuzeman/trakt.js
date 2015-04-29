define(['httpinvoke', 'when'], function(httpinvoke, when) {
    var converters = {
            'text json': JSON.parse,
            'json text': JSON.stringify
        },
        interfaces = {};

    function _(client) {
        this.client = null;
        this.interfaces = interfaces;
    }

    _.client = null;
    _.interfaces = interfaces;

    _.register = function(path, obj) {
        interfaces[path] = obj;
    };
    _.prototype.register = _.register;

    // http
    _.request = function(path, method, config) {
        var url = this.client.baseUrl + '/' + path;

        // configuration
        config = typeof config !== 'undefined' ? config : {};
        config.converters = converters;
        config.outputType = 'json';

        // headers
        config.headers = typeof config.headers !== 'undefined' ? config.headers : {};
        config.headers['trakt-api-key'] = this.client.id;
        config.headers['trakt-api-version'] = 2;

        if(typeof config.headers['Authorization'] === 'undefined') {
            // Ensure client has a valid `authorization` parameter
            if(this.client.authorization != null && this.client.authorization.access_token != null) {
                // Set OAuth authorization header
                config.headers['Authorization'] = 'Bearer ' + this.client.authorization.access_token;
            }
        }

        var deferred = when.defer();

        if(config.headers['trakt-api-key'] == null) {
            deferred.reject('missing api key');

            return deferred.promise;
        }

        httpinvoke(url, method, config).then(function(response) {
            if(response.statusCode >= 200 && response.statusCode <= 299) {
                deferred.resolve(response.body);
            } else {
                deferred.reject('server returned status code: ' + response.statusCode);
            }
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };
    _.prototype.request = _.request;

    _.get = function(path, config) {
        return this.request(path, 'GET', config);
    };
    _.prototype.get = _.get;

    _.post = function(path, config) {
        return this.request(path, 'POST', config);
    };
    _.prototype.post = _.post;

    // helpers
    _.cleanParameters = function(parameters) {
        for(var key in parameters) {
            if(!parameters.hasOwnProperty(key)) {
                continue;
            }

            if(typeof parameters[key] === 'undefined') {
                delete parameters[key];
            }
        }

        return parameters;
    };
    _.prototype.cleanParameters = _.cleanParameters;

    _.toQueryString = function(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    };
    _.prototype.toQueryString = _.toQueryString;

    _.getSiteUrl = function() {
        var fragments = this.client.baseUrl.split('://'),
            names = fragments[1].split('.');

        // Remove first name ('api' or 'api-v2launch')
        names.shift();

        return [fragments[0], names.join('.')].join('://');
    };
    _.prototype.getSiteUrl = _.getSiteUrl;

    return _;
});