module.exports = function (node) {
    node.Variable = function (token, id) {
        this.token = token;
        this.value = id;
    };

    node.Variable.prototype.eval = function (context) {
        return context.get(this.value);
    };

    return node;
};
