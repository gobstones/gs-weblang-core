var _ = require('lodash');
var TOKEN_NAMES = require('../../grammar/reserved-words');

// TODO: Idealmente esto no tendria que existir.
// Las operaciones de `binary-operations` y `primitive-functions` deben wrappear los resultados en su tipo correspondiente.

module.exports = function (value) {
    return _.isNumber(value) ?
        {type: TOKEN_NAMES.NUMBER, value: value} :
        (_.isBoolean(value) ?
            {type: TOKEN_NAMES.BOOLEAN, value: value} :
            (_.isArray(value) ?
                {type: TOKEN_NAMES.DIRECTION, value: value} :
                value
            )
        );
};
