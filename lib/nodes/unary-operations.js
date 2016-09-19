module.exports = function (node) {
    node.NotOperation = function (token, expression) {
        this.token = token;
        this.expression = expression;
    };

    node.NotOperation.prototype.eval = function (context) {
        return !this.expression.eval(context);
    };
}
;
