module.exports = function (node) {
    node.Variable = function (token, id) {
        this.token = token;
        this.id = id;
    };

    node.Variable.prototype.eval = function (context) {
        return context.get(this.id);
    };

    return node;
};
