module.exports = function (node) {
    node.If = function (token, condition, trueBranch, falseBranch) {
        this.token = token;
        this.condition = condition;
        this.trueBranch = trueBranch;
        this.falseBranch = falseBranch;
    };

    node.Switch = function (token, expression, cases) {
        this.prototype = token;
        this.expression = expression;
        this.cases = cases;
    };
}
;
