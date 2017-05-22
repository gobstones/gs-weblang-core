var locales = require('../locales');

var errors = {};

errors.throwParserError = function (token, description) {
    var someError = {error: description, on: token};
    throw someError;
};

errors.InterpreterException = function (on, reason) {
    this.message = locales.get(reason.code, reason.detail);
    this.on = on;
    this.reason = reason;
};
errors.InterpreterException.prototype = new Error();

errors.throwTypeMismatch = function (token, expectedType, actualType) {
    throw new errors.InterpreterException(token, {code: 'type_mismatch', detail: {expected: expectedType, actual: actualType}});
};

module.exports = errors;
