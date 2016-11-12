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

    node.NumStones = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'numStones';
        this.parameters = parameters;
    };

    node.NumStones.prototype.eval = function (context) {
        return context.board().amountStones(this.parameters[0].eval(context));
    };

    node.MinDir = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'minDir';
        this.parameters = parameters;
    };

    node.MinDir.prototype.eval = function (context) {
        return context.nativeRepresentations().minDir;
    };

    node.MaxDir = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'maxDir';
        this.parameters = parameters;
    };

    node.MaxDir.prototype.eval = function (context) {
        return context.nativeRepresentations().maxDir;
    };

    node.MaxColor = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'maxColor';
        this.parameters = parameters;
    };

    node.MaxColor.prototype.eval = function (context) {
        return context.nativeRepresentations().maxColor;
    };

    node.MinColor = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'minColor';
        this.parameters = parameters;
    };

    node.MinColor.prototype.eval = function (context) {
        return context.nativeRepresentations().minColor;
    };

    node.MinBool = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'minBool';
        this.parameters = parameters;
    };

    node.MinBool.prototype.eval = function () {
        return false;
    };

    node.MaxBool = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'maxBool';
        this.parameters = parameters;
    };

    node.MaxBool.prototype.eval = function () {
        return true;
    };
};
