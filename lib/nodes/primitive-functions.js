module.exports = function (node, constants) {
    node.HasStones = function (token, parameters) {
        this.prototype = token;
        this.arity = constants.EXPRESSION;
        this.name = 'hasStones';
        this.parameters = parameters;
    };

    node.CanMove = function (token, parameters) {
        this.prototype = token;
        this.arity = constants.EXPRESSION;
        this.name = 'canMove';
        this.parameters = parameters;
    };
};
