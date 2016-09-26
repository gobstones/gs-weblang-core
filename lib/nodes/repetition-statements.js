module.exports = function (node) {
    node.While = function (token, expression, body) {
        this.alias = 'while';
        this.token = token;
        this.expression = expression;
        this.body = body;
    };

    node.While.prototype.interpret = function (context) {
        while (this.expression.eval(context)) {
            node.interpretBlock(this.body, context);
        }
        return context;
    };

    node.Repeat = function (token, expression, body) {
        this.alias = 'repeat';
        this.token = token;
        this.expression = expression;
        this.body = body;
    };

    node.Repeat.prototype.interpret = function (context) {
        var value = this.expression.eval(context);
        for (var i = 0; i < value; i++) {
            node.interpretBlock(this.body, context);
        }
        return context;
    };
};
