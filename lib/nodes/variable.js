module.exports = function (node) {
    node.Variable = function (token, id) {
        this.token = token;
        this.id = id;
    };
    return node;
};
