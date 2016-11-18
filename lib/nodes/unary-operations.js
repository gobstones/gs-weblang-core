module.exports = function (node) {
    node.NotOperation = function (token, expression) {
        this.token = token;
        this.expression = expression;
        this.alias = 'not';
    };

    node.NotOperation.prototype.eval = function (context) {
        return !this.expression.eval(context);
    };

    node.SubstractionOperation = function (token, expression) {
        this.token = token;
        this.expression = expression;
        this.alias = '-';
    };

    node.SubstractionOperation.prototype.eval = function (context) {
        return -this.expression.eval(context);
    };
}
;
