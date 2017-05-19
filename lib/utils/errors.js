var errors = {};

errors.throwParserError = function (token, description) {
    var someError = {error: description, on: token};
    throw someError;
};

errors.InterpreterException = function (message, on, reason) {
    this.message = message;
    this.on = on;
    this.reason = reason;
};
errors.InterpreterException.prototype = new Error();

errors.throwTypeMismatch = function (token, expectedType, actualType) {
    throw new errors.InterpreterException('Se esperaba un valor de tipo "' + expectedType + '" pero se encontró uno de tipo "' + actualType + '".', token, {code: 'type_mismatch', detail: {expected: expectedType, actual: actualType}});
};

module.exports = errors;
