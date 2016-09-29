define(['../_'], function(_) {
    function ScrobbleInterface(_) {
        this._ = _;
    }

    ScrobbleInterface.prototype.start = function(request) {
        return this._.post('scrobble/start', {
            input: request,
            inputType: 'json',

            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    ScrobbleInterface.prototype.pause = function(request) {
        return this._.post('scrobble/pause', {
            input: request,
            inputType: 'json',

            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    ScrobbleInterface.prototype.stop = function(request) {
        return this._.post('scrobble/stop', {
            input: request,
            inputType: 'json',

            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    _.register('scrobble', ScrobbleInterface);
});