module.exports = function (node) {
    node.NumericLiteral = function (node, value) {
        this.prototype = node;
        this.value = value;
    };
    node.NumericLiteral.prototype.type = 'number';

    node.NumericLiteral.prototype.eval = function () {
        return this.value;
    };
};
