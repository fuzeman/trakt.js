define([
    '_',

    'interfaces/oauth',
    'interfaces/scrobble',
    'interfaces/search'
], function(_) {
    var baseUrl = 'https://api-v2launch.trakt.tv',
        version = '1.0.0';

    function exposeInterfaces(client) {
        for(var path in _.interfaces) {
            if(!_.interfaces.hasOwnProperty(path)) {
                return;
            }

            client.__defineGetter__(path, (function(path) {
                return function() {
                    return new client._.interfaces[path](client._);
                };
            })(path));
        }
    }

    // Object Contructor
    function trakt(client_id, client_secret) {
        this.baseUrl = baseUrl;
        this.version = version;

        this.id = client_id;
        this.secret = client_secret;

        this._ = new _();
        this._.client = this;

        // expose interfaces in `this`
        exposeInterfaces(this);
    }

    // Properties
    trakt._ = _;
    trakt.baseUrl = baseUrl;
    trakt.version = version;

    trakt.id = '574886e8a654562ba1453788c0c076adb53b78fc7425135e0db10dff01f51809';
    trakt.secret = '1421a6b546de8ab27e3fe00596708ebc0051fe8fe856eedfb827ebd22b04372b';

    trakt._.client = trakt;

    // expose interfaces in `trakt`
    exposeInterfaces(trakt);

    return trakt;
});
