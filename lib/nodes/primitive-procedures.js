module.exports = function (node, constants) {
    node.MoveClaw = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.name = 'MoveClaw';
        this.parameters = parameters;
    };

    node.MoveClaw.prototype.interpret = function (context) {
        try {
            context.board().move(this.parameters[0].eval(context));
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };

    node.RemoveStone = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.name = 'Grab';
        this.parameters = parameters;
    };

    node.RemoveStone.prototype.interpret = function (context) {
        try {
            context.board().removeStone(this.parameters[0].eval(context));
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };

    node.PutStone = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.name = 'Drop';
        this.parameters = parameters;
    };

    node.PutStone.prototype.interpret = function (context) {
        context.board().putStone(this.parameters[0].eval(context));
        return context;
    };

    node.MoveToEdge = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.name = 'MoveToEdge';
        this.parameters = parameters;
    };

    node.MoveToEdge.prototype.interpret = function (context) {
        context.board().moveToEdge(this.parameters[0].eval(context));
        return context;
    };

    node.CleanBoard = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.name = 'MoveToEdge';
        this.parameters = parameters;
    };

    node.CleanBoard.prototype.interpret = function (context) {
        context.board().clear();
        return context;
    };

    node.Boom = function (token) {
        this.token = token;
        this.arity = constants.STM;
        this.name = 'BOOM';
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
}
;
