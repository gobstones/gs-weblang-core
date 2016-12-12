module.exports = function (node, constants) {
    var getValue = function (parameters, context) {
        var parameter = parameters[0];

        var value = parameter.eval(context);
        if (value === undefined) {
            throw new node.errors.InterpreterException('La variable "' + parameter.token.value + '" no existe.', parameter.token, {code: 'undefined_variable', detail: parameter.token.value});
        }

        return value;
    };

    node.MoveClaw = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'MoveClaw';
        this.parameters = parameters;
    };

    node.MoveClaw.prototype.interpret = function (context) {
        var value = getValue(this.parameters, context);

        try {
            context.board().move(value);
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
        var value = getValue(this.parameters, context);

        try {
            context.board().removeStone(value);
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
        var value = getValue(this.parameters, context);
        context.board().putStone(value);
        return context;
    };

    node.MoveToEdge = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'MoveToEdge';
        this.parameters = parameters;
    };

    node.MoveToEdge.prototype.interpret = function (context) {
        var value = getValue(this.parameters, context);
        context.board().moveToEdge(value);
        return context;
    };

    node.CleanBoard = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'CleanBoard';
        this.parameters = parameters;
    };

    node.CleanBoard.prototype.interpret = function (context) {
        context.board().clear();
        return context;
    };

    node.Boom = function (token) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'BOOM';
    };

    node.Boom.prototype.interpret = function (context) {
        try {
            context.board().boom();
        } catch (err) {
            err.on = node;
            throw err;
        }
        return context;
    };
};
