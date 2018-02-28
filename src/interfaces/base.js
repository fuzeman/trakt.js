import {isDefined} from '../core/helpers';


export default class Interface {
    constructor(client) {
        this._client = isDefined(client) ? client : null;
    }

    get http() {
        if(!isDefined(this._client)) {
            return null;
        }

        return this._client.http;
    }
}
