module.exports = function (node) {
    node.If = function (token, condition, trueBranch, falseBranch) {
        this.token = token;
        this.condition = condition;
        this.trueBranch = trueBranch;
        this.falseBranch = falseBranch;
    };

    node.If.prototype.interpret = function (context) {
        return node.interpretBlock(this.condition.eval(context) ? this.trueBranch : this.falseBranch, context);
    };

    node.Switch = function (token, expression, cases) {
        this.prototype = token;
        this.expression = expression;
        this.cases = cases;
    };

    node.Switch.prototype.interpret = function (context) {
        var value = this.expression.eval(context);
        for (var i = 0; i < this.cases.length; i++) {
            if (this.cases[i].case.eval(context) === value) {
                node.interpretBlock(this.cases[i].body, context);
            }
        }
        return context;
    };
}
;
