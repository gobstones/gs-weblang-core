var TOKEN_NAMES = require('../grammar/reserved-words');
var getValue = require('./helpers/get-value');

module.exports = function (node, constants) {
    var snapshot = function (node, context) {
        return {token: node.token, names: context.getCurrentNames()};
    };
    var nameInfo = function (node) {
        return {nameType: 'procedure', name: node.name};
    };

    node.MoveClaw = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'MoveClaw';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.MOVE;
    };

    node.MoveClaw.prototype.interpret = function (context) {
        var value = getValue(node, nameInfo(this), this.token, this.parameters, TOKEN_NAMES.DIRECTION, {context: context});

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
        this.name = TOKEN_NAMES.GRAB;
    };

    node.RemoveStone.prototype.interpret = function (context) {
        var value = getValue(node, nameInfo(this), this.token, this.parameters, TOKEN_NAMES.COLOR, {context: context});

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
        this.name = TOKEN_NAMES.DROP;
    };

    node.PutStone.prototype.interpret = function (context) {
        var value = getValue(node, nameInfo(this), this.token, this.parameters, TOKEN_NAMES.COLOR, {context: context});
        context.board().putStone(value, snapshot(this, context));
        return context;
    };

    node.MoveToEdge = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'MoveToEdge';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.MOVE_TO_EDGE;
    };

    node.MoveToEdge.prototype.interpret = function (context) {
        var value = getValue(node, nameInfo(this), this.token, this.parameters, TOKEN_NAMES.DIRECTION, {context: context});
        context.board().moveToEdge(value, snapshot(this, context));
        return context;
    };

    node.CleanBoard = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'CleanBoard';
        this.parameters = parameters;
        this.name = TOKEN_NAMES.CLEAN_BOARD;
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
        this.name = TOKEN_NAMES.BOOM;
    };

    node.Boom.prototype.interpret = function (context) {
        try {
            var value = getValue(node, nameInfo(this), this.token, this.parameters, TOKEN_NAMES.STRING, {context: context, options: {boom: true}});
            context.board().boom(value, snapshot(this, context));
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };
};
