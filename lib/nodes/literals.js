module.exports = function (node) {
    node.NumericLiteral = function (token, value) {
        this.token = token;
        this.value = value;
    };
    node.NumericLiteral.prototype.type = 'number';

    node.NumericLiteral.prototype.eval = function () {
        return this.value;
    };
};
