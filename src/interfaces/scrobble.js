import Interface from './base';

export default class ScrobbleInterface extends Interface {
    start(data) {
        return this.http.post('scrobble/start', {
            body: data
        });
    };

    pause(data) {
        return this.http.post('scrobble/pause', {
            body: data
        });
    };

    stop(data) {
        return this.http.post('scrobble/stop', {
            body: data
        });
    };
}
