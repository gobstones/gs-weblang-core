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

module.exports = errors;
