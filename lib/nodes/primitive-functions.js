var TOKEN_NAMES = require('../grammar/reserved-words');
var getValue = require('./helpers/get-value');

module.exports = function (node, constants) {
    node.Opposite = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'opposite';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.OPPOSITE;
    };

    node.Opposite.prototype.eval = function (context) {
        var value = getValue(node, this.name, this.token, this.parameters, TOKEN_NAMES.DIRECTION, {context: context});
        return value.map(function (x) {
            return -x;
        });
    };

    node.HasStones = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'hasStones';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.HAS_STONES;
    };

    node.HasStones.prototype.eval = function (context) {
        var value = getValue(node, this.name, this.token, this.parameters, TOKEN_NAMES.COLOR, {context: context});
        return context.board().amountStones(value) > 0;
    };

    node.CanMove = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'canMove';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.CAN_MOVE;
    };

    node.CanMove.prototype.eval = function (context) {
        var value = getValue(node, this.name, this.token, this.parameters, TOKEN_NAMES.DIRECTION, {context: context});
        return context.board().canMove(value);
    };

    node.NumStones = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'numStones';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.NUM_STONES;
    };

    node.NumStones.prototype.eval = function (context) {
        var value = getValue(node, this.name, this.token, this.parameters, TOKEN_NAMES.COLOR, {context: context});
        return context.board().amountStones(value);
    };

    node.MinDir = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'minDir';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.MIN_DIR;
    };

    node.MinDir.prototype.eval = function (context) {
        return context.nativeRepresentations().minDir;
    };

    node.MaxDir = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'maxDir';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.MAX_DIR;
    };

    node.MaxDir.prototype.eval = function (context) {
        return context.nativeRepresentations().maxDir;
    };

    node.MaxColor = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'maxColor';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.MAX_COLOR;
    };

    node.MaxColor.prototype.eval = function (context) {
        return context.nativeRepresentations().maxColor;
    };

    node.MinColor = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'minColor';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.MIN_COLOR;
    };

    node.MinColor.prototype.eval = function (context) {
        return context.nativeRepresentations().minColor;
    };

    node.MinBool = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'minBool';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.MIN_BOOL;
    };

    node.MinBool.prototype.eval = function () {
        return false;
    };

    node.MaxBool = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'maxBool';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.MAX_BOOL;
    };

    node.MaxBool.prototype.eval = function () {
        return true;
    };
};
