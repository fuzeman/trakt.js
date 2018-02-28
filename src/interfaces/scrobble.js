import Interface from './base';


export default class ScrobbleInterface extends Interface {
    start(item, progress, options) {
        return this.http.post('scrobble/start', {
            ...options,
            authenticated: true,
            includeAppParameters: true,

            body: {
                ...item,
                progress: progress
            }
        });
    };

    pause(item, progress, options) {
        return this.http.post('scrobble/pause', {
            ...options,
            authenticated: true,
            includeAppParameters: true,

            body: {
                ...item,
                progress: progress
            }
        });
    };

    stop(item, progress, options) {
        return this.http.post('scrobble/stop', {
            ...options,
            authenticated: true,
            includeAppParameters: true,

            body: {
                ...item,
                progress: progress
            }
        });
    };
}
