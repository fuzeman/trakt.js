import _UserSettingsInterface from './users/settings';
import _OAuthInterface from './oauth';
import _ScrobbleInterface from './scrobble';
import _SearchInterface from './search';

export {_UserSettingsInterface as UserSettingsInterface};
export {_OAuthInterface as OAuthInterface};
export {_ScrobbleInterface as ScrobbleInterface};
export {_SearchInterface as SearchInterface};

export default {
    users: {
        settings: _UserSettingsInterface
    },

    oauth: _OAuthInterface,
    scrobble: _ScrobbleInterface,
    search: _SearchInterface
};
