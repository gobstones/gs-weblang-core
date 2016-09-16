module.exports = function (node, constants) {
    node.Assignment = function (token, left, right) {
        this.prototype = token;
        this.arity = constants.STM;
        this.alias = ':=';
        this.left = left;
        this.right = right;
    };
};
