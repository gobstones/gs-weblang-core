module.exports = function (node) {
    node.Variable = function (token, id) {
        this.token = token;
        this.value = id;
    };

    node.Variable.prototype.eval = function (context, options) {
        if (!options) {
            options = {method: 'get'};
        }

        var key = this.value;
        return options.method ? context[options.method](key) : context.getNode(key);
    };

    return node;
};
