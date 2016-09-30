'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('../core/helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interface = function () {
    function Interface(client) {
        _classCallCheck(this, Interface);

        this._client = (0, _helpers.isDefined)(client) ? client : null;
    }

    _createClass(Interface, [{
        key: 'http',
        get: function get() {
            if (!(0, _helpers.isDefined)(this._client)) {
                return null;
            }

            return this._client.http;
        }
    }]);

    return Interface;
}();

exports.default = Interface;
module.exports = exports['default'];
//# sourceMappingURL=base.js.map
