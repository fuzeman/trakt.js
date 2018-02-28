import Interface from '../base';


export default class UserSettingsInterface extends Interface {
    get(options) {
        return this.http.get('users/settings', {
            ...options,
            authenticated: true
        });
    }
}
