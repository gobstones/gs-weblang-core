module.exports = function (node, constants) {
    node.Assignment = function (token, left, right) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = ':=';
        this.left = left;
        this.right = right;
    };

    node.Assignment.prototype.interpret = function (context) {
        context.put(this.left.token.value, this.right.eval(context, {}), node, this.left.token);
    };
};
