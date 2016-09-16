module.exports = function (node) {
    node.Variable = function (node, id) {
        this.prototype = node;
        this.id = id;
    };
    return node;
};
