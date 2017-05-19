var TOKEN_NAMES = require('../grammar/reserved-words');
var getValue = require('./helpers/get-value');

module.exports = function (node, constants) {
    var snapshot = function (node, context) {
        return {token: node.token, names: context.getCurrentNames()};
    };

    node.MoveClaw = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'MoveClaw';
        this.parameters = parameters;
    };

    node.MoveClaw.prototype.interpret = function (context) {
        var value = getValue(node, this.token, this.parameters, context, TOKEN_NAMES.DIRECTION);

        try {
            context.board().move(value, snapshot(this, context));
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };

    node.RemoveStone = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'Grab';
        this.parameters = parameters;
    };

    node.RemoveStone.prototype.interpret = function (context) {
        var value = getValue(node, this.token, this.parameters, context, TOKEN_NAMES.COLOR);

        try {
            context.board().removeStone(value, snapshot(this, context));
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };

    node.PutStone = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'Drop';
        this.parameters = parameters;
    };

    node.PutStone.prototype.interpret = function (context) {
        var value = getValue(node, this.token, this.parameters, context, TOKEN_NAMES.COLOR);
        context.board().putStone(value, snapshot(this, context));
        return context;
    };

    node.MoveToEdge = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'MoveToEdge';
        this.parameters = parameters;
    };

    node.MoveToEdge.prototype.interpret = function (context) {
        var value = getValue(node, this.token, this.parameters, context, TOKEN_NAMES.DIRECTION);
        context.board().moveToEdge(value, snapshot(this, context));
        return context;
    };

    node.CleanBoard = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'CleanBoard';
        this.parameters = parameters;
    };

    node.CleanBoard.prototype.interpret = function (context) {
        context.board().clear(snapshot(this, context));
        return context;
    };

    node.Boom = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'BOOM';
        this.parameters = parameters;
    };

    node.Boom.prototype.interpret = function (context) {
        try {
            context.board().boom(this.parameters[0], snapshot(this, context));
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };
};
