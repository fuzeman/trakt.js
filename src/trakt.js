define([
    '_',

    'interfaces/users/settings',

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
    function Client(client_id, client_secret) {
        this.baseUrl = baseUrl;
        this.version = version;

        this.id = client_id;
        this.secret = client_secret;

        this.authorization = null;

        this._ = new _();
        this._.client = this;

        // expose interfaces in `this`
        exposeInterfaces(this);
    }

    // Properties
    Client._ = _;
    Client.baseUrl = baseUrl;
    Client.version = version;

    Client.id = '574886e8a654562ba1453788c0c076adb53b78fc7425135e0db10dff01f51809';
    Client.secret = '1421a6b546de8ab27e3fe00596708ebc0051fe8fe856eedfb827ebd22b04372b';

    Client.authorization = null;

    Client._.client = Client;

    // expose interfaces in `trakt`
    exposeInterfaces(Client);

    return {
        Client: Client
    };
});
