import {isDefined} from '../core/helpers';
import Interface from './base';


export default class SearchInterface extends Interface {
    lookup(type, id, options) {
        if(!isDefined(type)) {
            throw new Error('Invalid value provided for the "type" parameter');
        }

        if(!isDefined(id)) {
            throw new Error('Invalid value provided for the "id" parameter');
        }

        return this.http.get('search', {
            ...options,
            params: {
                'id_type': type,
                'id': id
            }
        });
    };

    query(query, type, year, options) {
        if(!isDefined(query)) {
            throw new Error('Invalid value provided for the "query" parameter');
        }

        return this.http.get('search', {
            ...options,
            params: {
                'query': query,
                'type': type,
                'year': year
            }
        });
    };
}
