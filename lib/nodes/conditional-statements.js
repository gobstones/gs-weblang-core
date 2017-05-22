var wrap = require('./helpers/wrap');

module.exports = function (node) {
    node.If = function (token, condition, trueBranch, falseBranch) {
        this.token = token;
        this.alias = 'if';
        this.condition = condition;
        this.trueBranch = trueBranch;
        this.falseBranch = falseBranch;
    };

    node.If.prototype.interpret = function (context) {
        return node.interpretBlock(this.condition.eval(context) ? this.trueBranch : this.falseBranch, context);
    };

    node.Switch = function (token, expression, cases) {
        this.token = token;
        this.alias = 'switch';
        this.expression = expression;
        this.cases = cases;
    };

    node.Switch.prototype.interpret = function (context) {
        var exp = wrap(this.expression.eval(context, {}));

        for (var i = 0; i < this.cases.length; i++) {
            var branchExp = wrap(this.cases[i].case.eval(context, {}));
            var token = branchExp.token.range ? branchExp.token : this.token;
            // TODO: ^- En algunos casos no se puede reportar el error bien porque los símbolos no tienen range
            // Ejemplo: program { switch (Rojo) { Verde -> Mover(Norte) Sur -> Mover(Este) } }

            if (exp.type !== branchExp.type) {
                node.errors.throwTypeMismatch(this.cases[i].case.token, exp.type, branchExp.type);
            }

            if (branchExp.value === exp.value) {
                node.interpretBlock(this.cases[i].body, context);
                break;
            }
        }
        return context;
    };
};
