var log = require('./logger');

var errors = {};

errors.throwParserError = function (token, description) {
    var someError = {error: description, on: token};
    log('PARSER ERROR: ', someError);
    throw someError;
};

errors.throwInterpreterError = function (token, message) {
    throw new errors.InterpreterException(message, token);
};

errors.InterpreterException = function (message, on) {
    this.message = message;
    this.on = on;
};
errors.InterpreterException.prototype = new Error();

module.exports = errors;
