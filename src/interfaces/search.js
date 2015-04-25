define(['_', 'when'], function(_, when) {
    function SearchInterface(_) {
        this._ = _;
    }

    SearchInterface.prototype.lookup = function(id_type, id) {
        var parameters = this._.cleanParameters({
            id_type: id_type,
            id: id
        });

        if(parameters.id_type == null || parameters.id == null) {
            return when.reject('"id_type" and "id" parameters are required');
        }

        return this._.get('search?' + this._.toQueryString(parameters));
    };

    SearchInterface.prototype.query = function(query, type, year) {
        var parameters = this._.cleanParameters({
            query: query,
            type: type,
            year: year
        });

        if(parameters.query == null) {
            return when.reject('"query" parameter is required');
        }

        return this._.get('search?' + this._.toQueryString(parameters));
    };

    _.register('search', SearchInterface);
});