define(['_'], function(_) {
    function SettingsInterface(_) {
        this._ = _;
    }

    SettingsInterface.prototype.get = function(token, config) {
        config = typeof config !== 'undefined' ? config : {};

        if(typeof token !== 'undefined') {
            config.headers = typeof config.headers !== 'undefined' ? config.headers : {};
            config.headers['Authorization'] = 'Bearer ' + token;
        }

        return this._.get('users/settings', config);
    };

    _.register('users/settings', SettingsInterface);
});