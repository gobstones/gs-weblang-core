module.exports = function (node) {
    node.NotOperation = function (token, expression) {
        this.prototype = token;
        this.expression = expression;
    };

    node.NotOperation.prototype.eval = function (context) {
        return !this.expression.eval(context);
    };
}
;
