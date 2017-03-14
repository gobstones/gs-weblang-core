var getValue = require('./get-value');

module.exports = function (node, constants) {
    node.HasStones = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'hasStones';
        this.parameters = parameters;
    };

    node.HasStones.prototype.eval = function (context) {
        var value = getValue(node, this.token, this.parameters, context, 'Color');
        return context.board().amountStones(value) > 0;
    };

    node.CanMove = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'canMove';
        this.parameters = parameters;
    };

    node.CanMove.prototype.eval = function (context) {
        var value = getValue(node, this.token, this.parameters, context, 'Dirección');
        return context.board().canMove(value);
    };

    node.NumStones = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'numStones';
        this.parameters = parameters;
    };

    node.NumStones.prototype.eval = function (context) {
        var value = getValue(node, this.token, this.parameters, context, 'Color');
        return context.board().amountStones(value);
    };

    node.MinDir = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'minDir';
        this.parameters = parameters;
    };

    node.MinDir.prototype.eval = function (context) {
        return context.nativeRepresentations().minDir;
    };

    node.MaxDir = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'maxDir';
        this.parameters = parameters;
    };

    node.MaxDir.prototype.eval = function (context) {
        return context.nativeRepresentations().maxDir;
    };

    node.MaxColor = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'maxColor';
        this.parameters = parameters;
    };

    node.MaxColor.prototype.eval = function (context) {
        return context.nativeRepresentations().maxColor;
    };

    node.MinColor = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'minColor';
        this.parameters = parameters;
    };

    node.MinColor.prototype.eval = function (context) {
        return context.nativeRepresentations().minColor;
    };

    node.MinBool = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'minBool';
        this.parameters = parameters;
    };

    node.MinBool.prototype.eval = function () {
        return false;
    };

    node.MaxBool = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.alias = 'maxBool';
        this.parameters = parameters;
    };

    node.MaxBool.prototype.eval = function () {
        return true;
    };
};
