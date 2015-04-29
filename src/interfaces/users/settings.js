define(['_'], function(_) {
    function SettingsInterface(_) {
        this._ = _;
    }

    SettingsInterface.prototype.get = function() {
        return this._.get('users/settings');
    };

    _.register('users/settings', SettingsInterface);
});