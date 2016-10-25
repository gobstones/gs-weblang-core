module.exports = function (node, constants) {
    node.HasStones = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'hasStones';
        this.parameters = parameters;
    };

    node.HasStones.prototype.eval = function (context) {
        return context.board().amountStones(this.parameters[0].eval(context)) > 0;
    };

    node.CanMove = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'canMove';
        this.parameters = parameters;
    };

    node.CanMove.prototype.eval = function (context) {
        return context.board().canMove(this.parameters[0].eval(context));
    };
};
