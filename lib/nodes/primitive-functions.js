module.exports = function (node, constants) {
    node.HasStones = function (token, parameters) {
        this.token = token;
        this.arity = constants.EXPRESSION;
        this.name = 'hasStones';
        this.parameters = parameters;
    };

    node.CanMove = function (token, parameters) {
        Object.setPrototypeOf(this, token);
        this.arity = constants.EXPRESSION;
        this.name = 'canMove';
        this.parameters = parameters;
    };
};
