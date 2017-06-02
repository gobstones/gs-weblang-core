var locales = require('../locales');

var errors = {};

errors.ParserException = function (on, reason) {
    this.message = locales.get(reason.code, reason.detail);
    this.on = on;
    this.reason = reason;
};
errors.ParserException.prototype = new Error();

errors.InterpreterException = function (on, reason) {
    this.message = locales.get(reason.code, reason.detail);
    this.on = on;
    this.reason = reason;
};
errors.InterpreterException.prototype = new Error();

errors.GobstonesError = function (reason) {
    this.message = locales.get(reason.code, reason.detail);
    // this.on lo pone primitive-procedures
    this.reason = reason;
};
errors.GobstonesError.prototype = new Error();

errors.throwTypeMismatch = function (token, expectedType, actualType) {
    throw new errors.InterpreterException(token, {code: 'type_mismatch', detail: {expected: expectedType, actual: actualType}});
};

module.exports = errors;
